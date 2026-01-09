import Cart from "../models/cart.js";
import Coupon from "../models/coupon.js";
import User from "../models/user.js";
import Order from "../models/order.js";
import Table from "../models/table.js";
import AppError from "../utils/appError.js";
import { calculateCouponForCart } from "../utils/couponCalculator.js";
import razorpay from "../config/razorpay.js";
import { postOrderCleanUP } from "../utils/orderHelpers.js";

const generateOrderNumber = (tableNumber) => {
  const now = new Date();
  const time = now.getHours() * 100 + now.getMinutes(); // HHMM
  const randome = Math.floor(10 + Math.random() * 90);

  return `ORD-T${tableNumber}-${time}-${randome}`;
};

export const createOrder = async (req, res, next) => {
  try {
    const {
      couponCode,
      tableNumber,
      customerName,
      customerEmail,
      customerPhone,
      notes,
      paymentMethod,
    } = req.body;

    if (!["cash", "razorpay"].includes(paymentMethod)) {
      return next(new AppError("Invalid payment method", 400));
    }

    const table = await Table.findOne({ tableNumber });
    if (!table) return next(new AppError("No table Found", 404));
    if (!table.isActive) return next(new AppError("Table is not active", 404));

    // User & Cart
    const userId = req.user?.id || null;
    const sessionToken = req.headers["x-session-token"] || null;

    if (!userId && !sessionToken) {
      return next(new AppError("Unauthorized", 401));
    }

    const cart = await Cart.findOne(
      userId ? { userId } : { sessionToken }
    ).populate("items.menuItemId");

    if (!cart || cart.items.length === 0) {
      return next(new AppError("Cart is empty", 400));
    }

    // Order items
    const orderItems = cart.items.map((item) => {
      const subTotal = item.quantity * item.menuItemId.price;

      return {
        menuItemId: item.menuItemId._id,
        name: item.menuItemId.name,
        price: item.menuItemId.price,
        quantity: item.quantity,
        subTotal,
      };
    });

    // Coupon calculation
    let finalAmount = cart.totalCartPrice;
    let appliedCoupon = null;
    let couponResult = null;

    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode,
        isActive: true,
      });
      if (!coupon) {
        return next(new AppError("Invalid coupon code", 400));
      }

      couponResult = calculateCouponForCart({
        coupon,
        totalCartPrice: cart.totalCartPrice,
        userTotalOrders: req.user?.totalOrders || 0,
      });

      if (!couponResult.isAvailableCoupon) {
        return next(new AppError("Coupon not applicable for this order", 400));
      }

      finalAmount = couponResult.finalAmount;

      appliedCoupon = {
        code: coupon.code,
        discountAmount: couponResult.discountAmount || 0,
        discountType: coupon.discountType,
      };
    }

    // base order payload
    const orderNumber = generateOrderNumber(tableNumber);

    const orderPayload = {
      orderNumber,
      userId,
      tableNumber,
      paymentMethod,

      customerName,
      customerEmail,
      customerPhone,

      notes,
      items: orderItems,

      subTotal: cart.totalCartPrice,
      discountAmount: couponResult?.discountAmount || 0,
      finalAmount,

      coupon: appliedCoupon || null,
    };

    // CASH PAYMENT
    if (paymentMethod === "cash") {
      const order = await Order.create(orderPayload);

      if (userId) {
        await postOrderCleanUP({ userId, finalAmount });
      }
      return res.status(201).json({
        order,
        message: "Order placed Successfully",
      });
    }

    // RAZORPAY PAYMENT
    if (finalAmount <= 0) {
      return next(new AppError("Invalid payable amount", 400));
    }

    const options = {
      amount: finalAmount * 100,
      currency: "INR",
      receipt: orderNumber,
      notes: {
        customerName,
        customerEmail,
        customerPhone,
      },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    orderPayload.razorPayOrderId = razorpayOrder.id;

    const order = await Order.create({
      ...orderPayload,
      paymentStatus: "pending",
    });

    return res.status(201).json({
      order,
      orderId: order._id,
      message: "Payment initiated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

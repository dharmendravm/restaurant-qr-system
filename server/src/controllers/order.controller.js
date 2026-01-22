import Cart from "../models/cart.js";
import Coupon from "../models/coupon.js";
import Order from "../models/order.js";
import Table from "../models/table.js";
import AppError from "../utils/appError.js";
import { calculateCouponForCart } from "../utils/couponCalculator.js";
import razorpay from "../services/integrations/razorpay.service.js";
import { postOrderCleanUP } from "../utils/orderHelpers.js";
import mongoose from "mongoose";

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

    const cart = await Cart.findOne({ userId, sessionToken }).populate(
      "items.menuItemId"
    );

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
      ...(userId && { userId }),
      ...(!userId && sessionToken && { sessionToken }),
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

      if (sessionToken) {
        cart.items = [];
        cart.totalCartPrice = 0;
        await cart.save();
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
      razorpayOrder: { ...razorpayOrder, key: process.env.RAZORPAY_KEY_ID },
      message: "Payment initiated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const veryfyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const order = Order.findOne({ razorpay_order_id });

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed!" });
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    console.log(payment);
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

    return res.status(200).json({
      success: true,
      message: "Order fatched successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// export const cancelOrder = async (req, res, next) => {
//   try {
//     const { orderId } = req.params;
//     const reason = req.body?.reason;

//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//       return next(new AppError("Invalid order id", 400));
//     }

//     if(req.user)

//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     if (order.orderStatus === "cancelled") {
//       return res.status(400).json({ message: "Order is already cancelled" });
//     }

//     if (order.orderStatus !== "pending") {
//       return next(new AppError(`Order cannot be cancelled on this stage`, 400));
//     }

//     order.orderStatus = "cancelled";
//     order.cancelReason = reason || "Order cancelled by customer";
//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: "Order cancelled successfully",
//       data: {
//         orderId: order._id,
//         orderStatus: order.orderStatus,
//         paymentStatus: order.paymentStatus,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

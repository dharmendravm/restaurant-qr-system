import mongoose from "mongoose";
import Order from "../../models/order.js";
import AppError from "../../utils/appError.js";

export const getOrdersForDashboard = async (req, res, next) => {
  try {
    const orders = await Order.find(
      {},
      {
        orderNumber: 1,
        tableNumber: 1,
        finalAmount: 1,
        paymentStatus: 1,
        orderStatus: 1,
        createdAt: 1,
        userId: 1,
      }
    )
      .populate("userId", "name phone")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderDetailsById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid order id", 400));
    }

    const order = await Order.findById({ _id: id }).populate(
      "userId",
      "name email phone"
    );

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const allowedStatusFlow = {
      pending: ["preparing", "cancelled"],
      preparing: ["ready", "cancelled"],
      ready: ["served"],
    };
    const { id } = req.params;
    const { orderStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid order id", 400));
    }

    if (!orderStatus) {
      return res.status(400).json({ message: "Order Status is required" });
    }

    const order = await Order.findByIdAndUpdate(id);

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    if (order.orderStatus === "cancelled") {
      return next(new AppError("Cancelled order cannot be updated"));
    }

    const currentStatus = order.orderStatus;

    const allowedNextStatus = allowedStatusFlow[currentStatus];

    if (!allowedNextStatus || !allowedNextStatus.includes(orderStatus)) {
      return next(
        new AppError(
          `Invalid status transition from ${currentStatus} to ${orderStatus}`,
          400
        )
      );
    }

    order.orderStatus = orderStatus;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: {
        orderId: order._id,
        orderStatus: order.orderStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updatePaymentStatusOnCash = async (req, res, next) => {
  const allowedPaymentStatusFlow = {
    pending: ["paid"],
    paid: ["refunded"],
  };
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid order id", 400));
    }

    if (!paymentStatus) {
      return res.status(400).json({ message: "Payment Status is required" });
    }

    const order = await Order.findByIdAndUpdate(id);

    const currentPaymentStatus = order.paymentStatus;
    const allowedNextPaymentStatus =
      allowedPaymentStatusFlow[currentPaymentStatus];

    if (
      !allowedNextPaymentStatus ||
      !allowedNextPaymentStatus.includes(paymentStatus)
    ) {
      return next(
        new AppError(
          `Invalid status transition from ${currentPaymentStatus} to ${paymentStatus}`,
          400
        )
      );
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment Status updated successfully",
      data: {
        orderId: order._id,
        paymentStatus: order.paymentStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reason = req.body?.reason;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid order id", 400));
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus === "cancelled") {
      return res.status(400).json({ message: "Order is already cancelled" });
    }

    if (["ready", "served"].includes(order.orderStatus)) {
      return next(
        new AppError(
          `Order cannot be cancelled once it is ${order.orderStatus}`,
          400
        )
      );
    }

    order.orderStatus = "cancelled";
    order.cancelReason = reason?.trim() || "Order cancelled by admin";

    if (order.paymentMethod === "cash") {
      order.paymentStatus = "pending";
    }

    if (order.paymentMethod === "razorpay" && order.paymentStatus === "paid") {
      order.refundAmount = order.finalAmount;
      order.paymentStatus = "refunded";
    }
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: {
        orderId: order._id,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

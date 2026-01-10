import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Order Identity
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    sessionToken: String,

    // Order Items
    items: {
      type: [
        {
          menuItemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu",
            required: true,
          },
          name: String,
          price: Number,
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
          subTotal: {
            type: Number,
            required: true,
          },
        },
      ],
      validate: [(arr) => arr.length > 0, "Order must have at least one item"],
    },

    // Price Summary
    subTotal: {
      type: Number,
      required: true,
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    couponCode: String,

    finalAmount: {
      type: Number,
      required: true,
    },

    //  Customer / Table
    tableNumber: {
      type: Number,
      default: null,
    },
    customerName: {
      type: String,
      trim: true,
    },
    customerEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      trim: true,
    },

    notes: String,

    // Payment
    paymentMethod: {
      type: String,
      enum: ["cash", "razorpay"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },

    // Order Status
    orderStatus: {
      type: String,
      enum: ["pending", "preparing", "ready", "served", "cancelled"],
      default: "pending",
    },
    
    cancelReason: String,

    refundAmount: Number,

    // Razorpay
    razorpay_payment_id: String,
    razorpay_order_id: String,
    razorpay_signature: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

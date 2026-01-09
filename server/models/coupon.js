import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    discountType: {
      type: String,
      enum: ["percentage", "fixedAmount"],
    },

    discountValue: {
      type: Number,
      required: true,
      min: 1,
    },

    maxDiscount: Number,

    validFrom: Date,
    validTo: Date,

    isActive: {
      type: Boolean,
      default: true,
    },

    isFirstOrder: {
      type: Boolean,
      default: false,
    },

    usageLimit: {
      type: Number,
      default: 0,
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    minOrderAmount: {
      type: Number,
      default: 0,
    },

    description: String,
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;

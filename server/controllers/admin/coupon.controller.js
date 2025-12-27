import Coupon from "../../models/coupon.js";

export const registerCoupon = async (req, res) => {
  try {
    const {
      code,
      discountType,
      maxDiscount,
      validFrom,
      validTo,
      usageLimit,
      minOrderAmount,
      discountValue,
      description,
    } = req.body;

    if (!code || !discountType || !discountValue) {
      return res
        .status(400)
        .json({ message: "Code and discountType are required" });
    }

    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const couponData = {
      code: code.toUpperCase(),
      discountType,
      maxDiscount: maxDiscount || null,
      validFrom: validFrom || new Date(),
      validTo: validTo || null,

      usageLimit: usageLimit || null,
      minOrderAmount: minOrderAmount || 0,
      discountValue : discountValue || 0,

      description: description || "",
      isActive: true,
      usedCount: 0,
    };

    const savedCoupon = await new Coupon(couponData).save();

    res.status(201).json({
      message: "Coupon created successfully",
      coupan: savedCoupon,
    });
  } catch (error) {
    console.error("Error registering coupon:", error);
    res.status(500).json({ message: "Server error" });
  }
};
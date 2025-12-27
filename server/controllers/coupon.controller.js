import Coupon from "../models/coupon.js";
import Cart from "../models/cart.js";


// APPLY COUPON  //
export const applyCoupon = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });
    if(!cart){
      return next(new AppError("Cart not found", 404));
    }

    let totalCartPrice = cart.totalCartPrice;
    let currentDate = new Date();

    const allCoupons = await Coupon.find({ isActive : true });
    
    const availableCoupons = allCoupons.filter((coupon) => {
      return (
        totalCartPrice >= coupon.minOrderAmount &&
        (!coupon.validFrom || currentDate >= coupon.validFrom) &&
        (!coupon.validTo || currentDate <= coupon.validTo)
      );
    });

    const couponsAfterCalculation = availableCoupons.map((coupon) => {
      let discountAmount = 0;

        if (coupon.discountType === "fixedAmount") {
          discountAmount = coupon.discountValue;
          
        }
        if (coupon.discountType === "percentage") {
          discountAmount =
            (totalCartPrice * coupon.discountValue) / 100;

            if (coupon.maxDiscount) {
              discountAmount = Math.min(discountAmount, coupon.maxDiscount);
            }
        }
        const finalAmount = Math.max(
          totalCartPrice - discountAmount,
          0
        );
      
        return {
          couponCode : coupon.code,
          discountType : coupon.discountType,
          discountAmount,
          finalAmount,
        };
    });
    

    res.status(200).json({
      totalCartPrice,
      availableCoupons: couponsAfterCalculation,
    });
  } catch (error) {
    next(error);
  }
};

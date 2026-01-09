export const calculateCouponForCart = ({
  coupon,
  totalCartPrice,
  userTotalOrders,
  currentDate = new Date(),
}) => {
  const isCartPriceMeetsMinOrderAmount =
    totalCartPrice >= (coupon.minOrderAmount || 0);

  const isCouponIsValid =
    (!coupon.validFrom || currentDate >= coupon.validFrom) &&
    (!coupon.validTo || currentDate <= coupon.validTo);

  const isOrderIsUserFirstOrder =
    typeof userTotalOrders === "number" && userTotalOrders === 0;
  const isCouponIsForFirstOrder = coupon.isFirstOrder;

  const isAvailableCoupon =
    isCartPriceMeetsMinOrderAmount &&
    isCouponIsValid &&
    (isCouponIsForFirstOrder ? isOrderIsUserFirstOrder : true);

  let discountAmount = 0;

  if (coupon.discountType === "fixedAmount") {
    discountAmount = Math.min(coupon.discountValue, totalCartPrice);
  }
  if (coupon.discountType === "percentage") {
    discountAmount = (totalCartPrice * coupon.discountValue) / 100;

    if (coupon.maxDiscount) {
      discountAmount = Math.min(discountAmount, coupon.maxDiscount);
    }
  }
  const finalAmount = Math.max(totalCartPrice - discountAmount, 0);

  return {
    _id: coupon._id,
    finalAmount,
    description: coupon.description,
    couponCode: coupon.code,
    discountType: coupon.discountType,
    discountAmount,
    minOrderAmount: coupon.minOrderAmount,
    validFrom: coupon.validFrom,
    validTo: coupon.validTo,
    isAvailableCoupon,
    isCartPriceMeetsMinOrderAmount,
    totalCartPrice,
  };
};

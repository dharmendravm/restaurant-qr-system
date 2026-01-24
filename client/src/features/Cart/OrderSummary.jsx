import { getAllCouponsThunk, setSelectedCoupon } from "@/store/couponSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartSkeleton from "../../components/shared/skeletons/CartSkeleton";
import { useNavigate } from "react-router-dom";

export const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading: cartLoading } = useSelector((state) => state.cart);
  const { previewCoupons, loading, error, selectedCoupon } = useSelector(
    (state) => state.coupon
  );
  const coupons = previewCoupons?.coupons ?? [];
  const backendTotal =
    previewCoupons?.totalCartPrice ?? cart?.totalCartPrice ?? 0;

  const discountAmount = selectedCoupon?.discountAmount ?? 0;
  const finalAmount = Math.max(backendTotal - discountAmount, 0);

  const availableCoupons = coupons.filter((c) => c.isAvailableCoupon);

  useEffect(() => {
    if (cart) {
      dispatch(getAllCouponsThunk());
    }
  }, [cart, dispatch]);

  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) return;
    navigate("/checkout");
  };

  if (cartLoading) return <CartSkeleton />;
  if (loading) return <p>loading...</p>;
  if(!coupons) return null;
  if (error) return <p className="text-sm text-red-500">{error}</p>;

  return (
    <div className="lg:sticky lg:top-24 bg-card-bg/40 border border-border rounded-3xl p-6 space-y-6">
      <h3 className="text-lg font-semibold">Order Summary</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-text-muted">Subtotal</span>
          <span>₹{backendTotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-muted">Discount</span>
          <span>-₹ {discountAmount}</span>
        </div>
      </div>
      {/* Coupons */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Coupons</h4>

        {availableCoupons.length === 0 ? (
          <p className="text-xs text-text-muted">No coupons available</p>
        ) : (
          availableCoupons.map((coupon) => (
            <div
              key={coupon._id}
              className="flex justify-between items-center p-3 rounded-xl bg-green-500/10 border border-green-500/20"
            >
              <div>
                <p className="text-sm font-semibold text-green-500">
                  {coupon.couponCode}
                </p>
                <p className="text-xs text-text-muted">
                  {coupon.discountType === "fixedAmount"
                    ? `₹${coupon.discountAmount} OFF`
                    : `${coupon.discountAmount} % OFF`}
                </p>
              </div>

              <button
                onClick={() => dispatch(setSelectedCoupon(coupon))}
                className="text-xs font-semibold text-green-500 cursor-pointer"
              >
                {selectedCoupon?._id === coupon._id ? "APPLIED" : "APPLY"}
              </button>
            </div>
          ))
        )}
      </div>
      {/* Total */}
      <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>₹{finalAmount}</span>
      </div>
      <button
        onClick={handleCheckout}
        className="w-full py-3 rounded-2xl bg-brand-main text-black font-semibold cursor-pointer"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

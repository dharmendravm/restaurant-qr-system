export const OrderSummary = ({ totalprice }) => {
  return (
    <div
      className="lg:sticky lg:top-24 bg-card-bg/40 backdrop-blur border border-border rounded-3xl p-6 space-y-4 shadow-lg"
    >
      <h3 className="text-lg font-semibold tracking-tight">
        Order Summary
      </h3>

      <div className="flex justify-between text-sm">
        <span className="text-text-muted">Subtotal</span>
        <span>₹ {totalprice}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-text-muted">Taxes</span>
        <span>₹ 0</span>
      </div>

      <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-brand-main">
          ₹ {totalprice}
        </span>
      </div>

      <button
        className="w-full mt-4 py-3 rounded-2xl bg-brand-main text-black font-semibold hover:scale-[1.02] active:scale-95 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

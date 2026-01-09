const CartSkeleton = () => (
  <div className="max-w-7xl mx-auto p-6 animate-pulse space-y-4">
    <div className="h-6 w-32 bg-hover rounded" />
    <div className="h-24 bg-hover rounded-2xl" />
    <div className="h-24 bg-hover rounded-2xl" />
    <div className="h-32 bg-hover rounded-3xl" />
  </div>
);

export default CartSkeleton;

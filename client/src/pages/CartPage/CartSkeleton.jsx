const CartSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header */}
          <div className="h-7 w-40 bg-hover rounded" />
          <div className="h-4 w-64 bg-hover rounded mb-6" />

          {/* Items */}
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 bg-card-bg border border-border rounded-2xl"
            >
              <div className="w-20 h-20 bg-hover rounded-xl" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-1/2 bg-hover rounded" />
                <div className="h-3 w-24 bg-hover rounded" />
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-hover rounded-full" />
                  <div className="w-6 h-4 bg-hover rounded" />
                  <div className="w-8 h-8 bg-hover rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="bg-card-bg border border-border rounded-3xl p-5 space-y-4 h-fit">
          <div className="h-5 w-32 bg-hover rounded" />
          <div className="h-4 w-full bg-hover rounded" />
          <div className="h-4 w-full bg-hover rounded" />
          <div className="h-10 bg-hover rounded-2xl" />
        </div>

      </div>
    </div>
  );
};

export default CartSkeleton;

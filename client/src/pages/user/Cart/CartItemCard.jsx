export const CartItemCard = ({ item, actions }) => {
  const { menuItemId: displayItem, quantity } = item;

  return (
    <div
      className="
        flex flex-col sm:flex-row
        gap-4 p-4
        bg-card-bg border border-border
        rounded-2xl
        hover:bg-hover
        transition-all duration-300
      "
    >
      {/* Image */}
      <div className="w-full sm:w-20 h-40 sm:h-20 rounded-xl overflow-hidden border">
        <img
          src={displayItem.image}
          alt="Food item"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-text-main">{displayItem.name}</h3>

        <p className="text-sm text-text-muted mt-0.5">₹ {displayItem.price}</p>

        {/* Quantity */}
        <div className="mt-3 flex items-center gap-3">
          <button
          onClick={()=> actions.decrease(item.menuItemId._id)}
           className="w-9 h-9 rounded-full border hover:bg-hover">
            -
          </button>

          <span className="min-w-6 text-center font-medium">{quantity}</span>

          <button
          onClick={()=> actions.increase(item.menuItemId._id)}
           className="w-9 h-9 rounded-full border hover:bg-hover">
            +
          </button>
        </div>
      </div>

      {/* Right */}
      <div
        className="
          w-full sm:w-auto
          flex justify-between items-center
          sm:block sm:text-right
          space-y-0 sm:space-y-2
        "
      >
        <p className="font-semibold text-text-main">
          ₹ {displayItem.price * quantity}
        </p>

        <button
        onClick={()=> actions.remove(item.menuItemId._id)}
        className="text-sm text-danger hover:underline">Remove</button>
      </div>
    </div>
  );
};

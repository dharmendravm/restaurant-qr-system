import { useSelector, useDispatch } from "react-redux";
import { fetchMenuItems, setSelectedCategory } from "@/redux/menuSlice";
import { memo, useEffect, useState } from "react";
import { addToCartThunk } from "@/redux/cartSlice";

// MenuCard 
const MenuCard = memo(({ item }) => {
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  const handleClick = async (menuItemId) => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    setIsAdding(true);
    try {
      await dispatch(addToCartThunk({ userId, menuItemId })).unwrap();
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-card-bg rounded-xl border border-border shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <div className="w-full aspect-4/3 overflow-hidden bg-muted-bg">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/no-image.png";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Name + Price */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-main">
            {item.name}
          </h3>
          <p className="text-lg font-semibold text-brand-main">
            ₹{item.price}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-text-muted line-clamp-2">
          {item.description}
        </p>

        {/* Category + Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-text-subtle uppercase tracking-wide">
            {item.category}
          </span>

          <button
            disabled={isAdding}
            onClick={() => handleClick(item._id)}
            className="px-4 py-2 bg-brand-main text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-60 transition"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
});

// MenuSection
const MenuSection = () => {
  const dispatch = useDispatch();
  const { menuItems, categories, selectedCategory } = useSelector(
    (state) => state.menu
  );

  useEffect(() => {
    dispatch(fetchMenuItems(selectedCategory));
  }, [dispatch, selectedCategory]);

  return (
    <section id="menu-section" className="space-y-8 pt-12">
      {/* Title */}
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-text-main">
          Our Signature Dishes
        </h2>
        <p className="text-[12px] text-text-muted max-w-md mt-1">
          From classic favorites to modern culinary creations, each dish is made
          with fresh ingredients & an extra dash of love.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => dispatch(setSelectedCategory(cat))}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition
                ${
                  isActive
                    ? "bg-brand-main text-white border-brand-main"
                    : "bg-hover text-text-main border-border hover:bg-brand-soft"
                }
              `}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>

      {/* Empty State */}
      {menuItems.length === 0 && (
        <p className="text-center text-text-muted py-12">
          No items available.
        </p>
      )}
    </section>
  );
};

export default MenuSection;

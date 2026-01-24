import { useSelector, useDispatch } from "react-redux";
import { fetchMenuItems, setSelectedCategory } from "@/store/menuSlice";
import { memo, useEffect, useState } from "react";
import { addToCartThunk } from "@/features/Cart/cartSlice";
import { UtensilsCrossed } from "lucide-react";

// MenuCard
const MenuCard = memo(({ item }) => {
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async (menuItemId) => {
    setIsAdding(true);
    try {
      await dispatch(addToCartThunk({ menuItemId })).unwrap();
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative bg-card-bg rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-30">
      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className=" w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 "
          onError={(e) => (e.currentTarget.src = "/no-image.png")}
        />

        {/* PRICE BADGE */}
        <span className=" absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-sm font-semibold px-3 py-1 rounded-full">
          ₹{item.price}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold text-text-main leading-snug">
          {item.name}
        </h3>

        <p className="text-sm text-text-muted line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-3">
          <span className="text-[10px] uppercase tracking-wider text-text-subtle bg-hover px-2 py-1 rounded-full">
            {item.category}
          </span>

          <button
            disabled={isAdding}
            onClick={() => handleClick(item._id)}
            className=" flex items-center gap-1 px-4 py-1.5 bg-brand-main text-white text-sm font-medium rounded-full transition-all hover:scale-105 active:scale-95 disabled:opacity-60 "
          >
            {isAdding ? "Adding..." : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
});

// MenuSection
const MenuSection = ({ isAdmin = false }) => {
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
      {!isAdmin && (
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-main tracking-tight">
            Our Signature Dishes
          </h2>
          <p className="text-sm text-text-muted max-w-md mt-1">
            From classic favorites to modern culinary creations, each dish is
            made with fresh ingredients & an extra dash of love.
          </p>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => dispatch(setSelectedCategory(cat))}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all
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
        <div className="text-center py-16 space-y-2">
          <p className="text-lg font-medium text-text-main">
            No dishes found
            <UtensilsCrossed className="w-5 h-5" />
          </p>
          <p className="text-sm text-text-muted">
            Try selecting a different category.
          </p>
        </div>
      )}
    </section>
  );
};

export default MenuSection;

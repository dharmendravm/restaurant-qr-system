import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-card-bg border border-border mb-6">
        <ShoppingBag className="w-12 h-12 text-text-muted" />
      </div>

      <h2 className="text-2xl font-bold mb-2">
        Your cart is empty
      </h2>

      <p className="text-text-muted text-sm max-w-sm mb-6">
        Looks like you haven't added anything yet.
        Explore the menu to get started.
      </p>

      <Link
        to="/"
        className="px-6 py-3 rounded-2xl bg-brand-main font-semibold hover:opacity-90 transition"
      >
        Browse Menu
      </Link>
    </div>
  );
};

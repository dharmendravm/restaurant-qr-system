import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

export const GuestCart = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-card-bg border border-border mb-6">
        <Lock className="w-10 h-10 text-brand-main" />
      </div>

      <h2 className="text-2xl font-bold mb-2">
        Login required
      </h2>

      <p className="text-text-muted text-sm max-w-sm mb-6">
        Please login or create an account to view and manage your cart.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-2 rounded-xl bg-brand-main font-medium hover:opacity-90 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-6 py-2 rounded-xl border border-border hover:bg-hover transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

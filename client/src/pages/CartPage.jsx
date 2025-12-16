import { Lock, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { email } = useSelector((state) => state.auth);
  const isLoggedIn = !!email;


  const cart = {
    items: [],
    totalCartPrice: 0,
  };

  //  Guest user
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 border border-orange-200 shadow-sm">
          <Lock className="w-12 h-12 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Login required</h2>
        <p className="text-gray-600 mb-6">
          Please login or create an account to use the cart.
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-orange-500 text-white rounded-xl"
          >
            Login
          </Link>

          <Link to="/register" className="px-6 py-2 border rounded-xl">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  //  Logged-in but cart empty
  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 border border-orange-200 shadow-sm">
          <ShoppingBag className="w-12 h-12 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">
          Add items from the menu to get started
        </p>

        <Link to='/' className="px-6 py-2 bg-orange-500 text-white rounded-xl">
          Browse Menu
        </Link>
      </div>
    );
  }

  //  Logged-in + cart has items
  return (
    <div>
      <h1>Your Cart Items</h1>
      {/* yaha cart items UI */}
    </div>
  );
};
export default CartPage;

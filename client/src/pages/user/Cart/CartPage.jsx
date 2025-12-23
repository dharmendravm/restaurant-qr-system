import { useDispatch, useSelector } from "react-redux";
import { CartItemsList } from "./CartItemsList";
import { OrderSummary } from "./OrderSummary";
import { EmptyCart } from "./EmptyCart";
import { useEffect, useMemo } from "react";
import {
  decreaseQtyCartThunk,
  getCartThunk,
  increaseQtyCartThunk,
  removeItemCartThunk,
} from "@/redux/cartSlice";
import CartSkeleton from "./CartSkeleton";
import { GuestCart } from "./GuestCart";

const CartPage = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  const { cart, loading, error } = useSelector((state) => state.cart);

  const isLoggedIn = !!userId;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && userId && !cart) {
      dispatch(getCartThunk());
    }
  }, [isLoggedIn, userId, cart, dispatch]);

  const cartActions = useMemo(
    () => ({
      increase: (id) => dispatch(increaseQtyCartThunk(id)),
      decrease: (id) => dispatch(decreaseQtyCartThunk(id)),
      remove: (id) => dispatch(removeItemCartThunk(id)),
    }),
    [dispatch]
  );

  if (!isLoggedIn) {
    return <GuestCart />;
  }

  if (loading && !cart) {
    return <CartSkeleton />;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Your Cart
            </h1>
            <p className="text-text-muted text-sm mt-1">
              Review your items before checkout
            </p>
            <div className="h-px bg-border mt-5" />
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-xl border border-danger/30 bg-danger/10 text-danger text-sm">
              {error}
            </div>
          )}

          <CartItemsList items={cart.items} actions={cartActions} />
        </div>

        <div className="block lg:sticky lg:top-20">
          <OrderSummary totalprice={cart.totalCartPrice} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;

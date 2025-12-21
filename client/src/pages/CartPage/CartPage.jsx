import { useDispatch, useSelector } from "react-redux";
import { CartHeader } from "./CartHeader";
import { CartItemsList } from "./CartItemsList";
import { OrderSummary } from "./OrderSummary";
import { GuestCart } from "./guestCart";
import { EmptyCart } from "./EmptyCart";
import { useEffect } from "react";
import {
  decreaseQtyCartThunk,
  getCartThunk,
  increaseQtyCartThunk,
  removeItemCartThunk,
} from "@/redux/cartSlice";
import CartSkeleton from "./CartSkeleton";
import { useToast } from "@/components/ui/toast";

const CartPage = () => {
  const { userId, email } = useSelector((state) => state.auth);
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { success, error: toastError } = useToast();

  const isLoggedIn = !!email;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && userId && !cart) {
      dispatch(getCartThunk(userId));
    }
  }, [isLoggedIn, userId, cart, dispatch]);

  const cartActions = useMemo(() => ({
    increase: (id) =>
      dispatch(increaseQtyCartThunk({ userId, menuItemId: id })),

    decrease: (id) =>
      dispatch(decreaseQtyCartThunk({ userId, menuItemId: id })),

    remove: (id) => dispatch(removeItemCartThunk({ userId, menuItemId: id })),
}), [dispatch, userId]);

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
          <CartHeader />
          {error && (
            <div className="mb-4 p-3 rounded-xl border border-danger/30 bg-danger/10 text-danger text-sm">
              {error}
            </div>
          )}

          <CartItemsList items={cart.items} actions={cartActions} />
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <OrderSummary totalprice={cart.totalCartPrice}/>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <OrderSummary totalprice={cart.totalCartPrice} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;

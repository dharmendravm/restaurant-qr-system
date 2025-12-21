import { CartItemCard } from "./CartItemCard";

export const CartItemsList = ({ items, actions }) => {

  return (
    <div className="space-y-4">
      {items.map((item) =>(
        <CartItemCard
        key={item._id}
        item={item}
        actions={actions}
         />
      ))}
    </div>
  );
};

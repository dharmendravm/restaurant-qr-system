import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  sessionToken: {
    type: String,
    default: null,
  },
  items: [
    {
      menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
      quantity: {
        type: Number,
      },
    },
  ],

  totalCartPrice: {
    type: Number,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

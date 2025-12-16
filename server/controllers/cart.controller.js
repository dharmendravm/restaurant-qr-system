import Cart from "../models/cart.js";
import Menu from "../models/menu.js";


//  HELPER: Find cart by userId
const findCart = async (userId) => {
  return await Cart.findOne({ userId });
};

//  HELPER: Recalculate & save total cart price
const updateTotalPrice = async (cart) => {
  // get price from Menu collection
  await cart.populate("items.menuItemId", "price");

  // total = sum of (price × quantity)
  cart.totalCartPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.menuItemId.price,
    0
  );

  await cart.save();
};


//  ADD TO CART

export const addToCart = async (req, res) => {
  try {
    const { userId, menuItemId, quantity = 1 } = req.body;

    // 1️ Get cart (or create new)
    let cart = await findCart(userId);

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalCartPrice: 0,
      });
    }

    // 2️ Validate menu item
    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // 3️ Check if item already exists
    const existingItem = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId
    );

    if (existingItem) {
      // item already in cart → increase quantity
      existingItem.quantity += quantity;
    } else {
      // new item
      cart.items.push({ menuItemId, quantity });
    }

    // 4️ Update total price
    await updateTotalPrice(cart);

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  GET CART

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate(
      "items.menuItemId",
      "name price image"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  INCREASE QUANTITY

export const increaseQty = async (req, res) => {
  try {
    const { userId, menuItemId } = req.body;

    const cart = await findCart(userId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.menuItemId.toString() === menuItemId
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += 1;

    await updateTotalPrice(cart);

    res.status(200).json({ message: "Quantity increased", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  DECREASE QUANTITY

export const decreaseQty = async (req, res) => {
  try {
    const { userId, menuItemId } = req.body;

    const cart = await findCart(userId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.menuItemId.toString() === menuItemId
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity -= 1;

    // remove item if quantity becomes 0
    if (item.quantity === 0) {
      cart.items = cart.items.filter(
        (i) => i.menuItemId.toString() !== menuItemId
      );
    }

    await updateTotalPrice(cart);

    res.status(200).json({ message: "Quantity decreased", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  REMOVE ITEM COMPLETELY

export const removeItem = async (req, res) => {
  try {
    const { userId, menuItemId } = req.body;

    const cart = await findCart(userId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i.menuItemId.toString() !== menuItemId
    );

    await updateTotalPrice(cart);

    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  CLEAR CART

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await findCart(userId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalCartPrice = 0;

    await cart.save();

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

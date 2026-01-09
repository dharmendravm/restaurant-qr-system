import Cart from "../models/cart.js";
import Menu from "../models/menu.js";
import AppError from "../utils/appError.js";
// HELPERS

// Find cart by user
const findCart = async ({ userId, sessionToken }) => {
  if (userId) return await Cart.findOne({ userId });
  return await Cart.findOne({ sessionToken });
};

// Find menu item
const findMenu = async (menuItemId) => {
  return await Menu.findById(menuItemId);
};

// Recalculate & save total price
const updateTotalPrice = async (cart) => {
  await cart.populate(
    "items.menuItemId",
    "name price image category isAvailable"
  );

  cart.totalCartPrice = cart.items.reduce(
    (sum, item) => sum + item.menuItemId.price * item.quantity,
    0
  );

  await cart.save();
};

// ADD TO CART
export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user?.id || null;
    const sessionToken = req.headers["x-session-token"] || null;

    if (!userId && !sessionToken)
      return next(new AppError("Unauthorized cart access", 401));

    const { menuItemId, quantity = 1 } = req.body;

    const menu = await findMenu(menuItemId);
    if (!menu) {
      return next(new AppError("No menu item found", 400));
    }

    let cart = await findCart({ userId, sessionToken });
    if (!cart) {
      cart = new Cart({
        userId: userId || null,
        sessionToken: userId ? null : sessionToken,
        items: [],
        totalCartPrice: 0,
      });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ menuItemId, quantity });
    }

    await updateTotalPrice(cart);

    res.status(201).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// GET CART
export const getCart = async (req, res, next) => {
  try {
    const userId = req.user?.id || null;
    const sessionToken = req.headers["x-session-token"] || null;

    const cart = await findCart({ userId, sessionToken });
    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: null,
      });
    }

    await cart.populate(
      "items.menuItemId",
      "name price image category isAvailable"
    );

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// INCREASE QTY
export const increaseQty = async (req, res, next) => {
  try {
    const userId = req.user?.id || null;
    const sessionToken = req.headers["x-session-token"] || null;

    const { menuItemId } = req.body;

    const cart = await findCart({ userId, sessionToken });
    if (!cart) {
      return next(new AppError("Cart not found", 400));
    }

    const item = cart.items.find((i) => i.menuItemId.toString() === menuItemId);

    if (!item) {
      return next(new AppError("Item not found", 400));
    }

    item.quantity += 1;
    await updateTotalPrice(cart);

    res.status(200).json({
      success: true,
      message: "Quantity increased",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// DECREASE QTY
export const decreaseQty = async (req, res, next) => {
  try {
    const userId = req.user?.id || null;
    const sessionToken = req.headers["x-session-token"] || null;

    const { menuItemId } = req.body;

    const cart = await findCart({ userId, sessionToken });
    if (!cart) {
      const error = new Error("Cart not found");
      error.statusCode = 404;
      throw error;
    }

    const item = cart.items.find((i) => i.menuItemId.toString() === menuItemId);

    if (!item) {
      return next(new AppError("Item not found", 404));
    }

    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.menuItemId.toString() !== menuItemId
      );
    }

    await updateTotalPrice(cart);

    res.status(200).json({
      success: true,
      message: "Quantity decreased",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// REMOVE ITEM
export const removeItem = async (req, res, next) => {
  try {
    const userId = req.user?.id || null;
    const sessionToken = req.headers["x-session-token"] || null;

    const { menuItemId } = req.body;

    const cart = await findCart({ userId, sessionToken });
    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }

    cart.items = cart.items.filter(
      (i) => i.menuItemId.toString() !== menuItemId
    );

    await updateTotalPrice(cart);

    res.status(200).json({
      success: true,
      message: "Item removed",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// CLEAR CART
export const clearCart = async (req, res, next) => {
  try {
    const userId = req.user?.id || null;
    const sessionToken = req.headers["x-session-token"] || null;

    const cart = await findCart({ userId, sessionToken });
    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }

    cart.items = [];
    cart.totalCartPrice = 0;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

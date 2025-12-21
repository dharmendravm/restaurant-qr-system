import express from 'express' ;
import { addToCart, clearCart, decreaseQty, getCart, increaseQty, removeItem } from '../controllers/cart.controller.js';

const router = express.Router() ;

// add item to cart
router.post("/add", addToCart);

// get cart by userId
router.get("/:userId", getCart);

// increase quantity
router.patch("/increase", increaseQty);

// decrease quantity
router.patch("/decrease", decreaseQty);

// remove single item
router.delete("/remove", removeItem);

// clear full cart
router.delete("/clear", clearCart);

export default router;
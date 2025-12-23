import express from 'express' ;
import { addToCart, clearCart, decreaseQty, getCart, increaseQty, removeItem } from '../controllers/cart.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router() ;

// add item to cart
router.post("/add",verifyToken, addToCart);

// get cart for the authenticated user (id from token)
router.get("/", verifyToken, getCart);

// increase quantity
router.patch("/increase", verifyToken, increaseQty);

// decrease quantity
router.patch("/decrease", verifyToken, decreaseQty);

// remove single item
router.delete("/remove", verifyToken, removeItem);

// clear full cart
router.delete("/clear", verifyToken, clearCart);

export default router;
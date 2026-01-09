import express from "express";
import {
  addToCart,
  clearCart,
  decreaseQty,
  getCart,
  increaseQty,
  removeItem,
} from "../controllers/cart.controller.js";
import checkGuestOrUser from "../middlewares/checkGuestOrUser.js";
import requireUserOrGuestSession from "../middlewares/requireUserOrGuestSession.js";

const router = express.Router();

router.use(checkGuestOrUser);


router.get("/", requireUserOrGuestSession, getCart);
router.post("/add", requireUserOrGuestSession, addToCart);
router.patch("/increase", requireUserOrGuestSession, increaseQty);
router.patch("/decrease", requireUserOrGuestSession, decreaseQty);
router.delete("/remove", requireUserOrGuestSession, removeItem);
router.delete("/clear", requireUserOrGuestSession, clearCart);

export default router;

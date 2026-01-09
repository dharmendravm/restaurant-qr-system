import express from "express";
import { createOrder, getOrderById } from "../controllers/order.controller.js";
import checkGuestOrUser from "../middlewares/checkGuestOrUser.js";

const router = express.Router();
// router.use(checkGuestOrUser);
router.post("/place", createOrder);
router.get("/:orderId", getOrderById);

export default router;

import express from "express";
import {
//   cancelOrder,
  createOrder,
  getOrderById,
} from "../controllers/order.controller.js";
import checkGuestOrUser from "../middlewares/checkGuestOrUser.js";

const router = express.Router();
router.use(checkGuestOrUser);
router.post("/place", createOrder);
router.get("/:orderId", getOrderById);

// router.patch("/:orderId/cancel", cancelOrder);

export default router;

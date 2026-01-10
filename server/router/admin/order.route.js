import express from "express";
import {
  cancelOrder,
  getOrderDetailsById,
  getOrdersForDashboard,
  updateOrderStatus,
  updatePaymentStatusOnCash,
} from "../../controllers/admin/order.controller.js";

const router = express.Router();

router.get("/all", getOrdersForDashboard);
router.get("/:id", getOrderDetailsById);

router.patch("/:id/status", updateOrderStatus);
router.patch("/:id/payment", updatePaymentStatusOnCash);
router.patch("/:id/cancel", cancelOrder);

export default router;

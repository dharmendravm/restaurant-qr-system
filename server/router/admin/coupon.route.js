import express from "express";
import { registerCoupon } from "../../controllers/admin/coupon.controller.js";

const router = express.Router();

router.post("/create", registerCoupon);

export default router;

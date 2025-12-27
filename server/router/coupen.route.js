import express from "express";
import { applyCoupon } from "../controllers/coupon.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/apply", verifyToken, applyCoupon)

export default router;

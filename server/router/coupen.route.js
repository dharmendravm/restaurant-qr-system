import express from "express";
import { createCoupon } from "../controllers/coupen.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = express.Router();

router.post("/create", verifyToken, checkRole(["admin"]), createCoupon);

export default router;

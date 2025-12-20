import express from "express";
import { createCoupon } from "../controllers/coupen.controller.js";

const router = express.Router();

router.post("/create", createCoupon);

export default router;

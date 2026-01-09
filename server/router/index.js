import express from "express";

import authRoutes from "./auth.route.js";
import userRoute from "./user.route.js";
import sessionRoute from "./session.route.js";
import tableRoute from "./table.route.js";
import menuRoutes from "./menu.route.js";
import orderRoute from "./order.route.js";
import cartRoute from "./cart.route.js";
import couponRoute from "./coupen.route.js";

import adminRoutes from "./admin/index.js";

const router = express.Router();

// ADMIN
router.use("/admin", adminRoutes);

// MAIN ROUTES
router.use("/auth", authRoutes);
router.use("/session", sessionRoute);
router.use("/tables", tableRoute);
router.use("/menu", menuRoutes);
router.use("/user", userRoute);
router.use("/orders", orderRoute);
router.use("/cart", cartRoute);
router.use("/coupons", couponRoute);

export default router;

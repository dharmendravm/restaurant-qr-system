import express from "express";

import authRoutes from "./auth.route.js";
import ouathRoutes from '../router/oauth.route.js'
import userRoute from "./user.route.js";
import sessionRoute from "./session.route.js";
import tableRoute from "./table.route.js";
import menuRoutes from "./menu.route.js";
import orderRoute from "./order.route.js";
import cartRoute from "./cart.route.js";
import couponRoute from "./coupen.route.js";

import { verifyToken } from "../middlewares/verifyToken.js";
import { checkRole } from "../middlewares/checkRole.js";
import adminMenuRoutes from "./admin/menu.route.js";
import adminCouponRoutes from "./admin/coupon.route.js";
import adminUserRoutes from "./admin/user.route.js";
import adminTableRoutes from "./admin/table.route.js";
import adminOrderRoute from "./admin/order.route.js";

const router = express.Router();

// MAIN ROUTES
router.use("/auth", authRoutes);
router.use("/oauth", ouathRoutes)

router.use("/session", sessionRoute);
router.use("/tables", tableRoute);
router.use("/menu", menuRoutes);
router.use("/user", userRoute);
router.use("/orders", orderRoute);
router.use("/cart", cartRoute);
router.use("/coupons", couponRoute);

// ADMIN
router.use(verifyToken);
router.use(checkRole(["admin"]));

router.use("/users", adminUserRoutes);
router.use("/coupons", adminCouponRoutes);
router.use("/orders", adminOrderRoute);
router.use("/menu", adminMenuRoutes);
router.use("/tables", adminTableRoutes);
export default router;
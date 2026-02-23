import express from "express";

import authRoutes from "./auth.route.js";
import oauthRoutes from "../router/oauth.route.js";
import userRoute from "./user.route.js";
import sessionRoute from "./session.route.js";
import tableRoute from "./table.route.js";
import menuRoutes from "./menu.route.js";
import orderRoute from "./order.route.js";
import cartRoute from "./cart.route.js";
import couponRoute from "./coupon.route.js";

import { verifyToken } from "../middlewares/verifyToken.js";
import AppError from "../utils/appError.js";
import adminMenuRoutes from "./admin/menu.route.js";
import adminCouponRoutes from "./admin/coupon.route.js";
import adminUserRoutes from "./admin/user.route.js";
import adminTableRoutes from "./admin/table.route.js";
import adminOrderRoute from "./admin/order.route.js";

const router = express.Router();

const checkAdminOrViewerReadOnly = (req, _res, next) => {
  const role = req.user?.role;

  if (role === "admin") {
    return next();
  }

  if (role === "viewer" && req.method === "GET") {
    return next();
  }

  return next(
    new AppError(
      role === "viewer"
        ? "Viewer has read-only access."
        : "Access denied.",
      403,
    ),
  );
};

// MAIN ROUTES
router.use("/auth", authRoutes);
router.use("/oauth", oauthRoutes);

router.use("/session", sessionRoute);
router.use("/tables", tableRoute);
router.use("/menu", menuRoutes);
router.use("/user", userRoute);
router.use("/orders", orderRoute);
router.use("/cart", cartRoute);
router.use("/coupons", couponRoute);

// ADMIN
router.use("/admin", verifyToken, checkAdminOrViewerReadOnly);

router.use("/admin/users", adminUserRoutes);
router.use("/admin/coupons", adminCouponRoutes);
router.use("/admin/orders", adminOrderRoute);
router.use("/admin/menu", adminMenuRoutes);
router.use("/admin/tables", adminTableRoutes);
export default router;

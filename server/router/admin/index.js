import express from "express";

import { verifyToken } from "../../middlewares/verifyToken.js";
import { checkRole } from "../../middlewares/checkRole.js";

import adminMenuRoutes from "./table.route.js";
import adminCouponRoutes from "./coupon.route.js";
import adminUserRoutes from "./user.route.js";
import adminTableRoutes from "./table.route.js";

const router = express.Router();

router.use(verifyToken);
router.use(checkRole(["admin"]));

router.use("/users", adminUserRoutes);
router.use("/coupons", adminCouponRoutes);
router.use("/menu", adminMenuRoutes);
router.use("/tables", adminTableRoutes);

export default router;

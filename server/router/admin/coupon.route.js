import express from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { checkRole } from '../../middlewares/checkRole.js';
import { registerCoupon } from '../../controllers/admin/coupon.controller.js';

const router = express.Router();

router.post("/create", verifyToken, checkRole(["admin"]), registerCoupon);

export default router;
import express from "express";
import { getAllCouponsWithCalculation } from "../controllers/coupon.controller.js";
import checkGuestOrUser from "../middlewares/checkGuestOrUser.js";
import requireUserOrGuestSession from "../middlewares/requireUserOrGuestSession.js";

const router = express.Router();

router.use(checkGuestOrUser)
router.get("/preview", requireUserOrGuestSession, getAllCouponsWithCalculation);

export default router;
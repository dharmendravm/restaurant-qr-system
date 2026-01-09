import express from "express";
import { login, refresh, register } from "../controllers/auth.controller.js";
import { forgotPassword, resetPassword } from "../controllers/recovery.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.post("/refresh", refresh);

// router.post("/convert",  /* Null */);

export default router;

import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
    changePassword,
  deactivateUser,
  getUserByToken,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// getTotalUsers
router.use(verifyToken);
router.get("/get", getUserByToken);
router.post("/change-password", changePassword);
router.patch("/update-user", updateUser);
router.patch("/diactivate-account", deactivateUser);
router.put("/update-profile", updateUser)

export default router;

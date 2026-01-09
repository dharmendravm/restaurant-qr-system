import express from "express";
import { getTotalUsers } from "../../controllers/admin/user.controller.js";

const router = express.Router();

router.get("/all", getTotalUsers);

export default router;

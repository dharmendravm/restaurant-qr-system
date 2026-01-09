import express from "express";
import upload from "../../middlewares/upload.js";
import { createMenu } from "../../controllers/admin/menu.controller.js";

const router = express.Router();

router.post("/create", upload.single("image"), createMenu);

export default router;

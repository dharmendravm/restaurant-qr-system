import express from "express";
import {
  getAllTables,
  registerTable,
  toggleTableStatus,
} from "../../controllers/admin/table.controller.js";

const router = express.Router();

router.post("/create", registerTable);
router.get("/all", getAllTables);
router.patch("/:id/toggle", toggleTableStatus);

export default router;

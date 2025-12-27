
import express from 'express';
import { getAllTables, registerTable } from '../../controllers/admin/table.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { checkRole } from '../../middlewares/checkRole.js';

const router = express.Router();

router.post('/create' ,verifyToken, checkRole(["admin"]), registerTable);
router.get('/all', getAllTables);
// verifyToken, checkRole(["admin"])
export default router;
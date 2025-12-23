
import express from 'express';
import { registerTable } from '../controllers/table.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { checkRole } from '../middlewares/checkRole.js';

const router = express.Router();

router.post('/tables', verifyToken, checkRole(["admin"]), registerTable);

export default router;

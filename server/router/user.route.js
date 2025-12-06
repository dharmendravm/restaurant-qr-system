import express from 'express';
import { getTotalUsers } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { checkRole } from '../middlewares/checkRole.js';

const router = express.Router();

// getTotalUsers
router.post('/admin/all',verifyToken, checkRole(["admin"]), getTotalUsers);

logController("user route console printed")

export default router;
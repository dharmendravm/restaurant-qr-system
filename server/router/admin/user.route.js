import express from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { checkRole } from '../../middlewares/checkRole.js';
import { getTotalUsers } from '../../controllers/admin/user.controller.js';

const router = express.Router();

router.post('/all', verifyToken, checkRole(["admin"]), getTotalUsers);

export default router;
import express from 'express';
import upload from '../middlewares/upload.js';
import { checkRole } from '../middlewares/checkRole.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { createMenu } from '../controllers/menu.controller.js';
import { getTotalUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/users/all',verifyToken, checkRole(["admin"]), getTotalUsers);
router.post( '/menu', verifyToken, checkRole(["admin"]), upload.single('image'), createMenu );


export default router;
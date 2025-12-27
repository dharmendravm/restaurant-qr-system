import express from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { checkRole } from '../../middlewares/checkRole.js';
import upload from '../../middlewares/upload.js'
import { createMenu } from '../../controllers/admin/menu.controller.js';

const router = express.Router();

router.post( '/create', verifyToken, checkRole(["admin"]), upload.single('image'), createMenu );


export default router;
import express from 'express';
// import { verifyToken } from '../middlewares/verifyToken.js';
// import { checkRole } from '../middlewares/checkRole.js';
import { createMenu, getAllMenuItems } from '../controllers/menu.controller.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/menu', getAllMenuItems);
router.post('/menu' , upload.single('image') , createMenu)


export default router;


//  verifyToken, checkRole(["admin"]),
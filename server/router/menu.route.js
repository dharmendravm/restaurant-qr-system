import express from 'express';
import upload from '../middlewares/upload.js';
import { getAllMenuItems } from '../controllers/menu.controller.js';

const router = express.Router();

router.get('/menu', getAllMenuItems);

export default router;
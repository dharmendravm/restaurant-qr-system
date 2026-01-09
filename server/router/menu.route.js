import express from 'express';
import { getAllMenuItems } from '../controllers/menu.controller.js';

const router = express.Router();

router.get('/', getAllMenuItems);

export default router;
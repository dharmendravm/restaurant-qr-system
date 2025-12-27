
import express from 'express';
import { getTableBySlug } from '../controllers/table.controller.js';

const router = express.Router();

router.get('/tables/:slug' , getTableBySlug);

export default router;
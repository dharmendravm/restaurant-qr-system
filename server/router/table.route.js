
import express from 'express';
import { registerTable } from '../controllers/table.controller.js';

const router = express.Router();

router.post('/tabels', registerTable);

logController("tableRoute console printed")
export default router;

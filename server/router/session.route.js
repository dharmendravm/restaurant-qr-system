import express from 'express';
import { session } from '../controllers/session.controller.js';

const router = express.Router() ;

router.post('/', session)

export default router
import express from 'express';
import { login, register } from '../controllers/auth.controller.js'
import { forgotPassword, resetPassword } from '../controllers/recovery.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login',login);


router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

export default router;
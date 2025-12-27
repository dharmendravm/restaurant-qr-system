import express from 'express';
import { getOrder } from '../controllers/order.controller.js';
import checkGuestOrUser from '../middlewares/checkGuestOrUser.js'

const router = express.Router();

router.get('/get', checkGuestOrUser, getOrder)

export default router;
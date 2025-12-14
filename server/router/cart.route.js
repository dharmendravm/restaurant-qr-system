import express from 'express' ;
import { addToCart } from '../controllers/cart.controller.js';

const router = express.Router() ;


router.post('/addtocart', addToCart)

export default router
import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { checkRole } from '../middlewares/checkRole.js';

const router = express.Router();

router.get(
    "/menu", 
    verifyToken,
    checkRole(["customer", "admin"]),
    (req, res) => {
        res.status(200).send("hello from verifyToken/menu")
    }
)

export default router;

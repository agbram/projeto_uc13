import { Router } from "express";
import { OrderController } from '../controllers/order.js';

const router = Router();

router.post('/', OrderController.store);

export default router;
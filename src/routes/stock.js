import { Router } from "express";
import { StockController } from '../controllers/stock.js';

const router = Router();

router.post('/', StockController.store);

export default router;
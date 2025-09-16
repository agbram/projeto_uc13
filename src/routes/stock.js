import { Router } from "express";
import { StockController } from '../controllers/stock.js';

const router = Router();

// Criar um novo stock POST /stocks
router.post('/', StockController.store);

// Listar todos os stocks GET /stocks
router.get('/', StockController.index);

export default router;
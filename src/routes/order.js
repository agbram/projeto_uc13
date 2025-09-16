import { Router } from "express";
import { OrderController } from '../controllers/order.js';

const router = Router();

// Criar um novo pedido POST /orders
router.post('/', OrderController.store);

// Listar todos os pedidos GET /orders
router.get('/', OrderController.index);

export default router;
// Bruno
import { Router } from "express";
import { PaymentController } from "../controllers/payment.js";

const router = Router();

// Criar um novo pagamento POST /payments
router.post("/", PaymentController.store);

// Listar todos os pagamentos GET /payments
router.get("/", PaymentController.index);

export default router;
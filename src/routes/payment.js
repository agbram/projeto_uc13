// Bruno
import { Router } from "express";
import { PaymentController } from "../controllers/payment.js";

const router = Router();

// Criar um novo pagamento POST /payments
router.post("/", PaymentController.store);

// Listar todos os pagamentos GET /payments
router.get("/", PaymentController.index);

//id
router.get("/:id",PaymentController.show)

//update
router.get("/:id",PaymentController.put)

//delete
router.delete("/:id",PaymentController.del)

export default router;
import { Router } from "express";
import { PaymentController } from "../controllers/payment.js";

const router = Router();

router.post("/", PaymentController.store);

export default router;
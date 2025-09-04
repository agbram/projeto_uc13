import { Router } from "express";
import { PurchaseController } from "../controllers/purchase.js";

const router = Router();

router.post("/", PurchaseController.store);

export default router;
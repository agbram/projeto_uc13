import { Router } from "express";
import { PurchaseController } from "../controllers/purchase.js";

const router = Router();

router.post("/", PurchaseController.store);

router.get("/",PurchaseController.index);

router.get("/:id",PurchaseController.show);

router.delete("/:id",PurchaseController.del);

export default router;
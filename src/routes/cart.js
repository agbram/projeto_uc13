import { Router } from "express";
import { CartController } from "../controllers/cart.js";

const router = Router();

router.post("/", CartController.store);
router.get("/", CartController.index);

export default router;
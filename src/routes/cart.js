import { Router } from "express";
import { CartController } from "../controllers/cart.js";

const router = Router();

router.post("/", CartController.store);

export default router;
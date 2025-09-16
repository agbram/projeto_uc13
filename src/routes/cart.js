import { Router } from "express";
import { CartController } from "../controllers/cart.js";

const router = Router();

// Criar um novo carrinho POST /carts
router.post("/", CartController.store);

// Listar todos os carrinhos GET /carts
router.get("/", CartController.index);

export default router;
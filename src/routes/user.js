import { Router } from "express";
import { UserController } from "../controllers/user.js";

const router = Router();

router.post('/', UserController.store);

export default router;
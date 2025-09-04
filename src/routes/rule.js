import { Router } from "express";
import { RuleController } from "../controllers/rule.js";

const router = Router();

router.post("/", RuleController.store);

export default router;
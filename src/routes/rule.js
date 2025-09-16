import { Router } from "express";
import { RuleController } from "../controllers/rule.js";

const router = Router();

router.post("/", RuleController.store);
router.get("/", RuleController.index);

export default router;
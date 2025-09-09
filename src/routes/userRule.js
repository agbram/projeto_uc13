import { Router } from "express";
import { UserRuleController } from "../controllers/userRule.js";

const router = Router();

router.post('/', UserRuleController.store);

export default router;
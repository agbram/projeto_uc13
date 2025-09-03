import { Router } from "express";
import { RuleController } from "../controllers/rule";

const route = Router();

route.post('/', RuleController.store);

export default route;
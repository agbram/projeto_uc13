// Stock routes
import { Router } from "express";
import {StockController} from '../controllers/stock'

const route = Router();

route.post('/', StockController.store);

export default route;
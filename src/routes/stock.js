// Stock routes
import { Router } from "express";
import {StockController} from '../controllers/stock.js'

const route = Router();

route.post('/', StockController.store);

export default route;
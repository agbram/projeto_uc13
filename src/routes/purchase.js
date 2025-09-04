import { Router } from "express";
    import {PurchaseController} from "../controllers/purchase.js"

    const route = Router();

    route.post("/", PurchaseController.store)
    
    export default route;
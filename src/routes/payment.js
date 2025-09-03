    import { Router } from "express";
    import {PaymentController} from "../controllers/payment"

    const route = Router();

    route.post("/", PaymentController.store)

    export default route;
import { Router } from `express`;
    import {PurchasesController} from "../controllers/purchases.js"

    const route = Router();

    route.post(`/`, PurchasesController.store)
    
    export default route;
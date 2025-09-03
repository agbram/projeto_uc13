import { Router } from `express`;
    import {PurchasesController} from "../controllers/purchases"

    const route = Router();

    route.post(`/`, PurchasesController.store)
    
    export default route;
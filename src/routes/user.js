    import { Router } from "express";
    import { UserController } from "../controllers/user.js";

    const router = Router();

    router.post('/', UserController.store);
    router.get('/', UserController.index);

    export default router;
    import { Router } from "express";
    import { UserController } from "../controllers/user.js";

    const router = Router();

    router.post('/', UserController.store);
    router.get('/', UserController.index);
    router.get('/:id', UserController.show);
    router.delete('/:id', UserController.del);
    router.put('/:id', UserController.update);

    export default router;
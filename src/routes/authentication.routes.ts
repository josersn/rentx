import { Router } from "express";

import { AuthenticationUserController } from "../modules/account/useCases/authenticationUser/AuthenticationUserController";

const authenticationsRoutes = Router();

const authenticationUserController = new AuthenticationUserController();

authenticationsRoutes.post("/sessions", authenticationUserController.handle)

export { authenticationsRoutes };
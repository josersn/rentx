import { Router } from "express";

import { AuthenticationUserController } from "../../../../modules/account/useCases/authenticationUser/AuthenticationUserController";
import { RefreshTokenController } from "../../../../modules/account/useCases/refreshToken/RefreshTokenController";

const authenticationsRoutes = Router();

const authenticationUserController = new AuthenticationUserController();
const refreshTokenController = new RefreshTokenController()

authenticationsRoutes.post("/sessions", authenticationUserController.handle)
authenticationsRoutes.post("/refresh-token", refreshTokenController.handle)

export { authenticationsRoutes };
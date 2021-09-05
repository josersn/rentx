import { Router } from "express";

import { ResetPasswordUserController } 
from "../../../../modules/account/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgetPasswordMailController } 
from "../../../../modules/account/useCases/sendForgetPasswordMail/SendForgetPasswordMailController";


const passwordRoutes = Router();

const sendForgetPasswordMailController = new SendForgetPasswordMailController()
const resetPasswordUserController = new ResetPasswordUserController()

passwordRoutes.post("/forgot", sendForgetPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
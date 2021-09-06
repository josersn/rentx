import { Router } from "express";
import multer from "multer";

import upload from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateUserController } from "../../../../modules/account/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/account/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ProfileUserController } from "../../../../modules/account/useCases/profileUser/ProfileUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

const uploadAvatar = multer(upload);

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", ensureAuthenticated, profileUserController.handle);
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { usersRoutes };
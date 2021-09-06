import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileUserService } from "./ProfileUserService";

class ProfileUserController {
    async handle(req: Request, res: Response): Promise<Response> {

        const { id } = req.user;

        const service = container.resolve(ProfileUserService);

        const user = await service.execute(id);

        return res.json(user);
    }
}

export { ProfileUserController }
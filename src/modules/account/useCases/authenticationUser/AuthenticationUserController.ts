import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticationUserService } from "./AuthenticationUserService";

class AuthenticationUserController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const service = container.resolve(AuthenticationUserService);

        const authenticationsInfo = await service.execute({ email, password });


        return res.json(authenticationsInfo)
    }
}

export { AuthenticationUserController };
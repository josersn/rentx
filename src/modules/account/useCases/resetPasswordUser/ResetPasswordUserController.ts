import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserService } from "./resetPasswordUserService";

class ResetPasswordUserController {
    async handle(req: Request, res: Response): Promise<Response> {

        const { token } = req.query;
        const { password } = req.body;

        const service = container.resolve(ResetPasswordUserService);

        await service.execute({
            token: String(token),
            password
        });

        return res.send();
    }
}

export { ResetPasswordUserController }
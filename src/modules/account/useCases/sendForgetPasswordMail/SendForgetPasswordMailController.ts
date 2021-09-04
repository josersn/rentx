import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgetPasswordMailService } from "./SendForgetPasswordMailService";

class SendForgetPasswordMailController {
    async handle(req: Request, res: Response): Promise<Response> {

        const { email } = req.body;

        const service = container.resolve(SendForgetPasswordMailService)

        service.execute(email);

        return res.json();
    }

}

export { SendForgetPasswordMailController }
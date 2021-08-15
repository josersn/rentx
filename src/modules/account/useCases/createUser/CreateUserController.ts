import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserService } from "./CreateUserService";

class CreateUserController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { name, username, email, password, driver_license } = req.body;

        const service = container.resolve(CreateUserService);

        await service.execute({ name, username, email, password, driver_license })

        return res.status(201).send();
    }

}

export { CreateUserController };
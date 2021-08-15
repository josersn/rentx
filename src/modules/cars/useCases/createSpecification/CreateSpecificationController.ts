import { Request, Response } from "express";
import { CreateSpecificationService } from "./CreateSpecificationService";
import { container} from "tsyringe";

class CreateSpecificationController {



    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description } = req.body;

        const createSpecificationService = await container.resolve(CreateSpecificationService);

        createSpecificationService.execute({ name, description });

        return res.status(201).send();
    }
}
export { CreateSpecificationController };
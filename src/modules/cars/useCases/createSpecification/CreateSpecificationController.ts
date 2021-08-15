import { Request, Response } from "express";
import { CreateSpecificationService } from "./CreateSpecificationService";
import { container} from "tsyringe";

class CreateSpecificationController {



    handle(req: Request, res: Response): Response {
        const { name, description } = req.body;

        const createSpecificationService = container.resolve(CreateSpecificationService);

        createSpecificationService.execute({ name, description });

        return res.status(201).send();
    }
}
export { CreateSpecificationController };
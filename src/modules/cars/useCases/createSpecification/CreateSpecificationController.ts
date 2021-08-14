import { Request, Response } from "express";
import { CreateSpecificationService } from "./CreateSpecificationService";

class CreateSpecificationController {
    constructor(private createSpecificationService: CreateSpecificationService) { }

    handler(req: Request, res: Response): Response {
        const { name, description } = req.body;
        this.createSpecificationService.execute({ name, description });

        return res.status(201).send();
    }
}
export { CreateSpecificationController };
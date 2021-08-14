import { Request, Response } from "express";
import { CreateCategoryService } from "./CreateCategoryService";



class CreateCategoryController {

    constructor(private createCategoryService: CreateCategoryService) { }

    handle(req: Request, res: Response): Response {
        try {
            const { name, description } = req.body;


            this.createCategoryService.execute({ name, description });

            return res.status(201).send();
        } catch (error) {
            return res.status(201).json(error);
        }
    }
}

export { CreateCategoryController };
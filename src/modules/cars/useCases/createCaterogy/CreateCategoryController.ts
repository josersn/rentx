import { Request, Response } from "express";
import { CreateCategoryService } from "./CreateCategoryService";



class CreateCategoryController {

    constructor(private createCategoryService: CreateCategoryService) { }

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { name, description } = req.body;


            await this.createCategoryService.execute({ name, description });

            return res.status(201).send();
        } catch (error) {
            return res.status(201).json(error);
        }
    }
}

export { CreateCategoryController };
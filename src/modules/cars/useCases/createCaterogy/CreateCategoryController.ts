import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryService } from "./CreateCategoryService";


class CreateCategoryController {

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { name, description } = req.body;

            const createCategoryService = container.resolve(CreateCategoryService);

            await createCategoryService.execute({ name, description });

            return res.status(201).send();
        } catch (error) {
            return res.status(201).json(error);
        }
    }
}

export { CreateCategoryController };
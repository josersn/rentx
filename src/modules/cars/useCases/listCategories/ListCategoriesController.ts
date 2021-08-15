import { Request, Response } from "express";
import { ListCategoriesService } from "../listCategories/ListCategoriesService";
import { container } from "tsyringe";

class ListCategoriesController {

    async handle(req: Request, res: Response): Promise<Response> {

        const listCategoriesService = container.resolve(ListCategoriesService);

        const all = await listCategoriesService.execute();

        return res.json(all);
    }
}

export { ListCategoriesController };
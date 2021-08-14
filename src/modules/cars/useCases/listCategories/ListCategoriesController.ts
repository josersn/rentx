import { Request, Response } from "express";
import { ListCategoriesService } from "../listCategories/ListCategoriesService";

class ListCategoriesController {

    constructor(private listCategoriesService: ListCategoriesService) { }
    
    handle(req: Request, res: Response): Response {
        const all = this.listCategoriesService.execute();

        return res.json(all);
    }
}

export { ListCategoriesController };
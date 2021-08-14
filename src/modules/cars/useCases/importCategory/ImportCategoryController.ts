import { Request, Response } from "express";
import { ImportCategoryService } from "./ImportCategoryService";

class ImportCategoryController {

    constructor(private service: ImportCategoryService) {}

    handle(req: Request, res: Response): Response {
        const { file } = req;

        this.service.execute(file);

        return res.send();
    }
}

export { ImportCategoryController };
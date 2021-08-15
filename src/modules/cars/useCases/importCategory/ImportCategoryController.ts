import { Request, Response } from "express";
import { ImportCategoryService } from "./ImportCategoryService";
import { container } from "tsyringe";

class ImportCategoryController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { file } = req;

        const service = container.resolve(ImportCategoryService);

        await service.execute(file);

        return res.send();
    }
}

export { ImportCategoryController };
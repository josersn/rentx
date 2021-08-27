import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsService } from "./ListAvailableCarsService";

class ListAvailableCarsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { brand, name, category_id } = req.query;

        const service = container.resolve(ListAvailableCarsService);

        const cars = await service.execute({ 
            brand: brand as string,
            name: name as string,
            category_id: category_id as string 
        });

        return res.json(cars);
    }
}

export { ListAvailableCarsController };
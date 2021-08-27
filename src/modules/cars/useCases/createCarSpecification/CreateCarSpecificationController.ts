import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecification } from "./CreateCarSpecificationService";

class CreateCarSpecificationController {
    async handle(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;
        const { specifications_id } = req.body;

        const service = container.resolve(CreateCarSpecification);

        const car = await service.execute({
            car_id: id,
            specifications_id
        });

        return res.json(car);
    }
}

export { CreateCarSpecificationController }
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalService } from "./CreateRentalService";

class CreateRentalController {
    async handle(req: Request, res: Response): Promise<Response> {

        const { car_id, expected_return_date } = req.body;
        const { id } = req.user;

        const service = container.resolve(CreateRentalService);
        
        const rental = await service.execute({
            user_id: id,
            car_id,
            expected_return_date
        });


        return res.status(201).json(rental);
    }
}

export { CreateRentalController }
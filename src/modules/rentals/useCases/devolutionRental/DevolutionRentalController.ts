import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalService } from "./DevolutionRentalService";

class DevolutionRentalController {
    async handle(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;
        const { id: user_id } = req.user;

        const service = container.resolve(DevolutionRentalService);

        const rental = await service.execute({ id, user_id });

        return res.status(200).json(rental);
    }
}

export { DevolutionRentalController }
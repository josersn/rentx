import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserService } from "./ListRentalsByUserService";

class ListRentalsByUserController {
    async handle(req: Request, res: Response): Promise<Response> {

        const { id } = req.user;

        const service = container.resolve(ListRentalsByUserService);

        const rentals = await service.execute(id);

        return res.status(200).json(rentals);
    }
}

export { ListRentalsByUserController }

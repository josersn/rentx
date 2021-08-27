import { inject, injectable } from "tsyringe";

import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListAvailableCarsService {

    constructor(
        @inject("CarsRepository")
        private repository: ICarsRepository
    ) { }

    async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
        const cars = await this.repository.findAvailable(brand, category_id, name)

        return cars;
    }
}

export { ListAvailableCarsService };
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";

import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    name: string,
    description: string,
    daily_rate: number,
    license_plate: string,
    fine_amount: number,
    brand: string,
    category_id: string,
}

// @injectable()
class CreateCarService {

    constructor(
        // @inject("CarsRepository")
        private repository: ICarsRepository
    ) { }

    async execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
    }: IRequest): Promise<Car> {

        const carAlreadyExists = await this.repository.findByLicensePlate(license_plate);

        if(carAlreadyExists) {
            throw new AppError("Cars Already Exists");
        }

        const car = await this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        })

        return car;
    }
}

export { CreateCarService };
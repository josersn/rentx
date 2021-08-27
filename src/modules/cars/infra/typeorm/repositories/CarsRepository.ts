import { getRepository, Repository } from "typeorm";

import { ICreateCarsDTO } from "../../../dtos/ICreateCarsDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({ brand,
        category_id,
        daily_rate,
        license_plate,
        description,
        fine_amount,
        name
    }: ICreateCarsDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            license_plate,
            description,
            fine_amount,
            name
        })

        await this.repository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate })

        return car;
    }
}

export { CarsRepository };
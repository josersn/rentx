import { getRepository, Repository } from "typeorm";

import { ICreateCarsDTO } from "../../../dtos/ICreateCarsDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        brand,
        category_id,
        daily_rate,
        license_plate,
        description,
        fine_amount,
        specifications,
        id,
        name
    }: ICreateCarsDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            license_plate,
            description,
            fine_amount,
            name,
            specifications,
            id
        })

        await this.repository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate })

        return car;
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand })
        }

        if (name) {
            carsQuery.andWhere("c.name = :name", { name })
        }

        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id })
        }

        const cars = await carsQuery.getMany();


        return cars;
    }

    async findById(id: string): Promise<Car> {
        return await this.repository.findOne(id);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id")
            .setParameters({ id })
            .execute()
    }
}

export { CarsRepository };
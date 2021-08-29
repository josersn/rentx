import { ICreateCarsDTO } from "../../dtos/ICreateCarsDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];

    async create({
        name,
        brand,
        description,
        category_id,
        daily_rate,
        fine_amount,
        specifications,
        id,
        license_plate }: ICreateCarsDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,
            id
        });

        this.cars.push(car);

        return car;

    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    }

    async findAvailable(
        brand?: string, category_id?: string, name?: string
    ): Promise<Car[]> {
        const carsAvailable = this.cars
            .filter(car => {
                if (car.available === true ||
                    (category_id && car.category_id === category_id) ||
                    (brand && car.brand === brand) ||
                    (name && car.name === name)) {
                    return car;
                }

                return null;
            });

        return carsAvailable;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find(item => item.id == id);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const carIndex = this.cars.findIndex(car => car.id === id);

        this.cars[carIndex].available = available;

    }

}

export { CarsRepositoryInMemory }
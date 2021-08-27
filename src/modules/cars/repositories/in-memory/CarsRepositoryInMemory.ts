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
        license_plate}: ICreateCarsDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
            
        });

        this.cars.push(car);

        return car;

    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    }

}

export { CarsRepositoryInMemory }
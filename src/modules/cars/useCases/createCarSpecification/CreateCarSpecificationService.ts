import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";

import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecification {

    constructor(
        @inject("CarsRepository")
        private carRepository: ICarsRepository,
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationsRepository
    ) { }

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const car = await this.carRepository.findById(car_id);

        if (!car) {
            throw new AppError("cars does not exists");
        }

        const specifications =
            await this.specificationRepository.findByIds(specifications_id);


        car.specifications = specifications;

        await this.carRepository.create(car);


        return car;

    }
}

export { CreateCarSpecification };
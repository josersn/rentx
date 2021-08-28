import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";



interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalService {

    readonly minHoursToRentalACar: number = 24;

    constructor(
        private rentalsRepository: IRentalsRepository,
        private dateProvider: IDateProvider
    ) { }


    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError("Car is not available");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("User has a rental in progress");
        }

        const compare = this.dateProvider.compareInHours(
                                                this.dateProvider.dateNow(),
                                                expected_return_date)

        if (this.minHoursToRentalACar > compare) {
            throw new AppError("Invalid return time!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        return rental;
    }
}

export { CreateRentalService }
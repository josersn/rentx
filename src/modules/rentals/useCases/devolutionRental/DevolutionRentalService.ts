import { inject, injectable } from "tsyringe"

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";

import { Rental } from "../../infra/typeorm/entities/Rental";

import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { IRentalsRepository } from "../../repositories/IRentalsRepository"

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalService {

    readonly minHoursToReturnACar: number = 24;
    readonly minDaysToReturnACar: number = 1;

    constructor(
        @inject("RentalRepository")
        private rentalRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { };

    async execute({ id, user_id }: IRequest): Promise<Rental> {

        const rental = await this.rentalRepository.findById(id);
        let total = 0;

        if (!rental) {
            throw new AppError("Rental does not exists");
        }

        if (rental.user_id !== user_id) {
            throw new AppError("Rent does not belong to this user");
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            rental.expected_return_date,
            dateNow
        )

        if (daily <= 0) {
            daily = this.minDaysToReturnACar;
        }


        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );

        const car = await this.carsRepository.findById(rental.car_id);

        if (daily > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;

    }
}

export { DevolutionRentalService }
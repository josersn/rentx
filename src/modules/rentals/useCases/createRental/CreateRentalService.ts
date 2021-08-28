import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalService {

    readonly minHoursToRentalACar: number = 24;

    constructor(
        private rentalsRepository: IRentalsRepository
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

        const expectReturnDateFormatted = dayjs(expected_return_date).utc().local().format();
        const dateNowFormatted = dayjs().utc().local().format();

        const compare = dayjs(expectReturnDateFormatted).diff(dateNowFormatted, "hours");

        if(this.minHoursToRentalACar > compare ) {
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
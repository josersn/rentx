import { inject, injectable } from "tsyringe"
import { Rental } from "../../infra/typeorm/entities/Rental"
import { IRentalsRepository } from "../../repositories/IRentalsRepository"

@injectable()
class ListRentalsByUserService {

    constructor(
        @inject("RentalRepository")
        private rentalRepository: IRentalsRepository
    ) { }
    async execute(id: string): Promise<Rental[]> {
        const rentals = await  this.rentalRepository.findByUser(id);


        return rentals;

    }
}

export { ListRentalsByUserService }
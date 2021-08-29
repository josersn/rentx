import { getRepository, Repository } from "typeorm";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where: {
                car_id,
                end_date: null
            }
        });
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where: {
                user_id,
                end_date: null
            }
        });
    }

    async create({
        car_id,
        expected_return_date,
        user_id,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
            id,
            end_date,
            total,
        });

        await this.repository.save(rental);

        return rental;
    }

    async findById(id: string): Promise<Rental> {
        return this.repository.findOne(id);
    }

    findByUser(user_id: string): Promise<Rental[]> {
        return this.repository.find({ 
            where: {
                user_id
            },
            relations: ["car"]
         });
    }

}

export { RentalRepository };
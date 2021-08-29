import dayjs from "dayjs";

import { AppError } from "../../../../shared/errors/AppError";

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalService } from "./CreateRentalService"
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalService: CreateRentalService;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {

    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalService = new CreateRentalService(rentalsRepositoryInMemory, dateProvider, carsRepositoryInMemory);
    })

    it("Should be able to create a new rental", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "test car name",
            description: "description car test",
            license_plate: "teste",
            fine_amount: 120,
            brand: "Audi",
            daily_rate: 12,
            category_id: "123"
        });

        const rental = await createRentalService.execute({
            user_id: "123",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });


        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental with a exist open rental to the same user", async () => {
        expect(async () => {
            const rental = await createRentalService.execute({
                user_id: "123",
                car_id: "1",
                expected_return_date: dayAdd24Hours
            });

            const rental2 = await createRentalService.execute({
                user_id: "123",
                car_id: "12",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental with a exist open rental to the same car", async () => {
        expect(async () => {
            const rental = await createRentalService.execute({
                user_id: "123",
                car_id: "18",
                expected_return_date: dayAdd24Hours
            });

            const rental2 = await createRentalService.execute({
                user_id: "1234",
                car_id: "18",
                expected_return_date: dayAdd24Hours
            });

        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental with invalid return time ", async () => {
        expect(async () => {
            const rental = await createRentalService.execute({
                user_id: "123",
                car_id: "18",
                expected_return_date: dayjs().toDate(),
            });

        }).rejects.toBeInstanceOf(AppError);
    });
})
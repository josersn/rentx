import dayjs from "dayjs";

import { AppError } from "../../../../shared/errors/AppError";

import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalService } from "./CreateRentalService"

let createRentalService: CreateRentalService;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {

    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalService = new CreateRentalService(rentalsRepositoryInMemory);
    })

    it("Should be able to create a new rental", async () => {

        const rental = await createRentalService.execute({
            user_id: "123",
            car_id: "1",
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
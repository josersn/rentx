import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarService } from "./CreateCarService"

let createCarService: CreateCarService;
let carsRepository: CarsRepositoryInMemory;


describe("Create Car", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory()
        createCarService = new CreateCarService(carsRepository);
    })

    it("Should be able to create a car", async () => {
        const car = await createCarService.execute({
            name: "Car Teste",
            description: "Description Test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "rentx",
            category_id: "category"
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car white exists lincen plate", async () => {
        expect(async () => {
            await createCarService.execute({
                name: "Car Teste",
                description: "Description Test",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "rentx",
                category_id: "category"
            });

            await createCarService.execute({
                name: "Car Teste",
                description: "Description Test",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "rentx",
                category_id: "category"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to create a car with available true by default", async () => {
        const car = await createCarService.execute({
            name: "Car Teste",
            description: "Description Test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "rentx",
            category_id: "category"
        });


        expect(car.available).toBe(true);
    });
})
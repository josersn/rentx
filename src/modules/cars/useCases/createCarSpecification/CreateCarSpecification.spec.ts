import { AppError } from "../../../../shared/errors/AppError";

import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecification } from "./CreateCarSpecificationService"

let carRepository: CarsRepositoryInMemory;
let createCarSpecification: CreateCarSpecification;
let specificationRepository: SpecificationsRepositoryInMemory;

describe("Create Specification to car", () => {

    beforeEach(() => {
        carRepository = new CarsRepositoryInMemory();
        specificationRepository = new SpecificationsRepositoryInMemory()
        createCarSpecification = new CreateCarSpecification(carRepository, specificationRepository);
    })

    it("Should be able to create a new specification to  the car", async () => {

        const car = await carRepository.create({
            name: "Car Teste",
            description: "Description Test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "rentx",
            category_id: "category"
        });

        const specification = await specificationRepository.create({
            description: "test description",
            name: "test name"
        })

        const carUpdated = await createCarSpecification.execute({
            car_id: car.id, specifications_id: [specification.id]
        });

        expect(carUpdated).toHaveProperty("specifications");
        expect(carUpdated.specifications.length).toBe(1);
    })

    it("Should not be able to create a new specification to with a nonexist car", async () => {

        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"]
            await createCarSpecification.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    })
})
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
        await createCarService.execute({
            name: "Car Teste",
            description: "Description Test",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "rentx",
            category_id: "category"
        });
    })
})
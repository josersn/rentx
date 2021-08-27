import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsService } from "./ListAvailableCarsService"

let listCarsService: ListAvailableCarsService;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => { 
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsService = new ListAvailableCarsService(carsRepositoryInMemory);
    })

    it("Should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            "name": "car1",
            "description": "A beautiful car1",
            "daily_rate": 110,
            "license_plate": "DEF-8080",
            "fine_amount": 170,
            "brand": "Audi",
            "category_id": "20324ebf-6c8b-4832-849a-3ae18411007f"
        })

        const cars = await listCarsService.execute({});

        expect(cars).toEqual([car]);
    })

    it("Should be able to bale list all cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "car1",
            "description": "A beautiful car1",
            "daily_rate": 110,
            "license_plate": "DEF-8080",
            "fine_amount": 170,
            "brand": "teste brand",
            "category_id": "20324ebf-6c8b-4832-849a-3ae18411007f"
        })

        const cars = await listCarsService.execute({
            brand: "teste brand"
        });

        expect(cars).toEqual([car]);
    })


    it("Should be able to bale list all cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "carro",
            "description": "A beautiful car1",
            "daily_rate": 110,
            "license_plate": "DEF-8080",
            "fine_amount": 170,
            "brand": "teste brand",
            "category_id": "20324ebf-6c8b-4832-849a-3ae18411007f"
        })

        const cars = await listCarsService.execute({
            name: "carro"
        });

        expect(cars).toEqual([car]);
    })

    it("Should be able to bale list all cars by category id", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "carro",
            "description": "A beautiful car1",
            "daily_rate": 110,
            "license_plate": "DEF-8080",
            "fine_amount": 170,
            "brand": "teste brand",
            "category_id": "category_teste"
        })

        const cars = await listCarsService.execute({
            category_id: "category_teste"
        });

        expect(cars).toEqual([car]);
    })
})
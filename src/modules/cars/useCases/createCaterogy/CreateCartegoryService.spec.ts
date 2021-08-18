import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoriesInMemory } from "../../repositories/in-memory/CategoriesRepositoriesInMemory";
import { CreateCategoryService } from "./CreateCategoryService"

let createCreateCategoryService: CreateCategoryService;
let categoriesRepositoriesInMemory: CategoriesRepositoriesInMemory;

describe("Create Category", () => {

    beforeAll(() => {
        categoriesRepositoriesInMemory = new CategoriesRepositoriesInMemory();
        createCreateCategoryService = new CreateCategoryService(categoriesRepositoriesInMemory);
    })

    it("Should be able to create a new category", async () => {

        const category = {
            name: "Category test",
            description: "Category Description Test"
        }

        await createCreateCategoryService.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoriesInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");

    })

    it("Should not be able to create a new category with same name", async () => {

        expect(async () => {
            const category = {
                name: "Category test",
                description: "Category Description Test"
            }

            await createCreateCategoryService.execute({
                name: category.name,
                description: category.description
            });

            await createCreateCategoryService.execute({
                name: category.name,
                description: category.description
            })
        }).rejects.toBeInstanceOf(AppError)



    })
})
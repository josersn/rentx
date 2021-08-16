import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryService {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppError("Category Already Exists!");
        }

        this.categoriesRepository.create({ name, description });
    }
}


export { CreateCategoryService };

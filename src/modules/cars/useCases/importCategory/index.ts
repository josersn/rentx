import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryService } from "./ImportCategoryService";

// const repository = CategoriesRepository.getInstance();
const repository = null;

const service = new ImportCategoryService(repository);

const importCaterogyController = new ImportCategoryController(service);

export { importCaterogyController };
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesService } from "./ListCategoriesService";

const repository = CategoriesRepository.getInstance();

const service = new ListCategoriesService(repository);

const listCategoriesController = new ListCategoriesController(service);

export { listCategoriesController };
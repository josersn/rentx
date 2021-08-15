import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesService } from "./ListCategoriesService";


export default (): ListCategoriesController => {
    const repository = new CategoriesRepository();

    const service = new ListCategoriesService(repository);

    const listCategoriesController = new ListCategoriesController(service);

    return listCategoriesController;
}
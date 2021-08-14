import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationService } from "./CreateSpecificationService";

const repository = SpecificationsRepository.getInstance();

const service = new CreateSpecificationService(repository);

const createSpecificationController = new CreateSpecificationController(service);

export { createSpecificationController };
import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string,
    description: string,
}

@injectable()
class CreateSpecificationService {

    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationsRepository) { }

    execute({ name, description }: IRequest): void {

        const specificationAlreadyExists = this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Specification Already Exists!");
        }

        this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationService };
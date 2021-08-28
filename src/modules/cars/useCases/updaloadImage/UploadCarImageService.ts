import { inject, injectable } from "tsyringe"
import { ICarsImagesRepository } from "../../repositories/ICarImagesRepository";

interface IRequest {
    car_id: string;
    images_name: string[]
}

@injectable()
class UploadCarImageService {

    constructor(
        @inject("CarsImagesRepository")
        private carImagesRepository: ICarsImagesRepository
    ) { }

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carImagesRepository.create(car_id, image);
        })
    }
}

export { UploadCarImageService }
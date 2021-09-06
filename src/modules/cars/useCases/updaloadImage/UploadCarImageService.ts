import { inject, injectable } from "tsyringe"
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { ICarsImagesRepository } from "../../repositories/ICarImagesRepository";

interface IRequest {
    car_id: string;
    images_name: string[]
}

@injectable()
class UploadCarImageService {

    constructor(
        @inject("CarsImagesRepository")
        private carImagesRepository: ICarsImagesRepository,
        @inject("StorageProvider")
        private storage: IStorageProvider
    ) { }

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carImagesRepository.create(car_id, image);
            await this.storage.save(image, "cars");
        })
    }
}

export { UploadCarImageService }
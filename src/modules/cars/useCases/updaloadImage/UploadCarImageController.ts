import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageService } from "./UploadCarImageService";

interface IFiles {
    filename: string;
}

class UploadCarImageController {
    async handle(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;
        const images = req.files as IFiles[];

        const service = container.resolve(UploadCarImageService);

        const images_name = images.map(item => item.filename);

        await service.execute({
            car_id: id,
            images_name
        });

        return res.status(201).send();
    }
}

export { UploadCarImageController }
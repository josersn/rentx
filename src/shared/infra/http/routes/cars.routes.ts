import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";

import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/updaloadImage/UploadCarImageController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const upload = multer(uploadConfig);

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecifications = new CreateCarSpecificationController()
const uploadCarsImagesController = new UploadCarImageController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post("/specifications/:id", createCarSpecifications.handle);
carsRoutes.post("/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("images"),
    uploadCarsImagesController.handle);

export { carsRoutes };
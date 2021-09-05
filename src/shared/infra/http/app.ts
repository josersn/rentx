import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swagger from "swagger-ui-express";

import createConnetrion from "../typeorm";
import "../../container";

import swaggerFile from "../../../swagger.json"
import { router } from "./routes";
import { AppError } from "../../errors/AppError";

createConnetrion();
const app = express();

app.use(express.json());
app.use("/api-docs", swagger.serve, swagger.setup(swaggerFile))
app.use(router);

app.use(
    (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                message: err.message
            })
        }

        return res.status(500).json({
            status: "error",
            message: `Internal Server Error - ${err.message}`
        })
    }
)


export { app };
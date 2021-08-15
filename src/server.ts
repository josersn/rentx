import express from "express";
import swagger from "swagger-ui-express";
import swaggerFile from "./swagger.json"
import { router } from "./routes";

import "./database"

const app = express();

app.use(express.json());
app.use("/api-docs", swagger.serve, swagger.setup(swaggerFile))
app.use(router);


app.listen("8080", () => console.log("Server is running!"));
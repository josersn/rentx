import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

import { UsersRepository } from "../modules/account/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new Error("Token Missing");
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, '990eb5a8c4047f66fc26b0fc6a60819f') as IPayload;

        const userReposioty = new UsersRepository();

        const user = await userReposioty.findById(user_id);

        if (!user) {
            throw new Error("User does not exists!");
        }

        return next();

    } catch (e) {
        throw new Error("Invalid token!");
    }
}
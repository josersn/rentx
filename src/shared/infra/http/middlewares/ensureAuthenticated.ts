import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import auth from "../../../../config/auth";

import { UsersRepository } from "../../../../modules/account/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../../../modules/account/infra/typeorm/repositories/UsersTokensRepository";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;
    const userTokenRepository = new UsersTokensRepository();

    if (!authHeader) {
        throw new AppError("Token Missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;


        const user = await userTokenRepository.findByUserIdAndRefreshToken(user_id, token);

        if (!user) {
            throw new AppError("User does not exists!", 401);
        }

        req.user = {
            id: user_id
        }

        next();

    } catch (e) {
        throw new AppError("Invalid token!", 401);
    }
}
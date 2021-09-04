import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenService } from "./refreshTokenService";

class RefreshTokenController {
    async handle(req: Request, res: Response): Promise<Response> {
        const token = req.body.token ||
            req.headers["x-access-token"] ||
            req.query.token;

        const service = container.resolve(RefreshTokenService);

        const refresh_token = await service.execute(token);

        return res.json(refresh_token);
    }
}

export { RefreshTokenController };
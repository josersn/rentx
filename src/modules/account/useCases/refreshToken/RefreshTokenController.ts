import { Request, Response } from "express";

class RefreshTokenController {
    async handle(req: Request, res: Response): Promise<Response> { 
        return res.send();
    }
}

export { RefreshTokenController };
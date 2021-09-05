import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";

import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";
import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
    sub: string;
    email: string,
}

interface ITokenResponse {
    token: string,
    refresh_token: string;
}

@injectable()
class RefreshTokenService {

    constructor(
        @inject("UsersTokensRepository")
        private userTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute(token: string): Promise<ITokenResponse> {
        const { email, sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;


        const userToken = await this.userTokenRepository.findByUserIdAndRefreshToken(user_id, token);

        if (!userToken) {
            throw new AppError("Refresh token does not exists!");
        }

        await this.userTokenRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token
        });

        const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days);

        this.userTokenRepository.create({
            user_id,
            expires_date,
            refresh_token
        });

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token
        });

        return {
            token: newToken,
            refresh_token
        };

    }
}
export { RefreshTokenService };
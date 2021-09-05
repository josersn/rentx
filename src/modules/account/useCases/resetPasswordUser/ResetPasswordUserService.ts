import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

import { AppError } from "../../../../shared/errors/AppError";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserService {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) { }

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokenRepository.findByRefreshToken(token);
        
        if (!userToken) {
            throw new AppError("Use token does not exists");
        }
        
        if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
            throw new AppError("Token expired");
        }
        
        const user = await this.userRepository.findById(userToken.user_id);
        
        user.password = await hash(password, 8);
        
        await this.userRepository.create(user);
        
        await this.usersTokenRepository.deleteById(userToken.id);
        
    }
}


export { ResetPasswordUserService };
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

@injectable()
class SendForgetPasswordMailService {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private emailProvider: IMailProvider
    ) { }

    async execute(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User does not exists");
        }

        const token = uuidV4();

        const expires_date = this.dateProvider.addHours(3);

        await this.usersTokenRepository.create({
            refresh_token: token,
            expires_date: expires_date,
            user_id: user.id
        });

        await this.emailProvider.sendEmail(user.email, "Recuperação de senha", `O link para o reset é ${token}`)


    }
}
export { SendForgetPasswordMailService };
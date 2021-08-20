import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
    email: string,
    password: string,
}

interface IResponse {
    user: {
        name: string, 
        email: string
    },
    token: string
}

@injectable()
class AuthenticationUserService {

    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.repository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or Passoword incorrect!");
        }

        const passwordMacth = await compare(password, user.password);

        if (!passwordMacth) {
            throw new AppError("Email or Passowr incorrect!");
        }

        const token = sign({}, "990eb5a8c4047f66fc26b0fc6a60819f", {
            subject: user.id,
            expiresIn: "1d"
        });


        return {
            user, 
            token
        }
    }
}

export { AuthenticationUserService };
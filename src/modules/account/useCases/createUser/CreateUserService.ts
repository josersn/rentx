import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcrypt";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserService {

    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository
    ) { }

    async execute({ name, username, password, email, driver_license }: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.repository.findByEmail(email);
        
        if (userAlreadyExists) {
            throw new AppError("User Already Exists");
        }

        const passwordHash = await hash(password, 8);

        await this.repository.create({
            name,
            username,
            password: passwordHash,
            email,
            driver_license
        })
    }

}

export { CreateUserService };
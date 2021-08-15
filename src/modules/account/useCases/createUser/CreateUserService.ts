import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserService {

    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository
    ) { }

    async execute({ name, username, password, email, driver_license }: ICreateUserDTO): Promise<void> {
        await this.repository.create({
            name, username, password, email, driver_license
        })
    }

}

export { CreateUserService };
import { inject, injectable } from "tsyringe";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { User } from "../../infra/typeorm/entities/User";
import { UserMap } from "../../mapper/UserMap";

import { IUsersRepository } from "../../repositories/IUsersRepository";


@injectable()
class ProfileUserService {

    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository
    ) { }

    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.repository.findById(id)

        return UserMap.toDTO(user);
    }

}

export { ProfileUserService }
import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "../../../repositories/IUsersTokenRepository";
import { UsersTokens } from "../entities/UsersTokens";

class UsersTokensRepository implements IUsersTokenRepository {

    private repository: Repository<UsersTokens>;

    constructor() {
        this.repository = getRepository(UsersTokens);
    }

    async create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UsersTokens> {
        const userToken = this.repository.create({
            user_id,
            refresh_token,
            expires_date
        });

        await this.repository.save(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
        return await this.repository.findOne({ user_id, refresh_token })
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
        return await this.repository.findOne({ refresh_token });
    }

}

export { UsersTokensRepository }
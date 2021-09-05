import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokenRepository {
    create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UsersTokens>
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens>
    deleteById(id: string): Promise<void>;
    findByRefreshToken(token: string): Promise<UsersTokens>
}

export { IUsersTokenRepository };
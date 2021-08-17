import { inject, injectable } from "tsyringe"
import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository"

interface IRequest {
    user_id: string,
    avatar_file: string,
}

@injectable()
class UpdateUserAvatarService {

    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository
    ) { }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.repository.findById(user_id);

        if(user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }
        
        user.avatar = avatar_file;

        await this.repository.create(user);
    }
}

export { UpdateUserAvatarService }
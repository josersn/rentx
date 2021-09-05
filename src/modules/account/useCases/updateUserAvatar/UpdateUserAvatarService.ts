import { inject, injectable } from "tsyringe"

import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository"

interface IRequest {
    user_id: string,
    avatar_file: string,
}

@injectable()
class UpdateUserAvatarService {

    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository,
        @inject("StorageProvider")
        private storage: IStorageProvider
    ) { }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.repository.findById(user_id);

        if(user.avatar) {
            await this.storage.delete(avatar_file, "avatar")
        }
        
        await this.storage.save(avatar_file, "avatar");
        
        user.avatar = avatar_file;

        await this.repository.create(user);
    }
}

export { UpdateUserAvatarService }
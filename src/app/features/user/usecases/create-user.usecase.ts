import { User } from "../../../models/User";
import { UserRepository } from "../repository/user.repository";

export class CreateUserUsecase {
    public async execute (user: User) {
        const repository = new UserRepository();
        await repository.createUser(user)
    }
}
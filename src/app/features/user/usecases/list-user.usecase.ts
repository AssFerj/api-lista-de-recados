import { UserRepository } from "../repository/user.repository";

export class ListUsersUsecase {
    public async execute () {
        const repository = new UserRepository();
        const result = await repository.listUsers()

        return result.map(user => user.toJson())
    }
}
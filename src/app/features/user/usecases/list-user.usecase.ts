import { Result } from "../../../shared/util/result.contract";
import { Usecase } from "../../../shared/util/usecase.contract";
import { UsecaseResponse } from "../../../shared/util/usecase.response";
import { UserRepository } from "../repository/user.repository";

export class ListUsersUsecase implements Usecase {
    public async execute(): Promise<Result> {
        const repository = new UserRepository();
        const result = await repository.listUsers()
        return UsecaseResponse.success('Users succesfully listed', result)
    }
}
import { Result } from "../../../shared/util/result.contract";
import { Usecase } from "../../../shared/util/usecase.contract";
import { UsecaseResponse } from "../../../shared/util/usecase.response";
import { UserRepository } from "../repository/user.repository";

export class GetUserByIdUsecase implements Usecase {
    public async execute (id: string): Promise<Result> {
        const repository = new UserRepository();
        const result = await repository.getById(id)
        if(!result) {
            return UsecaseResponse.notFound(`Not found user with id ${id}`);
        }
        return UsecaseResponse.success('User succesfully listed', result.toJson())
    }
}
import { User } from "../../../models/User";
import { Usecase } from "../../../shared/util/usecase.contract";
import { Result } from "../../../shared/util/result.contract";
import { UsecaseResponse } from "../../../shared/util/usecase.response";
import { UserRepository } from "../repository/user.repository";

interface CreateUserParams {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export class CreateUserUsecase implements Usecase {
    public async execute (params: CreateUserParams): Promise<Result> {
        const repository = new UserRepository();
        const user = new User(params.firstName, params.lastName, params.email, params.password)
        const validateUserByEmail = await repository.getById(params.email)
        if(validateUserByEmail){
            return UsecaseResponse.alreadyExist('User already exist')
        }
        const result = await repository.createUser(user)
        return UsecaseResponse.success('User succesfully created', result?.toJson())
    }
}
import { UserRepository } from "../repository/user.repository";

export class GetUserByIdUsecase {
    public async execute (id: string) {
        const repository = new UserRepository();
        const result = await repository.getById(id)

        console.log(result);
        if(!result) {
            return `Not found user with id ${id}`;
        }
        

        return result.toJson()
    }
}
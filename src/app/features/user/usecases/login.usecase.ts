import { User } from "../../../models/User";
import { JwtService } from "../../../shared/services/jwt.service";
import { Result } from "../../../shared/util/result.contract";
import { Usecase } from "../../../shared/util/usecase.contract";
import { UsecaseResponse } from "../../../shared/util/usecase.response";
import { UserRepository } from "../repository/user.repository";

interface LoginParams {
    email: string;
    password: string;
}

export class LoginUsecase {
  public async execute(params: LoginParams) {
    const repository = new UserRepository();
    const user = await repository.getUserByEmail(params.email);

    if (!user) {
      return UsecaseResponse.unauthorized()
    }

    if(!params.email || user.email !== params.email){
      return UsecaseResponse.unauthorized()
    }

    if(!params.password || user.password !== params.password){
        return UsecaseResponse.unauthorized()
    }
    
    const loggedUser = new User('', '', params.email, params.password);

    if(!loggedUser){
        return UsecaseResponse.unauthorized()
    }

    const result = await repository.login(loggedUser)

    const token = new JwtService().createToken(user.toJson());

    return UsecaseResponse.success("Login successfully done", result), {
    ...user.toJson(),
    token,
    }
  }
}
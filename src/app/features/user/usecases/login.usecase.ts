import { User } from "../../../models/User";
import { JwtService } from "../../../shared/services/jwt.service";
import { Result } from "../../../shared/util/result.contract";
import { Usecase } from "../../../shared/util/usecase.contract";
import { UsecaseResponse } from "../../../shared/util/usecase.response";
import { UserRepository } from "../repository/user.repository";

export interface LoginParams {
    email: string;
    password: string;
}

export class LoginUsecase {
  public async execute(params: LoginParams): Promise<Result> {
    const repository = new UserRepository();
    const user = new User('', '', params.email, params.password)

    const result = await repository.login(user)

    if(!result) {
      return UsecaseResponse.unauthorized()
    }

    const token = new JwtService().createToken(user.toJson());

    return UsecaseResponse.success("Login successfully done", {result, token})
  }
}
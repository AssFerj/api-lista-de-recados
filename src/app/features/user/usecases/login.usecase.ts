import { User } from "../../../models/User";
import { JwtService } from "../../../shared/services/jwt.service";
import { UserRepository } from "../repository/user.repository";

interface LoginParams {
  email: string;
  password: string;
}

export class LoginUsecase {
  public async execute(params: LoginParams) {
    // buscar o user por email
    const repository = new UserRepository();
    const user = await repository.getUserByEmail(params.email);

    if (!user) {
      return "User not found"
    }

    // if(!params.email){
    //     return apiResponse.notProvided(res, 'E-mail');
    // }

    // if(!params.password){
    //     return apiResponse.notProvided(res, 'Password');
    // }

    const loggedUser = new User('', '', params.email, params.password);

    if(!loggedUser){
        return {
            ok: false,
            message: 'Invalid credentials',
            code: 401
        }
    }

    const result = await repository.login(loggedUser)

    // compara as senhas
    if (user.password !== params.password) {
    //   return UsecaseResponse.unauthorized();
        return {
            ok: false,
            message: 'Invalid credentials',
            code: 401
        }
    }

    // criar um token jwt
    const token = new JwtService().createToken(user.toJson());

    // retorna o user logado
    // return UsecaseResponse.success("Login successfully done", {
    return {
    ...user.toJson(),
    token,
    }
  }
}
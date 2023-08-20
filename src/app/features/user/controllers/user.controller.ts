import { Request, Response } from "express";
import { User } from '../../../models/User';
import { apiResponse } from '../../../shared/util/apiResponse.adapter';
import { UserRepository } from '../repository/user.repository';
import { ListUsersUsecase } from "../usecases/list-user.usecase";
import { CreateUserUsecase } from "../usecases/create-user.usecase";
import { GetUserByIdUsecase } from "../usecases/get-user-by-id.usecase";

export class UserController {
    // CREATE
    public async create(req: Request, res: Response) {
        try {         
            const { firstName, lastName, email, password } = req.body;

            const user = new User(firstName, lastName, email, password);

            const usecase = new CreateUserUsecase();

            await usecase.execute(user);

            return apiResponse.successCreate(res, 'User', user.toJson())
            
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // READ
    public async list (req: Request, res: Response) {
        try{
            const usecase = new ListUsersUsecase();
            const result = await usecase.execute();

            return apiResponse.success(res, 'Users', result);
        }catch (error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // LOGIN
    public async login(req: Request, res: Response) {
        try {
            console.log("login controller");
            const { email, password } = req.body;

            if(!email){
                return apiResponse.notProvided(res, 'E-mail');
            }

            if(!password){
                return apiResponse.notProvided(res, 'Password');
            }

            const repository = new UserRepository();

            const loggedUser = new User('', '', email, password);

            if(!loggedUser){
                return apiResponse.ivalidCredentials(res);
            }

            const result = await repository.login(loggedUser)
            
            return apiResponse.successLogin(res, 'User', loggedUser.toJson());
            
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // USER BY ID
    public async gerUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const usecase = new GetUserByIdUsecase();
            const findUser = await usecase.execute(id);

            if(!findUser){
                return apiResponse.ivalidCredentials(res);
            }

            // if(findUser.password !== password){
            //     return apiResponse.ivalidCredentials(res);
            // }

            return apiResponse.success(res, 'User', findUser);
            
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }
}
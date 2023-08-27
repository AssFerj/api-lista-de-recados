import { Request, Response } from "express";
import { User } from '../../../models/User';
import { apiResponse } from '../../../shared/util/apiResponse.adapter';
import { ListUsersUsecase } from "../usecases/list-user.usecase";
import { CreateUserUsecase } from "../usecases/create-user.usecase";
import { GetUserByIdUsecase } from "../usecases/get-user-by-id.usecase";
import { LoginUsecase } from "../usecases/login.usecase";

export class UserController {
    // CREATE
    public async create(req: Request, res: Response) {
        try {         
            const { firstName, lastName, email, password } = req.body;

            const user = new User(firstName, lastName, email, password);

            const usecase = new CreateUserUsecase();

            const result = await usecase.execute(user);

            return res.status(result.code).send(result) //user.toJson())
            
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // READ
    public async list (req: Request, res: Response) {
        try{
            const usecase = new ListUsersUsecase();
            const result = await usecase.execute();

            return res.status(result.code).send(result)
        }catch (error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // LOGIN
    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const result = await new LoginUsecase().execute({
                email,
                password,
            });
            
            return apiResponse.successLogin(res, 'User', result);
            
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

            return res.status(findUser.code).send(findUser)
            
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }
}
import { Request, Response } from "express";
import {User} from "../models/User";
import { apiResponse } from "../util/apiResponse.adapter";
import { users } from "../dataBase/dataUsers";
import { UserRepository } from "../repositories/user.repository";

export class UserController {
    // CREATE
    public async create(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password } = req.body;

            const user = new User(firstName, lastName, email, password);

            users.push(user);

            return apiResponse.successCreate(res, 'User', user.toJson())
            
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // READ
    public async list (req: Request, res: Response) {
        try{
            if(!users){
                return apiResponse.notFound(res, 'Users');
            }

            let result = users;

            return apiResponse.success(res, 'Users', result);
        }catch (error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // LOGIN
    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if(!email){
                return apiResponse.notProvided(res, 'E-mail');
            }

            if(!password){
                return apiResponse.notProvided(res, 'Password');
            }

            const findUser = await new UserRepository.getByEmail(email);

            if(!findUser){
                return apiResponse.ivalidCredentials(res);
            }

            if(findUser.password !== password){
                return apiResponse.ivalidCredentials(res);
            }

            return apiResponse.successCreate(res, 'User', findUser.toJson());
            
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }
}
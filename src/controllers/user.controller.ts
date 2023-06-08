import { Request, Response } from "express";
import {User} from "../models/User";
import { apiResponse } from "../util/apiResponse.adapter";
import { users } from "../dataBase/dataUsers";

export class UserController {
    // CREATE
    public create(req: Request, res: Response) {
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
    public list (req: Request, res: Response) {
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
}
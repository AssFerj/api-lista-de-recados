import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../util/apiResponse.adapter";

export const userValidateFields = (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    if(!firstName){
        return apiResponse.notProvided(res, 'First Name');
    }

    if(!lastName){
        return apiResponse.notProvided(res, 'Last Name');
    }

    if(!email){
        return apiResponse.notProvided(res, 'E-mail');
    }

    if(!password){
        return apiResponse.notProvided(res, 'Password');
    }

    next();
}
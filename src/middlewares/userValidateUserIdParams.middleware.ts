import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../util/apiResponse.adapter";

export const userValidateUserIdParams = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if(!userId){
        return apiResponse.notProvided(res, 'User ID');
    }

    next();
}
import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../../shared/util/apiResponse.adapter";

export const userValidateUserIdParams = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if(!userId){
        return apiResponse.notProvided(res, 'ID');
    }

    next();
}
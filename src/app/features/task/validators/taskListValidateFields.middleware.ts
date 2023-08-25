import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../../shared/util/apiResponse.adapter";

export const taskListValidateFields = (req: Request, res: Response, next: NextFunction) => {
    const { userId, type } = req.body;
    
    if(!userId){
        return apiResponse.notProvided(res, 'User ID');
    }
    
    if(!type){
        return apiResponse.notProvided(res, 'Type');
    }

    next();
}
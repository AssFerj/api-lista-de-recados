import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../../shared/util/apiResponse.adapter";

export const createTaskValidateFields = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { description } = req.body;

    if(!userId){
        return apiResponse.notProvided(res, 'User ID');
    }

    if(!description){
        return apiResponse.notProvided(res, 'Description');
    }

    next();
}

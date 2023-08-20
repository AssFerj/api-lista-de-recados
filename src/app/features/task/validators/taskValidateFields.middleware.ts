import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../../shared/util/apiResponse.adapter";

export const taskValidateFields = (req: Request, res: Response, next: NextFunction) => {
    const { description, userId } = req.body;

    if(!description){
        return apiResponse.notProvided(res, 'Description');
    }

    if(!userId){
        return apiResponse.notProvided(res, 'User ID');
    }

    next();
}
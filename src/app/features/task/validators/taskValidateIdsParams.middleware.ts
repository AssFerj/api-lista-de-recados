import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../../shared/util/apiResponse.adapter";

export const taskValidateIdsParams = (req: Request, res: Response, next: NextFunction) => {
    const { userId, taskId } = req.params;

    if(!userId){
        return apiResponse.notProvided(res, 'User ID');
    }

    if(!taskId){
        return apiResponse.notProvided(res, 'Task ID');
    }

    next();
}

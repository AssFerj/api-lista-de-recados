import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../../shared/util/apiResponse.adapter";

export const updateTaskValidateFields = (req: Request, res: Response, next: NextFunction) => {
    const { userId, taskId } = req.params;
    const { description } = req.body;

    if(!userId){
        return apiResponse.typeNotAssigned(res, 'Tipo')
    }

    if(!taskId){
        return apiResponse.typeNotAssigned(res, 'Tipo')
    }

    if(!description){
        return apiResponse.typeNotAssigned(res, 'Tipo')
    }
            
    next();
}
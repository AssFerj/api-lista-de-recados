import { NextFunction, Request, Response } from "express";
import { TaskArqchive } from "../models/Task";
import { apiResponse } from "../util/apiResponse.adapter";

export const taskValidateQueryParams = (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.body;

    if(type !== TaskArqchive){
        return apiResponse.typeNotAssigned(res, 'Tipo')
    }
            
    next();
}
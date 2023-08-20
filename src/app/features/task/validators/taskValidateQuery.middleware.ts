import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../../shared/util/apiResponse.adapter";

export const taskValidateQueryParams = (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.query;

    if(!type){
        return apiResponse.typeNotAssigned(res, 'Tipo')
    }
            
    next();
}
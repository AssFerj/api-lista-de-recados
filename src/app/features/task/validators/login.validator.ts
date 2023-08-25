import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../../shared/util/apiResponse.adapter";
import { JwtService } from "../../../shared/services/jwt.service";

export class LoginValidator {
    public static checkToken (req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization;
            if(!token) {
                return apiResponse.ivalidCredentials(res)
            }
            const jwtService = new JwtService()
            const isValid = jwtService.verifyToken(token)
            if(!isValid) {
                return apiResponse.ivalidCredentials(res)
            }

            next();
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                error: error.toString()
            })
        }
    }
}
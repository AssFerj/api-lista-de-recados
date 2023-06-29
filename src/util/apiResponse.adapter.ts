import { Response } from "express";
import { TaskArqchive } from "../models/Task";

export class apiResponse{
    public static success(res: Response, entity: string, data: any){
        return res.status(200).send({
            ok: true,
            message: `${entity} successfully listed`,
            data: data
        });
    }

    public static successCreate(res: Response, entity: string, data: any){
        return res.status(201).send({
            ok: true,
            message: `${entity} successfully created`,
            data: data
        });
    }

    public static successUpdate(res: Response, entity: string, data: any){
        return res.status(200).send({
            ok: true,
            message: `${entity} successfully updated`,
            data: data
        });
    }

    public static successDelete(res: Response, entity: string, data: any){
        return res.status(200).send({
            ok: true,
            message: `${entity} successfully deleted`,
            data: data
        });
    }

    public static successLogin(res: Response, entity: string, data: any){
        return res.status(200).send({
            ok: true,
            message: `Login successfully done`,
            data: data
        });
    }

    public static typeNotAssigned(res: Response, entity: string){
        return res.status(404).send({
            ok: false,
            message:  `${entity} not found, ${entity} only ${TaskArqchive.archived} or ${TaskArqchive.unarchived}`,
        });
    }

    public static notFound(res: Response, entity: string){
        return res.status(404).send({
            ok: false,
            message:  `${entity} not found`,
        });
    }

    public static notProvided(res: Response, entity: string){
        return res.status(400).send({
            ok: false,
            message:  `${entity} was not provided`,
        });
    }

    public static alreadyExist(res: Response, entity: string){
        return res.status(400).send({
            ok: false,
            message:  `${entity} already exist!`,
        });
    }

    public static ivalidCredentials(res: Response){
        return res.status(401).send({
            ok: false,
            message:  `Invalid credentials!`,
        });
    }

    public static errorMessage(res: Response, entity: any){
        return res.status(500).send({
            ok: false,
            message: entity.toString(),
        });
    }
}
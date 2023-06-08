import { Request, Response } from "express";
import { apiResponse } from "../util/apiResponse.adapter";
import { users } from "../dataBase/dataUsers";
import { Task } from "../models/Task";

export class TaskController {
    // CREATE
    public create(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { description } = req.body;

            const task = new Task(description, userId);

            const findUser = users.find(u => u.id === userId);

            findUser?.task.push(task);

            return apiResponse.successCreate(res, 'Task', task.toJson());
            
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // READ
    public list (req: Request, res: Response) {
        try{
            const { userId } = req.params;

            if(!users){
                return apiResponse.notFound(res, 'Users');
            }

            const findUser = users.find(u => u.id === userId);

            return apiResponse.success(res, 'Users', findUser?.task);
        }catch (error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }
}
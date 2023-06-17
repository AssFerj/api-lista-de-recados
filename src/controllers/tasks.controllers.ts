import { Request, Response } from "express";
import { apiResponse } from "../util/apiResponse.adapter";
import { users } from "../dataBase/dataUsers";
import { Task } from "../models/Task";
import { log } from "console";

export class TaskController {
    // CREATE
    public create(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { description } = req.body;

            const task = new Task(description, userId);

            const findUser = users.find(u => u.id === userId);

            if(!findUser){
                return apiResponse.notFound(res, 'User');
            }

            findUser.task.push(task);

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

            if(!findUser){
                return apiResponse.notFound(res, 'User');
            }

            const findTask = findUser.task.map(task => task.toJson());

            console.log(findTask);
            return apiResponse.success(res, 'Tasks', findTask);
            
        }catch (error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // UPDATE
    public updateTask (req: Request, res: Response) {
        try {
            const { userId, taskId } = req.params;
            const { description } = req.body;

            if(!description){
                return apiResponse.notProvided(res, 'Description');
            }

            if(!users){
                return apiResponse.notFound(res, 'Users');
            }

            const findUser = users.find(u => u.id === userId);
            
            if(!findUser){
                return apiResponse.notFound(res, 'User');
            }

            if(!findUser.task){
                return apiResponse.notFound(res, 'Task');
            }
            
            const findTask = findUser.task.find(t => t.id === taskId);

            if(!findTask?.description){
                return apiResponse.notFound(res, 'Description');
            }
            
            if(description){
                findTask.description = description;
            }

            return apiResponse.successUpdate(res, 'Description', description);
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // DELETE
    public deleteTask (req: Request, res: Response) {
        try {
            const { userId, taskId } = req.params;

            if(!users){
                return apiResponse.notFound(res, 'Users');
            }

            const findUser = users.find(u => u.id === userId);
            
            if(!findUser){
                return apiResponse.notFound(res, 'User');
            }

            if(!findUser.task){
                return apiResponse.notFound(res, 'Task');
            }
            
            const findTask = findUser.task.findIndex(t => t.id === taskId);
            
            if(findTask < 0){
                return apiResponse.notFound(res, 'Task');
            }
            
            const task = findUser.task[findTask];

            findUser.task.splice(findTask, 1);

            return apiResponse.successDelete(res, 'Task', task.toJson());
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }
}
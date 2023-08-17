import { Request, Response } from "express";
import { apiResponse } from "../../../shared/util/apiResponse.adapter";
import { Task } from "../../../models/Task";
import { UserRepository } from "../../user/repository/user.repository";
import { TaskRepository } from "../../task/repository/task.repository";

export class TaskController {
    // CREATE
    public async create(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { description, type } = req.body;

            const user = await new UserRepository().getById(userId);
            
            if(!user){
                return apiResponse.notFound(res, 'User');
            }

            const newTask = new Task(description, userId, type, user);

            await new TaskRepository().addTask(newTask);

            return apiResponse.successCreate(res, 'Task', newTask.toJson());
            
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // READ
    public async list(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { type } = req.query;
            const typeConvert = Boolean(type === 'true' ? true : false);

            let tasks = await new TaskRepository().listTasks(userId, typeConvert);
      
            if (type) {
                const filteredTasks = tasks.filter(task => task.type === typeConvert);
                tasks = filteredTasks;
            }

            const taskType = tasks.map(task => task.toJson());
        
            return apiResponse.success(res, 'Tasks', taskType);
        
            } catch (error: any) {
            return apiResponse.errorMessage(res, error);
            }
    }

    // UPDATE
    public async updateTask (req: Request, res: Response) {
        try {
            const { userId, taskId } = req.params;
            const { description } = req.body;

            if(!description){
                return apiResponse.notProvided(res, 'Description');
            }
                            
            const task = await new TaskRepository().getTaskById(userId, taskId);

            if(!task){
                return apiResponse.notFound(res, 'Task');
            }

            if(description) {
                task.description = description;
            }

            await new TaskRepository().updateTask(task);

            return apiResponse.successUpdate(res, 'Description', task.toJson());
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // DELETE
    public async deleteTask (req: Request, res: Response) {
        try {
            const { taskId } = req.params;
            const deletedTask = await new TaskRepository().deleteTask(taskId);

            return apiResponse.successDelete(res, 'Task', deletedTask);
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }
}
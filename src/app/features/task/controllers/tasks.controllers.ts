import { Request, Response } from "express";
import { apiResponse } from "../../../shared/util/apiResponse.adapter";
import { Task } from "../../../models/Task";
import { UserRepository } from "../../user/repository/user.repository";
import { TaskRepository } from "../../task/repository/task.repository";
import { GetTaskByIdUsecase } from "../usecases/get-task-by-id.usecase";
import { UpdateTaskUsecase } from "../usecases/update-task.usecase";
import { ListTasksUsecase } from "../usecases/list-tasks.usecase";
import { DeleteTaskUsecase } from "../usecases/delete-task.usecase";

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
            const usecase = new ListTasksUsecase();
            

            let tasks = await usecase.execute(userId, type as string);
        
            return apiResponse.success(res, 'Tasks', tasks);
        
            } catch (error: any) {
            return apiResponse.errorMessage(res, error);
            }
    }

    public async getTaskById(req: Request, res: Response) {
        try {
            const { taskId } = req.params;
            const usecase = new GetTaskByIdUsecase();
            const result = await usecase.execute(taskId);          

            return apiResponse.success(res, 'Task', result);
        } catch (error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // UPDATE
    public async updateTask (req: Request, res: Response) {
        try {
            const usecase = new UpdateTaskUsecase();
            
            const { userId, taskId } = req.params;
            const { description, type } = req.body;

            if(!description){
                return apiResponse.notProvided(res, 'Description');
            }
                            
            const task = await usecase.execute({userId, taskId, description, archived: type});

            return apiResponse.successUpdate(res, 'Description', task);
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // DELETE
    public async deleteTask (req: Request, res: Response) {
        try {
            const { taskId } = req.params;
            const usecase = new DeleteTaskUsecase()
            const deletedTask = await usecase.execute(taskId);

            return apiResponse.successDelete(res, 'Task', deletedTask);
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }
}
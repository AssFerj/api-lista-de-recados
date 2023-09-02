import { Request, Response } from "express";
import { apiResponse } from "../../../shared/util/apiResponse.adapter";
import { Task } from "../../../models/Task";
import { UserRepository } from "../../user/repository/user.repository";
import { GetTaskByIdUsecase } from "../usecases/get-task-by-id.usecase";
import { UpdateTaskUsecase } from "../usecases/update-task.usecase";
import { ListTasksUsecase } from "../usecases/list-tasks.usecase";
import { CreateTaskUsecase } from "../usecases/create-task.usecase";
import { DeleteTaskUsecase } from "../usecases/delete-task.usecase";

interface ListTaskParams {
    userId: string;
    type: string;
}
export class TaskController {
    // CREATE
    public async create(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { description, type } = req.body;

            const user = await new UserRepository().getById(userId)
            
            if(!user){
                return apiResponse.notFound(res, 'User');
            }
            
            const newTask = new Task(description, userId, type, user);
            const result = await new CreateTaskUsecase().execute(newTask);

            return res.status(result.code).send(result) //apiResponse.successCreate(res, 'Task', newTask.toJson());
            
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

            const params: ListTaskParams = {
                userId: userId,
                type: type  as string
            }

            let tasks = await usecase.execute(params);
        
            return res.status(tasks.code).send(tasks) //apiResponse.success(res, 'Tasks', tasks);
        
            } catch (error: any) {
            return apiResponse.errorMessage(res, error);
            }
    }

    public async getTaskById(req: Request, res: Response) {
        try {
            const { taskId } = req.params;
            const usecase = new GetTaskByIdUsecase();
            const result = await usecase.execute(taskId);          

            return res.status(result.code).send(result) //apiResponse.success(res, 'Task', result);
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
                       
            const task = await usecase.execute({userId, taskId, description, archived: type});
            
            return res.status(task.code).send(task) //apiResponse.successUpdate(res, 'Description', task);
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

            return res.status(deletedTask.code).send(deletedTask) //apiResponse.successDelete(res, 'Task', deletedTask);
        } catch (error) {
            return apiResponse.errorMessage(res, error);
        }
    }
}
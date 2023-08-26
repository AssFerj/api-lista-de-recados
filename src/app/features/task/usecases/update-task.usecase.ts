import { CacheRepository } from "../../../shared/database/repository/cache.repositiry";
import { UsecaseResponse } from "../../../shared/util/usecase.response";
import { UserRepository } from "../../user/repository/user.repository";
import { TaskRepository } from "../repository/task.repository";

interface GetTaskByIdParams {
    userId: string;
    taskId: string;
    description: string;
    archived: boolean;
}

export class UpdateTaskUsecase {
    public async execute (params: GetTaskByIdParams) {
        const repository = new TaskRepository();
        const cache = new CacheRepository();
        const userRepository = new UserRepository();
        const task = await repository.getTaskById(params.taskId)
        const findUser = await userRepository.getById(params.userId);        

        if(!findUser) {
            return UsecaseResponse.notFound('User not found')
        }

        if(!task) {
            return UsecaseResponse.notFound('Task not found')
        }

        if(!params.description){
            return UsecaseResponse.notFound('Description is not provided')
        }

        if(params.description) {
            task.description = params.description;
        }

        if(params.archived) {
            task.type = params.archived;
        }
        
        await repository.updateTask(task)
        await cache.delete(`task-${params.taskId}`)
        await cache.delete(`tasks-${params.userId}`)

        return UsecaseResponse.success('Task succesfully updated', task.toJson())
    }
}
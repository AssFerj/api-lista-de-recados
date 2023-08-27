import { CacheRepository } from "../../../shared/database/repository/cache.repositiry";
import { Result } from "../../../shared/util/result.contract";
import { Usecase } from "../../../shared/util/usecase.contract";
import { UsecaseResponse } from "../../../shared/util/usecase.response";
import { TaskRepository } from "../repository/task.repository";

export class GetTaskByIdUsecase implements Usecase {
    public async execute(taskId: string): Promise<Result> {
        const repository = new TaskRepository()
        const cacheRepository= new CacheRepository()
        const cache = await cacheRepository.get(`task-${taskId}`)
        if(cache){
            return UsecaseResponse.success('Task successfully listed in cache', cache)
        }
        const result = await repository.getTaskById(taskId)
        if(!result) {
            return UsecaseResponse.notFound(`Task not found`)
        }
        await cacheRepository.set(`task-${taskId}`, result.toJson())        
        return UsecaseResponse.success('Task successfully listed', result.toJson())
    }
}
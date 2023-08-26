import { CacheRepository } from "../../../shared/database/repository/cache.repositiry";
import { UsecaseResponse } from "../../../shared/util/usecase.response";
import { TaskRepository } from "../repository/task.repository";

export class GetTaskByIdUsecase {
    public async execute(taskId: string) {
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
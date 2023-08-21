import { CacheRepository } from "../../../shared/database/repository/cache.repositiry";
import { TaskRepository } from "../repository/task.repository";

export class GetTaskByIdUsecase {
    public async execute(taskId: string) {
        const repository = new TaskRepository()
        const cacheRepository= new CacheRepository()
        const cache = await cacheRepository.get(`tasks-${taskId}`)
        if(cache){
            return {
                ok: true,
                code: 200,
                message: 'Tasks successfully listed in cache',
                date: cache
            }
        }
        const result = await repository.getTaskById(taskId)
        
        if(!result) {
            return `Task not found`
        }
        await cacheRepository.set(`tasks-${taskId}`, result.toJson())        
        return result.toJson();
        
    }
}
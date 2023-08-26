import { CacheRepository } from "../../../shared/database/repository/cache.repositiry";
import { UsecaseResponse } from "../../../shared/util/usecase.response";
import { TaskRepository } from "../repository/task.repository";

export class ListTasksUsecase {
    public async execute (userId: string, type: string) {
        if(!userId){
            return UsecaseResponse.notFound('User ID')
        }
        if(!type){
            return UsecaseResponse.notFound('Type')
        }
        const repository = new TaskRepository()
        const cacheRepository = new CacheRepository()
        const typeConvert = type === 'true' ? true : false;
        const cache = await cacheRepository.get(`tasks-${userId}`)
        if(cache){
            return UsecaseResponse.success('Tasks successfully listed in cache', cache)
        }
        const result = await repository.listTasks(userId, typeConvert)
        await cacheRepository.set(`tasks-${userId}`, result.map(task => task.toJson()))        
        return result.map(task => task.toJson())
    }
}
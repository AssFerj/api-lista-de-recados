import { CacheRepository } from "../../../shared/database/repository/cache.repositiry";
import { TaskRepository } from "../repository/task.repository";

export class ListTasksUsecase {
    public async execute (userId: string, type: string) {
    
        if(!userId){
            return 'User ID was not provided';
        }
        
        if(!type){
            return 'Type was not provided';
        }
        const repository = new TaskRepository()
        const cacheRepository = new CacheRepository()
        const typeConvert = type === 'true' ? true : false;
        const cache = await cacheRepository.get(`tasks-${userId}`)
        if(cache){
            return {
                message: 'Tasks successfully listed in cache',
                date: cache
            }
        }
        const result = await repository.listTasks(userId, typeConvert)
        await cacheRepository.set(`tasks-${userId}`, result)        
        return result.map(task => task.toJson())
    }
}
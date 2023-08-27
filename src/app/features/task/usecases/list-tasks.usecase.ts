import { CacheRepository } from "../../../shared/database/repository/cache.repositiry";
import { Result } from "../../../shared/util/result.contract";
import { Usecase } from "../../../shared/util/usecase.contract";
import { UsecaseResponse } from "../../../shared/util/usecase.response";
import { TaskRepository } from "../repository/task.repository";

interface ListTasksParams {
    userId: string;
    type: string;
}
export class ListTasksUsecase implements Usecase {
    public async execute(params: ListTasksParams): Promise<Result> {
        if(!params.userId){
            return UsecaseResponse.notFound('User ID')
        }
        if(!params.type){
            return UsecaseResponse.notFound('Type')
        }
        const repository = new TaskRepository()
        const cacheRepository = new CacheRepository()
        const typeConvert = params.type === 'true' ? true : false;
        const cache = await cacheRepository.get(`tasks-${params.userId}`)
        if(cache){
            return UsecaseResponse.success('Tasks successfully listed in cache', cache)
        }
        const result = await repository.listTasks(params.userId, typeConvert)
        await cacheRepository.set(`tasks-${params.userId}`, result)        
        return UsecaseResponse.success('Tasks succesfully listed', result)
    }
}
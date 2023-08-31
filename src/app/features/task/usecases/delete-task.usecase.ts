import { CacheRepository } from "../../../shared/database/repository/cache.repositiry";
import { Result } from "../../../shared/util/result.contract";
import { Usecase } from "../../../shared/util/usecase.contract";
import { UsecaseResponse } from "../../../shared/util/usecase.response";
import { TaskRepository } from "../repository/task.repository";

export class DeleteTaskUsecase implements Usecase {
    public async execute(taskId: string): Promise<Result> {        
        const repository = new TaskRepository()
        const result = await repository.deleteTask(taskId)
        const cacheRepository = new CacheRepository()
        await cacheRepository.delete(`task-${taskId}`)
        // await cacheRepository.delete(`tasks-${userId}`)
        return UsecaseResponse.success('Task succesfully deleted', result)
    }
}
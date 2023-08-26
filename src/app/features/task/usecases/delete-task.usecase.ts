import { CacheRepository } from "../../../shared/database/repository/cache.repositiry";
import { TaskRepository } from "../repository/task.repository";

export class DeleteTaskUsecase {
    public async execute(taskId: string) {        
        const repository = new TaskRepository()
        await repository.deleteTask(taskId)
        const cacheRepository = new CacheRepository()
        await cacheRepository.delete(`task-${taskId}`)
    }
}
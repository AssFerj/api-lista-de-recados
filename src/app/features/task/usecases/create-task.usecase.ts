import { Task } from "../../../models/Task";
import { CacheRepository } from "../../../shared/database/repository/cache.repositiry";
import { Result } from "../../../shared/util/result.contract";
import { Usecase } from "../../../shared/util/usecase.contract";
import { UsecaseResponse } from "../../../shared/util/usecase.response";
import { TaskRepository } from "../repository/task.repository";

export class CreateTaskUsecase implements Usecase {
    public async execute (task: Task): Promise<Result> {
        const cache = new CacheRepository()
        const repository = new TaskRepository();
        const result = await repository.addTask(task)
        await cache.delete(`task-${task.id}`)
        await cache.delete(`tasks-${task.userId}`)
        await cache.set(`task-${task.id}`, result)
        return UsecaseResponse.success('Task succesfully created', result)
    }
}
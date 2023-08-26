import { Task } from "../../../models/Task";
import { CacheRepository } from "../../../shared/database/repository/cache.repositiry";
import { TaskRepository } from "../repository/task.repository";

export class CreateTaskUsecase {
    public async execute (task: Task) {
        const cache = new CacheRepository()
        const repository = new TaskRepository();
        const result = await repository.addTask(task)
        await cache.delete(`task-${task.id}`)
        await cache.delete(`tasks-${task.userId}`)
        await cache.set(`task-${task.id}`, result)
    }
}
import { Task } from "../../../models/Task";
import { CacheRepository } from "../../../shared/database/repository/cache.repositiry";
import { TaskRepository } from "../repository/task.repository";

export class CreateTaskUsecase {
    public async execute (task: Task) {
        const repository = new TaskRepository();
        const result = repository.addTask(task)
        const cacheRepository = new CacheRepository();
        await cacheRepository.delete("tasks");
        return {
            ok: true,
            message: "Task successfully created",
            code: 200,
            data: result
        };
    }
}
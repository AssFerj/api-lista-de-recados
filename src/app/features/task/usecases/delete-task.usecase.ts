import { TaskRepository } from "../repository/task.repository";

export class DeleteTaskUsecase {
    public async execute(taskId: string) {
        const repository = new TaskRepository()
        await repository.deleteTask(taskId)
    }
}
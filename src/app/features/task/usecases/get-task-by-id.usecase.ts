import { TaskRepository } from "../repository/task.repository";

export class GetTaskByIdUsecase {
    public async execute(taskId: string) {
        const repository = new TaskRepository()
        const result = await repository.getTaskById(taskId)
        
        if(!result) {
            return `Task not found`
        }

        return result.toJson();
        
    }
}
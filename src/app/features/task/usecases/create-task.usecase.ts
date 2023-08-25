import { Task } from "../../../models/Task";
import { TaskRepository } from "../repository/task.repository";

interface CreateTaskByIdParams {
    userId: string;
    description: string;
    archived: boolean;
}

export class CreateTaskUsecase {
    public async execute (task: Task) {
        const repository = new TaskRepository();
        
        await repository.addTask(task)
    }
}
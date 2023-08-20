import { Task } from "../../../models/Task";
import { TaskRepository } from "../repository/task.repository";

export class CreateTaskUsecase {
    public async execute (task: Task) {
        const repository = new TaskRepository();
        const result = repository.addTask(task)
    }
}
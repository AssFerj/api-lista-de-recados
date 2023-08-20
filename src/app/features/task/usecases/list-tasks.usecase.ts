import { TaskRepository } from "../repository/task.repository";

export class ListTasksUsecase {
    public async execute (userId: string, type: string) {
        const repository = new TaskRepository()

        const typeConvert = type === 'true' ? true : false;

        const result = await repository.listTasks(userId, typeConvert)
        
        return result.map(task => task.toJson())
    }
}
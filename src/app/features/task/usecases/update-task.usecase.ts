import { TaskRepository } from "../repository/task.repository";

interface GetTaskByIdParams {
    userId: string;
    taskId: string;
    description: string;
    archived: boolean;
}

export class UpdateTaskUsecase {
    public async execute (params: GetTaskByIdParams) {
        const repository = new TaskRepository()
        const task = await repository.getTaskById(params.taskId)

        if(!task) {
            return {
                ok: false,
                message: 'Task not found',
                code: 404
            }
        }

        if(params.description) {
            task.description = params.description;
        }

        if(params.archived) {
            task.type = params.archived;
        }

        await repository.updateTask(task)

        return task.toJson()
    }
}
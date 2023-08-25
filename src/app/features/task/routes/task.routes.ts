import { Router } from "express"
import { TaskController } from "../controllers/tasks.controllers";
import { createTaskValidateFields } from "../validators/createTaskValidateFields.middleware";
import { updateTaskValidateFields } from "../validators/updateTaskValidateFields.middleware";

export const taskRoutes = ()=> {
    const app = Router({
        mergeParams: true
    });

    app.get('/', new TaskController().list);
    app.get('/:taskId', new TaskController().getTaskById);
    app.post('/', [createTaskValidateFields], new TaskController().create);
    app.put('/:taskId', [/*updateTaskValidateFields*/], new TaskController().updateTask);
    app.delete('/:taskId', new TaskController().deleteTask);

    return app;
}
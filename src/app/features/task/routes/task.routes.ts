import { Router } from "express"
import { TaskController } from "../controllers/tasks.controllers";
import { createTaskValidateFields } from "../validators/createTaskValidateFields.middleware";
import { updateTaskValidateFields } from "../validators/updateTaskValidateFields.middleware";
import { LoginValidator } from "../validators/login.validator";

export const taskRoutes = ()=> {
    const app = Router({
        mergeParams: true
    });

    app.get('/', [LoginValidator.checkToken], new TaskController().list);
    app.get('/:taskId', [LoginValidator.checkToken], new TaskController().getTaskById);
    app.post('/', [createTaskValidateFields, LoginValidator.checkToken], new TaskController().create);
    app.put('/:taskId', [/*updateTaskValidateFields*/LoginValidator.checkToken], new TaskController().updateTask);
    app.delete('/:taskId', [LoginValidator.checkToken], new TaskController().deleteTask);

    return app;
}
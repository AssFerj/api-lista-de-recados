import { Router } from "express"
import { TaskController } from "../controllers/tasks.controllers";
import { taskValidateFields } from "../middlewares/taskValidateFields.middleware";
import { taskValidateIdsParams } from "../middlewares/taskValidateIdsParams.middleware";
import { userValidateUserIdParams } from "../middlewares/userValidateUserIdParams.middleware";
import { taskValidateQueryParams } from "../middlewares/taskValidateQuery.middleware";

export const taskRoutes = ()=> {
    const app = Router({
        mergeParams: true
    });

    app.get('/', [userValidateUserIdParams, taskValidateQueryParams], new TaskController().list);
    app.post('/', [userValidateUserIdParams, taskValidateFields], new TaskController().create);
    app.put('/:taskId', [taskValidateIdsParams], new TaskController().updateTask);
    app.delete('/:taskId', [taskValidateIdsParams], new TaskController().deleteTask);

    return app;
}
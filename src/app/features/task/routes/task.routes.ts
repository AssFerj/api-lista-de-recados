import { Router } from "express"
import { TaskController } from "../controllers/tasks.controllers";
import { taskValidateFields } from "../validators/taskValidateFields.middleware";
import { userValidateUserIdParams } from "../../user/validators/userValidateUserIdParams.middleware";
import { taskValidateIdsParams } from "../validators/taskValidateIdsParams.middleware";
import { taskValidateQueryParams } from "../validators/taskValidateQuery.middleware";

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
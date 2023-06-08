import { Router } from "express"
import { TaskController } from "../controllers/tasks.controllers";
import { taskValidateFields } from "../middlewares/taskValidateFields.middleware";

export const taskRoutes = ()=> {
    const app = Router({
        mergeParams: true
    });

    app.get('/', new TaskController().list);
    app.post('/', [taskValidateFields], new TaskController().create);

    return app;
}
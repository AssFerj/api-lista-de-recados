import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { userValidateFields } from "../validators/userValidateFields.middleware";
import { taskRoutes } from "../../task/routes/task.routes";
import { userValidateUserIdParams } from "../validators/userValidateUserIdParams.middleware";

export const userRoutes = ()=> {
    const app = Router();

    app.get('/:id', [userValidateUserIdParams], new UserController().gerUserById);
    app.get('/', new UserController().list);
    app.post('/', [userValidateFields], new UserController().create);
    app.post('/login', new UserController().login);

    app.use('/:userId/tasks', taskRoutes());

    return app;
}
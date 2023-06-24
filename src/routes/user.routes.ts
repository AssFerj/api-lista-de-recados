import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { userValidateFields } from "../middlewares/userValidateFields.middleware";
import { taskRoutes } from "./task.routes";

export const userRoutes = ()=> {
    const app = Router();

    app.get('/', new UserController().list);
    app.post('/', [userValidateFields], new UserController().create);
    app.post('/login', new UserController().login);

    app.use('/:userId/tasks', taskRoutes());

    return app;
}
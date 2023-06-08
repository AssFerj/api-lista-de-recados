import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { userValidateFields } from "../middlewares/userValidateFields.middleware";
import { taskRoutes } from "./task.routes";

export const userRoutes = ()=> {
    const app = Router();

    app.post('/', [userValidateFields], new UserController().create);

    app.use('/:userId/tasks', taskRoutes());

    return app;
}
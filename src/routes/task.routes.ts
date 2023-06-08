import { Router } from "express"

export const taskRoutes = ()=> {
    const app = Router({
        mergeParams: true
    });

    return app;
}
import { Router } from "express";
import authRouter from "./auth.router.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import taskRouter from "./task.router.js";

const indexRouter=Router()

indexRouter.use('/auth',authRouter)
indexRouter.use('/tasks',authMiddleware,taskRouter)

export default indexRouter;
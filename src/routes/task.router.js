import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller.js";

const taskRouter=Router()

taskRouter.post('/',createTask)
taskRouter.get('/',getTasks)
taskRouter.patch('/:taskId',updateTask)
taskRouter.delete('/:taskId',deleteTask)

export default taskRouter;


import prismaClient from "../prisma.js";
import {
  createTaskValidation,
  updateTaskValidation,
} from "../utils/validate.task.js";
import { CustomError } from "../utils/customError.js";
////////////////Create Task//////////////////////////////////
export const createTask = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    if (!req?.body || Object.keys(req.body).length === 0) {
      throw new CustomError(
        "No data provided. Request body cannot be empty.",
        400
      );
    }
    const { error } = await createTaskValidation(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    const { title, description, status, dueDate } = req.body;
    const dueDateObj = new Date(dueDate);
    if (dueDateObj < new Date()) {
      throw new CustomError("Due date must be a valid future date.", 400);
    }
    const newTask = await prismaClient.task.create({
      data: {
        title,
        description,
        status: status.toUpperCase(),
        dueDate: dueDateObj,
        userId,
      },
    });
    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: newTask,
    });
  } catch (err) {
    next(err);
  }
};
//////////////////////////////Get User's tasks//////////////////
export const getTasks = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    const { page = 1, limit = 10, status } = req?.query;

    const validStatuses = ["pending", "in_progress", "completed"];
    let statusFilter = {};
    if (status) {
      if (!validStatuses.includes(status)) {
        throw new CustomError(
          `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
          400
        );
      }
      statusFilter.status = status.toUpperCase();
    }
    const tasks = await prismaClient.task.findMany({
      where: {
        userId,
        ...statusFilter,
      },
      skip: (page - 1) * limit,
      take: Number(limit),
    });

    const tasksCount = await prismaClient.task.count({
      where: {
        userId,
        ...statusFilter,
      },
    });

    return res.status(200).json({
      success: true,
      data: tasks,
      total: tasksCount,
      currentPage: Number(page),
      totalPages: Math.ceil(tasksCount / limit),
      limit: Number(limit),
    });
  } catch (err) {
    next(err);
  }
};

/////////////////////////////Update User's task/////////////////////
export const updateTask = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    const taskId = req?.params.taskId;
    const task = await prismaClient.task.findFirst({
      where: { id: taskId, userId },
    });
    if (!task) {
      throw new CustomError("Task not found.", 404);
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new CustomError(
        "At least one field must be provided to update the task.",
        400
      );
    }
    const { error } = await updateTaskValidation(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    const { title, description, dueDate } = req.body;
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (req?.body?.status !== undefined)
      updateData.status = req.body.status.toUpperCase();
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);
    if(dueDate!==undefined&&updateData.dueDate<new Date()){
      throw new CustomError("Due date must be a valid future date.", 400);
    }
    const updatedTask = await prismaClient.task.update({
      where: { id: taskId, userId },
      data: updateData,
    });
    return res.status(201).json({
      success: true,
      message: "Task updated successfully.",
      data: updatedTask,
    });
  } catch (err) {
    next(err);
  }
};

//////////////////////////////////Delete Task////////////////////////////
export const deleteTask = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    const taskId = req?.params.taskId;
    const task = await prismaClient.task.findFirst({
      where: { id: taskId, userId },
    });
    if (!task) {
      throw new CustomError("Task not found.", 404);
    }
    await prismaClient.task.delete({ where: { id: task.id } });
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
      taskId,
    });
  } catch (err) {
    next(err);
  }
};

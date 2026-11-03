import type { Request, Response } from "express";
import { getAllTasks, createTask } from "./task.service";

export const getTasksController = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error("Failed to retrieve tasks:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks",
    });
  }
};

export const createTaskController = async (req: Requrest, res: Response) => {
  try {
    const { title, description } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (description !== undefined && typeof description !== "string") {
      res.status(400).json({
        success: false,
        message: "Description must be a string",
      });
    }

    const task = await createTask({
      title: title.trim(),
      ...(description !== undefined && {
        description: description.trim(),
      }),
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("Failed to create task:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};
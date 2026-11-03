import type { Request, Response } from "express";
import { getAllTasks, createTask, updateTask } from "./task.service";

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
      return;
    }

    if (description !== undefined && typeof description !== "string") {
      res.status(400).json({
        success: false,
        message: "Description must be a string",
      });
      return;
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

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { title, description, completed } = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Task id is required",
      });
      return;
    }

    if (title !== undefined && (typeof title !== "string" || !title.trim())) {
      res.status(400).json({
        success: false,
        message: "Title must be a non-empty string",
      });
      return;
    }

    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Description must be a string or null",
      });
      return;
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      res.status(400).json({
        success: false,
        message: "Completed must be a boolean",
      });
      return;
    }

    const task = await updateTask(id, {
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && {
        description: description?.trim() || null,
      }),
      ...(completed !== undefined && { completed }),
    });

    res.status(200).json({
        success: true,
        data: task
    })
  } catch (error) {
    console.error("Failed to update task:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};

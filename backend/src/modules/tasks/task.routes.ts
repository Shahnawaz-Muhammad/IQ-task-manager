import { Router } from "express";
import { getTasksController, createTaskController, updateTaskController, deleteTaskController } from "./task.controller";

const router = Router();

router.get("/", getTasksController);
router.post("/", createTaskController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;
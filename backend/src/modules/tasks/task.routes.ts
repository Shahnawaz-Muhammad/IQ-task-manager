import { Router } from "express";
import { getTasksController, createTaskController, updateTaskController } from "./task.controller";

const router = Router();

router.get("/", getTasksController);
router.post("/", createTaskController);
router.put("/:id", updateTaskController);

export default router;
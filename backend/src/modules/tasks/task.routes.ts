import { Router } from "express";
import { getTasksController, createTaskController } from "./task.controller";

const router = Router();

router.get("/", getTasksController);
router.post("/", createTaskController);


export default router;
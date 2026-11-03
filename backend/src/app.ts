import express from "express";
import cors from "cors";

import taskRoutes from "./modules/tasks/task.routes"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Task Manageer API is running",
    })
})

app.use("/api/tasks", taskRoutes);



export default app;
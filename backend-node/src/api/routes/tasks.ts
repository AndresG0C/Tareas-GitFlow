import { Router, Request, Response } from "express";
import { createTask, getTasks, getTaskById, deleteTask, completeTask, toggleTask } from "../../crud/taskCrud";
import { CreateTaskDto } from "../../schemas/taskSchemas";

const router = Router();

// POST /tasks - Crear tarea
router.post("/", async (req: Request, res: Response) => {
    try {
        const taskData: CreateTaskDto = req.body;

        if (!taskData.title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const newTask = await createTask(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /tasks - Obtener todas las tareas
router.get("/", async (req: Request, res: Response) => {
    try {
        const tasks = await getTasks();
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /tasks/:id - Eliminar tarea
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.params.id);

        if (isNaN(taskId)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }

        const deleted = await deleteTask(taskId);

        if (!deleted) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task deleted" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /tasks/:id/complete - Marcar tarea como completada
router.put("/:id/complete", async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.params.id);

        if (isNaN(taskId)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }

        const completedTask = await completeTask(taskId);

        if (!completedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(completedTask);
    } catch (error) {
        console.error("Error completing task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// EXTRA: PATCH /tasks/:id/toggle - Alternar estado (útil para frontend)
router.patch("/:id/toggle", async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.params.id);

        if (isNaN(taskId)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }

        const toggledTask = await toggleTask(taskId);

        if (!toggledTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(toggledTask);
    } catch (error) {
        console.error("Error toggling task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// EXTRA: GET /tasks/:id - Obtener una tarea específica
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.params.id);

        if (isNaN(taskId)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }

        const task = await getTaskById(taskId);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
import { Router, Request, Response } from "express";
import { createTask, getTasks, getTaskById, deleteTask, completeTask, toggleTask } from "../../../crud/taskCrud";
import { CreateTaskDto } from "../../../schemas/taskSchemas";

const router = Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskDto'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       400:
 *         description: Título requerido
 *       500:
 *         description: Error interno
 */
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

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskResponse'
 *       500:
 *         description: Error interno
 */
router.get("/", async (req: Request, res: Response) => {
    try {
        const tasks = await getTasks();
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       404:
 *         description: Tarea no encontrada
 *       400:
 *         description: ID inválido
 */
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

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task deleted
 *       404:
 *         description: Tarea no encontrada
 *       400:
 *         description: ID inválido
 */
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

/**
 * @swagger
 * /tasks/{id}/complete:
 *   put:
 *     summary: Marcar tarea como completada
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea completada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       404:
 *         description: Tarea no encontrada
 *       400:
 *         description: ID inválido
 */
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

/**
 * @swagger
 * /tasks/{id}/toggle:
 *   patch:
 *     summary: Alternar estado de la tarea (completada/no completada)
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Estado alternado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       404:
 *         description: Tarea no encontrada
 *       400:
 *         description: ID inválido
 */
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

export default router;
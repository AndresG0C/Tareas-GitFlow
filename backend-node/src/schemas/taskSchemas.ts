/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTaskDto:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Título de la tarea
 *           example: "Hacer la compra"
 *     TaskResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la tarea
 *           example: 1
 *         title:
 *           type: string
 *           description: Título de la tarea
 *           example: "Hacer la compra"
 *         completed:
 *           type: boolean
 *           description: Estado de la tarea
 *           example: false
 *     UpdateTaskDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título de la tarea
 *         completed:
 *           type: boolean
 *           description: Estado de la tarea
 */

export interface CreateTaskDto {
    title: string;
}

export interface TaskResponse {
    id: number;
    title: string;
    completed: boolean;
}

export interface UpdateTaskDto {
    title?: string;
    completed?: boolean;
}
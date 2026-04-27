import { AppDataSource } from "../database/data-source";
import { Task } from "../entities/Tasks";
import { CreateTaskDto, UpdateTaskDto } from "../schemas/taskSchemas";

const taskRepository = AppDataSource.getRepository(Task);

// CREATE: Crear una tarea
export const createTask = async (taskData: CreateTaskDto): Promise<Task> => {
    const dbTask = taskRepository.create({
        title: taskData.title,
        completed: false
    });

    await taskRepository.save(dbTask);
    return dbTask;
};

// READ ALL: Obtener todas las tareas
export const getTasks = async (): Promise<Task[]> => {
    return await taskRepository.find({
        order: { id: "ASC" }
    });
};

// READ ONE: Obtener una tarea por ID
export const getTaskById = async (taskId: number): Promise<Task | null> => {
    return await taskRepository.findOneBy({ id: taskId });
};

// DELETE: Eliminar una tarea
export const deleteTask = async (taskId: number): Promise<boolean> => {
    const task = await taskRepository.findOneBy({ id: taskId });
    if (!task) return false;

    await taskRepository.remove(task);
    return true;
};

// UPDATE: Completar una tarea
export const completeTask = async (taskId: number): Promise<Task | null> => {
    const task = await taskRepository.findOneBy({ id: taskId });
    if (!task) return null;

    task.completed = true;
    await taskRepository.save(task);
    return task;
};
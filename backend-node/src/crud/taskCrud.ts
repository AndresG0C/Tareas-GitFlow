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


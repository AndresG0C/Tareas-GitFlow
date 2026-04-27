// Equivalente a TaskCreate (Pydantic)
export interface CreateTaskDto {
    title: string;
}

// Equivalente a Task (Pydantic)
export interface TaskResponse {
    id: number;
    title: string;
    completed: boolean;
}

// Adicional: Para actualizaciones parciales
export interface UpdateTaskDto {
    title?: string;
    completed?: boolean;
}
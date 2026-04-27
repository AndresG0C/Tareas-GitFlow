import request from 'supertest';
import app from '../src/app';
import { AppDataSource } from '../src/database/data-source';
import { Task } from '../src/entities/Tasks';

describe('Tasks API Tests', () => {
    let createdTaskId: number;

    // Limpiar tareas antes de cada test
    beforeEach(async () => {
        const taskRepo = AppDataSource.getRepository(Task);
        await taskRepo.clear();
    });

    test('POST /tasks - Crear tarea', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ title: 'Tarea de prueba' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Tarea de prueba');
        expect(response.body.completed).toBe(false);

        createdTaskId = response.body.id;
    });

    test('POST /tasks - Error si falta título', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Title is required');
    });

    test('GET /tasks - Obtener todas las tareas', async () => {
        // Crear una tarea primero
        await request(app)
            .post('/tasks')
            .send({ title: 'Tarea existente' });

        const response = await request(app).get('/tasks');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('PUT /tasks/:id/complete - Marcar como completada', async () => {
        // Crear tarea primero
        const createRes = await request(app)
            .post('/tasks')
            .send({ title: 'Para completar' });
        const taskId = createRes.body.id;

        const response = await request(app)
            .put(`/tasks/${taskId}/complete`);

        expect(response.status).toBe(200);
        expect(response.body.completed).toBe(true);
    });

    test('DELETE /tasks/:id - Eliminar tarea', async () => {
        // Crear tarea primero
        const createRes = await request(app)
            .post('/tasks')
            .send({ title: 'Para eliminar' });
        const taskId = createRes.body.id;

        const response = await request(app)
            .delete(`/tasks/${taskId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task deleted');
    });

    test('GET /tasks/:id - Tarea no encontrada', async () => {
        const response = await request(app).get('/tasks/99999');

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Task not found');
    });
});
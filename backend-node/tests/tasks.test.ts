import request from 'supertest';
import app from '../src/app';

describe('Tasks API Tests', () => {
    let createdTaskId: number;

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
        const response = await request(app).get('/tasks');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('PUT /tasks/:id/complete - Marcar como completada', async () => {
        const response = await request(app)
            .put(`/tasks/${createdTaskId}/complete`);

        expect(response.status).toBe(200);
        expect(response.body.completed).toBe(true);
    });

    test('DELETE /tasks/:id - Eliminar tarea', async () => {
        const response = await request(app)
            .delete(`/tasks/${createdTaskId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task deleted');
    });

    test('GET /tasks/:id - Tarea no encontrada', async () => {
        const response = await request(app).get('/tasks/99999');

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Task not found');
    });
});
import { AppDataSource } from '../src/database/data-source';

beforeAll(async () => {
    // Inicializar base de datos antes de todos los tests
    await AppDataSource.initialize();
    console.log('📦 Test database connected');
});

afterAll(async () => {
    // Cerrar conexión después de todos los tests
    await AppDataSource.destroy();
    console.log('🔌 Test database disconnected');
});
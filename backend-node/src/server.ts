import "reflect-metadata";
import app from "./app";
import { AppDataSource, initializeDatabase } from "./database/data-source";

const PORT = process.env.PORT || 8000;

// Función para iniciar el servidor
const startServer = async () => {
    try {
        // Inicializar base de datos (crea tablas automáticamente por synchronize: true)
        await initializeDatabase();

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`🚀 Swagger Doc: http://localhost:${PORT}/docs`);
            console.log(`📝 Tasks API: http://localhost:${PORT}/tasks`);
            console.log(`✅ Health check: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
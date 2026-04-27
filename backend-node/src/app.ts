import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import taskRoutes from "./api/routes/tasks";

const app = express();

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Manager API",
            version: "2.0.0",
            description: "API para gestión de tareas - Migrada de Python a Node.js",
            contact: {
                name: "DevOps Team",
            },
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "Servidor de desarrollo",
            },
            {
                url: "http://localhost:3001",
                description: "Servidor Docker",
            },
        ],
    },
    apis: ["./src/api/routes/*.ts", "./src/schemas/*.ts"], // Archivos con anotaciones Swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Endpoint para obtener la especificación JSON
app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

// Rutas
app.use("/tasks", taskRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({ message: "API funcionando correctamente" });
});

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date() });
});

export default app;
import express from "express";
import cors from "cors";
import taskRoutes from "./api/routes/tasks";

const app = express();

// Middleware
app.use(cors({
    origin: "*",  // luego puedes limitar a localhost:3000
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/tasks", taskRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({ message: "API funcionando correctamente" });
});

// Health check (útil para Docker)
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date() });
});

export default app;
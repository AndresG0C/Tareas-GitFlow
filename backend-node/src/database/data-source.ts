import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "../entities/Task";
import dotenv from "dotenv";
import path from "path";

// Cargar .env desde la raíz del proyecto
dotenv.config({ path: path.join(__dirname, "../../../.env") });

const DATABASE_URL = process.env.DATABASE_URL || "sqlite:///./database.sqlite";

function getDataSourceConfig() {
    // SQLite
    if (DATABASE_URL.includes("sqlite")) {
        const dbPath = DATABASE_URL.replace("sqlite:///", "");
        return {
            type: "sqlite" as const,
            database: dbPath,
            synchronize: true,
            logging: false,
            entities: [Task],
        };
    }

    // MySQL (para Docker)
    if (DATABASE_URL.includes("mysql")) {
        const match = DATABASE_URL.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
        if (!match) throw new Error("Invalid MySQL DATABASE_URL");

        const [, username, password, host, port, database] = match;
        return {
            type: "mysql" as const,
            host,
            port: parseInt(port),
            username,
            password,
            database,
            synchronize: true,
            logging: false,
            entities: [Task],
        };
    }

    throw new Error("Unsupported DATABASE_URL");
}

export const AppDataSource = new DataSource(getDataSourceConfig());

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("✅ Database connected");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};
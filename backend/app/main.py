from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import tasks
from app.database import Base, engine

# Inicializar app
app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # luego puedes limitar a localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear tablas
Base.metadata.create_all(bind=engine)

# Rutas
app.include_router(tasks.router)

# Ruta de prueba
@app.get("/")
def read_root():
    return {"message": "API funcionando correctamente"}
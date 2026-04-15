from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import schemas
from app.crud import task_crud

router = APIRouter(prefix="/tasks", tags=["tasks"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return task_crud.create_task(db, task)

@router.get("/")
def get_tasks(db: Session = Depends(get_db)):
    return task_crud.get_tasks(db)

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task_crud.delete_task(db, task_id)
    return {"message": "Task deleted"}

@router.put("/{task_id}/complete")
def complete_task(task_id: int, db: Session = Depends(get_db)):
    return task_crud.complete_task(db, task_id)
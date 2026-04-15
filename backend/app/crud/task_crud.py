from sqlalchemy.orm import Session
from app import models, schemas

def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(title=task.title)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_tasks(db: Session):
    return db.query(models.Task).all()

def delete_task(db: Session, task_id: int):
    task = db.get(models.Task, task_id)
    if task:
        db.delete(task)
        db.commit()

def complete_task(db: Session, task_id: int):
    task = db.get(models.Task, task_id)
    if task:
        task.completed = True
        db.commit()
        db.refresh(task)
    return task
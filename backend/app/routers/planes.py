from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Plan
from app.schemas import PlanResponse, PlanCreate, PlanUpdate
from app.auth import get_current_user

router = APIRouter(prefix="/api/planes", tags=["Planes"])

@router.get("", response_model=List[PlanResponse])
def get_planes(db: Session = Depends(get_db)):
    return db.query(Plan).order_by(Plan.orden).all()

@router.post("", response_model=PlanResponse, status_code=status.HTTP_201_CREATED)
def create_plan(plan: PlanCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_plan = Plan(**plan.model_dump())
    db.add(db_plan)
    db.commit()
    db.refresh(db_plan)
    return db_plan

@router.put("/{plan_id}", response_model=PlanResponse)
def update_plan(plan_id: int, plan_update: PlanUpdate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_plan = db.query(Plan).filter(Plan.id == plan_id).first()
    if not db_plan:
        raise HTTPException(status_code=404, detail="Plan no encontrado")
    
    update_data = plan_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_plan, key, value)
        
    db.commit()
    db.refresh(db_plan)
    return db_plan

@router.delete("/{plan_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_plan(plan_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_plan = db.query(Plan).filter(Plan.id == plan_id).first()
    if not db_plan:
        raise HTTPException(status_code=404, detail="Plan no encontrado")
        
    db.delete(db_plan)
    db.commit()
    return None


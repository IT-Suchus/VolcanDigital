from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Lead
from app.schemas import LeadCreate, LeadResponse, LeadUpdate
from app.auth import get_current_user

router = APIRouter(tags=["Leads"])

@router.post("/api/leads", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    db_lead = Lead(**lead.model_dump())
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead

@router.get("/api/admin/leads", response_model=List[LeadResponse])
def get_leads(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    return db.query(Lead).order_by(Lead.created_at.desc()).offset(skip).limit(limit).all()

@router.patch("/api/admin/leads/{lead_id}", response_model=LeadResponse)
def update_lead(lead_id: int, lead_update: LeadUpdate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not db_lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    db_lead.estado = lead_update.estado
    db.commit()
    db.refresh(db_lead)
    return db_lead

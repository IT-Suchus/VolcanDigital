from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from fastapi.responses import Response
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Integrante
from app.schemas import IntegranteResponse, IntegranteCreate, IntegranteUpdate
from app.auth import get_current_user

router = APIRouter(prefix="/api/equipo", tags=["Equipo"])

@router.get("", response_model=List[IntegranteResponse])
def get_equipo(db: Session = Depends(get_db)):
    return db.query(Integrante).order_by(Integrante.orden).all()

@router.post("", response_model=IntegranteResponse, status_code=status.HTTP_201_CREATED)
def create_integrante(integrante: IntegranteCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_integrante = Integrante(**integrante.model_dump())
    db.add(db_integrante)
    db.commit()
    db.refresh(db_integrante)
    return db_integrante

@router.put("/{member_id}", response_model=IntegranteResponse)
def update_integrante(member_id: int, integrante_update: IntegranteUpdate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_integrante = db.query(Integrante).filter(Integrante.id == member_id).first()
    if not db_integrante:
        raise HTTPException(status_code=404, detail="Integrante del equipo no encontrado")
    
    update_data = integrante_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_integrante, key, value)
        
    db.commit()
    db.refresh(db_integrante)
    return db_integrante

@router.delete("/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_integrante(member_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_integrante = db.query(Integrante).filter(Integrante.id == member_id).first()
    if not db_integrante:
        raise HTTPException(status_code=404, detail="Integrante del equipo no encontrado")
        
    db.delete(db_integrante)
    db.commit()
    return None

@router.put("/{member_id}/imagen")
async def upload_integrante_imagen(member_id: int, file: UploadFile = File(...), db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    content_type = file.content_type
    
    # Fallback robusto al nombre del archivo para detectar el tipo mime si es genérico
    if content_type in ["application/octet-stream", "", None] and file.filename:
        ext = file.filename.split(".")[-1].lower()
        if ext in ["jpg", "jpeg"]:
            content_type = "image/jpeg"
        elif ext == "png":
            content_type = "image/png"
        elif ext == "webp":
            content_type = "image/webp"

    # Validar formato
    if content_type not in ["image/jpeg", "image/jpg", "image/png", "image/webp"]:
        raise HTTPException(
            status_code=400, 
            detail=f"Formato de imagen inválido ({content_type}). Solo se admiten JPG, PNG y WEBP."
        )
    
    # Validar tamaño (< 5MB)
    contents = await file.read()
    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="La imagen excede el límite de 5MB.")
        
    db_member = db.query(Integrante).filter(Integrante.id == member_id).first()
    if not db_member:
        raise HTTPException(status_code=404, detail="Integrante del equipo no encontrado")
        
    db_member.imagen_data = contents
    db_member.imagen_tipo = content_type
    db.commit()
    
    return {"ok": True, "id": member_id}

@router.get("/{member_id}/imagen")
def get_integrante_imagen(member_id: int, db: Session = Depends(get_db)):
    db_member = db.query(Integrante).filter(Integrante.id == member_id).first()
    if not db_member or not db_member.imagen_data:
        raise HTTPException(status_code=404, detail="Imagen no encontrada")
        
    return Response(content=db_member.imagen_data, media_type=db_member.imagen_tipo)



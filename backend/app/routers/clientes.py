from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from fastapi.responses import Response
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Cliente
from app.schemas import ClienteResponse, ClienteCreate, ClienteUpdate
from app.auth import get_current_user

router = APIRouter(prefix="/api/clientes", tags=["Clientes"])

@router.get\("\), response_model=List[ClienteResponse])
def get_clientes(db: Session = Depends(get_db)):
    clientes = db.query(Cliente).filter(Cliente.activo == True).order_by(Cliente.orden).all()
    return clientes

@router.get("/admin", response_model=List[ClienteResponse])
def get_clientes_admin(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    # Returns all clients including inactive ones for management
    return db.query(Cliente).order_by(Cliente.orden).all()

@router.post\("\), response_model=ClienteResponse, status_code=status.HTTP_201_CREATED)
def create_cliente(cliente: ClienteCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_cliente = Cliente(**cliente.model_dump())
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

@router.put("/{cliente_id}", response_model=ClienteResponse)
def update_cliente(cliente_id: int, cliente_update: ClienteUpdate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not db_cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    
    update_data = cliente_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_cliente, key, value)
        
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

@router.delete("/{cliente_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_cliente(cliente_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not db_cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
        
    db.delete(db_cliente)
    db.commit()
    return None

@router.put("/{cliente_id}/imagen")
async def upload_cliente_imagen(cliente_id: int, file: UploadFile = File(...), db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
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
        
    db_cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not db_cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
        
    db_cliente.imagen_data = contents
    db_cliente.imagen_tipo = content_type
    db.commit()
    
    return {"ok": True, "id": cliente_id}

@router.get("/{cliente_id}/imagen")
def get_cliente_imagen(cliente_id: int, db: Session = Depends(get_db)):
    db_cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not db_cliente or not db_cliente.imagen_data:
        raise HTTPException(status_code=404, detail="Imagen no encontrada")
        
    return Response(content=db_cliente.imagen_data, media_type=db_cliente.imagen_tipo)



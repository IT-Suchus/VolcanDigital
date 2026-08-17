from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Configuracion
from app.schemas import ConfiguracionResponse, ConfiguracionUpdate
from app.auth import require_admin

router = APIRouter(prefix="/api/configuracion", tags=["Configuración"])

CONFIG_ID = 1


def _get_or_create(db: Session) -> Configuracion:
    config = db.query(Configuracion).filter(Configuracion.id == CONFIG_ID).first()
    if not config:
        config = Configuracion(id=CONFIG_ID)
        db.add(config)
        db.commit()
        db.refresh(config)
    return config


@router.get("", response_model=ConfiguracionResponse)
def get_configuracion(db: Session = Depends(get_db)):
    # Público: el frontend público necesita leer el meta tag para inyectarlo en el <head>.
    return _get_or_create(db)


@router.put("", response_model=ConfiguracionResponse)
def update_configuracion(
    config_update: ConfiguracionUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_admin),
):
    config = _get_or_create(db)
    update_data = config_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(config, key, value)
    db.commit()
    db.refresh(config)
    return config

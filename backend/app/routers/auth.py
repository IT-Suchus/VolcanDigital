from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Usuario
from app.schemas import (
    UsuarioRegister,
    UsuarioLogin,
    UsuarioAdminUpdate,
    UsuarioResponse,
    LoginResponse,
)
from app.auth import (
    verify_password,
    hash_password,
    create_token,
    check_rate_limit,
    record_failed_attempt,
    clear_attempts,
    require_admin,
)

router = APIRouter(prefix="/api/auth", tags=["Autenticación"])


# ─── Public: Register ─────────────────────────────────────────────────────────

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: UsuarioRegister, db: Session = Depends(get_db)):
    """
    Registro público. El usuario queda en estado 'pendiente' hasta que
    un administrador lo apruebe desde el panel.
    """
    existing = db.query(Usuario).filter(Usuario.email == data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Ya existe una cuenta registrada con ese email.",
        )

    new_user = Usuario(
        nombre=data.nombre,
        email=data.email,
        hashed_password=hash_password(data.password),
        rol="colaborador",
        estado="pendiente",
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Registro exitoso. Tu cuenta está pendiente de aprobación por un administrador.",
        "email": new_user.email,
    }


# ─── Public: Login ────────────────────────────────────────────────────────────

@router.post("/login", response_model=LoginResponse)
def login(data: UsuarioLogin, request: Request, db: Session = Depends(get_db)):
    client_ip = request.client.host if request.client else "unknown"

    # Rate limit check BEFORE hitting the DB
    check_rate_limit(client_ip)

    user = db.query(Usuario).filter(Usuario.email == data.email).first()

    # Generic error for unknown user (don't leak info)
    if not user or not verify_password(data.password, user.hashed_password):
        record_failed_attempt(client_ip)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos.",
        )

    # Check account estado
    if user.estado == "pendiente":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Tu cuenta está pendiente de aprobación. Un administrador debe activarla.",
        )
    if user.estado == "rechazado":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Tu acceso ha sido rechazado. Contactate con el administrador.",
        )

    # Successful login → clear failed attempts
    clear_attempts(client_ip)

    token = create_token({"sub": user.email, "rol": user.rol, "id": user.id})

    return {
        "token": token,
        "email": user.email,
        "rol": user.rol,
        "nombre": user.nombre,
    }


# ─── Admin: Gestión de Usuarios ───────────────────────────────────────────────

@router.get(
    "/admin/usuarios",
    response_model=List[UsuarioResponse],
    tags=["Admin - Usuarios"],
)
def list_usuarios(
    db: Session = Depends(get_db),
    _admin: dict = Depends(require_admin),
):
    """Lista todos los usuarios (solo administradores)."""
    return db.query(Usuario).order_by(Usuario.created_at.desc()).all()


@router.patch(
    "/admin/usuarios/{usuario_id}",
    response_model=UsuarioResponse,
    tags=["Admin - Usuarios"],
)
def update_usuario(
    usuario_id: int,
    update_data: UsuarioAdminUpdate,
    db: Session = Depends(get_db),
    admin: dict = Depends(require_admin),
):
    """
    Modifica estado, rol o nombre de un usuario.
    Un administrador no puede modificar su propio rol/estado.
    """
    user = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    # Prevent admin from locking themselves out
    if user.email == admin.get("sub") and update_data.estado in ("pendiente", "rechazado"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No podés cambiar tu propio estado a pendiente o rechazado.",
        )

    if update_data.estado is not None:
        allowed_estados = ("pendiente", "activo", "rechazado")
        if update_data.estado not in allowed_estados:
            raise HTTPException(status_code=400, detail=f"Estado inválido. Use: {allowed_estados}")
        user.estado = update_data.estado

    if update_data.rol is not None:
        allowed_roles = ("administrador", "desarrollador", "colaborador")
        if update_data.rol not in allowed_roles:
            raise HTTPException(status_code=400, detail=f"Rol inválido. Use: {allowed_roles}")
        user.rol = update_data.rol

    if update_data.nombre is not None:
        user.nombre = update_data.nombre

    db.commit()
    db.refresh(user)
    return user


@router.delete(
    "/admin/usuarios/{usuario_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Admin - Usuarios"],
)
def delete_usuario(
    usuario_id: int,
    db: Session = Depends(get_db),
    admin: dict = Depends(require_admin),
):
    """Elimina un usuario. El admin no puede eliminarse a sí mismo."""
    user = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    if user.email == admin.get("sub"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No podés eliminar tu propio usuario.",
        )

    db.delete(user)
    db.commit()

from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# Leads
class LeadCreate(BaseModel):
    nombre: str = Field(..., min_length=2)
    email: EmailStr
    telefono: Optional[str] = None
    negocio: Optional[str] = None
    mensaje: str = Field(..., min_length=10)
    plan_interes: Optional[str] = None
    origen: Optional[str] = None

class LeadUpdate(BaseModel):
    estado: str

class LeadResponse(LeadCreate):
    id: int
    estado: str
    created_at: datetime

    class Config:
        from_attributes = True

# Clientes
class ClienteCreate(BaseModel):
    nombre: str
    sitio_url: Optional[str] = None
    rubro: Optional[str] = None
    testimonio: Optional[str] = None
    resultado_destacado: Optional[str] = None
    orden: int = 0
    activo: bool = True
    color_primario: Optional[str] = Field(None, max_length=7)
    color_secundario: Optional[str] = Field(None, max_length=7)

class ClienteUpdate(BaseModel):
    nombre: Optional[str] = None
    sitio_url: Optional[str] = None
    rubro: Optional[str] = None
    testimonio: Optional[str] = None
    resultado_destacado: Optional[str] = None
    orden: Optional[int] = None
    activo: Optional[bool] = None
    color_primario: Optional[str] = Field(None, max_length=7)
    color_secundario: Optional[str] = Field(None, max_length=7)

class ClienteResponse(ClienteCreate):
    id: int
    tiene_imagen: bool

    class Config:
        from_attributes = True

# Planes
class PlanCreate(BaseModel):
    nombre: str
    precio_promo: Optional[int] = None
    precio_regular: Optional[int] = None
    duracion_promo_meses: Optional[int] = None
    descripcion: Optional[str] = None
    incluye: Optional[List[str]] = None
    no_incluye: Optional[List[str]] = None
    orden: int = 0

class PlanUpdate(BaseModel):
    nombre: Optional[str] = None
    precio_promo: Optional[int] = None
    precio_regular: Optional[int] = None
    duracion_promo_meses: Optional[int] = None
    descripcion: Optional[str] = None
    incluye: Optional[List[str]] = None
    no_incluye: Optional[List[str]] = None
    orden: Optional[int] = None

class PlanResponse(PlanCreate):
    id: int

    class Config:
        from_attributes = True

# Equipo
class IntegranteCreate(BaseModel):
    nombre: str
    rol: str
    orden: int = 0

class IntegranteUpdate(BaseModel):
    nombre: Optional[str] = None
    rol: Optional[str] = None
    orden: Optional[int] = None

class IntegranteResponse(IntegranteCreate):
    id: int
    tiene_imagen: bool

    class Config:
        from_attributes = True

# Usuarios
class UsuarioCreate(BaseModel):
    email: EmailStr
    password: str
    rol: str

class UsuarioLogin(BaseModel):
    email: EmailStr
    password: str

class UsuarioResponse(BaseModel):
    id: int
    email: EmailStr
    rol: str

    class Config:
        from_attributes = True

class LoginResponse(BaseModel):
    token: str
    email: str
    rol: str



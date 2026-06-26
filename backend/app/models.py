from sqlalchemy import Column, Integer, String, Text, Boolean, JSON, DateTime, LargeBinary
from sqlalchemy.sql import func
from app.database import Base

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    telefono = Column(String(50), nullable=True)
    negocio = Column(String(255), nullable=True)
    mensaje = Column(Text, nullable=False)
    plan_interes = Column(String(100), nullable=True)
    origen = Column(String(100), nullable=True)
    estado = Column(String(50), default="nuevo")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    imagen_data = Column(LargeBinary, nullable=True)
    imagen_tipo = Column(String(40), nullable=True)
    sitio_url = Column(String(500), nullable=True)
    rubro = Column(String(255), nullable=True)
    testimonio = Column(Text, nullable=True)
    resultado_destacado = Column(String(255), nullable=True)
    orden = Column(Integer, default=0)
    activo = Column(Boolean, default=True)
    color_primario = Column(String(7), nullable=True)
    color_secundario = Column(String(7), nullable=True)

    @property
    def tiene_imagen(self):
        return self.imagen_data is not None

class Plan(Base):
    __tablename__ = "planes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    precio_promo = Column(Integer, nullable=True) # Precio en ARS, mejor Integer para simplificar si no hay decimales
    precio_regular = Column(Integer, nullable=True)
    duracion_promo_meses = Column(Integer, nullable=True)
    descripcion = Column(Text, nullable=True)
    incluye = Column(JSON, nullable=True)
    no_incluye = Column(JSON, nullable=True)
    orden = Column(Integer, default=0)

class Integrante(Base):
    __tablename__ = "equipo"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    rol = Column(String(255), nullable=False)
    imagen_data = Column(LargeBinary, nullable=True)
    imagen_tipo = Column(String(40), nullable=True)
    orden = Column(Integer, default=0)

    @property
    def tiene_imagen(self):
        return self.imagen_data is not None

class MetricaRequest(Base):
    __tablename__ = "metricas_request"

    id = Column(Integer, primary_key=True, index=True)
    endpoint = Column(String(255), nullable=False)
    metodo = Column(String(10), nullable=False)
    status_code = Column(Integer, nullable=False)
    tiempo_respuesta_ms = Column(Integer, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    rol = Column(String(50), nullable=False) # "administrador" o "desarrollador"


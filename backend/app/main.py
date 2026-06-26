import os
import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.routers import clientes, planes, equipo, leads, metricas, auth
from app.database import SessionLocal
from app.models import MetricaRequest

app = FastAPI(title="Volcán Digital API", description="API para el sitio web de Volcán Digital")

# Middleware para registrar cada request en la base de datos
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    
    response = await call_next(request)
    
    process_time_ms = int((time.time() - start_time) * 1000)
    
    try:
        db = SessionLocal()
        log_entry = MetricaRequest(
            endpoint=request.url.path,
            metodo=request.method,
            status_code=response.status_code,
            tiempo_respuesta_ms=process_time_ms
        )
        db.add(log_entry)
        db.commit()
    except Exception as e:
        print(f"Error logging request metrics: {e}")
    finally:
        if 'db' in locals():
            db.close()
            
    return response

# Configurar CORS
origins = [
    "http://localhost:5173", # Vite dev server
    "http://127.0.0.1:5173",
    # Add production URL later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(auth.router)
app.include_router(clientes.router)
app.include_router(planes.router)
app.include_router(equipo.router)
app.include_router(leads.router)
app.include_router(metricas.router)

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}

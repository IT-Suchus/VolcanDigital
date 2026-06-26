from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
from app.database import get_db
from app.models import Lead, Cliente, MetricaRequest
from app.auth import get_current_user

router = APIRouter(prefix="/api/admin/metricas", tags=["Métricas"], dependencies=[Depends(get_current_user)])

@router.get("/leads-por-mes", response_model=List[Dict[str, Any]])
def get_leads_por_mes(db: Session = Depends(get_db)):
    # Group by month for the last 12 months
    since_date = datetime.utcnow() - timedelta(days=365)
    results = db.query(
        func.to_char(Lead.created_at, 'YYYY-MM').label('mes'),
        func.count(Lead.id).label('cantidad')
    ).filter(Lead.created_at >= since_date)\
     .group_by('mes')\
     .order_by('mes')\
     .all()
    
    return [{"mes": row.mes, "cantidad": row.cantidad} for row in results]

@router.get("/leads-por-estado", response_model=List[Dict[str, Any]])
def get_leads_por_estado(db: Session = Depends(get_db)):
    results = db.query(
        Lead.estado.label('estado'),
        func.count(Lead.id).label('cantidad')
    ).group_by(Lead.estado).all()
    
    return [{"estado": row.estado, "cantidad": row.cantidad} for row in results]

@router.get("/leads-por-plan", response_model=List[Dict[str, Any]])
def get_leads_por_plan(db: Session = Depends(get_db)):
    results = db.query(
        Lead.plan_interes.label('plan'),
        func.count(Lead.id).label('cantidad')
    ).group_by(Lead.plan_interes).all()
    
    return [{"plan": row.plan or "General", "cantidad": row.cantidad} for row in results]

@router.get("/resumen", response_model=Dict[str, Any])
def get_resumen(db: Session = Depends(get_db)):
    total_leads = db.query(func.count(Lead.id)).scalar() or 0
    ganados = db.query(func.count(Lead.id)).filter(Lead.estado == 'ganado').scalar() or 0
    tasa_conversion = (ganados / total_leads * 100) if total_leads > 0 else 0.0
    
    clientes_activos = db.query(func.count(Cliente.id)).filter(Cliente.activo == True).scalar() or 0
    
    recent_lead = db.query(Lead).order_by(Lead.created_at.desc()).first()
    lead_mas_reciente = recent_lead.nombre if recent_lead else None
    
    return {
        "total_leads": total_leads,
        "tasa_conversion": round(tasa_conversion, 1),
        "clientes_activos": clientes_activos,
        "lead_mas_reciente": lead_mas_reciente
    }

@router.get("/tecnicas/resumen", response_model=Dict[str, Any])
def get_tecnicas_resumen(db: Session = Depends(get_db)):
    since_date = datetime.utcnow() - timedelta(hours=24)
    
    # 1. Total requests (last 24 hours)
    total_requests = db.query(func.count(MetricaRequest.id))\
        .filter(MetricaRequest.timestamp >= since_date)\
        .scalar() or 0
        
    # 2. Average response time (last 24 hours)
    avg_response_time = db.query(func.avg(MetricaRequest.tiempo_respuesta_ms))\
        .filter(MetricaRequest.timestamp >= since_date)\
        .scalar() or 0.0
    avg_response_time = round(float(avg_response_time), 1)
    
    # 3. Error rate % (status >= 400)
    error_requests = db.query(func.count(MetricaRequest.id))\
        .filter(MetricaRequest.timestamp >= since_date, MetricaRequest.status_code >= 400)\
        .scalar() or 0
        
    tasa_error = (error_requests / total_requests * 100) if total_requests > 0 else 0.0
    tasa_error = round(tasa_error, 2)
    
    return {
        "tiempo_respuesta_promedio": avg_response_time,
        "cantidad_total": total_requests,
        "tasa_error": tasa_error
    }

@router.get("/tecnicas/tiempo-respuesta", response_model=List[Dict[str, Any]])
def get_tecnicas_tiempo_respuesta(db: Session = Depends(get_db)):
    since_date = datetime.utcnow() - timedelta(hours=24)
    
    # Group by hour and sort chronologically
    results = db.query(
        func.to_char(func.date_trunc('hour', MetricaRequest.timestamp), 'HH24:00').label('hora'),
        func.avg(MetricaRequest.tiempo_respuesta_ms).label('tiempo_promedio'),
        func.date_trunc('hour', MetricaRequest.timestamp).label('hour_truncated')
    ).filter(MetricaRequest.timestamp >= since_date)\
     .group_by('hour_truncated', 'hora')\
     .order_by('hour_truncated')\
     .all()
     
    return [{"hora": row.hora, "tiempo_promedio": round(float(row.tiempo_promedio), 1)} for row in results]

@router.get("/tecnicas/requests-por-endpoint", response_model=List[Dict[str, Any]])
def get_tecnicas_requests_por_endpoint(db: Session = Depends(get_db)):
    since_date = datetime.utcnow() - timedelta(hours=24)
    
    results = db.query(
        MetricaRequest.endpoint.label('endpoint'),
        func.count(MetricaRequest.id).label('cantidad')
    ).filter(MetricaRequest.timestamp >= since_date)\
     .group_by(MetricaRequest.endpoint)\
     .order_by(func.count(MetricaRequest.id).desc())\
     .limit(10)\
     .all()
     
    return [{"endpoint": row.endpoint, "cantidad": row.cantidad} for row in results]

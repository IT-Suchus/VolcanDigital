import os
from sqlalchemy.orm import Session
from app.database import engine, Base, SessionLocal
from app.models import Cliente, Plan, Integrante, Usuario
from app.auth import hash_password

def seed_data(db: Session):
    # 1. Seed Planes
    if not db.query(Plan).first():
        planes = [
            Plan(
                nombre="Impulso",
                precio_promo=200000,
                precio_regular=300000,
                duracion_promo_meses=2,
                descripcion="Ideal para negocios que recién empiezan o quieren ordenar su presencia.",
                incluye=[
                    "Diagnóstico inicial",
                    "Configuración/revisión de cuenta",
                    "Hasta 2 campañas activas",
                    "Estrategia inicial de captación",
                    "Optimización y seguimiento",
                    "Ajustes estratégicos",
                    "Reporte mensual",
                    "Recomendaciones básicas",
                    "Guionado de anuncios"
                ],
                no_incluye=[
                    "Manejo orgánico de redes",
                    "Respuesta de mensajes",
                    "Diseño/edición de piezas",
                    "Filmación/edición de video",
                    "Inversión publicitaria"
                ],
                orden=1
            ),
            Plan(
                nombre="Performance",
                precio_promo=400000,
                precio_regular=600000,
                duracion_promo_meses=2,
                descripcion="Para negocios con validación que buscan escalar sus ventas con anuncios más agresivos.",
                incluye=[
                    "Diagnóstico inicial",
                    "Configuración/revisión de cuenta",
                    "Hasta 4 campañas activas",
                    "Estrategia de captación según objetivos",
                    "Optimización intensiva",
                    "Ajustes según rendimiento",
                    "Reporte mensual",
                    "Recomendaciones de mejora digital",
                    "Guionado de videos/piezas",
                    "Adaptación de hasta 4 creativos mensuales"
                ],
                no_incluye=[
                    "Manejo orgánico",
                    "Respuesta de mensajes",
                    "Diseño ilimitado",
                    "Filmación de videos",
                    "Inversión publicitaria"
                ],
                orden=2
            ),
            Plan(
                nombre="Growth",
                precio_promo=800000,
                precio_regular=800000, # Desde 800k
                duracion_promo_meses=0,
                descripcion="Dirección y ejecución integral para escalar negocios facturando a buen volumen.",
                incluye=[
                    "Diagnóstico profundo",
                    "Revisión de todo el ecosistema digital",
                    "Plan mensual de captación",
                    "Gestión avanzada de Meta Ads",
                    "Posibilidad de Google Ads",
                    "Estrategia por objetivo",
                    "Optimización prioritaria",
                    "Análisis de métricas del negocio",
                    "Reunión estratégica mensual",
                    "Reporte ejecutivo mensual",
                    "Recomendaciones integrales",
                    "Dirección creativa",
                    "Coordinación de creativos",
                    "Roadmap de crecimiento"
                ],
                no_incluye=[
                    "Manejo orgánico",
                    "Respuesta de mensajes",
                    "Diseño ilimitado",
                    "Filmación de videos",
                    "Inversión publicitaria"
                ],
                orden=3
            )
        ]
        db.add_all(planes)
        db.commit()
        print("Planes insertados.")

    # 2. Seed Clientes
    if not db.query(Cliente).first():
        clientes = [
            Cliente(nombre="Alma Flora", sitio_url="https://almaflora.com.ar", rubro="Vivero / Tienda de plantas", resultado_destacado="+40% en consultas", orden=1),
            Cliente(nombre="Brindo", sitio_url="https://brindocopas.com", rubro="Cristalería", resultado_destacado="Crecimiento sostenido en ventas online", orden=2),
            Cliente(nombre="Dra. Vitoria Carvalho", sitio_url="https://instagram.com", rubro="Salud / Odontología", resultado_destacado="Agenda completa mensual", orden=3),
            Cliente(nombre="Ale Bikes La Plata", sitio_url="https://instagram.com", rubro="Bicicletería", resultado_destacado="Aumento en reparaciones y ventas", orden=4),
            Cliente(nombre="BMT Abogados", sitio_url="https://bmtabogados.com.ar", rubro="Servicios Legales", resultado_destacado="Generación de leads B2B", orden=5)
        ]
        db.add_all(clientes)
        db.commit()
        print("Clientes insertados.")

    # 3. Seed Equipo
    if not db.query(Integrante).first():
        equipo = [
            Integrante(nombre="Pablo", rol="Desarrollo WordPress, tiendas online, Google Ads, GA4", orden=1),
            Integrante(nombre="Vitoria", rol="Estrategia general, SEO, Meta Ads", orden=2),
            Integrante(nombre="Lara", rol="Especialista en Meta Ads y ejecución de campañas", orden=3)
        ]
        db.add_all(equipo)
        db.commit()
        print("Equipo insertado.")

    # 4. Seed Usuarios
    if not db.query(Usuario).first():
        usuarios = [
            Usuario(
                email="admin@volcandigital.com.ar",
                hashed_password=hash_password("volcan2026"),
                rol="administrador"
            ),
            Usuario(
                email="developer@volcandigital.com.ar",
                hashed_password=hash_password("volcan2026"),
                rol="desarrollador"
            )
        ]
        db.add_all(usuarios)
        db.commit()
        print("Usuarios insertados.")

if __name__ == "__main__":
    db = SessionLocal()
    try:
        seed_data(db)
        print("Seed completado.")
    finally:
        db.close()

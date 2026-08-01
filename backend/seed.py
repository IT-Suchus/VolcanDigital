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
                tiene_promo=True,
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
                tiene_promo=True,
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
                tiene_promo=False,
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
            Cliente(
                nombre="Alma Flora", 
                sitio_url="https://almaflora.com.ar", 
                rubro="Vivero / Tienda de plantas", 
                resultado_destacado="+40% en consultas", 
                orden=1,
                color_primario="#2E7D32",
                descripcion="E-commerce y tienda botánica dedicada a la venta de plantas de interior, macetas de diseño y asesoramiento de paisajismo urbano.",
                como_llego="Llegaron dependiendo del público presencial del barrio y referencias locales. No poseían un canal digital estructurado para captar clientes constantes.",
                como_mejoro="Diseñamos campañas de conversión directa en Meta Ads dirigidas a amantes de la botánica, optimizamos su catálogo web y aceleramos el canal de ventas por WhatsApp.",
                stats=[{"label": "Consultas Diarias", "valor": "+40%"}, {"label": "ROAS Meta", "valor": "4.2x"}, {"label": "Ventas Online", "valor": "+115%"}]
            ),
            Cliente(
                nombre="Brindo", 
                sitio_url="https://brindocopas.com", 
                rubro="Cristalería & Bazar Premium", 
                resultado_destacado="Crecimiento sostenido en ventas online", 
                orden=2,
                color_primario="#D3A784",
                descripcion="Marca especializada en cristalería de alta gama, copas de degustación y accesorios para sommeliers.",
                como_llego="Contaban con una tienda online poco optimizada y campañas publicitarias sin seguimiento de conversiones ni píxel configurado.",
                como_mejoro="Restructuramos el seguimiento con GA4 y Meta CAPI, implementamos campañas de retargeting dinámico y aumentamos el valor promedio de ticket.",
                stats=[{"label": "Facturación Web", "valor": "+180%"}, {"label": "ROAS Promedio", "valor": "5.1x"}, {"label": "Costo por Adquisición", "valor": "-35%"}]
            ),
            Cliente(
                nombre="Dra. Vitoria Carvalho", 
                sitio_url="https://instagram.com", 
                rubro="Salud / Odontología Estética", 
                resultado_destacado="Agenda completa mensual", 
                orden=3,
                color_primario="#0284C7",
                descripcion="Consultorio odontológico especializado en alineadores invisibles, diseño de sonrisa y estética dental avanzada.",
                como_llego="Dificultad para atraer pacientes para tratamientos de alto valor. Dependían de publicaciones orgánicas con bajo alcance.",
                como_mejoro="Creamos anuncios de video atractivos mostrando testimonios reales de pacientes y desarrollamos un embudo de reserva directa en WhatsApp.",
                stats=[{"label": "Pacientes Nuevos/Mes", "valor": "+65"}, {"label": "Ocupación Agenda", "valor": "100%"}, {"label": "Retorno Inversión", "valor": "6.4x"}]
            ),
            Cliente(
                nombre="Ale Bikes La Plata", 
                sitio_url="https://instagram.com", 
                rubro="Bicicletería & Taller Especializado", 
                resultado_destacado="Aumento en reparaciones y ventas", 
                orden=4,
                color_primario="#E65100",
                descripcion="Local de venta de bicicletas de competición, componentes urbanos y servicio técnico especializado.",
                como_llego="Alto stock acumulado y poca fluidez de servicios de taller durante la temporada baja.",
                como_mejoro="Lanzamos promociones estacionales geolocalizadas a 5 km a la redonda y un sistema de agendamiento para service rápido.",
                stats=[{"label": "Turnos Taller", "valor": "+85%"}, {"label": "Venta Bicicletas", "valor": "+45%"}, {"label": "Alcance Local", "valor": "25k personas"}]
            ),
            Cliente(
                nombre="BMT Abogados", 
                sitio_url="https://bmtabogados.com.ar", 
                rubro="Servicios Legales & Corporativos", 
                resultado_destacado="Generación de leads B2B", 
                orden=5,
                color_primario="#374151",
                descripcion="Estudio jurídico focalizado en asesoramiento corporativo, derecho comercial y protección patrimonial de empresas.",
                como_llego="Buscaban captar empresas y pymes que requieran abonos legales mensuales sin competir por precio.",
                como_mejoro="Diseñamos una landing page corporativa de alta conversión y campañas de búsqueda en Google Ads para términos calificados B2B.",
                stats=[{"label": "Consultas B2B", "valor": "+12/mes"}, {"label": "Tasa de Cierre", "valor": "38%"}, {"label": "Valor Cliente", "valor": "+210%"}]
            )
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
            # Usuario genérico inicial (eliminar una vez que crees tu propio usuario)
            Usuario(
                nombre="Acceso Inicial",
                email="acceso@volcandigital.com.ar",
                hashed_password=hash_password("Volcan2026!"),
                rol="administrador",
                estado="activo"
            ),
            # Usuarios del equipo técnico
            Usuario(
                nombre="Admin",
                email="admin@volcandigital.com.ar",
                hashed_password=hash_password("volcan2026"),
                rol="administrador",
                estado="activo"
            ),
            Usuario(
                nombre="Developer",
                email="developer@volcandigital.com.ar",
                hashed_password=hash_password("volcan2026"),
                rol="desarrollador",
                estado="activo"
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

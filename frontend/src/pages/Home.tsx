import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchClientes, Cliente } from '../lib/api';
import { Target, TrendingUp, Users, MonitorSmartphone } from 'lucide-react';

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    fetchClientes().then(data => {
      // Just show top 4 on home
      setClientes(data.slice(0, 4));
    }).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-volcan-night relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="absolute inset-0 bg-gradient-brand opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeUp>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white tracking-tight mb-6">
              Publicidad digital para negocios que quieren <span className="text-transparent bg-clip-text bg-gradient-brand">vender más</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 text-xl text-volcan-sand/90 max-w-2xl mx-auto mb-10">
              Ayudamos a tu negocio en cada etapa de crecimiento. Menos humo, más resultados medibles.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/5492216743529" className="btn-gradient-whatsapp btn-glow-whatsapp text-volcan-night px-8 py-4 rounded-xl font-bold hover:scale-[1.02] hover:opacity-95 transition-all duration-300 text-lg">
                Hablar por WhatsApp
              </a>
              <Link to="/servicios" className="bg-transparent border border-volcan-sand text-volcan-sand px-8 py-4 rounded-xl font-medium hover:bg-volcan-sand hover:text-volcan-night transition-colors text-lg">
                Ver servicios
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="bg-volcan-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <FadeUp delay={0.1}>
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-serif font-black text-volcan-ember leading-none mb-3">+10</div>
                <div className="text-volcan-stone font-semibold text-sm sm:text-base tracking-wider uppercase">Clientes activos</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-serif font-black text-volcan-ember leading-none mb-3">+2</div>
                <div className="text-volcan-stone font-semibold text-sm sm:text-base tracking-wider uppercase">Años de experiencia</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-serif font-black text-volcan-ember leading-none mb-3">ARG/BR</div>
                <div className="text-volcan-stone font-semibold text-sm sm:text-base tracking-wider uppercase">Presencia Internacional</div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Meta Ads Section */}
      <section className="bg-volcan-night text-volcan-sand py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Publicidad en Redes Sociales</h2>
                <p className="text-lg text-volcan-sand/80">
                  Creamos campañas rentables en Meta Ads (Instagram y Facebook) diseñadas específicamente para atraer clientes potenciales cualificados y aumentar tus ventas directas.
                </p>
                <ul className="space-y-4 pt-4">
                  <li className="flex items-center gap-3">
                    <Target className="text-volcan-ember" />
                    <span>Segmentación avanzada de audiencias</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <TrendingUp className="text-volcan-ember" />
                    <span>Optimización constante del ROAS</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Users className="text-volcan-ember" />
                    <span>Retargeting para recuperar carritos abandonados</span>
                  </li>
                </ul>
                <div className="pt-6">
                  <a href="https://wa.me/5492216743529" className="inline-flex text-volcan-ember font-medium hover:text-white transition-colors items-center gap-2">
                    Consultar por Meta Ads →
                  </a>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="relative">
                <div className="aspect-square bg-volcan-stone/30 rounded-3xl border border-volcan-stone p-8 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <MonitorSmartphone size={120} className="text-volcan-ember/50" />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Data Section */}
      <section className="bg-volcan-cream text-volcan-stone py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Medimos y usamos datos</h2>
            <p className="text-lg mb-12">
              No tomamos decisiones basadas en suposiciones. Implementamos analítica avanzada para saber exactamente qué funciona y escalar tu facturación.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FadeUp delay={0.1}>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-volcan-sand hover:border-volcan-ember/30 transition-colors">
                <div className="font-semibold text-lg">Google Analytics 4</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-volcan-sand hover:border-volcan-ember/30 transition-colors">
                <div className="font-semibold text-lg">Meta Pixel & CAPI</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-volcan-sand hover:border-volcan-ember/30 transition-colors">
                <div className="font-semibold text-lg">Looker Studio</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-volcan-sand hover:border-volcan-ember/30 transition-colors">
                <div className="font-semibold text-lg">Search Console</div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-gradient-brand py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8">¿Tenés dudas sobre qué necesita tu negocio?</h2>
            <Link to="/contacto" className="bg-white text-volcan-magma px-8 py-4 rounded-xl font-bold hover:bg-volcan-sand transition-colors text-lg inline-block shadow-xl">
              Agendar diagnóstico gratuito
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Clients Section */}
      <section className="bg-volcan-sand py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-volcan-night mb-4">Ellos nos eligen</h2>
              <p className="text-lg text-volcan-stone">Marcas que escalan su facturación con nosotros.</p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clientes.map((cliente, index) => (
              <FadeUp key={cliente.id} delay={0.1 * index}>
                <a href={cliente.sitio_url || '#'} target="_blank" rel="noreferrer" className="block group">
                  <div className="bg-white aspect-[3/2] rounded-2xl p-6 flex flex-col items-center justify-center border border-volcan-cream shadow-sm hover:shadow-md transition-all grayscale hover:grayscale-0 overflow-hidden">
                    {cliente.tiene_imagen ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/clientes/${cliente.id}/imagen`}
                        alt={cliente.nombre}
                        className="max-h-full max-w-full object-contain p-2"
                      />
                    ) : (
                      <>
                        <span className="font-serif font-bold text-xl text-center mb-2 group-hover:text-volcan-ember transition-colors">{cliente.nombre}</span>
                        <span className="text-xs text-volcan-stone/70">{cliente.rubro}</span>
                      </>
                    )}
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/clientes" className="text-volcan-ember font-medium hover:text-volcan-magma transition-colors">
              Ver todos los casos de éxito →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

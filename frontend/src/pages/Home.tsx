import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchClientes, Cliente } from '../lib/api';
import { Target, TrendingUp, Users, MonitorSmartphone, Flame, Zap, Quote, Heart, MessageCircle, Send } from 'lucide-react';

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
        {/* Decorative background icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <Flame className="absolute -top-10 left-10 text-volcan-ember/5 w-32 h-32 rotate-12" />
          <Zap className="absolute top-1/2 -right-12 text-volcan-taupe/5 w-48 h-48 -rotate-12" />
          <Quote className="absolute -bottom-16 left-1/4 text-volcan-ember/5 w-40 h-40 rotate-45" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeUp>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-semibold text-white tracking-[0.02em] mb-6">
              Publicidad digital para negocios que quieren <span className="text-volcan-ember">vender más</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 text-xl text-volcan-cream/90 max-w-2xl mx-auto mb-10">
              Ayudamos a tu negocio en cada etapa de crecimiento. Menos humo, más resultados medibles.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/5492216743529" className="bg-volcan-clay text-white px-8 py-4 rounded-xl font-bold hover:bg-volcan-ember hover:text-volcan-night transition-all duration-300 text-lg">
                Hablar por WhatsApp
              </a>
              <Link to="/servicios" className="bg-transparent border border-volcan-ember text-volcan-ember px-8 py-4 rounded-xl font-medium hover:bg-volcan-ember hover:text-volcan-night transition-colors text-lg">
                Ver servicios
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="bg-volcan-cream py-20 border-y border-volcan-taupe/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <FadeUp delay={0.1}>
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-serif font-bold text-volcan-ember leading-none mb-3">+10</div>
                <div className="text-volcan-night font-semibold text-sm sm:text-base tracking-wider uppercase">Clientes activos</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-serif font-bold text-volcan-ember leading-none mb-3">+2</div>
                <div className="text-volcan-night font-semibold text-sm sm:text-base tracking-wider uppercase">Años de experiencia</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-serif font-bold text-volcan-ember leading-none mb-3">ARG/BR</div>
                <div className="text-volcan-night font-semibold text-sm sm:text-base tracking-wider uppercase">Presencia Internacional</div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Meta Ads Section */}
      <section className="bg-volcan-night text-volcan-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Publicidad en Redes Sociales</h2>
                <p className="text-lg text-volcan-cream/80">
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
              <div className="relative aspect-square flex items-center justify-center">
                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-volcan-ember/10 rounded-full blur-3xl scale-75"></div>
                
                {/* Mock Ad Card */}
                <div className="relative w-full max-w-[320px] bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden border border-volcan-taupe/20 rotate-3 hover:rotate-0 transition-all duration-500 z-10">
                  {/* Header */}
                  <div className="p-4 flex items-center gap-3 border-b border-volcan-taupe/10">
                    <div className="w-10 h-10 rounded-full bg-volcan-clay flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-volcan-cream mt-0.5">
                        <path d="M12 2L22 20H2L12 2Z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-volcan-night text-sm leading-none mb-1">volcan.digital</div>
                      <div className="text-xs text-volcan-taupe">Publicidad</div>
                    </div>
                  </div>
                  
                  {/* Content Placeholder */}
                  <div className="aspect-[4/5] bg-volcan-cream flex flex-col items-center justify-center relative overflow-hidden group">
                     {/* Background pattern/gradient */}
                     <div className="absolute inset-0 bg-gradient-to-br from-volcan-clay/10 to-volcan-ember/20 group-hover:scale-105 transition-transform duration-700"></div>
                     <MonitorSmartphone size={80} className="text-volcan-ember/50 relative z-10 mb-4" />
                     
                     <div className="relative z-10 px-6 text-center">
                       <div className="font-serif font-bold text-2xl text-volcan-night mb-2">Multiplicá tus ventas</div>
                       <div className="text-sm text-volcan-clay font-medium bg-white/50 inline-block px-3 py-1 rounded-full backdrop-blur-sm">Con Meta Ads</div>
                     </div>
                     
                     {/* Floating ROAS badge */}
                     <div className="absolute bottom-4 right-4 bg-volcan-night text-white px-3 py-2 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2">
                       <TrendingUp size={18} className="text-volcan-ember" />
                       ROAS 4.5x
                     </div>
                  </div>
                  
                  {/* Action bar */}
                  <div className="p-4 bg-white">
                    <div className="flex items-center gap-4 mb-3 text-volcan-night">
                      <Heart size={24} className="hover:text-volcan-ember transition-colors cursor-pointer" />
                      <MessageCircle size={24} className="hover:text-volcan-ember transition-colors cursor-pointer" />
                      <Send size={24} className="hover:text-volcan-ember transition-colors cursor-pointer" />
                    </div>
                    <div className="text-sm">
                      <span className="font-bold text-volcan-night">volcan.digital</span> <span className="text-volcan-night/80">Escalá tus ventas con campañas rentables. Menos humo, más resultados. 🚀</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements behind/around */}
                <div className="absolute top-4 -right-2 bg-volcan-clay text-white p-4 rounded-2xl shadow-xl -rotate-12 animate-bounce z-20" style={{ animationDuration: '4s' }}>
                  <Target size={32} />
                </div>
                <div className="absolute -bottom-6 left-0 bg-white text-volcan-night p-4 rounded-2xl shadow-xl border border-volcan-taupe/20 rotate-6 z-20">
                  <div className="font-bold text-2xl mb-1 text-volcan-ember leading-none">+340%</div>
                  <div className="text-xs text-volcan-taupe font-medium uppercase tracking-wider">Más leads</div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Data Section */}
      <section className="bg-volcan-cream text-volcan-night py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Medimos y usamos datos</h2>
            <p className="text-lg mb-12">
              No tomamos decisiones basadas en suposiciones. Implementamos analítica avanzada para saber exactamente qué funciona y escalar tu facturación.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FadeUp delay={0.1}>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-volcan-taupe/20 hover:border-volcan-ember/50 transition-colors">
                <div className="font-semibold text-lg">Google Analytics 4</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-volcan-taupe/20 hover:border-volcan-ember/50 transition-colors">
                <div className="font-semibold text-lg">Meta Pixel & CAPI</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-volcan-taupe/20 hover:border-volcan-ember/50 transition-colors">
                <div className="font-semibold text-lg">Looker Studio</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-volcan-taupe/20 hover:border-volcan-ember/50 transition-colors">
                <div className="font-semibold text-lg">Search Console</div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-volcan-clay py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8">¿Tenés dudas sobre qué necesita tu negocio?</h2>
            <Link to="/contacto" className="bg-white text-volcan-clay px-8 py-4 rounded-xl font-bold hover:bg-volcan-cream transition-colors text-lg inline-block shadow-xl">
              Agendar diagnóstico gratuito
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Clients Section */}
      <section className="bg-volcan-cream py-24 border-t border-volcan-taupe/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-volcan-night mb-4">Ellos nos eligen</h2>
              <p className="text-lg text-volcan-taupe">Marcas que escalan su facturación con nosotros.</p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clientes.map((cliente, index) => (
              <FadeUp key={cliente.id} delay={0.1 * index}>
                <a href={cliente.sitio_url || '#'} target="_blank" rel="noreferrer" className="block group">
                  <div className="bg-white aspect-[3/2] rounded-2xl p-6 flex flex-col items-center justify-center border border-volcan-taupe/20 shadow-sm hover:shadow-md transition-all grayscale hover:grayscale-0 overflow-hidden">
                    {cliente.tiene_imagen ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/clientes/${cliente.id}/imagen`}
                        alt={cliente.nombre}
                        className="max-h-full max-w-full object-contain p-2"
                      />
                    ) : (
                      <>
                        <span className="font-serif font-bold text-xl text-center mb-2 group-hover:text-volcan-ember transition-colors">{cliente.nombre}</span>
                        <span className="text-xs text-volcan-taupe">{cliente.rubro}</span>
                      </>
                    )}
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/clientes" className="text-volcan-ember font-medium hover:text-volcan-clay transition-colors">
              Ver todos los casos de éxito →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

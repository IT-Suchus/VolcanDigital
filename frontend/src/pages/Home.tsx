import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchClientes, Cliente } from '../lib/api';
import { Target, TrendingUp, Users, MonitorSmartphone, Heart, MessageCircle, Send, GraduationCap, Layers, UserCheck, Bookmark, MoreHorizontal } from 'lucide-react';
import metaAdsResultados from '../assets/meta-ads-resultados.png';
import volcanIcon from '../media/volcan-icon.png';

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
      {/* 1. Hero Section (Encabezado) */}
      <section className="bg-volcan-night relative overflow-hidden min-h-screen flex flex-col justify-center py-20">
        {/* Íconos decorativos de fondo */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 opacity-[0.04]" aria-hidden="true">
          <Target className="absolute top-16 right-[10%] w-72 h-72 text-white" />
          <TrendingUp className="absolute bottom-12 right-[25%] w-96 h-96 text-white" />
          <MonitorSmartphone className="absolute top-1/3 left-[-5%] w-80 h-80 text-white" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl text-left">
            {/* Badge pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 rounded-full border border-volcan-ember/30 text-volcan-ember/60 text-[10px] uppercase tracking-widest bg-transparent mb-6"
            >
              PERFORMANCE · META ADS · GOOGLE ADS
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold leading-tight text-white mb-6"
            >
              Publicidad digital para negocios que quieren{' '}
              <span style={{ color: '#D3A784' }}>vender más</span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base font-light text-white/60 max-w-lg mb-8 md:mb-10 leading-relaxed"
            >
              Ayudamos a tu negocio en cada etapa de crecimiento. Menos humo, más resultados medibles.
            </motion.p>

            {/* Botones en fila, gap-6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href="https://wa.me/5492216743529"
                target="_blank"
                rel="noreferrer"
                className="bg-[#684036] text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-[#58352d] transition-colors shadow-lg inline-flex items-center justify-center"
              >
                Hablar por WhatsApp
              </a>
              <Link
                to="/servicios"
                className="bg-transparent border-0 text-white/60 text-sm font-medium hover:text-white/90 transition-colors inline-flex items-center gap-1"
              >
                Ver servicios →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Video Showcase */}
      <section className="bg-volcan-night py-24 overflow-hidden border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Video a la izquierda */}
            <FadeUp>
              <div className="relative flex justify-center lg:justify-start">
                {/* Glow decorativo */}
                <div className="absolute inset-0 bg-volcan-ember/15 rounded-full blur-3xl scale-90 pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-[300px] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/15 bg-black">
                  <video
                    src="/videos/resultados-meta-ads.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full aspect-[9/16] block"
                  />
                </div>
              </div>
            </FadeUp>

            {/* Texto a la derecha */}
            <FadeUp delay={0.15}>
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
                  Así se ven los resultados en acción
                </h2>
                <p className="text-lg text-volcan-cream/80 leading-relaxed">
                  Un vistazo real a cómo optimizamos y escalamos campañas para nuestros clientes.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/5492216743529"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-volcan-ember font-medium hover:text-white transition-colors items-center gap-2"
                  >
                    Quiero resultados así →
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 3. Publicidad en Redes (Meta Ads Section) */}
      <section className="bg-volcan-night text-volcan-cream py-24 overflow-hidden border-t border-white/5">
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
              <div className="relative flex items-center justify-center py-6 sm:py-8">
                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-volcan-ember/15 rounded-full blur-3xl scale-90"></div>
                
                {/* Mock Instagram Ad Card */}
                <div className="relative w-full max-w-[290px] sm:max-w-[320px] bg-white rounded-3xl shadow-2xl shadow-black/40 overflow-hidden border border-volcan-taupe/20 sm:rotate-2 hover:rotate-0 transition-all duration-500 z-10">
                  {/* Header */}
                  <div className="p-3.5 flex items-center justify-between border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-2.5">
                      {/* Avatar con la imagen real de Volcán Digital y anillo de Instagram story */}
                      <div className="p-[2px] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full shrink-0">
                        <div className="w-8 h-8 rounded-full bg-[#161314] flex items-center justify-center p-1.5 border-2 border-white shadow-inner">
                          <img src={volcanIcon} alt="Volcán Digital" className="w-full h-full object-contain" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-xs leading-none mb-0.5 flex items-center gap-1">
                          volcan.digital
                          <svg className="w-3.5 h-3.5 text-[#0095F6] inline-block" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.25c.57 0 1.11.23 1.5.64l1.18 1.25a2.25 2.25 0 0 0 1.64.68h1.72c1.24 0 2.25 1.01 2.25 2.25v1.72c0 .6.24 1.17.68 1.64l1.25 1.18c.88.83.88 2.23 0 3.06l-1.25 1.18a2.25 2.25 0 0 0-.68 1.64v1.72c0 1.24-1.01 2.25-2.25 2.25h-1.72a2.25 2.25 0 0 0-1.64.68l-1.18 1.25a2.12 2.12 0 0 1-3.06 0l-1.18-1.25a2.25 2.25 0 0 0-1.64-.68H6.75c-1.24 0-2.25-1.01-2.25-2.25v-1.72a2.25 2.25 0 0 0-.68-1.64l-1.25-1.18a2.12 2.12 0 0 1 0-3.06l1.25-1.18c.44-.47.68-1.04.68-1.64V6.75c0-1.24 1.01-2.25 2.25-2.25h1.72c.6 0 1.17-.24 1.64-.68l1.18-1.25c.39-.41.93-.64 1.5-.64zm4.28 7.22a.75.75 0 0 0-1.06 0L10.5 14.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l2.25 2.25c.29.29.77.29 1.06 0l5.25-5.25a.75.75 0 0 0 0-1.06z" />
                          </svg>
                        </div>
                        <div className="text-[10px] text-gray-400 font-normal">Publicidad</div>
                      </div>
                    </div>
                    <MoreHorizontal size={18} className="text-gray-500 cursor-pointer" />
                  </div>
                  
                  {/* Content: captura real de campaña (524x1024) con relación exacta sin recortes */}
                  <div className="aspect-[524/1024] bg-white relative overflow-hidden group border-y border-gray-100">
                     <img
                       src={metaAdsResultados}
                       alt="Resultados reales de una campaña de Meta Ads gestionada por Volcán Digital"
                       className="w-full h-full object-contain group-hover:scale-[1.01] transition-transform duration-700 block"
                       loading="eager"
                     />
                  </div>

                  {/* Sponsored Ad CTA Bar */}
                  <div className="bg-[#f8f9fa] border-b border-gray-100 px-3.5 py-2 flex items-center justify-between text-xs font-semibold text-[#0095f6] hover:bg-gray-100 transition-colors cursor-pointer">
                    <span>Más información</span>
                    <span>›</span>
                  </div>
                  
                  {/* Action bar */}
                  <div className="p-3.5 bg-white">
                    <div className="flex items-center justify-between mb-2 text-gray-900">
                      <div className="flex items-center gap-3.5">
                        <Heart size={22} className="hover:text-red-500 transition-colors cursor-pointer" />
                        <MessageCircle size={22} className="hover:text-volcan-ember transition-colors cursor-pointer" />
                        <Send size={22} className="hover:text-volcan-ember transition-colors cursor-pointer" />
                      </div>
                      <Bookmark size={22} className="hover:text-volcan-ember transition-colors cursor-pointer text-gray-700" />
                    </div>
                    <div className="text-xs font-semibold text-gray-900 mb-1">
                      Les gusta a 1.420 personas
                    </div>
                    <div className="text-xs leading-snug">
                      <span className="font-semibold text-gray-900 mr-1.5">volcan.digital</span>
                      <span className="text-gray-700">Escalá tus ventas con campañas rentables. Menos humo, más resultados. 🚀</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements behind/around */}
                <div className="absolute top-2 -right-2 sm:top-4 sm:-right-4 bg-volcan-clay text-white p-3.5 sm:p-4 rounded-2xl shadow-xl -rotate-12 animate-bounce z-20" style={{ animationDuration: '4s' }}>
                  <Target size={28} className="sm:w-8 sm:h-8" />
                </div>
                <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-4 bg-white text-volcan-night p-3.5 sm:p-4 rounded-2xl shadow-xl border border-volcan-taupe/20 rotate-6 z-20">
                  <div className="font-bold text-xl sm:text-2xl mb-0.5 sm:mb-1 text-volcan-ember leading-none">+340%</div>
                  <div className="text-[10px] sm:text-xs text-volcan-taupe font-medium uppercase tracking-wider">Más leads</div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 4. Medimos y usamos datos (Data Section) */}
      <section className="bg-volcan-cream text-volcan-night py-24 border-t border-volcan-taupe/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-volcan-night mb-6">Medimos y usamos datos</h2>
            <p className="text-lg mb-12">
              No tomamos decisiones basadas en suposiciones. Implementamos analítica avanzada para saber exactamente qué funciona y escalar tu facturación.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <FadeUp delay={0.1}>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-volcan-taupe/20 hover:border-volcan-ember/50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group flex flex-col items-center justify-center min-h-[140px]">
                <div className="h-12 flex items-center justify-center mb-3">
                  <img
                    src="/logos/google-analytics.svg"
                    alt="Google Analytics 4 Logo"
                    className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="font-semibold text-base sm:text-lg text-volcan-night leading-snug">Google Analytics 4</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-volcan-taupe/20 hover:border-volcan-ember/50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group flex flex-col items-center justify-center min-h-[140px]">
                <div className="h-12 flex items-center justify-center mb-3">
                  <img
                    src="/logos/meta.svg"
                    alt="Meta Pixel & CAPI Logo"
                    className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="font-semibold text-base sm:text-lg text-volcan-night leading-snug">Meta Pixel & CAPI</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-volcan-taupe/20 hover:border-volcan-ember/50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group flex flex-col items-center justify-center min-h-[140px]">
                <div className="h-12 flex items-center justify-center mb-3">
                  <img
                    src="/logos/looker-studio.svg"
                    alt="Looker Studio Logo"
                    className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="font-semibold text-base sm:text-lg text-volcan-night leading-snug">Looker Studio</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-volcan-taupe/20 hover:border-volcan-ember/50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group flex flex-col items-center justify-center min-h-[140px]">
                <div className="h-12 flex items-center justify-center mb-3">
                  <img
                    src="/logos/google-search-console.svg"
                    alt="Search Console Logo"
                    className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="font-semibold text-base sm:text-lg text-volcan-night leading-snug">Search Console</div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 5. Estructura / Confianza */}
      <section className="bg-volcan-cream py-20 border-t border-volcan-taupe/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-volcan-night text-center mb-16 max-w-3xl mx-auto">
              Una estructura pensada para involucrarnos de verdad.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeUp delay={0.1}>
              <div className="p-6 sm:p-8 h-full flex flex-col bg-white rounded-2xl border border-volcan-taupe/20 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-serif text-3xl font-bold text-volcan-ember/40">01</span>
                  <GraduationCap className="text-volcan-ember" size={28} />
                </div>
                <h3 className="text-lg font-bold text-volcan-night mb-2">Especialistas certificados</h3>
                <p className="text-sm text-volcan-taupe leading-relaxed">
                  Formación en Google Ads, Google Analytics, publicidad digital, SEO y estrategia de contenidos.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="p-6 sm:p-8 h-full flex flex-col bg-white rounded-2xl border border-volcan-taupe/20 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-serif text-3xl font-bold text-volcan-ember/40">02</span>
                  <Layers className="text-volcan-ember" size={28} />
                </div>
                <h3 className="text-lg font-bold text-volcan-night mb-2">Estrategias integrales de crecimiento</h3>
                <p className="text-sm text-volcan-taupe leading-relaxed">
                  Campañas, creatividad, sitios web, medición y optimización trabajando como un único sistema.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="p-6 sm:p-8 h-full flex flex-col bg-white rounded-2xl border border-volcan-taupe/20 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-serif text-3xl font-bold text-volcan-ember/40">03</span>
                  <UserCheck className="text-volcan-ember" size={28} />
                </div>
                <h3 className="text-lg font-bold text-volcan-night mb-2">Atención directa del equipo</h3>
                <p className="text-sm text-volcan-taupe leading-relaxed">
                  Quienes diseñan la estrategia también analizan los resultados y acompañan cada decisión.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 6. Nuestros Clientes (Ellos nos eligen) */}
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

      {/* 7. Dudas / Diagnóstico (CTA Strip) */}
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

    </div>
  );
}

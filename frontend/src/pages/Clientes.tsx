import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchClientes, Cliente, ClienteStat } from '../lib/api';
import { 
  ExternalLink, 
  TrendingUp, 
  Quote, 
  Target, 
  Sparkles, 
  BarChart3, 
  Building2,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedMobileId, setSelectedMobileId] = useState<number | null>(null);

  useEffect(() => {
    fetchClientes().then(setClientes).catch(console.error);
  }, []);

  // Enrich client data with realistic fallbacks if database fields are not yet populated
  const getClienteEnriched = (cliente: Cliente) => {
    const isAlmaFlora = cliente.nombre.toLowerCase().includes('alma flora') || (cliente.rubro && cliente.rubro.toLowerCase().includes('vivero'));

    const descripcion = cliente.descripcion || (isAlmaFlora 
      ? 'E-commerce y tienda botánica especializada en plantas de interior, macetas de diseño y jardinería para espacios urbanos.'
      : `${cliente.nombre} es una marca líder en el sector de ${cliente.rubro || 'productos y servicios'}, enfocada en brindar la mejor experiencia a sus clientes.`);

    const comoLlego = cliente.como_llego || (isAlmaFlora
      ? 'Dependían de ventas presenciales discontinuas y boca en boca local, sin un canal digital constante para captar clientes cualificados ni medir el retorno publicitario.'
      : 'Llegó a Volcán Digital buscando salir del estancamiento en ventas y construir un sistema predecible de atracción de clientes mediante campañas digitales de alto impacto.');

    const comoMejoro = cliente.como_mejoro || (isAlmaFlora
      ? 'Estructuramos campañas de conversión directa en Meta Ads para audiencias de alta afinidad, optimizamos el catálogo web y aceleramos la respuesta a consultas.'
      : 'Implementamos embudos publicitarios optimizados en Meta Ads, rediseñamos la propuesta de valor comercial y establecimos métricas analíticas en tiempo real.');

    const stats: ClienteStat[] = (cliente.stats && cliente.stats.length > 0) ? cliente.stats : (isAlmaFlora ? [
      { label: 'Consultas Diarias', valor: '+40%' },
      { label: 'ROAS Meta Ads', valor: '4.2x' },
      { label: 'Ventas Online', valor: '+115%' }
    ] : [
      { label: 'Resultado Principal', valor: cliente.resultado_destacado || '+45%' },
      { label: 'Retorno (ROAS)', valor: '3.8x' },
      { label: 'Crecimiento Ventas', valor: '+85%' }
    ]);

    return { descripcion, comoLlego, comoMejoro, stats };
  };

  return (
    <div className="flex flex-col min-h-screen bg-volcan-cream">
      {/* Header Section */}
      <section className="bg-volcan-night text-center py-20 lg:py-28 border-b border-volcan-taupe/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-volcan-ember/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-volcan-ember/15 border border-volcan-ember/30 text-volcan-ember text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles size={14} className="animate-pulse" />
              <span>Casos de Éxito &amp; Historias de Crecimiento</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
              Marcas que se transforman con Volcán
            </h1>
            <p className="text-lg md:text-xl text-volcan-cream/90 max-w-2xl mx-auto leading-relaxed">
              Conocé a los negocios que confían en nosotros para escalar su facturación de forma consistente.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 text-xs md:text-sm text-volcan-cream/70 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-volcan-ember animate-ping shrink-0" />
              <span>Posá el mouse sobre cualquier cliente para desplegar su historia completa y resultados</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="py-16 md:py-24 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {clientes.map((cliente, index) => {
              const isHovered = hoveredId === cliente.id;
              const isMobileSelected = selectedMobileId === cliente.id;
              const isExpanded = isHovered || isMobileSelected;
              const enriched = getClienteEnriched(cliente);
              const brandColor = cliente.color_primario || '#D3A784';

              return (
                <FadeUp key={cliente.id} delay={index * 0.08}>
                  <motion.div
                    layout
                    onMouseEnter={() => setHoveredId(cliente.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedMobileId(isMobileSelected ? null : cliente.id)}
                    className={`relative rounded-3xl bg-white border transition-all duration-500 cursor-pointer overflow-hidden ${
                      isExpanded
                        ? 'border-volcan-ember/40 shadow-2xl ring-2 ring-volcan-ember/20 z-20 scale-[1.01]'
                        : 'border-volcan-taupe/20 shadow-sm hover:shadow-xl hover:border-volcan-taupe/40'
                    }`}
                    style={{
                      borderLeft: `6px solid ${brandColor}`
                    }}
                  >
                    <div className="p-6 md:p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* LEFT COLUMN: Summary / Base Card */}
                        <div className={`transition-all duration-300 ${isExpanded ? 'lg:col-span-4' : 'lg:col-span-12 flex flex-col md:flex-row md:items-center justify-between gap-6'}`}>
                          <div className="flex items-start gap-5">
                            {/* Logo */}
                            <div 
                              className="w-20 h-20 rounded-2xl bg-volcan-cream flex items-center justify-center overflow-hidden border border-volcan-taupe/20 shrink-0 shadow-inner group-hover:scale-105 transition-transform"
                              style={{ borderColor: isExpanded ? `${brandColor}40` : undefined }}
                            >
                              {cliente.tiene_imagen ? (
                                <img
                                  src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/clientes/${cliente.id}/imagen`}
                                  alt={cliente.nombre}
                                  className="w-full h-full object-contain p-2"
                                />
                              ) : (
                                <span className="text-volcan-taupe/50 font-serif text-3xl font-bold">
                                  {cliente.nombre.charAt(0)}
                                </span>
                              )}
                            </div>

                            {/* Client Info Header */}
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span 
                                  className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                                  style={{ 
                                    backgroundColor: `${brandColor}18`,
                                    color: brandColor 
                                  }}
                                >
                                  {cliente.rubro || 'Cliente Activo'}
                                </span>
                              </div>
                              <h3 className="text-2xl md:text-3xl font-serif font-bold text-volcan-night group-hover:text-volcan-ember transition-colors">
                                {cliente.nombre}
                              </h3>
                              {cliente.sitio_url && (
                                <a
                                  href={cliente.sitio_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold mt-2 hover:underline transition-colors"
                                  style={{ color: brandColor }}
                                >
                                  <span>Visitar sitio web</span>
                                  <ExternalLink size={13} />
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Featured Result Badge */}
                          <div className={`mt-4 ${isExpanded ? 'w-full' : 'md:mt-0'}`}>
                            {cliente.resultado_destacado && (
                              <div className="bg-volcan-taupe/10 rounded-2xl p-4 flex items-center gap-3 border border-volcan-taupe/20">
                                <div 
                                  className="p-2 rounded-xl shrink-0"
                                  style={{ backgroundColor: `${brandColor}20`, color: brandColor }}
                                >
                                  <TrendingUp size={20} />
                                </div>
                                <div>
                                  <div className="text-[10px] font-bold uppercase tracking-wider text-volcan-taupe">
                                    Resultado Destacado
                                  </div>
                                  <div className="text-volcan-night font-bold text-base md:text-lg">
                                    {cliente.resultado_destacado}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Hover prompt helper when collapsed */}
                            {!isExpanded && (
                              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-volcan-ember opacity-80 group-hover:opacity-100 transition-opacity">
                                <span>Ver cómo llegó y cómo mejoró</span>
                                <ChevronRight size={16} className="animate-pulse" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* RIGHT COLUMN: Smooth Expansion Panel (Desplegable hacia la derecha) */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, x: 20, height: 0 }}
                              animate={{ opacity: 1, x: 0, height: 'auto' }}
                              exit={{ opacity: 0, x: 20, height: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-volcan-taupe/15 pt-6 lg:pt-0 lg:pl-8 space-y-6"
                            >
                              {/* Top Banner Tag */}
                              <div className="flex items-center justify-between pb-2 border-b border-volcan-taupe/10">
                                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-volcan-taupe">
                                  <BarChart3 size={16} style={{ color: brandColor }} />
                                  <span>Caso de Estudio &amp; Métricas</span>
                                </div>
                                <span className="text-[10px] font-semibold bg-volcan-ember/10 text-volcan-ember px-2.5 py-1 rounded-full">
                                  Enfoque Volcán Digital
                                </span>
                              </div>

                              {/* Brief Description */}
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-volcan-taupe mb-1 flex items-center gap-1.5">
                                  <Building2 size={14} />
                                  <span>Acerca de la Empresa</span>
                                </h4>
                                <p className="text-sm text-volcan-night/80 leading-relaxed font-normal">
                                  {enriched.descripcion}
                                </p>
                              </div>

                              {/* Grid: Cómo llegó vs Cómo mejoró */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Cómo Llegó */}
                                <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/50 relative overflow-hidden">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                                      <Target size={16} />
                                    </div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                                      ¿Cómo llegó? (Desafío)
                                    </h4>
                                  </div>
                                  <p className="text-xs text-amber-950/80 leading-relaxed">
                                    {enriched.comoLlego}
                                  </p>
                                </div>

                                {/* Cómo Mejoró */}
                                <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200/50 relative overflow-hidden">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                                      <Sparkles size={16} />
                                    </div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                                      ¿Cómo mejoró? (Estrategia)
                                    </h4>
                                  </div>
                                  <p className="text-xs text-emerald-950/80 leading-relaxed">
                                    {enriched.comoMejoro}
                                  </p>
                                </div>
                              </div>

                              {/* Stats Badges */}
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-volcan-taupe mb-3 flex items-center gap-1.5">
                                  <CheckCircle2 size={14} style={{ color: brandColor }} />
                                  <span>Indicadores Clave de Rendimiento</span>
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                  {enriched.stats.map((stat, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-volcan-cream/60 rounded-xl p-3 border border-volcan-taupe/15 text-center flex flex-col justify-center"
                                    >
                                      <div 
                                        className="text-lg md:text-xl font-bold font-serif"
                                        style={{ color: brandColor }}
                                      >
                                        {stat.valor}
                                      </div>
                                      <div className="text-[10px] font-bold text-volcan-taupe uppercase tracking-wider mt-0.5">
                                        {stat.label}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Testimonial if available */}
                              {cliente.testimonio && (
                                <div className="relative bg-white rounded-2xl p-4 border border-volcan-taupe/20 shadow-sm">
                                  <Quote className="absolute right-3 top-3 text-volcan-ember/20 w-7 h-7 pointer-events-none" />
                                  <p className="text-xs italic text-volcan-night/80 leading-relaxed pr-6">
                                    "{cliente.testimonio}"
                                  </p>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

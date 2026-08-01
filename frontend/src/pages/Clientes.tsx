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
  ChevronDown
} from 'lucide-react';

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.4, delay, ease: [0.25, 1, 0.5, 1] }}
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

      {/* Main Client Cards Section */}
      <section className="py-16 md:py-24 flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {clientes.map((cliente, index) => {
              const isHovered = hoveredId === cliente.id;
              const isMobileSelected = selectedMobileId === cliente.id;
              const isExpanded = isHovered || isMobileSelected;
              const enriched = getClienteEnriched(cliente);
              const brandColor = cliente.color_primario || '#D3A784';

              return (
                <FadeUp key={cliente.id} delay={index * 0.06}>
                  <div
                    onMouseEnter={() => setHoveredId(cliente.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedMobileId(isMobileSelected ? null : cliente.id)}
                    className="relative rounded-3xl bg-white border border-volcan-taupe/20 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                    style={{
                      borderLeft: `6px solid ${brandColor}`
                    }}
                  >
                    {/* Top Header Card (Always Constant & Stable Layout) */}
                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-start gap-5">
                        {/* Logo */}
                        <div 
                          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-volcan-cream flex items-center justify-center overflow-hidden border border-volcan-taupe/20 shrink-0 shadow-inner"
                          style={{ borderColor: isExpanded ? `${brandColor}50` : undefined }}
                        >
                          {cliente.tiene_imagen ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/clientes/${cliente.id}/imagen`}
                              alt={cliente.nombre}
                              className="w-full h-full object-contain p-2"
                            />
                          ) : (
                            <span className="text-volcan-taupe/50 font-serif text-2xl md:text-3xl font-bold">
                              {cliente.nombre.charAt(0)}
                            </span>
                          )}
                        </div>

                        {/* Name & Rubro */}
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
                          <h3 className="text-2xl md:text-3xl font-serif font-bold text-volcan-night">
                            {cliente.nombre}
                          </h3>
                          {cliente.sitio_url && (
                            <a
                              href={cliente.sitio_url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold mt-1 hover:underline transition-colors"
                              style={{ color: brandColor }}
                            >
                              <span>Visitar sitio web</span>
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right Header Side: Featured Result & Expand Indicator */}
                      <div className="flex items-center gap-4 shrink-0">
                        {cliente.resultado_destacado && (
                          <div className="bg-volcan-taupe/10 rounded-2xl px-4 py-3 flex items-center gap-3 border border-volcan-taupe/20">
                            <div 
                              className="p-2 rounded-xl shrink-0"
                              style={{ backgroundColor: `${brandColor}20`, color: brandColor }}
                            >
                              <TrendingUp size={18} />
                            </div>
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-volcan-taupe">
                                Resultado Destacado
                              </div>
                              <div className="text-volcan-night font-bold text-sm md:text-base">
                                {cliente.resultado_destacado}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Chevron Trigger Icon */}
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center border border-volcan-taupe/20 bg-volcan-cream/50 text-volcan-taupe transition-transform duration-300"
                          style={{
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            color: isExpanded ? brandColor : undefined,
                            backgroundColor: isExpanded ? `${brandColor}15` : undefined
                          }}
                        >
                          <ChevronDown size={20} />
                        </div>
                      </div>
                    </div>

                    {/* Smooth Expandable Content Panel (Sin tirones ni doble choque) */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isExpanded ? 'auto' : 0, 
                        opacity: isExpanded ? 1 : 0 
                      }}
                      transition={{ 
                        duration: 0.38, 
                        ease: [0.32, 0.72, 0, 1] 
                      }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 pb-8 md:px-8 pt-2 border-t border-volcan-taupe/15 space-y-6">
                        {/* Top Info Tag */}
                        <div className="flex items-center justify-between pt-4 pb-2 border-b border-volcan-taupe/10">
                          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-volcan-taupe">
                            <BarChart3 size={16} style={{ color: brandColor }} />
                            <span>Diagnóstico, Estrategia &amp; Métricas Clave</span>
                          </div>
                          <span className="text-[10px] font-semibold bg-volcan-ember/10 text-volcan-ember px-2.5 py-1 rounded-full">
                            Caso de Éxito Volcán
                          </span>
                        </div>

                        {/* Brief Description */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-volcan-taupe mb-1 flex items-center gap-1.5">
                            <Building2 size={14} />
                            <span>Acerca de la Empresa</span>
                          </h4>
                          <p className="text-sm text-volcan-night/80 leading-relaxed">
                            {enriched.descripcion}
                          </p>
                        </div>

                        {/* Grid: Cómo llegó vs Cómo mejoró */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Cómo Llegó */}
                          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/60">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                                <Target size={16} />
                              </div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                                ¿Cómo llegó? (Desafío inicial)
                              </h4>
                            </div>
                            <p className="text-xs text-amber-950/80 leading-relaxed">
                              {enriched.comoLlego}
                            </p>
                          </div>

                          {/* Cómo Mejoró */}
                          <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200/60">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                                <Sparkles size={16} />
                              </div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                                ¿Cómo mejoró? (Estrategia Volcán)
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
                            <span>Resultados &amp; Indicadores de Rendimiento</span>
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
                      </div>
                    </motion.div>

                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

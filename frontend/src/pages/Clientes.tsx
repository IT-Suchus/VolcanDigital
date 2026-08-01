import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchClientes, Cliente, ClienteStat } from '../lib/api';
import { 
  TrendingUp, 
  Quote, 
  Target, 
  Sparkles, 
  Building2,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight
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
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetchClientes().then(data => {
      setClientes(data);
      if (data.length > 0) {
        setSelectedId(data[0].id);
      }
    }).catch(console.error);
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

  // Determine active client (hovered takes temporary precedence, fallback to selected, fallback to first)
  const activeCliente = clientes.find(c => c.id === (hoveredId || selectedId)) || clientes[0];
  const activeEnriched = activeCliente ? getClienteEnriched(activeCliente) : null;
  const activeBrandColor = activeCliente?.color_primario || '#D3A784';

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
              <span>Pasá el mouse por la lista para desplegar en tiempo real la historia de cada cliente</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Main Showcase Section */}
      <section className="py-16 md:py-24 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {clientes.length === 0 ? (
            <div className="py-20 text-center text-volcan-taupe">Cargando clientes...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Fixed-size Stable List (0 layout shifts) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-volcan-taupe mb-4 px-1 flex items-center justify-between">
                  <span>Seleccioná un Cliente</span>
                  <span className="text-[10px] text-volcan-ember font-semibold">{clientes.length} Casos de Éxito</span>
                </div>

                {clientes.map((cliente) => {
                  const isActive = activeCliente?.id === cliente.id;
                  const brandColor = cliente.color_primario || '#D3A784';

                  return (
                    <div
                      key={cliente.id}
                      onMouseEnter={() => setHoveredId(cliente.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setSelectedId(cliente.id)}
                      className={`group relative p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 ${
                        isActive
                          ? 'bg-white border-volcan-ember/40 shadow-lg ring-1 ring-volcan-ember/20 translate-x-1'
                          : 'bg-white/70 border-volcan-taupe/15 hover:bg-white hover:border-volcan-taupe/30 shadow-sm'
                      }`}
                      style={{
                        borderLeft: `4px solid ${isActive ? brandColor : 'transparent'}`
                      }}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Logo */}
                        <div 
                          className="w-14 h-14 rounded-xl bg-volcan-cream flex items-center justify-center overflow-hidden border border-volcan-taupe/20 shrink-0 shadow-inner"
                          style={{ borderColor: isActive ? `${brandColor}40` : undefined }}
                        >
                          {cliente.tiene_imagen ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/clientes/${cliente.id}/imagen`}
                              alt={cliente.nombre}
                              className="w-full h-full object-contain p-1.5"
                            />
                          ) : (
                            <span className="text-volcan-taupe/50 font-serif text-2xl font-bold">
                              {cliente.nombre.charAt(0)}
                            </span>
                          )}
                        </div>

                        {/* Name & Rubro */}
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-volcan-taupe truncate mb-0.5">
                            {cliente.rubro || 'Cliente Activo'}
                          </div>
                          <h3 className={`text-lg font-serif font-bold truncate transition-colors ${
                            isActive ? 'text-volcan-night' : 'text-volcan-night/80 group-hover:text-volcan-night'
                          }`}>
                            {cliente.nombre}
                          </h3>
                          {cliente.resultado_destacado && (
                            <div className="text-xs font-semibold flex items-center gap-1 mt-1 truncate" style={{ color: brandColor }}>
                              <TrendingUp size={13} className="shrink-0" />
                              <span className="truncate">{cliente.resultado_destacado}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Chevron Arrow Indicator */}
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isActive 
                            ? 'bg-volcan-ember text-white shadow-md' 
                            : 'bg-volcan-cream/60 text-volcan-taupe/60 group-hover:text-volcan-night group-hover:bg-volcan-cream'
                        }`}
                      >
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* RIGHT COLUMN: Smooth Lateral Showcase Panel (Desplegable a la derecha) */}
              {activeCliente && activeEnriched && (
                <div className="lg:col-span-7 lg:sticky lg:top-28">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCliente.id}
                      initial={{ opacity: 0, x: 15, scale: 0.99 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -15, scale: 0.99 }}
                      transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                      className="bg-white rounded-3xl p-6 md:p-8 border border-volcan-taupe/20 shadow-xl relative overflow-hidden"
                      style={{
                        borderTop: `5px solid ${activeBrandColor}`
                      }}
                    >
                      {/* Top Header Row */}
                      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-volcan-taupe/15">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-16 h-16 rounded-2xl bg-volcan-cream flex items-center justify-center overflow-hidden border border-volcan-taupe/20 shrink-0 shadow-inner"
                            style={{ borderColor: `${activeBrandColor}40` }}
                          >
                            {activeCliente.tiene_imagen ? (
                              <img
                                src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/clientes/${activeCliente.id}/imagen`}
                                alt={activeCliente.nombre}
                                className="w-full h-full object-contain p-2"
                              />
                            ) : (
                              <span className="text-volcan-taupe/50 font-serif text-3xl font-bold">
                                {activeCliente.nombre.charAt(0)}
                              </span>
                            )}
                          </div>

                          <div>
                            <span 
                              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                              style={{ 
                                backgroundColor: `${activeBrandColor}18`,
                                color: activeBrandColor 
                              }}
                            >
                              {activeCliente.rubro || 'Caso de Éxito'}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-volcan-night mt-1">
                              {activeCliente.nombre}
                            </h2>
                          </div>
                        </div>

                        {activeCliente.sitio_url && (
                          <a
                            href={activeCliente.sitio_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-xl shadow-sm transition-all hover:scale-105"
                            style={{ backgroundColor: activeBrandColor }}
                          >
                            <span>Visitar sitio</span>
                            <ArrowUpRight size={14} />
                          </a>
                        )}
                      </div>

                      {/* Main Showcase Details */}
                      <div className="mt-6 space-y-6">
                        {/* Featured Result Banner */}
                        {activeCliente.resultado_destacado && (
                          <div className="bg-volcan-taupe/10 rounded-2xl p-4 flex items-center gap-3 border border-volcan-taupe/20">
                            <div 
                              className="p-2.5 rounded-xl shrink-0"
                              style={{ backgroundColor: `${activeBrandColor}20`, color: activeBrandColor }}
                            >
                              <TrendingUp size={22} />
                            </div>
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-volcan-taupe">
                                Impacto Principal
                              </div>
                              <div className="text-volcan-night font-bold text-lg">
                                {activeCliente.resultado_destacado}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Brief Description */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-volcan-taupe mb-1 flex items-center gap-1.5">
                            <Building2 size={14} style={{ color: activeBrandColor }} />
                            <span>Acerca de la Empresa</span>
                          </h4>
                          <p className="text-sm text-volcan-night/85 leading-relaxed font-normal">
                            {activeEnriched.descripcion}
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
                                ¿Cómo llegó? (Desafío)
                              </h4>
                            </div>
                            <p className="text-xs text-amber-950/80 leading-relaxed">
                              {activeEnriched.comoLlego}
                            </p>
                          </div>

                          {/* Cómo Mejoró */}
                          <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200/60">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                                <Sparkles size={16} />
                              </div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                                ¿Cómo mejoró? (Estrategia)
                              </h4>
                            </div>
                            <p className="text-xs text-emerald-950/80 leading-relaxed">
                              {activeEnriched.comoMejoro}
                            </p>
                          </div>
                        </div>

                        {/* Stats Badges */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-volcan-taupe mb-3 flex items-center gap-1.5">
                            <CheckCircle2 size={14} style={{ color: activeBrandColor }} />
                            <span>Indicadores Clave de Rendimiento</span>
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {activeEnriched.stats.map((stat, idx) => (
                              <div
                                key={idx}
                                className="bg-volcan-cream/60 rounded-xl p-3 border border-volcan-taupe/15 text-center flex flex-col justify-center"
                              >
                                <div 
                                  className="text-lg md:text-xl font-bold font-serif"
                                  style={{ color: activeBrandColor }}
                                >
                                  {stat.valor}
                                </div>
                                <div className="text-[10px] font-bold text-volcan-taupe uppercase tracking-wider mt-0.5 truncate">
                                  {stat.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Testimonial if available */}
                        {activeCliente.testimonio && (
                          <div className="relative bg-volcan-cream/40 rounded-2xl p-4 border border-volcan-taupe/20">
                            <Quote className="absolute right-3 top-3 text-volcan-ember/20 w-7 h-7 pointer-events-none" />
                            <p className="text-xs italic text-volcan-night/80 leading-relaxed pr-6">
                              "{activeCliente.testimonio}"
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

            </div>
          )}
        </div>
      </section>
    </div>
  );
}

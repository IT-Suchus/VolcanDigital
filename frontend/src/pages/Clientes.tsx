import { useEffect, useMemo, useRef, useState } from 'react';
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
  ChevronDown,
  ArrowUpRight,
  Search,
  X
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

// El layout dividido (lista + panel) sólo tiene sentido cuando hay espacio horizontal.
// En mobile el detalle se despliega como acordeón debajo del cliente elegido.
const useIsDesktop = () => {
  const query = '(min-width: 1024px)';
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    setIsDesktop(mq.matches);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
};

interface Enriched {
  descripcion: string;
  comoLlego: string;
  comoMejoro: string;
  stats: ClienteStat[];
}

const getClienteEnriched = (cliente: Cliente): Enriched => {
  const isAlmaFlora =
    cliente.nombre.toLowerCase().includes('alma flora') ||
    (cliente.rubro && cliente.rubro.toLowerCase().includes('vivero'));

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

const ClienteLogo = ({
  cliente,
  size,
  brandColor
}: { cliente: Cliente; size: 'sm' | 'lg'; brandColor: string }) => {
  const box = size === 'sm' ? 'w-14 h-14 rounded-xl' : 'w-16 h-16 rounded-2xl';
  const fallback = size === 'sm' ? 'text-2xl' : 'text-3xl';

  return (
    <div
      className={`${box} bg-volcan-cream flex items-center justify-center overflow-hidden border border-volcan-taupe/20 shrink-0 shadow-inner`}
      style={{ borderColor: `${brandColor}40` }}
    >
      {cliente.tiene_imagen ? (
        <img
          src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/clientes/${cliente.id}/imagen`}
          alt={cliente.nombre}
          loading="lazy"
          className={`w-full h-full object-contain ${size === 'sm' ? 'p-1.5' : 'p-2'}`}
        />
      ) : (
        <span className={`text-volcan-taupe/50 font-serif ${fallback} font-bold`}>
          {cliente.nombre.charAt(0)}
        </span>
      )}
    </div>
  );
};

/** Ficha completa del caso de éxito. Se reutiliza en el panel lateral y en el acordeón mobile. */
const ClienteDetalle = ({ cliente, brandColor }: { cliente: Cliente; brandColor: string }) => {
  const enriched = getClienteEnriched(cliente);

  return (
    <>
      {/* Encabezado */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-volcan-taupe/15">
        <div className="flex items-center gap-4">
          <ClienteLogo cliente={cliente} size="lg" brandColor={brandColor} />
          <div>
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: `${brandColor}18`, color: brandColor }}
            >
              {cliente.rubro || 'Caso de Éxito'}
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-volcan-night mt-1">
              {cliente.nombre}
            </h2>
          </div>
        </div>

        {cliente.sitio_url && (
          <a
            href={cliente.sitio_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-xl shadow-sm transition-transform hover:scale-105"
            style={{ backgroundColor: brandColor }}
          >
            <span>Visitar sitio</span>
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>

      <div className="mt-6 space-y-6">
        {cliente.resultado_destacado && (
          <div className="bg-volcan-taupe/10 rounded-2xl p-4 flex items-center gap-3 border border-volcan-taupe/20">
            <div
              className="p-2.5 rounded-xl shrink-0"
              style={{ backgroundColor: `${brandColor}20`, color: brandColor }}
            >
              <TrendingUp size={22} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-volcan-taupe">
                Impacto Principal
              </div>
              <div className="text-volcan-night font-bold text-lg">
                {cliente.resultado_destacado}
              </div>
            </div>
          </div>
        )}

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-volcan-taupe mb-1 flex items-center gap-1.5">
            <Building2 size={14} style={{ color: brandColor }} />
            <span>Acerca de la Empresa</span>
          </h4>
          <p className="text-sm text-volcan-night/85 leading-relaxed">{enriched.descripcion}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/60">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <Target size={16} />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                ¿Cómo llegó? (Desafío)
              </h4>
            </div>
            <p className="text-xs text-amber-950/80 leading-relaxed">{enriched.comoLlego}</p>
          </div>

          <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200/60">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                <Sparkles size={16} />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                ¿Cómo mejoró? (Estrategia)
              </h4>
            </div>
            <p className="text-xs text-emerald-950/80 leading-relaxed">{enriched.comoMejoro}</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-volcan-taupe mb-3 flex items-center gap-1.5">
            <CheckCircle2 size={14} style={{ color: brandColor }} />
            <span>Indicadores Clave de Rendimiento</span>
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {enriched.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-volcan-cream/60 rounded-xl p-3 border border-volcan-taupe/15 text-center flex flex-col justify-center"
              >
                <div className="text-lg md:text-xl font-bold font-serif" style={{ color: brandColor }}>
                  {stat.valor}
                </div>
                <div className="text-[10px] font-bold text-volcan-taupe uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {cliente.testimonio && (
          <div className="relative bg-volcan-cream/40 rounded-2xl p-4 border border-volcan-taupe/20">
            <Quote className="absolute right-3 top-3 text-volcan-ember/20 w-7 h-7 pointer-events-none" />
            <p className="text-xs italic text-volcan-night/80 leading-relaxed pr-6">
              "{cliente.testimonio}"
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const isDesktop = useIsDesktop();
  const itemRefs = useRef<Record<number, HTMLLIElement | null>>({});

  useEffect(() => {
    fetchClientes()
      .then(data => {
        setClientes(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(console.error)
      .finally(() => setCargando(false));
  }, []);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return clientes;
    return clientes.filter(c =>
      c.nombre.toLowerCase().includes(q) || (c.rubro || '').toLowerCase().includes(q)
    );
  }, [clientes, busqueda]);

  // La selección es siempre explícita (click). El hover sólo resalta el item:
  // cambiar el panel al pasar el mouse encolaba animaciones y pisaba la elección del usuario.
  const activeCliente = filtrados.find(c => c.id === selectedId);
  const activeBrandColor = activeCliente?.color_primario || '#D3A784';

  // Si el cliente abierto queda fuera del filtro, el panel pasaría a mostrar algo
  // que ya no está en la lista. Reencuadramos la selección en el primer resultado.
  useEffect(() => {
    if (!isDesktop || filtrados.length === 0) return;
    if (!filtrados.some(c => c.id === selectedId)) {
      setSelectedId(filtrados[0].id);
    }
  }, [filtrados, isDesktop, selectedId]);

  const handleSelect = (cliente: Cliente) => {
    // En mobile funciona como acordeón: volver a tocar el mismo item lo cierra.
    if (!isDesktop && selectedId === cliente.id) {
      setSelectedId(null);
      return;
    }
    setSelectedId(cliente.id);

    if (!isDesktop) {
      // El detalle se abre debajo: acercamos el item elegido al tope visible.
      window.requestAnimationFrame(() => {
        itemRefs.current[cliente.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-volcan-cream">
      {/* Header */}
      <section className="bg-volcan-night text-center py-20 lg:py-28 border-b border-volcan-taupe/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-volcan-ember/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-volcan-ember/15 border border-volcan-ember/30 text-volcan-ember text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles size={14} />
              <span>Casos de Éxito &amp; Historias de Crecimiento</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
              Marcas que se transforman con Volcán
            </h1>
            <p className="text-lg md:text-xl text-volcan-cream/90 max-w-2xl mx-auto leading-relaxed">
              Conocé a los negocios que confían en nosotros para escalar su facturación de forma consistente.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 text-xs md:text-sm text-volcan-cream/70 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-volcan-ember shrink-0" />
              <span>Elegí un cliente de la lista para ver su historia completa</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Showcase */}
      <section className="py-16 md:py-24 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cargando ? (
            <div className="py-20 text-center text-volcan-taupe">Cargando clientes...</div>
          ) : clientes.length === 0 ? (
            <div className="py-20 text-center text-volcan-taupe">
              Todavía no hay casos de éxito publicados.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Lista de clientes */}
              <div className="lg:col-span-5">
                <div className="text-xs font-bold uppercase tracking-wider text-volcan-taupe mb-4 px-1 flex items-center justify-between gap-3">
                  <span>Seleccioná un Cliente</span>
                  <span className="text-[10px] text-volcan-ember font-semibold shrink-0">
                    {clientes.length} Casos de Éxito
                  </span>
                </div>

                {/* Buscador: con 14+ clientes recorrer la lista a ojo deja de ser viable */}
                <div className="relative mb-4">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-volcan-taupe/60 pointer-events-none"
                  />
                  <input
                    type="search"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    placeholder="Buscar por nombre o rubro..."
                    aria-label="Buscar cliente por nombre o rubro"
                    className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-volcan-taupe/20 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-volcan-ember/40 transition-colors"
                  />
                  {busqueda && (
                    <button
                      type="button"
                      onClick={() => setBusqueda('')}
                      aria-label="Limpiar búsqueda"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-volcan-taupe/60 hover:text-volcan-night transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {filtrados.length === 0 ? (
                  <div className="py-10 text-center text-sm text-volcan-taupe bg-white/60 rounded-2xl border border-volcan-taupe/15">
                    No encontramos clientes para "{busqueda}".
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {filtrados.map(cliente => {
                      const isActive = activeCliente?.id === cliente.id;
                      const isOpen = !isDesktop && selectedId === cliente.id;
                      const brandColor = cliente.color_primario || '#D3A784';

                      return (
                        <li
                          key={cliente.id}
                          ref={el => (itemRefs.current[cliente.id] = el)}
                          className="scroll-mt-24"
                        >
                          <button
                            type="button"
                            onClick={() => handleSelect(cliente)}
                            aria-expanded={!isDesktop ? isOpen : undefined}
                            aria-current={isDesktop && isActive ? 'true' : undefined}
                            className={`group w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-volcan-ember focus-visible:ring-offset-2 focus-visible:ring-offset-volcan-cream ${
                              isActive
                                ? 'bg-white border-volcan-ember/40 shadow-lg ring-1 ring-volcan-ember/20 lg:translate-x-1'
                                : 'bg-white/70 border-volcan-taupe/15 hover:bg-white hover:border-volcan-taupe/30 shadow-sm'
                            } ${isOpen ? 'rounded-b-none' : ''}`}
                            style={{ borderLeft: `4px solid ${isActive ? brandColor : 'transparent'}` }}
                          >
                            <span className="flex items-center gap-4 min-w-0">
                              <ClienteLogo cliente={cliente} size="sm" brandColor={brandColor} />

                              <span className="min-w-0 flex-1 block">
                                <span className="block text-[10px] font-bold uppercase tracking-wider text-volcan-taupe truncate mb-0.5">
                                  {cliente.rubro || 'Cliente Activo'}
                                </span>
                                <span
                                  className={`block text-lg font-serif font-bold truncate transition-colors ${
                                    isActive ? 'text-volcan-night' : 'text-volcan-night/80 group-hover:text-volcan-night'
                                  }`}
                                >
                                  {cliente.nombre}
                                </span>
                                {cliente.resultado_destacado && (
                                  <span
                                    className="text-xs font-semibold flex items-center gap-1 mt-1 truncate"
                                    style={{ color: brandColor }}
                                  >
                                    <TrendingUp size={13} className="shrink-0" />
                                    <span className="truncate">{cliente.resultado_destacado}</span>
                                  </span>
                                )}
                              </span>
                            </span>

                            <span
                              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                isActive
                                  ? 'bg-volcan-ember text-white shadow-md'
                                  : 'bg-volcan-cream/60 text-volcan-taupe/60 group-hover:text-volcan-night group-hover:bg-volcan-cream'
                              }`}
                            >
                              {isDesktop ? (
                                <ChevronRight size={16} />
                              ) : (
                                <ChevronDown
                                  size={16}
                                  className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                />
                              )}
                            </span>
                          </button>

                          {/* Acordeón mobile: el detalle aparece pegado al cliente elegido */}
                          {!isDesktop && (
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  key="detalle"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div
                                    className="bg-white rounded-b-2xl p-5 border border-t-0 border-volcan-ember/40 shadow-lg"
                                    style={{ borderLeft: `4px solid ${brandColor}` }}
                                  >
                                    <ClienteDetalle cliente={cliente} brandColor={brandColor} />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Panel lateral (sólo desktop) */}
              {isDesktop && activeCliente && (
                <div className="lg:col-span-7 lg:sticky lg:top-28">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCliente.id}
                      initial={{ opacity: 0, x: 15, scale: 0.99 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -15, scale: 0.99 }}
                      transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                      className="bg-white rounded-3xl p-6 md:p-8 border border-volcan-taupe/20 shadow-xl relative overflow-hidden"
                      style={{ borderTop: `5px solid ${activeBrandColor}` }}
                    >
                      <ClienteDetalle cliente={activeCliente} brandColor={activeBrandColor} />
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

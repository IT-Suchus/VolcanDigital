import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchClientes, Cliente } from '../lib/api';
import { ExternalLink, TrendingUp, Quote } from 'lucide-react';

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

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    fetchClientes().then(setClientes).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-volcan-night text-center py-20 lg:py-32 border-b border-volcan-taupe/20">
        <div className="max-w-4xl mx-auto px-4">
          <FadeUp>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Casos de Éxito</h1>
            <p className="text-xl text-volcan-cream/90">Conocé a los negocios que confían en nosotros para escalar su facturación mensual de forma consistente.</p>
          </FadeUp>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 bg-volcan-cream flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientes.map((cliente, index) => (
              <FadeUp key={cliente.id} delay={index * 0.1}>
                <div 
                  className="bg-white rounded-3xl p-8 border border-volcan-taupe/20 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col group"
                  style={{ borderTop: `4px solid ${cliente.color_primario || '#D3A784'}` }}
                >
                  <div className="mb-6 flex-grow">
                    <div className="w-20 h-20 mb-4 bg-volcan-cream rounded-2xl flex items-center justify-center overflow-hidden border border-volcan-taupe/20">
                      {cliente.tiene_imagen ? (
                        <img 
                          src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/clientes/${cliente.id}/imagen`} 
                          alt={cliente.nombre}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <span className="text-volcan-taupe/50 font-serif text-2xl font-bold">{cliente.nombre.charAt(0)}</span>
                      )}
                    </div>
                    <div className="text-sm font-medium text-volcan-taupe mb-2 uppercase tracking-wide">{cliente.rubro}</div>
                    <h3 className="text-3xl font-serif font-bold text-volcan-night mb-6 group-hover:text-volcan-ember transition-colors">{cliente.nombre}</h3>
                    
                    {cliente.resultado_destacado && (
                      <div className="bg-volcan-taupe/10 rounded-xl p-4 flex items-start gap-3 border border-volcan-taupe/20">
                        <TrendingUp className="shrink-0 mt-1" style={{ color: cliente.color_primario || '#D3A784' }} />
                        <div>
                           <div className="text-xs font-bold text-volcan-taupe uppercase mb-1">Resultado Destacado</div>
                          <div className="text-volcan-night font-semibold">{cliente.resultado_destacado}</div>
                        </div>
                      </div>
                    )}

                    {cliente.testimonio && (
                      <div className="mt-4 relative bg-volcan-cream/50 rounded-2xl p-4 border border-volcan-taupe/10">
                        <Quote className="absolute right-3 top-3 text-volcan-ember/20 w-8 h-8 pointer-events-none" />
                        <p className="text-sm italic text-volcan-night/80 leading-relaxed relative z-10 pr-6">
                          "{cliente.testimonio}"
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {cliente.sitio_url && (
                    <a
                      href={cliente.sitio_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium transition-colors mt-auto"
                      style={{ color: cliente.color_primario || '#D3A784' }}
                    >
                      Visitar sitio <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

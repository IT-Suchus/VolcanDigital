import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchEquipo, Integrante } from '../lib/api';

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

export default function Nosotros() {
  const [equipo, setEquipo] = useState<Integrante[]>([]);

  useEffect(() => {
    fetchEquipo().then(setEquipo).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Storytelling Header */}
      <section className="bg-volcan-night relative overflow-hidden py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeUp>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-8">
              Una agencia enfocada en lo que importa
            </h1>
            <div className="space-y-6 text-lg text-volcan-sand/90">
              <p>
                Volcán Digital nació con una premisa simple: <strong className="text-white font-medium">menos humo, más resultados medibles</strong>. 
                Fundada por Vitória y Pablo, nos cansamos de ver agencias que vendían "likes" y "branding" sin impacto real en la facturación.
              </p>
              <p>
                Nos especializamos en negocios que ya funcionan pero no logran despegar en el ámbito digital. Analizamos datos, armamos estrategias de performance en Meta y Google Ads, y optimizamos la conversión para que la inversión publicitaria rinda de verdad.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-volcan-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-volcan-night mb-4">El Equipo</h2>
              <p className="text-lg text-volcan-stone">Especialistas detrás de cada campaña.</p>
            </FadeUp>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {equipo.map((miembro, index) => (
              <FadeUp key={miembro.id} delay={index * 0.1}>
                <div className="bg-white rounded-3xl overflow-hidden border border-volcan-sand shadow-sm hover:shadow-md transition-shadow group">
                  <div className="aspect-square bg-volcan-stone/10 relative">
                    {miembro.tiene_imagen ? (
                      <img 
                        src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/equipo/${miembro.id}/imagen`} 
                        alt={miembro.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-volcan-stone/30 font-serif text-5xl font-bold bg-gradient-to-br from-volcan-sand to-volcan-cream">
                        {miembro.nombre.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-8 text-center border-t border-volcan-sand">
                    <h3 className="text-2xl font-serif font-bold text-volcan-night mb-2">{miembro.nombre}</h3>
                    <p className="text-volcan-ember font-medium text-sm">{miembro.rol}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-volcan-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h3 className="text-sm font-bold text-volcan-stone/50 uppercase tracking-widest mb-8">Certificaciones y Formación</h3>
            <div className="flex flex-wrap justify-center gap-12 opacity-70">
              <span className="font-serif text-2xl font-bold text-volcan-stone">Google Search Ads</span>
              <span className="font-serif text-2xl font-bold text-volcan-stone">Google Analytics 4</span>
              <span className="font-serif text-2xl font-bold text-volcan-stone">Coderhouse</span>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}

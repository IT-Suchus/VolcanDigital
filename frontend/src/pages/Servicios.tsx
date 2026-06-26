import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchPlanes, Plan } from '../lib/api';
import { Check, X, ChevronDown, ChevronUp, Flame, Zap } from 'lucide-react';

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

const Accordion = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-volcan-taupe/20">
      <button
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-serif font-semibold text-lg">{question}</span>
        {isOpen ? <ChevronUp className="text-volcan-ember" /> : <ChevronDown className="text-volcan-ember" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pb-6 text-volcan-taupe">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

export default function Servicios() {
  const [planes, setPlanes] = useState<Plan[]>([]);

  useEffect(() => {
    fetchPlanes().then(setPlanes).catch(console.error);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price);
  };

  const faqs = [
    {
      question: "¿La inversión en Meta/Google Ads está incluida en el precio?",
      answer: "No. El fee que nos pagás es por el diseño de la estrategia, armado de campañas, optimización constante, análisis de datos y reporte. La inversión publicitaria se debita directamente de tu tarjeta configurada en Meta o Google."
    },
    {
      question: "¿Cuánto presupuesto recomiendan invertir en pauta?",
      answer: "Depende de tus objetivos y el valor de tu producto, pero recomendamos un piso mínimo de $100.000 ARS a $150.000 ARS mensuales para que el algoritmo tenga margen de aprendizaje y consigamos datos relevantes rápido."
    },
    {
      question: "¿En cuánto tiempo veo resultados?",
      answer: "Normalmente los primeros 15 a 30 días son de aprendizaje y testeo de audiencias y creativos. A partir del mes 2 o 3 es cuando empezamos a ver un retorno de inversión (ROAS) más estable y escalable."
    },
    {
      question: "¿Tengo que proveer los videos y fotos para los anuncios?",
      answer: "Sí, en los planes Impulso y Performance el material crudo lo provee el cliente (nosotros te pasamos los guiones y lineamientos). Si no tenés quién te grabe o edite, contamos con un servicio extra de Filmaker y Edición."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-volcan-night text-center py-20 lg:py-32 border-b border-volcan-taupe/20">
        <div className="max-w-4xl mx-auto px-4">
          <FadeUp>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Planes de Gestión</h1>
            <p className="text-xl text-volcan-cream/90">Menos humo, más resultados medibles. Elegí el nivel de acompañamiento que tu negocio necesita para escalar.</p>
          </FadeUp>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-24 bg-volcan-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {planes.map((plan, index) => {
              const isDestacado = plan.nombre === 'Performance';
              return (
                <FadeUp key={plan.id} delay={index * 0.1}>
                  <div className={`relative bg-white rounded-3xl p-8 shadow-lg transition-transform hover:-translate-y-2 ${isDestacado ? 'border-2 border-volcan-ember shadow-volcan-ember/10 scale-105 md:z-10' : 'border border-volcan-taupe/20'}`}>
                    {isDestacado && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-brand text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                        MÁS ELEGIDO
                      </div>
                    )}
                    
                    <h3 className="text-2xl font-serif font-bold mb-2">{plan.nombre}</h3>
                    <p className="text-sm text-volcan-taupe mb-6 min-h-[40px]">{plan.descripcion}</p>
                    
                    <div className="mb-8">
                      {plan.precio_promo && plan.precio_regular ? (
                        <>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-4xl font-bold text-volcan-night">{formatPrice(plan.precio_promo)}</span>
                            <span className="text-sm text-volcan-taupe">/mes</span>
                          </div>
                          <div className="text-xs text-volcan-ember font-medium mb-1">Promo por {plan.duracion_promo_meses} meses</div>
                          <div className="text-sm text-volcan-taupe/65 line-through">Regular: {formatPrice(plan.precio_regular)}/mes</div>
                        </>
                      ) : (
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xl font-medium text-volcan-night">Desde</span>
                          <span className="text-4xl font-bold text-volcan-night">{formatPrice(plan.precio_regular || plan.precio_promo || 0)}</span>
                          <span className="text-sm text-volcan-taupe">/mes</span>
                        </div>
                      )}
                    </div>

                    <a href={`/contacto?plan=${plan.nombre}`} className={`block text-center w-full py-3 rounded-xl font-bold transition-colors mb-8 ${isDestacado ? 'bg-volcan-ember text-volcan-night hover:bg-volcan-clay hover:text-white' : 'bg-volcan-taupe/15 text-volcan-night hover:bg-volcan-taupe/25'}`}>
                      Seleccionar Plan
                    </a>

                    <div className="space-y-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-volcan-taupe mb-4">Qué incluye</p>
                      {plan.incluye?.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check size={18} className="text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-volcan-night/95">{item}</span>
                        </div>
                      ))}
                      
                      {plan.no_incluye && plan.no_incluye.length > 0 && (
                        <>
                          <div className="w-full h-px bg-volcan-taupe/20 my-6"></div>
                          <p className="text-xs font-bold uppercase tracking-wider text-volcan-taupe mb-4">No incluye</p>
                          {plan.no_incluye.map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <X size={18} className="text-red-400 shrink-0 mt-0.5" />
                              <span className="text-sm text-volcan-taupe/80">{item}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Separator: Llama */}
      <div className="flex items-center justify-center bg-volcan-cream pt-12">
        <div className="w-1/4 max-w-[150px] h-[1px] bg-gradient-to-r from-transparent to-volcan-taupe/20"></div>
        <Flame className="text-volcan-ember/40 w-5 h-5 mx-4 shrink-0" />
        <div className="w-1/4 max-w-[150px] h-[1px] bg-gradient-to-l from-transparent to-volcan-taupe/20"></div>
      </div>

      {/* Extra Services */}
      <section className="py-20 bg-volcan-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeUp>
            <h3 className="text-3xl font-serif font-bold mb-10">Servicios Adicionales de Contenido</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm text-left border border-volcan-taupe/20">
                <h4 className="text-xl font-bold text-volcan-night mb-2">Filmaker</h4>
                <p className="text-volcan-taupe text-sm mb-4">Grabación presencial (La Plata/CABA) y edición de 4 videos optimizados para pauta.</p>
                <div className="text-2xl font-bold text-volcan-ember">$180.000</div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm text-left border border-volcan-taupe/20">
                <h4 className="text-xl font-bold text-volcan-night mb-2">Edición de Video</h4>
                <p className="text-volcan-taupe text-sm mb-4">Edición dinámica de 4 videos utilizando el material crudo enviado por vos.</p>
                <div className="text-2xl font-bold text-volcan-ember">$100.000</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Separator: Rayo */}
      <div className="flex items-center justify-center bg-volcan-cream pt-12">
        <div className="w-1/4 max-w-[150px] h-[1px] bg-gradient-to-r from-transparent to-volcan-taupe/20"></div>
        <Zap className="text-volcan-ember/40 w-5 h-5 mx-4 shrink-0" />
        <div className="w-1/4 max-w-[150px] h-[1px] bg-gradient-to-l from-transparent to-volcan-taupe/20"></div>
      </div>

      {/* FAQ */}
      <section className="py-24 bg-volcan-cream">
        <div className="max-w-3xl mx-auto px-4">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">Preguntas Frecuentes</h2>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-volcan-taupe/20">
              {faqs.map((faq, i) => (
                <Accordion key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}

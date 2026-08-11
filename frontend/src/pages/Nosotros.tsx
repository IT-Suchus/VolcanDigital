import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, TrendingUp, Lightbulb, Rocket, PartyPopper, Check } from 'lucide-react';
import equipoTrabajando from '../media/DSC04301-1-scaled-e1772034473472.webp';
import equipoMate from '../media/DSC04311-scaled-e1772032824910.webp';

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

/** Conector vertical entre ideas: da la lectura de "mapa mental" al encabezado. */
const Conector = ({ tono = 'claro' }: { tono?: 'claro' | 'oscuro' }) => (
  <div
    className={`w-px h-10 sm:h-12 mx-auto my-6 ${
      tono === 'claro' ? 'bg-gradient-to-b from-volcan-ember/60 to-volcan-ember/10' : 'bg-gradient-to-b from-volcan-ember/50 to-volcan-taupe/10'
    }`}
    aria-hidden="true"
  />
);

export default function Nosotros() {
  const motivaciones = [
    { icono: TrendingUp, texto: 'Nuevas ventas.' },
    { icono: Lightbulb, texto: 'Una oportunidad que aparece.' },
    { icono: Rocket, texto: 'Una campaña que empieza a funcionar.' },
    { icono: PartyPopper, texto: 'Un cliente que nos cuenta que tuvo un gran mes.' }
  ];

  const marcasIdeales = [
    'Ganas reales de crecer.',
    'Un buen producto o servicio.',
    'Apertura para probar, medir y mejorar.',
    'Predisposición para construir en equipo.'
  ];

  return (
    <div className="flex flex-col">
      {/* Encabezado: jerarquía fuerte y frases cortas para que se entienda escaneando */}
      <section className="bg-volcan-night relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-volcan-ember/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeUp>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] tracking-tight">
              Tu negocio merece una estrategia que{' '}
              <span className="text-volcan-ember">se entienda de cerca.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.15}>
            <Conector />
            <p className="text-lg sm:text-xl text-volcan-cream/80 max-w-2xl mx-auto leading-relaxed font-light">
              En Volcán creemos en involucrarnos de verdad en cada proyecto y entender qué está pasando detrás de los números.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <Conector />
            <p className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white max-w-3xl mx-auto leading-snug">
              Porque cuanto mejor entendemos tu negocio, mejores decisiones podemos tomar para hacerlo crecer.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Origen de Volcán */}
      <section className="bg-volcan-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeUp>
              <div className="space-y-6">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-volcan-ember">
                  Origen de Volcán
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-volcan-night leading-tight">
                  Volcán nació porque nos enamoramos del crecimiento digital.
                </h2>
                <p className="text-lg text-volcan-taupe leading-relaxed">
                  Siempre nos fascinó entender qué hace crecer una marca y cómo una buena estrategia puede abrir nuevas oportunidades para un negocio.
                </p>
                <p className="text-lg text-volcan-taupe leading-relaxed">
                  Empezamos ayudando a marcas a entrar al mundo digital y, después, a negocios que ya estaban ahí a{' '}
                  <span className="text-volcan-night font-medium">ordenarse, mejorar y crecer</span>.
                </p>
                <p className="text-xl md:text-2xl font-serif font-bold text-volcan-night leading-snug pt-2 border-l-4 border-volcan-ember pl-5">
                  Hacer crecer otros negocios se convirtió en nuestro trabajo favorito.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              {/* Se respeta la proporción nativa de cada foto: recortarlas a un marco
                  vertical dejaba gente fuera de cuadro. width/height reservan el espacio. */}
              <div className="space-y-4">
                <img
                  src={equipoTrabajando}
                  alt="El equipo de Volcán Digital trabajando en la oficina"
                  width={1600}
                  height={1362}
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg"
                />
                <div className="flex justify-end">
                  <img
                    src={equipoMate}
                    alt="Dos integrantes del equipo de Volcán revisando una campaña"
                    width={1274}
                    height={1274}
                    loading="lazy"
                    className="w-2/3 h-auto rounded-3xl shadow-xl ring-4 ring-volcan-cream"
                  />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Nuestra forma de trabajar */}
      <section className="bg-volcan-night py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              Por eso elegimos trabajar los proyectos de cerca.
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <Conector />
            <p className="text-lg text-volcan-cream/80 font-light">
              En Volcán no pasás por una cadena de personas.
            </p>
            <p className="text-2xl md:text-3xl font-serif font-bold text-volcan-ember mt-4">
              Hablás con quienes están haciendo el trabajo.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <Conector />
            <p className="text-lg text-volcan-cream/80 max-w-2xl mx-auto leading-relaxed font-light">
              Quienes entienden tu negocio también participan de la estrategia, analizan los resultados y proponen qué ajustar.
            </p>
          </FadeUp>

          <FadeUp delay={0.45}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {['Menos intermediarios.', 'Más contexto.', 'Mejores decisiones.'].map((frase) => (
                <span
                  key={frase}
                  className="px-5 py-2.5 rounded-full border border-volcan-ember/30 bg-volcan-ember/10 text-white font-serif font-bold text-base sm:text-lg"
                >
                  {frase}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Lo que nos motiva */}
      <section className="bg-volcan-cream py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-volcan-night text-center leading-tight mb-14 max-w-3xl mx-auto">
              Nos gusta cuando nuestro trabajo se convierte en crecimiento real.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {motivaciones.map((item, index) => {
              const Icono = item.icono;
              return (
                <FadeUp key={item.texto} delay={0.1 * index}>
                  <div className="h-full flex items-center gap-4 bg-white p-6 rounded-2xl border border-volcan-taupe/20 shadow-sm">
                    <div className="w-11 h-11 rounded-xl bg-volcan-ember/10 flex items-center justify-center shrink-0">
                      <Icono className="text-volcan-ember" size={22} />
                    </div>
                    <span className="text-lg font-medium text-volcan-night">{item.texto}</span>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp delay={0.3}>
            <p className="text-2xl md:text-3xl font-serif font-bold text-volcan-night text-center mt-14">
              Ahí nuestro trabajo cobra sentido.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Con qué marcas queremos trabajar */}
      <section className="bg-volcan-cream py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-volcan-taupe/20 shadow-sm p-6 sm:p-10 md:p-12">
            <FadeUp>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-volcan-night leading-tight">
                No buscamos trabajar con todo el mundo.
              </h2>
              <p className="text-base sm:text-lg text-volcan-taupe mt-3 sm:mt-4">Queremos trabajar con marcas que tengan:</p>
            </FadeUp>

            <ul className="mt-6 sm:mt-8 space-y-3.5 sm:space-y-4">
              {marcasIdeales.map((marca, index) => (
                <FadeUp key={marca} delay={0.08 * index}>
                  <li className="flex items-start gap-3 sm:gap-3.5">
                    <span className="w-6 h-6 rounded-full bg-volcan-ember/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-volcan-ember" strokeWidth={3} />
                    </span>
                    <span className="text-base sm:text-lg text-volcan-night/90 leading-snug">{marca}</span>
                  </li>
                </FadeUp>
              ))}
            </ul>

            <FadeUp delay={0.35}>
              <p className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-volcan-night leading-snug mt-8 pt-6 sm:mt-10 sm:pt-8 border-t border-volcan-taupe/15">
                Porque las mejores estrategias aparecen cuando agencia y negocio trabajan juntos.
              </p>
            </FadeUp>
          </div>

          {/* Separator: Llama */}
          <div className="my-12 sm:my-16 flex items-center justify-center gap-4">
            <div className="w-16 sm:w-24 h-[1px] bg-volcan-taupe/25"></div>
            <Flame className="text-volcan-ember/50 w-5 h-5 shrink-0" />
            <div className="w-16 sm:w-24 h-[1px] bg-volcan-taupe/25"></div>
          </div>

          {/* Certifications */}
          <FadeUp>
            <div className="text-center">
              <h3 className="text-xs sm:text-sm font-bold text-volcan-taupe uppercase tracking-widest mb-6">Certificaciones y Formación</h3>
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5">
                <div className="px-5 py-3 rounded-2xl bg-white border border-volcan-taupe/20 shadow-sm font-serif font-bold text-volcan-night text-base sm:text-lg hover:border-volcan-ember/40 transition-colors">
                  Google Search Ads
                </div>
                <div className="px-5 py-3 rounded-2xl bg-white border border-volcan-taupe/20 shadow-sm font-serif font-bold text-volcan-night text-base sm:text-lg hover:border-volcan-ember/40 transition-colors">
                  Google Analytics 4
                </div>
                <div className="px-5 py-3 rounded-2xl bg-white border border-volcan-taupe/20 shadow-sm font-serif font-bold text-volcan-night text-base sm:text-lg hover:border-volcan-ember/40 transition-colors">
                  Coderhouse
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Cierre */}
      <section className="bg-volcan-night py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-volcan-ember/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeUp>
            <p className="text-lg sm:text-xl text-volcan-cream/80 font-light">
              Si buscás una agencia que mire tu negocio de cerca,
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mt-4 leading-tight">
              Volcán es el lugar correcto.
            </h2>
            <div className="mt-10">
              <Link
                to="/contacto"
                className="inline-block bg-volcan-ember text-volcan-night px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-white transition-colors"
              >
                Hablemos
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}

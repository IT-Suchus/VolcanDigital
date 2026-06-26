import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { fetchPlanes, Plan, submitLead } from '../lib/api';
import { MapPin, Mail, Instagram, Phone, CheckCircle } from 'lucide-react';

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

type ContactFormData = {
  nombre: string;
  email: string;
  telefono: string;
  negocio: string;
  plan_interes: string;
  mensaje: string;
};

export default function Contacto() {
  const [searchParams] = useSearchParams();
  const preselectedPlan = searchParams.get('plan') || '';
  
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    defaultValues: {
      plan_interes: preselectedPlan
    }
  });

  useEffect(() => {
    fetchPlanes().then(setPlanes).catch(console.error);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitLead({ ...data, origen: 'formulario_web' });
      setIsSuccess(true);
    } catch (error) {
      console.error('Error enviando formulario:', error);
      alert('Hubo un error al enviar el mensaje. Por favor, intentá directamente por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col bg-volcan-cream min-h-screen">
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-volcan-night mb-6">Hablemos de tu negocio</h1>
              <p className="text-xl text-volcan-taupe max-w-2xl mx-auto">
                Dejanos tus datos para agendar una auditoría gratuita o sacarte todas las dudas sobre cómo podemos escalar tus ventas.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Form */}
            <div className="lg:col-span-3">
              <FadeUp delay={0.1}>
                {isSuccess ? (
                  <div className="bg-white rounded-3xl p-10 text-center border border-volcan-taupe/20 shadow-sm h-full flex flex-col justify-center items-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="text-green-600" size={40} />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-volcan-night mb-4">¡Mensaje enviado!</h3>
                    <p className="text-lg text-volcan-taupe mb-8">
                      Recibimos tus datos correctamente. Nos vamos a estar comunicando a la brevedad para coordinar una reunión.
                    </p>
                    <a
                      href="https://wa.me/5492216743529"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex bg-volcan-ember text-volcan-night px-8 py-4 rounded-xl font-bold hover:bg-volcan-clay hover:text-white transition-colors"
                    >
                      Prefiero hablar por WhatsApp ahora
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-volcan-taupe/20 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-volcan-night mb-2">Nombre completo *</label>
                        <input
                          {...register('nombre', { required: 'El nombre es obligatorio', minLength: { value: 2, message: 'Mínimo 2 caracteres' } })}
                          className={`w-full px-4 py-3 rounded-xl border bg-volcan-cream/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-volcan-ember/50 transition-colors ${errors.nombre ? 'border-red-500' : 'border-volcan-taupe/20'}`}
                          placeholder="Juan Pérez"
                        />
                        {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-volcan-night mb-2">Email *</label>
                        <input
                          type="email"
                          {...register('email', { required: 'El email es obligatorio', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })}
                          className={`w-full px-4 py-3 rounded-xl border bg-volcan-cream/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-volcan-ember/50 transition-colors ${errors.email ? 'border-red-500' : 'border-volcan-taupe/20'}`}
                          placeholder="juan@empresa.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-volcan-night mb-2">Teléfono / WhatsApp</label>
                        <input
                          {...register('telefono')}
                          className="w-full px-4 py-3 rounded-xl border border-volcan-taupe/20 bg-volcan-cream/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-volcan-ember/50 transition-colors"
                          placeholder="+54 9 11 1234-5678"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-volcan-night mb-2">Nombre de tu negocio / web</label>
                        <input
                          {...register('negocio')}
                          className="w-full px-4 py-3 rounded-xl border border-volcan-taupe/20 bg-volcan-cream/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-volcan-ember/50 transition-colors"
                          placeholder="empresa.com.ar"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-volcan-night mb-2">Plan de interés</label>
                      <select
                        {...register('plan_interes')}
                        className="w-full px-4 py-3 rounded-xl border border-volcan-taupe/20 bg-volcan-cream/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-volcan-ember/50 transition-colors"
                      >
                        <option value="">Aún no lo sé, busco asesoramiento</option>
                        {planes.map(p => (
                          <option key={p.id} value={p.nombre}>{p.nombre}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-volcan-night mb-2">Mensaje *</label>
                      <textarea
                        rows={4}
                        {...register('mensaje', { required: 'Por favor, dejanos un mensaje', minLength: { value: 10, message: 'Contanos un poco más sobre tu necesidad' } })}
                        className={`w-full px-4 py-3 rounded-xl border bg-volcan-cream/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-volcan-ember/50 transition-colors resize-none ${errors.mensaje ? 'border-red-500' : 'border-volcan-taupe/20'}`}
                        placeholder="Contanos cuáles son tus objetivos, cuánto estás facturando aprox, o si ya haces publicidad..."
                      ></textarea>
                      {errors.mensaje && <p className="mt-1 text-sm text-red-500">{errors.mensaje.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-brand text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-volcan-ember/20"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                    </button>
                  </form>
                )}
              </FadeUp>
            </div>

            {/* Direct Contact & Map */}
            <div className="lg:col-span-2 space-y-8">
              <FadeUp delay={0.2}>
                <div className="bg-volcan-night text-volcan-cream rounded-3xl p-8 lg:p-10 shadow-lg">
                  <h3 className="text-2xl font-serif font-bold text-white mb-8">Contacto Directo</h3>
                  
                  <ul className="space-y-6">
                    <li>
                      <a href="https://wa.me/5492216743529" target="_blank" rel="noreferrer" className="flex items-start gap-4 hover:text-white group transition-colors">
                        <div className="w-12 h-12 bg-volcan-taupe/15 rounded-full flex items-center justify-center shrink-0 group-hover:bg-volcan-ember transition-colors">
                          <Phone size={20} className="text-volcan-cream group-hover:text-volcan-night" />
                        </div>
                        <div>
                          <div className="text-sm text-volcan-cream/70 mb-1">WhatsApp</div>
                          <div className="font-medium">+54 9 221 674-3529</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="mailto:info@volcandigital.com.ar" className="flex items-start gap-4 hover:text-white group transition-colors">
                        <div className="w-12 h-12 bg-volcan-taupe/15 rounded-full flex items-center justify-center shrink-0 group-hover:bg-volcan-ember transition-colors">
                          <Mail size={20} className="text-volcan-cream group-hover:text-volcan-night" />
                        </div>
                        <div>
                          <div className="text-sm text-volcan-cream/70 mb-1">Email</div>
                          <div className="font-medium">info@volcandigital.com.ar</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="https://instagram.com/volcan.digital" target="_blank" rel="noreferrer" className="flex items-start gap-4 hover:text-white group transition-colors">
                        <div className="w-12 h-12 bg-volcan-taupe/15 rounded-full flex items-center justify-center shrink-0 group-hover:bg-volcan-ember transition-colors">
                          <Instagram size={20} className="text-volcan-cream group-hover:text-volcan-night" />
                        </div>
                        <div>
                          <div className="text-sm text-volcan-cream/70 mb-1">Instagram</div>
                          <div className="font-medium">@volcan.digital</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-volcan-taupe/15 rounded-full flex items-center justify-center shrink-0">
                          <MapPin size={20} className="text-volcan-cream" />
                        </div>
                        <div>
                          <div className="text-sm text-volcan-cream/70 mb-1">Ubicación</div>
                          <div className="font-medium">La Plata, Buenos Aires<br/>Argentina</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="rounded-3xl overflow-hidden shadow-sm h-64 bg-volcan-taupe/10 border border-volcan-taupe/20">
                  {/* Google Maps Embed */}
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104689.65997230588!2d-58.04364402685955!3d-34.920494800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e62b1f0085a1%3A0xbcfc44f0547312e3!2sLa%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1711234567890!5m2!1ses-419!2sar" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación La Plata"
                  ></iframe>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

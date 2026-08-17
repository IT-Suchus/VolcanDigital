import LegalPageLayout, { LegalSection, LegalList } from '../components/common/LegalPageLayout';

export default function AvisoLegal() {
  return (
    <LegalPageLayout title="Aviso Legal" actualizado="17 de agosto de 2026">
      <LegalSection title="1. Datos identificativos">
        <p>
          En cumplimiento del deber de información, se detallan a continuación los datos del titular
          responsable de este sitio web (en adelante, "Volcán Digital" o "el Sitio"):
        </p>
        <LegalList
          items={[
            <>Nombre comercial: Volcán Digital</>,
            <>Domicilio comercial: La Plata, Buenos Aires, Argentina</>,
            <>Correo electrónico de contacto: <a href="mailto:info@volcandigital.com.ar" className="text-volcan-ember hover:underline">info@volcandigital.com.ar</a></>,
            <>Actividad: agencia de marketing digital y publicidad de performance</>,
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Objeto">
        <p>
          Este Sitio tiene como finalidad presentar los servicios de Volcán Digital, mostrar casos de
          éxito de clientes y permitir el contacto de potenciales clientes a través de un formulario
          y canales de mensajería (WhatsApp).
        </p>
      </LegalSection>

      <LegalSection title="3. Condiciones de uso">
        <p>
          El acceso y la navegación por el Sitio suponen la aceptación de las condiciones aquí
          descriptas. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios
          ofrecidos, y a no emplearlos para incurrir en actividades ilícitas o contrarias a la buena fe
          y al orden público.
        </p>
      </LegalSection>

      <LegalSection title="4. Propiedad intelectual e industrial">
        <p>
          Los contenidos del Sitio (textos, imágenes, logotipos, diseño, código fuente, y demás
          elementos) son titularidad de Volcán Digital o de terceros que han autorizado su uso, y
          están protegidos por la normativa vigente en materia de propiedad intelectual. Queda
          prohibida su reproducción, distribución o transformación total o parcial sin autorización
          expresa.
        </p>
        <p>
          Los logos y nombres de los clientes exhibidos en la sección de Casos de Éxito pertenecen a
          sus respectivos titulares y se muestran con fines ilustrativos de los trabajos realizados.
        </p>
      </LegalSection>

      <LegalSection title="5. Enlaces a terceros">
        <p>
          El Sitio puede contener enlaces a redes sociales o sitios de terceros (Instagram, WhatsApp,
          Meta, Google). Volcán Digital no se responsabiliza por el contenido, políticas de privacidad
          o prácticas de dichos terceros.
        </p>
      </LegalSection>

      <LegalSection title="6. Exclusión de responsabilidad">
        <p>
          Volcán Digital no garantiza la disponibilidad continua e ininterrumpida del Sitio, y no se
          hace responsable por eventuales daños derivados de interrupciones, virus informáticos o
          fallas técnicas ajenas a su control.
        </p>
      </LegalSection>

      <LegalSection title="7. Legislación aplicable y jurisdicción">
        <p>
          Las presentes condiciones se rigen por la legislación de la República Argentina. Para
          cualquier controversia derivada del uso del Sitio, las partes se someten a los tribunales
          ordinarios de la ciudad de La Plata, Provincia de Buenos Aires, con renuncia expresa a
          cualquier otro fuero que pudiera corresponder.
        </p>
      </LegalSection>

      <LegalSection title="8. Modificaciones">
        <p>
          Volcán Digital podrá modificar el contenido de este Aviso Legal en cualquier momento, siendo
          válida y aplicable la versión publicada en el Sitio en cada momento.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

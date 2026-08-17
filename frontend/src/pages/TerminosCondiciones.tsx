import LegalPageLayout, { LegalSection, LegalList } from '../components/common/LegalPageLayout';

export default function TerminosCondiciones() {
  return (
    <LegalPageLayout title="Términos y Condiciones" actualizado="17 de agosto de 2026">
      <LegalSection title="1. Aceptación">
        <p>
          Estos Términos y Condiciones regulan la contratación de los servicios ofrecidos por Volcán
          Digital a través de este sitio web y de los canales de contacto asociados (WhatsApp, email,
          formulario). El contacto o la contratación de un servicio implica la aceptación de estos
          términos.
        </p>
      </LegalSection>

      <LegalSection title="2. Servicios ofrecidos">
        <p>Volcán Digital ofrece servicios de marketing digital, entre ellos:</p>
        <LegalList
          items={[
            'Gestión de campañas de publicidad en Meta Ads (Instagram y Facebook) y Google Ads.',
            'Diseño y desarrollo de sitios web y tiendas online.',
            'Automatizaciones de negocio.',
            'Filmmaker y edición de video como servicios adicionales de contenido.',
          ]}
        />
        <p>
          El alcance específico de cada servicio se detalla en la propuesta comercial enviada al
          cliente y en la sección de Servicios del Sitio.
        </p>
      </LegalSection>

      <LegalSection title="3. Proceso de contratación">
        <p>
          La contratación se inicia con una consulta a través del formulario de contacto o WhatsApp.
          Volcán Digital envía una propuesta con el detalle del plan, precio y condiciones. El
          servicio comienza una vez que el cliente confirma la propuesta y, cuando corresponda, abona
          la seña o primer pago acordado.
        </p>
      </LegalSection>

      <LegalSection title="4. Precios y forma de pago">
        <p>
          El fee que abona el cliente corresponde al diseño de la estrategia, armado y optimización de
          campañas, análisis de datos y reportes. <strong className="text-volcan-night">La
          inversión publicitaria en Meta Ads o Google Ads no está incluida en el fee</strong> y se
          debita directamente de la tarjeta o cuenta configurada por el cliente en cada plataforma.
        </p>
        <p>
          Los precios de los planes pueden variar y se detallan en la propuesta enviada a cada
          cliente. Las promociones vigentes en el Sitio tienen la duración indicada en cada caso.
        </p>
      </LegalSection>

      <LegalSection title="5. Obligaciones del cliente">
        <p>Para poder prestar el servicio correctamente, el cliente se compromete a:</p>
        <LegalList
          items={[
            'Otorgar los accesos necesarios a sus cuentas publicitarias, sitio web y/o redes sociales.',
            'Proveer en tiempo y forma el material solicitado (fotos, videos, información del negocio).',
            'Mantener un presupuesto publicitario acorde a lo recomendado para que las campañas puedan generar resultados.',
            'Responder consultas relacionadas con la aprobación de piezas creativas y campañas.',
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Resultados y limitación de responsabilidad">
        <p>
          Volcán Digital pone a disposición su conocimiento y experiencia para optimizar campañas y
          estrategias digitales, pero <strong className="text-volcan-night">no garantiza resultados
          específicos de ventas, ROAS o posicionamiento</strong>, ya que estos dependen de múltiples
          factores externos: presupuesto invertido, estacionalidad, competencia, calidad del
          producto/servicio del cliente, y políticas de las plataformas publicitarias (Meta y Google),
          entre otros.
        </p>
        <p>
          Volcán Digital no se responsabiliza por suspensiones, rechazos o bloqueos de cuentas
          publicitarias aplicados directamente por Meta o Google conforme a sus propias políticas.
        </p>
      </LegalSection>

      <LegalSection title="7. Propiedad intelectual de los entregables">
        <p>
          Una vez abonados en su totalidad, las piezas creativas, sitios web y demás entregables
          desarrollados específicamente para el cliente pasan a ser de su propiedad. Volcán Digital
          conserva el derecho de exhibir el trabajo realizado como parte de su portfolio y casos de
          éxito, salvo acuerdo de confidencialidad expreso en contrario.
        </p>
      </LegalSection>

      <LegalSection title="8. Cancelación del servicio">
        <p>
          Los servicios de gestión son de carácter mensual y se renuevan automáticamente salvo
          cancelación. El cliente puede dar de baja el servicio notificando con al menos 15 días de
          anticipación al próximo período de facturación.
        </p>
      </LegalSection>

      <LegalSection title="9. Legislación aplicable y jurisdicción">
        <p>
          Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Ante
          cualquier controversia, las partes se someten a los tribunales ordinarios de la ciudad de
          La Plata, Provincia de Buenos Aires.
        </p>
      </LegalSection>

      <LegalSection title="10. Modificaciones">
        <p>
          Volcán Digital podrá actualizar estos Términos y Condiciones en cualquier momento. Los
          cambios aplican a los servicios contratados a partir de la fecha de publicación de la nueva
          versión.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

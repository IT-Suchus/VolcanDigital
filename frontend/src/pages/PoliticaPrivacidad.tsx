import LegalPageLayout, { LegalSection, LegalList } from '../components/common/LegalPageLayout';

export default function PoliticaPrivacidad() {
  return (
    <LegalPageLayout title="Política de Privacidad" actualizado="17 de agosto de 2026">
      <LegalSection title="1. Responsable del tratamiento">
        <p>
          El responsable del tratamiento de los datos personales recolectados a través de este sitio
          web es:
        </p>
        <LegalList
          items={[
            <>Nombre comercial: Volcán Digital</>,
            <>Domicilio: La Plata, Buenos Aires, Argentina</>,
            <>Correo electrónico: <a href="mailto:info@volcandigital.com.ar" className="text-volcan-ember hover:underline">info@volcandigital.com.ar</a></>,
          ]}
        />
        <p>
          Esta política se rige por la Ley N.º 25.326 de Protección de Datos Personales de la
          República Argentina y sus normas reglamentarias.
        </p>
      </LegalSection>

      <LegalSection title="2. Qué datos recolectamos">
        <p>Recolectamos datos personales en dos situaciones:</p>
        <LegalList
          items={[
            <><strong className="text-volcan-night">Formulario de contacto:</strong> nombre, email, teléfono, nombre del negocio, plan de interés y el mensaje que nos escribas.</>,
            <><strong className="text-volcan-night">Navegación por el Sitio:</strong> datos técnicos y de comportamiento recolectados de forma automática mediante cookies y píxeles de terceros (Google Analytics 4, Meta Pixel), como páginas visitadas, dispositivo y origen del tráfico.</>,
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Finalidad del tratamiento">
        <p>Usamos tus datos para:</p>
        <LegalList
          items={[
            'Responder tu consulta y contactarte por email o WhatsApp.',
            'Elaborar propuestas comerciales acordes a tu negocio.',
            'Medir el rendimiento del Sitio y de nuestras campañas publicitarias.',
            'Optimizar la segmentación de audiencias en Meta Ads y Google Ads.',
          ]}
        />
        <p>
          No utilizamos tus datos para fines distintos de los aquí descriptos, ni los vendemos a
          terceros.
        </p>
      </LegalSection>

      <LegalSection title="4. Base legal">
        <p>
          El tratamiento se basa en tu consentimiento, otorgado al completar voluntariamente el
          formulario de contacto o al aceptar cookies en tu primera visita al Sitio.
        </p>
      </LegalSection>

      <LegalSection title="5. Con quién compartimos tus datos">
        <p>
          Utilizamos las siguientes herramientas de terceros, que actúan como encargados del
          tratamiento o recolectan datos de navegación de forma independiente según sus propias
          políticas:
        </p>
        <LegalList
          items={[
            <>Meta (Facebook/Instagram Ads y Meta Pixel) — <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer" className="text-volcan-ember hover:underline">política de privacidad de Meta</a>.</>,
            <>Google (Google Ads, Google Analytics 4, Search Console) — <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-volcan-ember hover:underline">política de privacidad de Google</a>.</>,
            <>WhatsApp Business, para la atención de consultas.</>,
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Plazo de conservación">
        <p>
          Conservamos tus datos mientras exista una relación comercial o potencial con vos, y hasta
          24 meses después de tu último contacto, salvo que solicites su eliminación antes.
        </p>
      </LegalSection>

      <LegalSection title="7. Tus derechos (ARCO)">
        <p>
          De acuerdo con la Ley 25.326, tenés derecho a acceder, rectificar, actualizar y suprimir tus
          datos personales. Para ejercer estos derechos, escribinos a{' '}
          <a href="mailto:info@volcandigital.com.ar" className="text-volcan-ember hover:underline">info@volcandigital.com.ar</a>.
        </p>
        <p>
          La Agencia de Acceso a la Información Pública (AAIP), en su carácter de Órgano de Control de
          la Ley 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan
          quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en
          materia de protección de datos personales.
        </p>
      </LegalSection>

      <LegalSection title="8. Seguridad">
        <p>
          Adoptamos medidas técnicas y organizativas razonables para proteger tus datos personales
          contra pérdida, uso indebido o acceso no autorizado.
        </p>
      </LegalSection>

      <LegalSection title="9. Menores de edad">
        <p>
          Nuestros servicios están dirigidos a personas mayores de 18 años. No recolectamos
          intencionalmente datos de menores de edad.
        </p>
      </LegalSection>

      <LegalSection title="10. Cambios en esta política">
        <p>
          Podemos actualizar esta política para reflejar cambios legales o en nuestras prácticas. La
          fecha de la última actualización figura al inicio de esta página.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

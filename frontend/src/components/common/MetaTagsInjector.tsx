import { useEffect } from 'react';
import { fetchConfiguracion } from '../../lib/api';

const META_NAME = 'facebook-domain-verification';

/**
 * Inyecta el meta tag de verificación de dominio de Meta Business Suite en el <head>.
 * Se carga desde la API para que se pueda actualizar desde el Admin sin redeploy.
 *
 * Nota: como el sitio es una SPA renderizada en el cliente, esto sólo funciona si el
 * verificador de Meta ejecuta JavaScript. Si la verificación por meta tag falla,
 * usar el método alternativo de registro TXT en el DNS del dominio.
 */
export default function MetaTagsInjector() {
  useEffect(() => {
    let cancelled = false;

    fetchConfiguracion()
      .then(({ meta_domain_verification }) => {
        if (cancelled || !meta_domain_verification) return;

        let tag = document.querySelector<HTMLMetaElement>(`meta[name="${META_NAME}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', META_NAME);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', meta_domain_verification);
      })
      .catch(() => {
        // Silencioso: la ausencia del tag no debe afectar la carga del sitio.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

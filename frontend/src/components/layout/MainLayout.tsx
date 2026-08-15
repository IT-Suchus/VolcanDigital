import { Outlet, Link } from 'react-router-dom';
import { Menu, X, MapPin, Mail, Instagram, Phone } from 'lucide-react';
import { useState } from 'react';
import BrandLogo from '../common/BrandLogo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Clientes', path: '/clientes' },
    { name: 'Nosotros', path: '/nosotros' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#161314]/95 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-5">
          <div className="flex-shrink-0 flex items-center">
            <BrandLogo iconSize="md" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white/70 hover:text-volcan-ember transition-colors text-xs uppercase tracking-[0.2em] font-medium py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-volcan-ember transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              to="/contacto"
              className="px-6 py-2.5 rounded-full font-medium text-xs tracking-wider transition-all duration-300 hover:bg-volcan-ember hover:text-volcan-night hover:shadow-[0_0_20px_rgba(211,167,132,0.4)] ml-2"
              style={{
                color: '#D3A784',
                border: '1px solid rgba(211,167,132,0.4)',
                backgroundColor: 'rgba(211,167,132,0.05)',
              }}
            >
              Hablemos
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-volcan-cream hover:text-volcan-ember focus:outline-none p-2"
              aria-label="Abrir menú"
            >
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Linea inferior con brillo sutil */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-volcan-ember/30 to-transparent" />

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#161314] border-b border-volcan-ember/20 shadow-2xl">
          <div className="px-6 pt-4 pb-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-volcan-ember transition-colors py-2 border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contacto"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-6 px-6 py-3 rounded-full font-medium text-sm tracking-wider transition-all duration-300 hover:bg-volcan-ember hover:text-volcan-night"
              style={{
                color: '#D3A784',
                border: '1px solid rgba(211,167,132,0.4)',
                backgroundColor: 'rgba(211,167,132,0.08)',
              }}
            >
              Hablemos
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-volcan-night text-volcan-cream border-t border-volcan-taupe/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <BrandLogo iconSize="md" className="mb-4" />
            <p className="text-volcan-cream/70 text-sm max-w-sm">
              Agencia de marketing digital especializada en performance y resultados medibles. Menos humo, más ventas.
            </p>
          </div>

          {/* Navigation Col */}
          <div className="md:col-span-3">
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">Navegación</h4>
            <ul className="space-y-3 text-sm text-volcan-cream/80">
              <li><Link to="/" className="hover:text-volcan-ember transition-colors">Inicio</Link></li>
              <li><Link to="/servicios" className="hover:text-volcan-ember transition-colors">Servicios</Link></li>
              <li><Link to="/clientes" className="hover:text-volcan-ember transition-colors">Casos de Éxito</Link></li>
              <li><Link to="/nosotros" className="hover:text-volcan-ember transition-colors">Nuestro Equipo</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4">
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">Contacto</h4>
            <ul className="space-y-4 text-sm text-volcan-cream/80">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-volcan-ember shrink-0" />
                <a href="https://wa.me/5492216743529" target="_blank" rel="noreferrer" className="hover:text-volcan-ember transition-colors">
                  +54 9 221 674-3529
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-volcan-ember shrink-0" />
                <a href="mailto:info@volcandigital.com.ar" className="hover:text-volcan-ember transition-colors">
                  info@volcandigital.com.ar
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={18} className="text-volcan-ember shrink-0" />
                <a href="https://instagram.com/volcan.digital" target="_blank" rel="noreferrer" className="hover:text-volcan-ember transition-colors">
                  @volcan.digital
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-volcan-ember shrink-0 mt-1" />
                <span>La Plata, Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-volcan-taupe/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-volcan-cream/60 gap-4">
          <p>&copy; {new Date().getFullYear()} Volcán Digital. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1 font-medium">
            Diseñado y desarrollado por{' '}
            <span className="text-[#D3A784] font-semibold hover:underline cursor-pointer">Suchus IT</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-volcan-night text-volcan-cream">
      <Header />
      <main className="flex-grow pt-20 md:pt-24">
        <Outlet />
      </main>
      <Footer />

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/5492216743529"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl transition-all duration-300 hover:scale-110 shadow-[#25D366]/30"
        aria-label="Contactar por WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.65zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </div>
  );
}

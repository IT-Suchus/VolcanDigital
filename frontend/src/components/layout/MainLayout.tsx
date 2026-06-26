import { Outlet, Link } from 'react-router-dom';
import { Menu, X, MapPin, Mail, Instagram, Phone } from 'lucide-react';
import { useState } from 'react';

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
    <header className="fixed w-full z-50 bg-volcan-night/95 backdrop-blur-sm border-b border-volcan-taupe/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-serif font-bold text-volcan-ember flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-volcan-ember">
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
              </svg>
              Volcán
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-volcan-cream hover:text-volcan-ember transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contacto"
              className="bg-gradient-brand text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-volcan-ember/20"
            >
              Hablemos
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-volcan-cream hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-volcan-night border-b border-volcan-taupe/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-volcan-cream hover:text-volcan-ember hover:bg-volcan-taupe/20"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contacto"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 bg-gradient-brand text-white px-6 py-3 rounded-xl font-medium"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold text-volcan-ember flex items-center gap-2 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
              </svg>
              Volcán Digital
            </Link>
            <p className="text-volcan-cream/70 text-sm">
              Agencia de marketing digital especializada en performance y resultados medibles. Menos humo, más ventas.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">Navegación</h4>
            <ul className="space-y-3 text-sm text-volcan-cream/80">
              <li><Link to="/" className="hover:text-volcan-ember transition-colors">Inicio</Link></li>
              <li><Link to="/servicios" className="hover:text-volcan-ember transition-colors">Servicios</Link></li>
              <li><Link to="/clientes" className="hover:text-volcan-ember transition-colors">Casos de Éxito</Link></li>
              <li><Link to="/nosotros" className="hover:text-volcan-ember transition-colors">Nuestro Equipo</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">Contacto</h4>
            <ul className="space-y-4 text-sm text-volcan-cream/80">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-volcan-ember" />
                <a href="https://wa.me/5492216743529" target="_blank" rel="noreferrer" className="hover:text-volcan-ember transition-colors">
                  +54 9 221 674-3529
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-volcan-ember" />
                <a href="mailto:info@volcandigital.com.ar" className="hover:text-volcan-ember transition-colors">
                  info@volcandigital.com.ar
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={18} className="text-volcan-ember" />
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
        
        <div className="border-t border-volcan-taupe/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-volcan-cream/50">
          <p>&copy; {new Date().getFullYear()} Volcán Digital. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-volcan-cream text-volcan-night">
      <Header />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5492216743529"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-[#349e59] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-50 flex items-center justify-center border-2 border-volcan-ember shadow-lg shadow-volcan-ember/25"
        aria-label="Contactar por WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}

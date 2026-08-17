import { Link } from 'react-router-dom';
import { Flame, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="bg-volcan-night min-h-[70vh] flex items-center justify-center py-24 px-4">
      <div className="max-w-lg mx-auto text-center">
        <Flame className="text-volcan-ember/50 w-14 h-14 mx-auto mb-6" />
        <div className="font-serif font-bold text-volcan-ember text-7xl sm:text-8xl leading-none mb-4">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
          Esta página se apagó.
        </h1>
        <p className="text-volcan-cream/70 text-base sm:text-lg leading-relaxed mb-10">
          No encontramos lo que buscabas. Puede que el link esté roto o que la página se haya movido.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#684036] text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-[#58352d] transition-colors shadow-lg"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
          <a
            href="https://wa.me/5492216743529"
            target="_blank"
            rel="noreferrer"
            className="text-white/60 text-sm font-medium hover:text-white/90 transition-colors"
          >
            Hablar por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}

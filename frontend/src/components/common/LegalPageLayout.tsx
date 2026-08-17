import { ReactNode } from 'react';

export default function LegalPageLayout({
  title,
  actualizado,
  children,
}: {
  title: string;
  actualizado: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <section className="bg-volcan-night py-16 sm:py-20 border-b border-volcan-taupe/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">{title}</h1>
          <p className="text-sm text-volcan-cream/60 mt-3">Última actualización: {actualizado}</p>
        </div>
      </section>

      <section className="bg-volcan-cream py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">{children}</div>
      </section>
    </div>
  );
}

export const LegalSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <div>
    <h2 className="text-xl font-serif font-bold text-volcan-night mb-3">{title}</h2>
    <div className="space-y-3 text-sm sm:text-base text-volcan-night/80 leading-relaxed">{children}</div>
  </div>
);

export const LegalList = ({ items }: { items: ReactNode[] }) => (
  <ul className="space-y-2 pl-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-volcan-ember shrink-0 mt-2" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

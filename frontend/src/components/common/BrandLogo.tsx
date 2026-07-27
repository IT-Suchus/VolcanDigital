import { Link } from 'react-router-dom';
import volcanIcon from '../../media/volcan-icon.png';

interface BrandLogoProps {
  layout?: 'horizontal' | 'vertical';
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  linkToHome?: boolean;
}

export default function BrandLogo({
  layout = 'horizontal',
  iconSize = 'md',
  showText = true,
  className = '',
  linkToHome = true,
}: BrandLogoProps) {
  // Sizes mapping for icon height
  const iconHeights = {
    sm: 'h-8 md:h-10',
    md: 'h-10 md:h-12 lg:h-14',
    lg: 'h-16 md:h-20',
    xl: 'h-24 md:h-28',
  };

  const fontSizes = {
    sm: 'text-base md:text-lg',
    md: 'text-xl md:text-2xl lg:text-[26px]',
    lg: 'text-2xl md:text-3xl',
    xl: 'text-3xl md:text-4xl',
  };

  const content = (
    <div className={`inline-flex items-center group transition-all duration-300 ${layout === 'vertical' ? 'flex-col text-center gap-3' : 'gap-3.5'} ${className}`}>
      <img
        src={volcanIcon}
        alt="Volcán Digital"
        className={`${iconHeights[iconSize]} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
        style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}
      />
      {showText && (
        <div className={`flex items-baseline gap-1.5 font-sans tracking-tight text-[#D3A784] select-none ${layout === 'vertical' ? 'justify-center' : ''}`}>
          <span className={`${fontSizes[iconSize]} font-bold leading-none`}>Volcán</span>
          <span className={`${fontSizes[iconSize]} font-light leading-none text-[#D3A784]`}>Digital</span>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-block" title="Volcán Digital - Inicio">
        {content}
      </Link>
    );
  }

  return content;
}

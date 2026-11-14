import { cn } from '@/lib/cn';

/**
 * Cadre photo « vision nocturne cassé » :
 * inclinaison alternée, ombre portée, scotch (derrière la photo) et viseur
 * à quatre équerres. Le viseur tourne avec la photo et reste donc droit
 * par rapport à elle. La photo elle-même n'est jamais filtrée ni recouverte.
 */
export function PhotoFrame({
  children,
  tilt = 'a',
  size = 'lg',
  className,
  boxClassName,
  style,
}: {
  children: React.ReactNode;
  tilt?: 'a' | 'b' | 'none';
  size?: 'lg' | 'sm';
  className?: string;
  boxClassName?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        'photo-tilt',
        tilt === 'a' && 'photo-tilt-a',
        tilt === 'b' && 'photo-tilt-b',
        size === 'sm' && 'viseur-sm',
        className,
      )}
    >
      <div className={cn('photo-box', boxClassName)} style={style}>
        {children}
      </div>
      <span aria-hidden className="viseur-corner viseur-tl" />
      <span aria-hidden className="viseur-corner viseur-tr" />
      <span aria-hidden className="viseur-corner viseur-bl" />
      <span aria-hidden className="viseur-corner viseur-br" />
    </div>
  );
}

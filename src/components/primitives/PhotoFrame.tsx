import { cn } from '@/lib/cn';
import type { TapePlacement } from '@/content/tapePlacement';

/**
 * Cadre photo « vision nocturne cassé » :
 * inclinaison alternée, cadre de tirage clair, ombre portée, scotch
 * translucide à cheval sur le bord haut (position par photo : `tape`) et viseur
 * à quatre équerres. Le viseur tourne avec la photo et reste donc droit
 * par rapport à elle. La photo elle-même n'est jamais filtrée ni recouverte.
 */
// Noms de classes écrits en entier : Tailwind purge les classes
// construites dynamiquement.
const TAPE_CLASS: Record<TapePlacement, string> = {
  center: '',
  left: 'photo-tape-left',
  right: 'photo-tape-right',
  none: 'photo-tape-none',
};

export function PhotoFrame({
  children,
  tilt = 'a',
  tape = 'center',
  className,
  boxClassName,
  style,
}: {
  children: React.ReactNode;
  tilt?: 'a' | 'b' | 'none';
  tape?: TapePlacement;
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
        TAPE_CLASS[tape],
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

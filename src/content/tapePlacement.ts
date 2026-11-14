// Position du scotch par photo. Par défaut il est centré sur le bord haut.
//
// Règle : le scotch ne doit jamais couvrir la pièce. Il descend au plus de
// 16 px dans l'image ; si la pièce occupe cette bande au centre, on le décale
// vers un coin haut libre, et s'il n'y a aucun coin libre, on le retire.
// Contrôle fait sur toutes les photos de la collection (novembre 2026) :
// à refaire pour toute nouvelle photo dont la pièce touche le bord haut.

export type TapePlacement = 'center' | 'left' | 'right' | 'none';

const PLACEMENT: Record<string, TapePlacement> = {
  // la pièce touche le centre et le côté droit du bord haut
  '/images/products/flecktarn-cardholder-03.jpg': 'left',
  // pièce bord à bord en haut, aucun coin libre
  '/images/products/dpm-multipouch-03.jpg': 'none',
  '/images/products/flecktarn-multipouch-03.jpg': 'none',
};

export function tapeFor(src: string): TapePlacement {
  return PLACEMENT[src] ?? 'center';
}

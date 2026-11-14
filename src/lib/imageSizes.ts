// Attributs `sizes` des photos, calculés sur la largeur réelle d'affichage.
//
// Grille (.container-page) : marges latérales 16 px (< 640), 24 px (sm),
// 40 px (md), 64 px (lg et plus), largeur max 1600 px, 12 colonnes,
// gouttière 24 px (56 px dans le catalogue en lg).
// Les photos ont en plus un retrait intérieur (px-3 / sm:px-6) qui laisse
// de la place au viseur. Si la grille change, ajuster ces valeurs.

// Sous lg, photo pleine largeur avec retrait px-3 sm:px-6
const FULL_BELOW_LG =
  '(min-width: 768px) calc(100vw - 128px), (min-width: 640px) calc(100vw - 96px), calc(100vw - 56px)';

export const IMAGE_SIZES = {
  // Hero accueil : 5 colonnes sur 12 en lg (533 px à 1440)
  hero: `(min-width: 1600px) 600px, (min-width: 1024px) calc(41.67vw - 67px), ${FULL_BELOW_LG}`,

  // Motifs : 6 colonnes sur 12 en lg (644 px à 1440)
  motif: `(min-width: 1600px) 724px, (min-width: 1024px) calc(50vw - 76px), ${FULL_BELOW_LG}`,

  // Galerie produit : 7 colonnes moins le retrait lg:px-4 (723 px à 1440)
  productGallery: `(min-width: 1600px) 817px, (min-width: 1024px) calc(58.33vw - 117px), ${FULL_BELOW_LG}`,

  // Vignette catalogue : 4 colonnes sur 12, gouttière 56 px (400 px à 1440).
  // Sous lg, pleine largeur avec retrait px-3 sm:px-0.
  card: '(min-width: 1600px) 453px, (min-width: 1024px) calc(33.33vw - 80px), (min-width: 768px) calc(100vw - 80px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 56px)',

  // Vignette catalogue double (span 2) : 8 colonnes sur 12
  cardWide: '(min-width: 1600px) 963px, (min-width: 1024px) calc(66.67vw - 104px), (min-width: 768px) calc(100vw - 80px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 56px)',

  // Photos de texte (atelier, Sofia) : colonne 9/12 plafonnée à 64ch (≈ 600 px)
  prose: '(min-width: 888px) 600px, (min-width: 768px) calc(75vw - 66px), (min-width: 648px) 600px, calc(100vw - 56px)',
} as const;

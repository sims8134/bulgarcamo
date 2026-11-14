// Source unique de vérité pour tous les produits du catalogue
// Modifier ce fichier pour ajouter/retirer/modifier des produits

export type MotifKey = 'frogskin' | 'splinter_1991' | 'dpm' | 'flecktarn';

export type ProductCategory = 'uniforme' | 'edc' | 'maison';

export type Product = {
  id: string;
  ref: string;
  motif: MotifKey;
  category: ProductCategory;
  nameKey: string;
  image: string | null;
  imageHover?: string;   // vue fermée affichée au survol dans le catalogue
  gallery?: string[];
  span?: 1 | 2;
  aspect?: 'square' | 'portrait' | 'landscape';

  // 🆕 Enrichissements luxe-archive (optionnels, à remplir au fil de l'eau)
  status?: 'available' | 'reserved' | 'archived';
  textileYear?: number | string;                  // année du tissu d'origine
  provenanceKey?: string;                         // i18n key custom si différente du motif
  dimensions?: string;                            // affichable, ex. '~10,5 × 9,5 cm' (fermé, ±0,5 cm)
};

export const products: Product[] = [
  // FROGSKIN 1968
  {
    id: 'frogskin-coverall',
    ref: 'A.01',
    motif: 'frogskin',
    category: 'uniforme',
    nameKey: 'coverall',
    image: '/images/products/frogskin-combi-col.jpg',
    gallery: [
      '/images/products/frogskin-combi-col.jpg',
      '/images/products/frogskin-combi-bouton.jpg',
      '/images/products/frogskin-combi-pocket.jpg',
    ],
    span: 2,
    aspect: 'portrait',
    textileYear: 1968,
  },
  {
    id: 'frogskin-deskmat',
    ref: 'A.02',
    motif: 'frogskin',
    category: 'maison',
    nameKey: 'deskmat',
    image: null,
    aspect: 'landscape',
    textileYear: 1968,
  },
  {
    id: 'frogskin-pouch-proto',
    ref: 'A.03',
    motif: 'frogskin',
    category: 'edc',
    nameKey: 'pouch_prototype',
    image: null,
    aspect: 'square',
    textileYear: 1968,
  },

  // SPLINTER 1991
  {
    id: 'splinter91-cardholder',
    ref: 'B.01',
    motif: 'splinter_1991',
    category: 'edc',
    nameKey: 'card_holder',
    image: '/images/products/splinter-cardholder-04.jpg',
    imageHover: '/images/products/splinter-cardholder-02.jpg',
    gallery: [
      '/images/products/splinter-cardholder-01.jpg',
      '/images/products/splinter-cardholder-02.jpg',
      '/images/products/splinter-cardholder-03.jpg',
      '/images/products/splinter-cardholder-04.jpg',
    ],
    aspect: 'portrait',
    textileYear: 1991,
    dimensions: '~10,5 × 9,5 cm',
  },
  {
    id: 'splinter91-earphone',
    ref: 'B.02',
    motif: 'splinter_1991',
    category: 'edc',
    nameKey: 'earphone_pouch',
    image: '/images/products/splinter-earphone-04.jpg',
    imageHover: '/images/products/splinter-earphone-02.jpg',
    gallery: [
      '/images/products/splinter-earphone-01.jpg',
      '/images/products/splinter-earphone-02.jpg',
      '/images/products/splinter-earphone-03.jpg',
      '/images/products/splinter-earphone-04.jpg',
    ],
    aspect: 'square',
    textileYear: 1991,
    dimensions: '~9 × 9 cm',
  },
  {
    id: 'splinter91-multipouch',
    ref: 'B.03',
    motif: 'splinter_1991',
    category: 'edc',
    nameKey: 'multi_pouch',
    image: '/images/products/splinter-multipouch-02.jpg',
    imageHover: '/images/products/splinter-multipouch-01.jpg',
    gallery: [
      '/images/products/splinter-multipouch-01.jpg',
      '/images/products/splinter-multipouch-02.jpg',
      '/images/products/splinter-multipouch-03.jpg',
      '/images/products/splinter-multipouch-04.jpg',
    ],
    aspect: 'portrait',
    textileYear: 1991,
    dimensions: '~21 × 11 cm',
  },

  // BULGARIAN DPM
  {
    id: 'dpm-cardholder',
    ref: 'C.01',
    motif: 'dpm',
    category: 'edc',
    nameKey: 'card_holder',
    image: '/images/products/dpm-cardholder-04.jpg',
    imageHover: '/images/products/dpm-cardholder-02.jpg',
    gallery: [
      '/images/products/dpm-cardholder-01.jpg',
      '/images/products/dpm-cardholder-02.jpg',
      '/images/products/dpm-cardholder-03.jpg',
      '/images/products/dpm-cardholder-04.jpg',
    ],
    aspect: 'portrait',
    textileYear: 2004,
    dimensions: '~10,5 × 9,5 cm',
  },
  {
    id: 'dpm-earphone',
    ref: 'C.02',
    motif: 'dpm',
    category: 'edc',
    nameKey: 'earphone_pouch',
    image: '/images/products/dpm-earphone-04.jpg',
    imageHover: '/images/products/dpm-earphone-02.jpg',
    gallery: [
      '/images/products/dpm-earphone-01.jpg',
      '/images/products/dpm-earphone-02.jpg',
      '/images/products/dpm-earphone-03.jpg',
      '/images/products/dpm-earphone-04.jpg',
    ],
    aspect: 'square',
    textileYear: 2004,
    dimensions: '~9 × 9 cm',
  },
  {
    id: 'dpm-multipouch',
    ref: 'C.03',
    motif: 'dpm',
    category: 'edc',
    nameKey: 'multi_pouch',
    image: '/images/products/dpm-multipouch-01.jpg',
    imageHover: '/images/products/dpm-multipouch-02.jpg',
    gallery: [
      '/images/products/dpm-multipouch-01.jpg',
      '/images/products/dpm-multipouch-02.jpg',
      '/images/products/dpm-multipouch-03.jpg',
      '/images/products/dpm-multipouch-04.jpg',
    ],
    aspect: 'portrait',
    textileYear: 2004,
    dimensions: '~21 × 11 cm',
  },

  // GERMAN FLECKTARN
  {
    id: 'flecktarn-cardholder',
    ref: 'D.01',
    motif: 'flecktarn',
    category: 'edc',
    nameKey: 'card_holder',
    image: '/images/products/flecktarn-cardholder-04.jpg',
    imageHover: '/images/products/flecktarn-cardholder-02.jpg',
    gallery: [
      '/images/products/flecktarn-cardholder-01.jpg',
      '/images/products/flecktarn-cardholder-02.jpg',
      '/images/products/flecktarn-cardholder-03.jpg',
      '/images/products/flecktarn-cardholder-04.jpg',
    ],
    aspect: 'portrait',
    textileYear: 1991,
    dimensions: '~10,5 × 9,5 cm',
  },
  {
    id: 'flecktarn-earphone',
    ref: 'D.02',
    motif: 'flecktarn',
    category: 'edc',
    nameKey: 'earphone_pouch',
    image: '/images/products/flecktarn-earphone-04.jpg',
    imageHover: '/images/products/flecktarn-earphone-02.jpg',
    gallery: [
      '/images/products/flecktarn-earphone-01.jpg',
      '/images/products/flecktarn-earphone-02.jpg',
      '/images/products/flecktarn-earphone-03.jpg',
      '/images/products/flecktarn-earphone-04.jpg',
    ],
    aspect: 'square',
    textileYear: 1991,
    dimensions: '~9 × 9 cm',
  },
  {
    id: 'flecktarn-multipouch',
    ref: 'D.03',
    motif: 'flecktarn',
    category: 'edc',
    nameKey: 'multi_pouch',
    image: '/images/products/flecktarn-multipouch-05.jpg',
    imageHover: '/images/products/flecktarn-multipouch-04.jpg',
    gallery: [
      '/images/products/flecktarn-multipouch-01.jpg',
      '/images/products/flecktarn-multipouch-02.jpg',
      '/images/products/flecktarn-multipouch-03.jpg',
      '/images/products/flecktarn-multipouch-04.jpg',
      '/images/products/flecktarn-multipouch-05.jpg',
    ],
    aspect: 'portrait',
    textileYear: 1991,
    dimensions: '~21 × 11 cm',
  },
];
// ─────────────────────────────────────────────────────────────
// COLLECTION EN COURS
// Pour changer la collection affichée, il suffit de modifier
// cette liste. L'ordre ici = l'ordre d'affichage des sections.
// ─────────────────────────────────────────────────────────────
export const ACTIVE_MOTIFS: MotifKey[] = ['dpm', 'flecktarn', 'splinter_1991'];

// Produits de la collection en cours (dérivé, ne rien éditer ici)
export const activeProducts = products.filter((p) =>
  ACTIVE_MOTIFS.includes(p.motif),
);

// Motifs actifs dans l'ordre défini ci-dessus, chacun avec ses pièces —
// pratique pour générer les sections « un bloc par camouflage »
export const activeMotifs = ACTIVE_MOTIFS.map((motif) => ({
  motif,
  products: products.filter((p) => p.motif === motif),
}));
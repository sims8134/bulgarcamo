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
  gallery?: string[];
  span?: 1 | 2;
  aspect?: 'square' | 'portrait' | 'landscape';

  // 🆕 Enrichissements luxe-archive (optionnels, à remplir au fil de l'eau)
  edition?: { current: number; total: number };  // { current: 1, total: 1 } → "1/1"
  status?: 'available' | 'reserved' | 'archived';
  textileYear?: number | string;                  // année du tissu d'origine
  provenanceKey?: string;                         // i18n key custom si différente du motif
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
    image: '/images/products/splinter-1991-cardholder (1).jpg',
    gallery: [
      '/images/products/splinter-1991-cardholder (1).jpg',
      '/images/products/splinter-1991-cardholder (2).jpg',
      '/images/products/splinter-1991-cardholder (3).jpg',
    ],
    aspect: 'portrait',
    textileYear: 1991,
  },
  {
    id: 'splinter91-earphone',
    ref: 'B.02',
    motif: 'splinter_1991',
    category: 'edc',
    nameKey: 'earphone_pouch',
    image: '/images/products/splinter-1991-earbuds (1).jpg',
    gallery: [
      '/images/products/splinter-1991-earbuds (1).jpg',
      '/images/products/splinter-1991-earbuds (2).jpg',
    ],
    aspect: 'square',
    textileYear: 1991,
  },
  {
    id: 'splinter91-multipouch',
    ref: 'B.03',
    motif: 'splinter_1991',
    category: 'edc',
    nameKey: 'multi_pouch',
    image: '/images/products/splinter-1991-multipouch.jpg',
    gallery: [
      '/images/products/splinter-1991-multipouch.jpg',
      '/images/products/splinter-1991-multipouch (1).jpg',
      '/images/products/splinter-1991-multipouch (2).jpg',
      '/images/products/splinter-1991-multipouch (3).jpg',
      '/images/products/splinter-1991-multipouch (4).jpg',
      '/images/products/splinter-1991-multipouch (5).jpg',
    ],
    aspect: 'portrait',
    textileYear: 1991,
  },

  // BULGARIAN DPM
  {
    id: 'dpm-cardholder',
    ref: 'C.01',
    motif: 'dpm',
    category: 'edc',
    nameKey: 'card_holder',
    image: '/images/products/dpm-cardholder-1.jpg',
    gallery: [
      '/images/products/dpm-cardholder-1.jpg',
      '/images/products/dpm-cardholder-2.jpg',
      '/images/products/dpm-cardholder3.jpg',
    ],
    aspect: 'portrait',
    textileYear: 2003,
  },
  {
    id: 'dpm-earphone',
    ref: 'C.02',
    motif: 'dpm',
    category: 'edc',
    nameKey: 'earphone_pouch',
    image: '/images/products/dpm-earbuds1.jpg',
    gallery: [
      '/images/products/dpm-earbuds1.jpg',
      '/images/products/dpm-earbuds2.jpg',
    ],
    aspect: 'square',
    textileYear: 2003,
  },
  {
    id: 'dpm-multipouch',
    ref: 'C.03',
    motif: 'dpm',
    category: 'edc',
    nameKey: 'multi_pouch',
    image: '/images/products/dpm-multipouch.jpg',
    gallery: [
      '/images/products/dpm-multipouch.jpg',
      '/images/products/dpm-multipouch (1).jpg',
      '/images/products/dpm-multipouch (2).jpg',
      '/images/products/dpm-multipouch (3).jpg',
      '/images/products/dpm-multipouch (4).jpg',
      '/images/products/dpm-multipouch (5).jpg',
    ],
    aspect: 'portrait',
    textileYear: 2003,
  },

  // GERMAN FLECKTARN
  {
    id: 'flecktarn-cardholder',
    ref: 'D.01',
    motif: 'flecktarn',
    category: 'edc',
    nameKey: 'card_holder',
    image: '/images/products/flecktarn-cardholder (1).jpg',
    gallery: [
      '/images/products/flecktarn-cardholder (1).jpg',
      '/images/products/flecktarn-cardholder (2).jpg',
    ],
    aspect: 'portrait',
    textileYear: 1991,
  },
  {
    id: 'flecktarn-earphone',
    ref: 'D.02',
    motif: 'flecktarn',
    category: 'edc',
    nameKey: 'earphone_pouch',
    image: '/images/products/Flecktarn-earbuds (1).jpg',
    gallery: [
      '/images/products/Flecktarn-earbuds (1).jpg',
      '/images/products/Flecktarn-earbuds (2).jpg',
      '/images/products/Flecktarn-earbuds (3).jpg',
    ],
    aspect: 'square',
    textileYear: 1991,
  },
  {
    id: 'flecktarn-multipouch',
    ref: 'D.03',
    motif: 'flecktarn',
    category: 'edc',
    nameKey: 'multi_pouch',
    image: '/images/products/flecktarn-multipouch.jpg',
    gallery: [
      '/images/products/flecktarn-multipouch.jpg',
      '/images/products/flecktarn-multipouch (1).jpg',
      '/images/products/flecktarn-multipouch (2).jpg',
      '/images/products/flecktarn-multipouch (3).jpg',
    ],
    aspect: 'portrait',
    textileYear: 1991,
  },
];
// ─────────────────────────────────────────────────────────────
// COLLECTION EN COURS
// Pour changer la collection affichée, il suffit de modifier
// cette liste. L'ordre ici = l'ordre d'affichage des sections.
// ─────────────────────────────────────────────────────────────
export const ACTIVE_MOTIFS: MotifKey[] = ['flecktarn', 'splinter_1991'];

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
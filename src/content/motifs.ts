import type { MotifKey } from '@/data/products';

export type Motif = {
  key: MotifKey;
  name: string;            // nom latin pour titres
  nameCyrillic: string;    // nom cyrillique (watermark, signature)
  year: number;            // année du textile
  // Tous les textes ci-dessous sont des i18n keys, pas du contenu en dur
  eraKey: string;
  provenanceKey: string;
  descriptionKey: string;
};

export const motifs: Record<MotifKey, Motif> = {
  frogskin: {
    key: 'frogskin',
    name: 'Frogskin',
    nameCyrillic: 'Жабешка кожа',
    year: 1968,
    eraKey: 'motifs.frogskin.era',
    provenanceKey: 'motifs.frogskin.provenance',
    descriptionKey: 'motifs.frogskin.description',
  },
  splinter_1991: {
    key: 'splinter_1991',
    name: 'Splinter 91',
    nameCyrillic: 'Сплинтер',
    year: 1991,
    eraKey: 'motifs.splinter_1991.era',
    provenanceKey: 'motifs.splinter_1991.provenance',
    descriptionKey: 'motifs.splinter_1991.description',
  },
  dpm: {
    key: 'dpm',
    name: 'Bulgarian DPM',
    nameCyrillic: 'Български DPM',
    year: 2004,
    eraKey: 'motifs.dpm.era',
    provenanceKey: 'motifs.dpm.provenance',
    descriptionKey: 'motifs.dpm.description',
  },
  flecktarn: {
    key: 'flecktarn',
    name: 'Flecktarn',
    nameCyrillic: 'Флектарн',
    year: 1990,
    eraKey: 'motifs.flecktarn.era',
    provenanceKey: 'motifs.flecktarn.provenance',
    descriptionKey: 'motifs.flecktarn.description',
  },
};

// Le nom du motif contient-il déjà une année (« Splinter 91 ») ?
export function nameHasYear(name: string): boolean {
  return /\d/.test(name);
}

// « Bulgarian DPM · 2004 », mais « Splinter 91 » seul : pas d'année répétée
export function motifWithYear(name: string, year: number | string): string {
  return nameHasYear(name) ? name : `${name} · ${year}`;
}

// Ordre canonique du site (frogskin en premier — c'est le motif vedette de Bulgarcamo)
export const motifsList: Motif[] = [
  motifs.frogskin,
  motifs.splinter_1991,
  motifs.dpm,
  motifs.flecktarn,
];
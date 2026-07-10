'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { activeProducts, ACTIVE_MOTIFS } from '@/data/products';
import type { MotifKey } from '@/data/products';
import { motifsList } from '@/content/motifs';
import { Reveal } from '@/components/primitives/Reveal';
import PieceCard from '@/components/sections/PieceCard';
import { cn } from '@/lib/cn';

type Filter = 'all' | MotifKey;

export default function CatalogueMosaic() {
  const t = useTranslations();
  const [filter, setFilter] = useState<Filter>('all');

  // On filtre les produits visibles (image non null) + filtre motif
  const visibleProducts = useMemo(() => {
    return activeProducts
      .filter((p) => p.image !== null)
      .filter((p) => filter === 'all' || p.motif === filter);
  }, [filter]);

  return (
    <section
      id="catalogue"
      className="relative bg-ivoire border-t border-encre/8 section-y-lg"
      aria-labelledby="catalogue-heading"
    >
      <div className="container-page">
        {/* Header de section — eyebrow + titre + intro */}
        <div className="grid grid-cols-12 gap-6 mb-22 lg:mb-30">
          <div className="col-span-12 md:col-span-2">
            <Reveal>
              <p className="eyebrow">— {t('catalogue.eyebrow')}</p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9 md:col-start-4 space-y-8">
            <Reveal delay={150}>
              <h2 id="catalogue-heading" className="heading-lg text-encre">
                {t('catalogue.title')}
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="lede max-w-prose-narrow text-encre/80">
                {t('catalogue.intro')}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Filtres + compteur */}
        <Reveal delay={150}>
          <div className="flex flex-wrap items-center justify-between gap-y-6 gap-x-8 mb-16 pb-4 border-b border-encre/15">
            <FilterBar filter={filter} setFilter={setFilter} />
            <p className="font-mono text-mono-xs uppercase text-encre/55">
              {visibleProducts.length} {t('catalogue.items_count')}
            </p>
          </div>
        </Reveal>

        {/* Grille mosaïque */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-4 lg:gap-x-6 gap-y-16 lg:gap-y-22">
          {visibleProducts.map((product, index) => (
            <PieceCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>

        {/* Footer de section — note + CTA */}
        <Reveal>
          <div className="mt-30 pt-10 border-t border-encre/15 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <p className="font-mono text-mono-xs uppercase text-encre/55 max-w-md">
              {t('catalogue.footer_note')}
            </p>
            <a href="#contact" className="cta-quiet">
              <span>{t('catalogue.footer_cta')}</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* — Sous-composant : barre de filtres — */

function FilterBar({
  filter,
  setFilter,
}: {
  filter: Filter;
  setFilter: (f: Filter) => void;
}) {
  const t = useTranslations();

  // On ne garde que les motifs de la collection en cours
  const activeMotifsList = motifsList.filter((m) =>
    ACTIVE_MOTIFS.includes(m.key as MotifKey),
  );

  const items: { key: Filter; label: string }[] = [
    { key: 'all', label: t('catalogue.filters.all') },
    ...activeMotifsList.map((m) => ({ key: m.key as Filter, label: m.name })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
      {items.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={cn(
            'font-mono text-mono-sm uppercase tracking-wider transition-all duration-400 ease-expo-out',
            'relative pb-1',
            filter === key
              ? 'text-encre'
              : 'text-encre/40 hover:text-encre/70'
          )}
          aria-pressed={filter === key}
        >
          {label}
          <span
            aria-hidden
            className={cn(
              'absolute left-0 right-0 -bottom-px h-px bg-encre transition-transform duration-500 ease-expo-out origin-left',
              filter === key ? 'scale-x-100' : 'scale-x-0'
            )}
          />
        </button>
      ))}
    </div>
  );
}
'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { activeProducts, ACTIVE_MOTIFS } from '@/data/products';
import type { MotifKey } from '@/data/products';
import { motifsList } from '@/content/motifs';
import PieceCard from '@/components/sections/PieceCard';
import { AccentTitle } from '@/components/primitives/AccentTitle';
import { cn } from '@/lib/cn';

type Filter = 'all' | MotifKey;

export default function CatalogueMosaic() {
  const t = useTranslations();
  const [filter, setFilter] = useState<Filter>('all');

  const visibleProducts = useMemo(() => {
    return activeProducts
      .filter((p) => p.image !== null)
      .filter((p) => filter === 'all' || p.motif === filter);
  }, [filter]);

  return (
    <section
      id="catalogue"
      className="relative border-t border-line section-y-lg scroll-mt-16"
      aria-labelledby="catalogue-heading"
    >
      <div className="container-page">
        <div className="grid grid-cols-12 gap-6 mb-18 lg:mb-22">
          <div className="col-span-12 md:col-span-2">
            <p className="eyebrow">{t('catalogue.eyebrow')}</p>
          </div>
          <div className="col-span-12 md:col-span-9 md:col-start-4 space-y-10">
            <h2 id="catalogue-heading" className="heading-lg">
              <AccentTitle text={t('catalogue.title')} />
            </h2>
            <p className="lede max-w-prose-narrow">{t('catalogue.intro')}</p>
          </div>
        </div>

        {/* Filtres + compteur */}
        <div className="flex flex-wrap items-center justify-between gap-y-6 gap-x-8 mb-16 pb-5 border-b border-line">
          <FilterBar filter={filter} setFilter={setFilter} />
          <p className="label text-text-muted" aria-live="polite">
            {visibleProducts.length} {t('catalogue.items_count')}
          </p>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 lg:gap-x-14 gap-y-16 lg:gap-y-22">
          {visibleProducts.map((product, index) => (
            <PieceCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-22 pt-10 border-t border-line flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="label text-text-muted max-w-md">{t('catalogue.footer_note')}</p>
          <a
            href="https://ig.me/m/bulgarcamo"
            target="_blank"
            rel="noopener"
            className="cta self-start"
          >
            <span>{t('catalogue.footer_cta')}</span>
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function FilterBar({
  filter,
  setFilter,
}: {
  filter: Filter;
  setFilter: (f: Filter) => void;
}) {
  const t = useTranslations();

  const activeMotifsList = motifsList.filter((m) =>
    ACTIVE_MOTIFS.includes(m.key as MotifKey),
  );

  const items: { key: Filter; label: string }[] = [
    { key: 'all', label: t('catalogue.filters.all') },
    ...activeMotifsList.map((m) => ({ key: m.key as Filter, label: m.name })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => setFilter(key)}
          aria-pressed={filter === key}
          className={cn(
            'tag',
            filter === key ? 'bg-accent text-bg' : 'border-line text-text hover:border-accent',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

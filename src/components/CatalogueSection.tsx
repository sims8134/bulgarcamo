'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { products, type MotifKey } from '@/data/products';
import { motifComponents } from './MotifSvgs';

type FilterValue = 'all' | MotifKey;

const motifOrder: MotifKey[] = ['frogskin', 'splinter_1991', 'dpm', 'flecktarn'];

export default function CatalogueSection() {
  const t = useTranslations('catalogue');
  const tm = useTranslations('motifs');
  const tp = useTranslations('products');
  const [filter, setFilter] = useState<FilterValue>('all');

  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.motif === filter);

  return (
    <section id="catalogue" className="bg-cream border-t border-olive-deep/10">
      <div className="container-page py-20 md:py-32">
        <div className="max-w-3xl mb-16">
          <p className="eyebrow mb-4">{t('eyebrow')}</p>
          <h2 className="heading-section text-olive-deep mb-6">{t('title')}</h2>
          <p className="text-lg text-olive-deep/70 leading-relaxed">{t('intro')}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-16 pb-6 border-b border-olive-deep/10">
          <button
            onClick={() => setFilter('all')}
            className={`text-xs tracking-extra uppercase transition-all relative pb-1 ${
              filter === 'all'
                ? 'text-olive-deep font-semibold'
                : 'text-warm-grey hover:text-olive-deep'
            }`}
          >
            {t('filters.all')}
            {filter === 'all' && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-olive-deep" />
            )}
          </button>
          {motifOrder.map(motif => (
            <button
              key={motif}
              onClick={() => setFilter(motif)}
              className={`text-xs tracking-extra uppercase transition-all relative pb-1 ${
                filter === motif
                  ? 'text-olive-deep font-semibold'
                  : 'text-warm-grey hover:text-olive-deep'
              }`}
            >
              {tm(`${motif}.name`)}
              {filter === motif && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-olive-deep" />
              )}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-warm-grey">
            {filtered.length.toString().padStart(2, '0')} {t('items_count')}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {filtered.map(product => {
            const Motif = motifComponents[product.motif];
            const span = product.span === 2 ? 'lg:col-span-6 md:col-span-3 col-span-2' : 'lg:col-span-3 md:col-span-2 col-span-1';
            const aspectClass =
              product.aspect === 'portrait' ? 'aspect-[3/4]'
              : product.aspect === 'landscape' ? 'aspect-[4/3]'
              : 'aspect-square';

            return (
              <article
                key={product.id}
                className={`${span} group cursor-pointer`}
              >
                <div className={`${aspectClass} relative overflow-hidden bg-olive-deep/5 mb-4`}>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={tp(product.nameKey)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <>
                      <Motif className="w-full h-full opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-mono tracking-extra text-warm-grey/70 uppercase">
                          {t('coming_soon')}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-mono tracking-extra text-warm-grey">
                    REF. {product.ref}
                  </p>
                  <h3 className="text-sm md:text-base text-olive-deep leading-tight">
                    {tp(product.nameKey)}
                  </h3>
                  <p className="text-xs text-warm-grey/80 italic">
                    {tm(`${product.motif}.name`)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-20 pt-8 border-t border-olive-deep/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-warm-grey">
            {t('footer_note')}
          </p>
          <a
            href="mailto:contact@bulgarcamo.com"
            className="text-xs tracking-extra uppercase text-olive-deep hover:text-frogskin transition-colors inline-flex items-center gap-2"
          >
            {t('footer_cta')}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

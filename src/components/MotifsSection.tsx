import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motifComponents, type MotifKey } from './MotifSvgs';

type MotifEntry = {
  key: MotifKey;
  image: string | null;
  hasSubtitle?: boolean;
  hasYear?: boolean;
};

const motifs: MotifEntry[] = [
  {
    key: 'frogskin',
    image: '/images/products/frogskin-combi-col.jpg',
    hasSubtitle: true,
    hasYear: true,
  },
  {
    key: 'splinter_1991',
    image: '/images/products/splinter-1991-multipouch.jpg',
  },
  {
    key: 'dpm',
    image: '/images/products/dpm-multipouch.jpg',
  },
  {
    key: 'flecktarn',
    image: '/images/products/flecktarn-multipouch.jpg',
  },
];

export default function MotifsSection() {
  const t = useTranslations('motifs_section');
  const tm = useTranslations('motifs');

  return (
    <section id="motifs" className="container-page py-20 md:py-32">
      <div className="max-w-3xl mb-16">
        <p className="eyebrow mb-4">{t('eyebrow')}</p>
        <h2 className="heading-section text-olive-deep mb-6">{t('title')}</h2>
        <p className="text-lg text-olive-deep/70 leading-relaxed">{t('intro')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-olive-deep/10">
        {motifs.map(({ key, image, hasSubtitle, hasYear }) => {
          const Motif = motifComponents[key];
          return (
            <article key={key} className="bg-cream p-8 flex flex-col">
              <div className="aspect-[4/3] mb-6 overflow-hidden border border-olive-deep/10 relative bg-olive-deep/5">
                {image ? (
                  <Image
                    src={image}
                    alt={tm(`${key}.name`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <Motif className="w-full h-full" />
                )}
              </div>
              <p className="ref-tag mb-2">{tm(`${key}.ref`)}</p>
              <h3 className="text-2xl font-light text-olive-deep mb-1">
                {tm(`${key}.name`)}
              </h3>
              {hasSubtitle && (
                <p className="text-sm text-warm-grey italic mb-1">
                  {tm(`${key}.subtitle`)}
                </p>
              )}
              {hasYear && (
                <p className="text-xs text-warm-grey font-mono mb-3">
                  {tm(`${key}.year`)}
                </p>
              )}
              <p className="text-sm text-olive-deep/70 leading-relaxed mt-auto">
                {tm(`${key}.description`)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

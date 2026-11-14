import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motifsList, type Motif } from '@/content/motifs';
import { ACTIVE_MOTIFS } from '@/data/products';
import { AccentTitle } from '@/components/primitives/AccentTitle';
import { PhotoFrame } from '@/components/primitives/PhotoFrame';

const motifImages: Record<string, { src: string; alt: string }> = {
  frogskin: {
    src: '/images/products/frogskin-combi-pocket.jpg',
    alt: 'Textile Frogskin, vue rapprochée',
  },
  splinter_1991: {
    src: '/images/products/splinter-multipouch-02.jpg',
    alt: 'Textile Splinter 1991, vue rapprochée',
  },
  dpm: {
    src: '/images/products/dpm-multipouch-01.jpg',
    alt: 'Textile Bulgarian DPM, vue rapprochée',
  },
  flecktarn: {
    src: '/images/products/flecktarn-multipouch-05.jpg',
    alt: 'Textile Flecktarn, vue rapprochée',
  },
};

export default function MotifsSequence() {
  const t = useTranslations();

  const activeMotifsList = ACTIVE_MOTIFS
    .map((key) => motifsList.find((m) => m.key === key))
    .filter((m): m is Motif => Boolean(m));

  return (
    <section id="motifs" className="relative scroll-mt-16" aria-labelledby="motifs-heading">
      <div className="container-page pt-30 pb-12 lg:pt-38 lg:pb-18">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <p className="eyebrow">{t('motifs_section.eyebrow')}</p>
          </div>
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <h2 id="motifs-heading" className="heading-lg">
              <AccentTitle text={t('motifs_section.title')} />
            </h2>
            <p className="lede mt-10 max-w-prose-narrow">{t('motifs_section.intro')}</p>
          </div>
        </div>
      </div>

      <div>
        {activeMotifsList.map((motif, index) => (
          <MotifBlock
            key={motif.key}
            motif={motif}
            index={index}
            total={activeMotifsList.length}
          />
        ))}
      </div>
    </section>
  );
}

function MotifBlock({
  motif,
  index,
  total,
}: {
  motif: Motif;
  index: number;
  total: number;
}) {
  const t = useTranslations();
  const image = motifImages[motif.key];
  const isEven = index % 2 === 0;

  return (
    <article className="relative py-18 lg:py-30 border-t border-line">
      <div className="container-page">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16 items-center">
          <div className={`col-span-12 lg:col-span-5 space-y-6 ${isEven ? '' : 'lg:order-2 lg:col-start-8'}`}>
            <p className="meta-dim">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>

            <div className="space-y-3">
              <h3
                className="font-black uppercase tracking-title text-text"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', lineHeight: 0.92, wordSpacing: '0.14em' }}
              >
                {motif.name}
              </h3>
              <p
                lang="bg"
                className="cyr-name text-accent"
                style={{ fontSize: 'clamp(1.25rem, 1.8vw, 1.6rem)' }}
              >
                {motif.nameCyrillic}
              </p>
            </div>

            <p className="tag">{t(motif.eraKey)}</p>

            <p className="lede">{t(motif.provenanceKey)}</p>

            <p className="prose-narrow">{t(motif.descriptionKey)}</p>
          </div>

          <div className={`col-span-12 lg:col-span-6 px-3 sm:px-6 lg:px-0 ${isEven ? 'lg:col-start-7' : 'lg:order-1 lg:col-start-1'}`}>
            <figure>
              <PhotoFrame tilt={isEven ? 'b' : 'a'} boxClassName="aspect-[3/4]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 46vw"
                  className="object-cover"
                />
              </PhotoFrame>
              <figcaption className="mt-8 flex items-baseline justify-between label text-text-muted">
                <span>{motif.name}</span>
                <span>{motif.year}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </article>
  );
}

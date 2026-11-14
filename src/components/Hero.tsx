import Image from 'next/image';
import { IMAGE_SIZES } from '@/lib/imageSizes';
import { useTranslations } from 'next-intl';
import { PhotoFrame } from '@/components/primitives/PhotoFrame';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative">
      <div className="container-page grid grid-cols-12 gap-x-6 gap-y-16 pt-14 lg:pt-22 pb-18">
        {/* Colonne texte */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-8">
          {/* Logo cassé : inclinaison et ombre décalée déjà dans le SVG */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/bulgarcamo-wordmark-casse.svg"
            alt="Bulgarcamo"
            width={728}
            height={164}
            className="logo-casse max-w-[620px] -ml-2"
          />

          <p className="eyebrow self-start">{t('eyebrow')}</p>

          <h1 className="heading-xl">
            <span className="block">{t('title.line1')}</span>
            <span className="block text-accent">{t('title.line2')}</span>
          </h1>

          <p className="lede max-w-prose-narrow">{t('subtitle')}</p>
        </div>

        {/* Colonne image */}
        <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col justify-center px-3 sm:px-6 lg:px-0">
          <figure>
            <PhotoFrame tilt="b" boxClassName="aspect-[3/4]">
              <Image
                src="/images/products/flecktarn-multipouch-05.jpg"
                alt={t('imageCaption')}
                fill
                priority
                sizes={IMAGE_SIZES.hero}
                className="object-cover"
              />
            </PhotoFrame>
            <figcaption className="mt-8 flex items-baseline justify-between gap-4 label text-text-muted">
              <span>D.03 · {t('imageCaption')}</span>
              <span>1991</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Métadonnées */}
      <div className="container-page pb-10">
        <div className="flex items-end justify-between border-t border-line pt-5 gap-6 flex-wrap">
          <div className="flex gap-x-8 gap-y-2 label text-text-muted flex-wrap">
            <span>{t('meta.edition')}</span>
            <span>{t('meta.location')}</span>
            <span>{t('meta.pieces')}</span>
          </div>
          <a href="#catalogue" className="cta">
            <span>{t('cta')}</span>
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

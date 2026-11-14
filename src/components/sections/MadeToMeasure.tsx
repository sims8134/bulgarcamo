import Image from 'next/image';
import { IMAGE_SIZES } from '@/lib/imageSizes';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AccentTitle } from '@/components/primitives/AccentTitle';
import { PhotoFrame } from '@/components/primitives/PhotoFrame';

export default function MadeToMeasure() {
  const t = useTranslations('sur_mesure');

  return (
    <section
      id="made-to-measure"
      className="bg-surface border-y border-line section-y-lg"
      aria-labelledby="mtm-heading"
    >
      <div className="container-page">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <p className="eyebrow">{t('eyebrow')}</p>
          </div>

          <div className="col-span-12 md:col-span-9 md:col-start-4 space-y-12">
            <h2 id="mtm-heading" className="heading-md">
              <AccentTitle text={t('title')} />
            </h2>

            <p className="prose-editorial">{t('body')}</p>

            <Link href="/contact?subject=made-to-measure" className="cta">
              <span>{t('cta')}</span>
              <span aria-hidden>→</span>
            </Link>

            <figure className="max-w-prose-editorial pt-6 px-3 sm:px-0">
              <PhotoFrame tilt="a" boxClassName="aspect-[3/2]">
                <Image
                  src="/images/about/atelier-couture.jpg"
                  alt="Atelier — couture à la machine, gros plan sur le fil et l'aiguille"
                  fill
                  sizes={IMAGE_SIZES.prose}
                  className="object-cover"
                />
              </PhotoFrame>
              <figcaption className="mt-8 flex items-baseline justify-between label text-text-muted">
                <span>{t('eyebrow')}</span>
                <span>София</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

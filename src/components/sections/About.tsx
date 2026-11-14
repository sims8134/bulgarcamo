import Image from 'next/image';
import { IMAGE_SIZES } from '@/lib/imageSizes';
import { useTranslations } from 'next-intl';
import { PhotoFrame } from '@/components/primitives/PhotoFrame';

export default function About() {
  const t = useTranslations('about');
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <section
      id="about"
      className="relative section-y-lg"
      aria-labelledby="about-heading"
    >
      <div className="container-page">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <p className="eyebrow">{t('eyebrow')}</p>
          </div>

          <div className="col-span-12 md:col-span-9 md:col-start-4 space-y-10">
            <p
              id="about-heading"
              className="text-text font-medium tracking-tight max-w-prose-editorial"
              style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)', lineHeight: 1.35 }}
            >
              {paragraphs[0]}
            </p>

            <figure className="max-w-prose-editorial py-4 px-3 sm:px-0">
              <PhotoFrame tilt="b" boxClassName="aspect-[3/2]">
                <Image
                  src="/images/about/sofia-tram.jpg"
                  alt="Sofia — tramway sur le pont, mont Vitosha en arrière-plan"
                  fill
                  sizes={IMAGE_SIZES.prose}
                  className="object-cover"
                />
              </PhotoFrame>
              <figcaption className="mt-8 label text-text-muted">София</figcaption>
            </figure>

            {paragraphs.slice(1).map((para, i) => (
              <p key={i} className="prose-editorial">
                {para}
              </p>
            ))}

            <div className="pt-8 border-t border-line">
              <p className="label text-accent">{t('signature')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/primitives/Reveal';

export default function About() {
  const t = useTranslations('about');
  // Récupère le tableau de paragraphes
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <section
      id="about"
      className="relative bg-ivoire border-t border-encre/8 section-y-lg"
      aria-labelledby="about-heading"
    >
      <div className="container-page">
        <div className="grid grid-cols-12 gap-6">
          {/* Eyebrow latéral */}
          <div className="col-span-12 md:col-span-2">
            <Reveal>
              <p className="eyebrow">— {t('eyebrow')}</p>
            </Reveal>
          </div>

          {/* Corps du manifeste */}
          <div className="col-span-12 md:col-span-9 md:col-start-4 space-y-8">
            {/* Premier paragraphe — italique éditorial, plus présent */}
            <Reveal delay={150}>
              <p
                id="about-heading"
                className="font-display italic font-light text-encre tracking-tight"
                style={{
                  fontSize: 'clamp(1.375rem, 2.4vw, 2rem)',
                  lineHeight: 1.3,
                }}
              >
                {paragraphs[0]}
              </p>
            </Reveal>

            {/* Image Sofia — alignée avec le texte, format paysage */}
            <Reveal delay={250}>
             {/* Image Sofia — même largeur que le texte, alignée à gauche */}
            <Reveal delay={250}>
              <figure className="max-w-prose-editorial">
                <div className="relative aspect-[3/2] overflow-hidden bg-pierre/20">
                  <Image
                    src="/images/about/sofia-tram.jpg"
                    alt="Sofia — tramway sur le pont, mont Vitosha en arrière-plan"
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-mono-xs uppercase text-encre/55">
                  София
                </figcaption>
              </figure>
            </Reveal>
            </Reveal>

            {/* Paragraphes 2 à n — body éditorial */}
            {paragraphs.slice(1).map((para, i) => (
              <Reveal key={i} delay={300 + i * 100}>
                <p
                  className="text-encre/80 max-w-prose-editorial"
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.7,
                  }}
                >
                  {para}
                </p>
              </Reveal>
            ))}

            {/* Signature en mono */}
            <Reveal delay={300 + paragraphs.length * 100}>
              <div className="pt-8 border-t border-encre/15">
                <p className="font-mono text-mono-xs uppercase text-encre/55">
                  — {t('signature')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
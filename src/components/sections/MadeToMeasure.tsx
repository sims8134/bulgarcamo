import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/primitives/Reveal';

export default function MadeToMeasure() {
  const t = useTranslations('sur_mesure');

  return (
    <section
      id="made-to-measure"
      className="section-dark section-y-lg"
      aria-labelledby="mtm-heading"
    >
      <div className="container-page">
        <div className="grid grid-cols-12 gap-6">
          {/* Eyebrow latéral */}
          <div className="col-span-12 md:col-span-2">
            <Reveal>
              <p className="eyebrow">— {t('eyebrow')}</p>
            </Reveal>
          </div>

          {/* Contenu principal */}
          <div className="col-span-12 md:col-span-9 md:col-start-4 space-y-12">
            {/* Titre éditorial */}
            <Reveal delay={150}>
              <h2
                id="mtm-heading"
                className="font-display italic font-light text-ivoire tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.1 }}
              >
                {t('title')}
              </h2>
            </Reveal>

            {/* Texte court */}
            <Reveal delay={300}>
              <p className="text-body text-ivoire/75 max-w-prose-editorial">
                {t('body')}
              </p>
            </Reveal>

            {/* CTA discret */}
            <Reveal delay={450}>
              <Link href="/contact?subject=made-to-measure" className="cta-quiet">
                <span>{t('cta')}</span>
                <span aria-hidden>→</span>
              </Link>
            </Reveal>

            {/* Image atelier — même largeur que le texte */}
            <Reveal delay={600}>
              <figure className="max-w-prose-editorial">
                <div className="relative aspect-[3/2] overflow-hidden bg-ivoire/5 ring-1 ring-ivoire/15">
                  <Image
                    src="/images/about/atelier-couture.jpg"
                    alt="Atelier — couture à la machine, gros plan sur le fil et l'aiguille"
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between font-mono text-mono-xs uppercase text-ivoire/55">
                  <span>{t('eyebrow')}</span>
                  <span>София</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
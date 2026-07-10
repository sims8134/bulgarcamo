import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/primitives/Reveal';

export default function Pro() {
  const t = useTranslations('pro');

  return (
    <section
      id="pro"
      className="relative section-y border-t border-encre/8"
      style={{ backgroundColor: 'rgba(201, 194, 182, 0.18)' }}
      aria-labelledby="pro-heading"
    >
      <div className="container-page">
        <div className="grid grid-cols-12 gap-6 items-end">
          {/* Colonne gauche — eyebrow + titre */}
          <div className="col-span-12 md:col-span-6 space-y-8">
            <Reveal>
              <p className="eyebrow">— {t('eyebrow')}</p>
            </Reveal>
            <Reveal delay={150}>
              <h2
                id="pro-heading"
                className="font-display font-light text-encre tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.1 }}
              >
                {t('title')}
              </h2>
            </Reveal>
          </div>

          {/* Colonne droite — body + CTA */}
          <div className="col-span-12 md:col-span-5 md:col-start-8 space-y-8">
            <Reveal delay={300}>
              <p className="text-body text-encre/75 max-w-prose-narrow">
                {t('body')}
              </p>
            </Reveal>
            <Reveal delay={450}>
              <Link href="/contact?subject=trade" className="cta-quiet">
                <span>{t('cta')}</span>
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

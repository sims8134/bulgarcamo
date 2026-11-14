import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AccentTitle } from '@/components/primitives/AccentTitle';

export default function Pro() {
  const t = useTranslations('pro');

  return (
    <section
      id="pro"
      className="relative section-y bg-surface border-t border-line"
      aria-labelledby="pro-heading"
    >
      <div className="container-page">
        <div className="grid grid-cols-12 gap-6 gap-y-10 items-end">
          <div className="col-span-12 md:col-span-6 space-y-10">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 id="pro-heading" className="heading-md">
              <AccentTitle text={t('title')} />
            </h2>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8 space-y-8">
            <p className="prose-narrow">{t('body')}</p>
            <Link href="/contact?subject=trade" className="cta">
              <span>{t('cta')}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

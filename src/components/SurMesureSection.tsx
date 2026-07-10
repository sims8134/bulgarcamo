import { useTranslations } from 'next-intl';

export default function SurMesureSection() {
  const t = useTranslations('sur_mesure');

  return (
    <section className="bg-cream border-y border-olive-deep/10">
      <div className="container-page py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">{t('eyebrow')}</p>
            <h2 className="heading-section text-olive-deep">{t('title')}</h2>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <p className="text-lg text-olive-deep/80 leading-relaxed">
              {t('body')}
            </p>
            <a
              href="mailto:contact@bulgarcamo.com?subject=Demande%20sur%20mesure"
              className="inline-flex items-center gap-2 text-xs tracking-extra uppercase text-olive-deep hover:text-frogskin transition-colors border-b border-olive-deep pb-1"
            >
              {t('cta')}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

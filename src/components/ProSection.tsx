import { useTranslations } from 'next-intl';

export default function ProSection() {
  const t = useTranslations('pro');

  return (
    <section id="pro" className="bg-olive-deep text-cream">
      <div className="container-page py-20 md:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4 text-frogskin">{t('eyebrow')}</p>
          <h2 className="heading-section mb-8">{t('title')}</h2>
          <p className="text-lg md:text-xl text-cream/80 leading-relaxed mb-10">
            {t('body')}
          </p>
          <a
            href="mailto:contact@bulgarcamo.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-cream text-olive-deep font-medium tracking-extra uppercase text-sm hover:bg-frogskin hover:text-cream transition-colors"
          >
            {t('cta')}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="container-page py-20 md:py-32">
      <div className="max-w-3xl">
        <p className="eyebrow mb-4">{t('eyebrow')}</p>
        <h2 className="heading-section text-olive-deep mb-8">{t('title')}</h2>
        <p className="text-lg md:text-xl text-olive-deep/80 leading-relaxed">
          {t('body')}
        </p>
      </div>
    </section>
  );
}

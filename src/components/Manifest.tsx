import { useTranslations } from 'next-intl';

export default function Manifest() {
  const t = useTranslations('manifest');

  return (
    <section
      id="manifest"
      className="bg-surface border-y border-line section-y-lg scroll-mt-16"
      aria-labelledby="manifest-label"
    >
      <div className="container-page">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <p id="manifest-label" className="eyebrow">{t('eyebrow')}</p>
          </div>

          <div className="col-span-12 md:col-span-9 md:col-start-4 space-y-10">
            <p
              className="text-text font-medium tracking-tight"
              style={{ fontSize: 'clamp(1.375rem, 3vw, 2.4rem)', lineHeight: 1.3 }}
            >
              {t('body')}
            </p>

            <div className="rule" />

            <p className="label text-accent">{t('signature')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

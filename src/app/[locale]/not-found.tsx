import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('not_found');

  return (
    <article className="relative min-h-[70vh] flex items-center">
      <div className="container-page py-22">
        <div className="max-w-3xl space-y-10">
          <p className="tag">404 · {t('eyebrow')}</p>
          <h1 className="heading-md">{t('title')}</h1>
          <p className="lede max-w-prose-narrow">{t('body')}</p>
          <Link href="/" className="cta">
            <span aria-hidden>←</span>
            <span>{t('back')}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

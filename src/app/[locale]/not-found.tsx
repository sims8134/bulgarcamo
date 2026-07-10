import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('not_found');

  return (
    <article className="relative bg-ivoire min-h-[80vh] flex items-center">
      <div className="container-page py-30">
        <div className="max-w-2xl space-y-10">
          <p className="font-mono text-mono-xs uppercase text-encre/55">
            404 · {t('eyebrow')}
          </p>
          <h1
            className="font-display italic font-light text-encre tracking-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', lineHeight: 1.05 }}
          >
            {t('title')}
          </h1>
          <p className="lede text-encre/80 max-w-prose-narrow">
            {t('body')}
          </p>
          <Link href="/" className="cta-quiet">
            <span aria-hidden>←</span>
            <span>{t('back')}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

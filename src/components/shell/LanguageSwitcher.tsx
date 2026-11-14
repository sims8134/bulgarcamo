'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/cn';

const ORDER = ['fr', 'en', 'bg'] as const;

export default function LanguageSwitcher({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const path = pathname.replace(/^\/(fr|en|bg)(?=\/|$)/, '') || '/';

  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {ORDER.map((l) => (
        <li key={l}>
          <Link
            href={path}
            locale={l}
            hrefLang={l}
            lang={l}
            onClick={onNavigate}
            aria-current={l === locale ? 'true' : undefined}
            className={cn(
              'label inline-block px-2 py-2',
              l === locale ? 'text-accent' : 'text-text hover:text-accent',
            )}
          >
            {l}
          </Link>
        </li>
      ))}
    </ul>
  );
}

'use client';

import { useEffect } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  // Lock scroll quand ouvert
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Escape pour fermer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const pathWithoutLocale = pathname.replace(/^\/(fr|en|bg)/, '') || '/';

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-ivoire
        transition-all duration-800 ease-expo-out
        ${open
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
        }
      `}
      aria-hidden={!open}
    >
      <div className="container-page h-full flex flex-col">
        {/* Top bar — fermeture */}
        <div className="h-16 flex items-center justify-between flex-shrink-0">
          <span className="font-display text-[15px] tracking-tight">БЪЛГАРКАМО</span>
          <button
            onClick={onClose}
            className="font-mono text-mono-sm uppercase text-encre"
          >
            {t('close')}
          </button>
        </div>

        {/* Navigation principale */}
        <nav
          className={`
            flex-1 flex flex-col justify-center gap-6
            transition-all duration-1200 ease-expo-out
            ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
          style={{ transitionDelay: open ? '200ms' : '0ms' }}
        >
          <MobileLink href="/motifs" onClick={onClose}>{t('motifs')}</MobileLink>
          <MobileLink href="/catalogue" onClick={onClose}>{t('catalogue')}</MobileLink>
          <MobileLink href="/atelier" onClick={onClose}>{t('atelier')}</MobileLink>
        </nav>

        {/* Footer mobile menu — langues */}
        <div className="h-24 flex items-center gap-4 font-mono text-mono-xs uppercase flex-shrink-0">
          {(['fr', 'en', 'bg'] as const).map((l, i) => (
            <span key={l} className="flex items-center gap-4">
              {i > 0 && <span className="text-encre/30">·</span>}
              <Link
                href={pathWithoutLocale}
                locale={l}
                onClick={onClose}
                className={l === locale ? 'text-encre' : 'text-encre/50'}
              >
                {l}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        font-display text-[clamp(2.5rem,9vw,4rem)] leading-none
        text-encre transition-opacity duration-400 hover:opacity-60
      "
      style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
    >
      {children}
    </Link>
  );
}
'use client';

import { useEffect, useRef } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  const t = useTranslations('nav');
  const closeRef = useRef<HTMLButtonElement>(null);

  // Bloque le défilement et place le focus sur « Fermer » à l'ouverture
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Rendu seulement à l'ouverture : aucun lien focalisable caché dans la page
  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t('menu')}
      className="fixed inset-0 z-50 bg-bg"
    >
      <div className="container-page h-full flex flex-col">
        <div className="h-14 flex items-center justify-between flex-shrink-0 border-b-2 border-accent">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/bulgarcamo-wordmark-phosphor.svg"
            alt="Bulgarcamo"
            width={680}
            height={86}
            className="h-[14px] w-auto"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="label text-text hover:text-accent px-2 py-2"
          >
            {t('close')}
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center gap-8">
          <MobileLink href="/#motifs" onClick={onClose}>{t('motifs')}</MobileLink>
          <MobileLink href="/#catalogue" onClick={onClose}>{t('catalogue')}</MobileLink>
          <MobileLink href="/#manifest" onClick={onClose}>{t('atelier')}</MobileLink>
        </nav>

        <div className="h-24 flex items-center flex-shrink-0 border-t border-line">
          <LanguageSwitcher onNavigate={onClose} />
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
      className="font-mono font-bold uppercase tracking-label text-text hover:text-accent text-2xl"
    >
      {children}
    </Link>
  );
}

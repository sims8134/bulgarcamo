'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="site-layer sticky top-0 z-40 bg-bg border-b-2 border-accent">
        <div className="container-page h-14 md:h-16 flex items-center justify-between gap-3">
          {/* REC + logo phosphore */}
          <div className="flex items-center gap-3 min-w-0">
            <span aria-hidden className="label text-accent flex items-center gap-2">
              <span className="rec-dot" />
              REC
            </span>
            <Link href="/" className="block py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/bulgarcamo-wordmark-phosphor.svg"
                alt="Bulgarcamo"
                width={680}
                height={86}
                className="h-[14px] sm:h-[18px] md:h-5 w-auto"
              />
            </Link>
          </div>

          {/* Navigation desktop */}
          <nav aria-label={t('menu')} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              <li><NavLink href="/#motifs">{t('motifs')}</NavLink></li>
              <li><NavLink href="/#catalogue">{t('catalogue')}</NavLink></li>
              <li><NavLink href="/#manifest">{t('atelier')}</NavLink></li>
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden label text-text hover:text-accent px-2 py-2"
            >
              {t('menu')}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="label text-text hover:text-accent py-2">
      {children}
    </Link>
  );
}

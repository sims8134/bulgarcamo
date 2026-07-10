'use client';

import { useState, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import MobileMenu from './MobileMenu';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pathWithoutLocale = pathname.replace(/^\/(fr|en|bg)/, '') || '/';
  const otherLocales = (['en', 'fr', 'bg'] as const).filter((l) => l !== locale);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-40
          transition-all duration-600 ease-expo-out
          ${
            scrolled
              ? 'h-12 bg-ivoire/85 backdrop-blur-md border-b border-encre/8'
              : 'h-16 bg-ivoire/0 border-b border-transparent'
          }
        `}
      >
        <div className="container-page h-full flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-display text-[15px] tracking-tight text-encre transition-opacity duration-400 hover:opacity-70"
          >
            БЪЛГАРКАМО
          </Link>

          {/* Navigation centre — desktop */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            <NavLink href="/#motifs">{t('motifs')}</NavLink>
            <NavLink href="/#catalogue">{t('catalogue')}</NavLink>
            <NavLink href="/#manifest">{t('atelier')}</NavLink>
          </nav>

          {/* Sélecteur langue */}
          <div className="hidden md:flex items-center gap-2 font-mono text-mono-xs uppercase">
            <span className="text-encre">{locale}</span>
            {otherLocales.map((l) => (
              <span key={l} className="flex items-center gap-2">
                <span className="text-encre/30">·</span>
                <Link
                  href={pathWithoutLocale}
                  locale={l}
                  className="text-encre/50 hover:text-encre transition-colors duration-300"
                >
                  {l}
                </Link>
              </span>
            ))}
          </div>

          {/* Mobile — bouton menu */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden font-mono text-mono-sm uppercase text-encre"
            aria-label="Ouvrir le menu"
          >
            {t('menu')}
          </button>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16" aria-hidden />

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/* — NavLink avec soulignement animé — */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        relative group
        font-sans text-[13px] tracking-wide text-encre/70
        hover:text-encre
        transition-colors duration-400 ease-expo-out
        py-1
      "
    >
      {children}
      <span
        aria-hidden
        className="
          absolute left-0 right-0 -bottom-0.5
          h-px bg-encre
          origin-left scale-x-0
          group-hover:scale-x-100
          transition-transform duration-500 ease-expo-out
        "
      />
    </Link>
  );
}
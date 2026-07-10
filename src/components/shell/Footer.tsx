'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function Footer() {
  const t = useTranslations('footer');
  const footerRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (watermarkRef.current) {
        // Parallax inverse : le watermark monte légèrement quand on scroll vers le footer
        gsap.fromTo(
          watermarkRef.current,
          { yPercent: 30 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-ivoire text-encre relative overflow-hidden">
      {/* Watermark cyrillique massif — parallax */}
      <div
        aria-hidden
        className="
          absolute bottom-0 left-0 right-0
          flex justify-center pointer-events-none select-none
        "
        style={{ marginBottom: '-1.5vw' }}
      >
        <span
          ref={watermarkRef}
          className="font-display font-light tracking-tighter leading-none whitespace-nowrap will-change-transform"
          style={{
            fontSize: 'clamp(4rem, 14vw, 13rem)',
            color: 'rgba(26, 26, 24, 0.06)',
          }}
        >
          БЪЛГАРКАМО
        </span>
      </div>

      <div className="container-page section-y relative z-10">
        {/* Trois colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-30">
          {/* Atelier */}
          <div className="space-y-4">
            <p className="eyebrow">{t('atelier.label')}</p>
            <p className="prose-narrow">
              {t('atelier.address')}
              <br />
              <span className="text-encre/60">{t('atelier.note')}</span>
            </p>
          </div>

          {/* Journal — newsletter */}
          <div className="space-y-4">
            <p className="eyebrow">{t('journal.label')}</p>
            <p className="prose-narrow">{t('journal.body')}</p>
            <form className="flex items-center border-b border-encre/30 pt-2 max-w-sm">
              <input
                type="email"
                required
                placeholder={t('journal.placeholder')}
                className="
                  flex-1 bg-transparent py-2 outline-none
                  font-sans text-[14px] text-encre
                  placeholder:text-encre/40
                "
              />
              <button
                type="submit"
                className="
                  font-mono text-mono-xs uppercase text-encre
                  hover:text-sauge-deep transition-colors duration-400
                  pl-4
                "
              >
                {t('journal.cta')}
              </button>
            </form>
          </div>

          {/* Liens */}
          <div className="space-y-4">
            <p className="eyebrow">{t('legal.label')}</p>
            <ul className="space-y-2 prose-narrow">
              <li>
                <Link href="/contact?subject=trade" className="hover:text-sauge-deep transition-colors duration-400">
                  {t('legal.pro')}
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="hover:text-sauge-deep transition-colors duration-400">
                  {t('legal.cgv')}
                </Link>
              </li>
              <li>
                <Link href="/mentions" className="hover:text-sauge-deep transition-colors duration-400">
                  {t('legal.mentions')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sauge-deep transition-colors duration-400">
                  {t('legal.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom — copyright + meta */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-encre/10">
          <p className="font-mono text-mono-xs uppercase text-encre/50">
            © {new Date().getFullYear()} Bulgarcamo · Sofia, България
          </p>
          <p className="font-mono text-mono-xs uppercase text-encre/50">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
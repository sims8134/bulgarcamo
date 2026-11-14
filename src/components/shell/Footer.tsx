import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import NewsletterForm from '@/components/shell/NewsletterForm';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  // Version latine du mot-symbole seulement pour le pied de page anglais
  const logo =
    locale === 'en'
      ? { src: '/brand/bulgarcamo-latin-phosphor.svg', w: 673, h: 86 }
      : { src: '/brand/bulgarcamo-wordmark-phosphor.svg', w: 680, h: 86 };

  return (
    <footer className="site-layer bg-bg border-t-2 border-accent">
      <div className="container-page section-y">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-22">
          {/* Atelier */}
          <div className="space-y-4">
            <p className="eyebrow">{t('atelier.label')}</p>
            <p className="prose-narrow">
              {t('atelier.address')}
              <br />
              {t('atelier.note')}
            </p>
            <p>
              <a
                href="https://www.instagram.com/bulgarcamo/"
                target="_blank"
                rel="noopener noreferrer"
                className="label text-accent hover:text-text inline-block py-1"
              >
                Instagram · @bulgarcamo
              </a>
            </p>
          </div>

          {/* Journal */}
          <div className="space-y-4">
            <p className="eyebrow">{t('journal.label')}</p>
            <p className="prose-narrow">{t('journal.body')}</p>
            <NewsletterForm />
          </div>

          {/* Liens */}
          <div className="space-y-4">
            <p className="eyebrow">{t('legal.label')}</p>
            <ul className="space-y-1">
              <li><FooterLink href="/contact?subject=trade">{t('legal.pro')}</FooterLink></li>
              <li><FooterLink href="/legal">{t('legal.mentions')}</FooterLink></li>
              <li><FooterLink href="/legal">{t('legal.privacy')}</FooterLink></li>
              <li><FooterLink href="/contact">{t('legal.contact')}</FooterLink></li>
            </ul>
          </div>
        </div>

        {/* Signature */}
        <div className="pt-10 border-t border-line space-y-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt="Bulgarcamo"
            width={logo.w}
            height={logo.h}
            loading="lazy"
            className="w-full max-w-[560px] h-auto"
          />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="label text-accent">Cuts from the archive</p>
            <p className="label text-text-muted">
              © {new Date().getFullYear()} Bulgarcamo · Sofia, България · {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-block py-1 text-text-muted hover:text-accent">
      {children}
    </Link>
  );
}

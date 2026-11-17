import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';
import { AccentTitle } from '@/components/primitives/AccentTitle';

// Métadonnées propres : sans elles, la page hérite du canonical de l'accueil.
// Titre « Contact · Bulgarcamo » via le gabarit du layout.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('eyebrow'),
    description: t('intro'),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/contact`])),
        'x-default': '/en/contact',
      },
    },
  };
}

// Contact : pas de formulaire, seulement l'e-mail et Instagram.
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <article className="relative">
      <div className="container-page pt-14 lg:pt-22 pb-22">
        <div className="max-w-3xl space-y-10">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h1 className="heading-md">
            <AccentTitle text={t('title')} />
          </h1>
          <p className="lede max-w-prose-narrow">{t('intro')}</p>

          <div className="space-y-4 pt-8 border-t border-line">
            <p className="eyebrow">{t('direct_label')}</p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@bulgarcamo.com" className="link-line text-lede">
                  contact@bulgarcamo.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/bulgarcamo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line text-lede"
                >
                  Instagram · @bulgarcamo
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

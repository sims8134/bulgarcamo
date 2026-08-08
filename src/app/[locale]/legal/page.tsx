import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });

  return {
    title: t('title'),
    description: t('intro'),
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${locale}/legal`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/legal`])),
        'x-default': '/en/legal',
      },
    },
  };
}

type Section = {
  eyebrow: string;
  title: string;
  body: string[];
};

// La liste des droits s'insère dans la section « Vos droits » (index 4).
const RIGHTS_SECTION_INDEX = 4;

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: 'legal' });

  const sections = t.raw('sections') as Section[];
  const rights = t.raw('rights') as string[];

  return (
    <div className="container-narrow section-y">
      <header className="mb-24">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h1 className="heading-lg mt-4">{t('title')}</h1>
        <p className="ref-tag mt-6">{t('updated')}</p>
      </header>

      {sections.map((section, i) => (
        <section key={section.eyebrow} className="mb-20">
          <div className="rule mb-8" />

          <p className="eyebrow">
            {String(i + 1).padStart(2, '0')} — {section.eyebrow}
          </p>
          <h2 className="heading-sm mt-3 mb-6">{section.title}</h2>

          {section.body.map((paragraph, j) => (
            <p key={j} className="prose-narrow mb-4">
              {paragraph}
            </p>
          ))}

          {i === RIGHTS_SECTION_INDEX && (
            <ul className="mt-6 grid sm:grid-cols-2">
              {rights.map((right) => (
                <li key={right} className="ref-tag py-2">
                  {right}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <div className="rule mb-8" />
      <p className="ref-tag">{t('footer_note')}</p>
    </div>
  );
}
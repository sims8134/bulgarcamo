import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';
import LegalDocument from '@/components/sections/LegalDocument';

// Politique de confidentialité (RGPD)
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return {
    title: t('title'),
    description: t('intro'),
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/privacy`])),
        'x-default': '/en/privacy',
      },
    },
  };
}

// Index de la section « Vos droits » dans messages › privacy.sections
const RIGHTS_SECTION = 7;

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <LegalDocument locale={locale} namespace="privacy" rightsSection={RIGHTS_SECTION} />;
}

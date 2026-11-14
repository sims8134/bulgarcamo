import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';
import LegalDocument from '@/components/sections/LegalDocument';

// Mentions légales (éditeur, hébergeur, propriété des contenus)
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

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <LegalDocument locale={locale} namespace="legal" />;
}

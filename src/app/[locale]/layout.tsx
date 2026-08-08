import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ViewTransitions } from 'next-view-transitions';
import { locales, type Locale } from '@/i18n/config';
import { fontVariables } from '@/lib/fonts';
import SmoothScroll from '@/components/shell/SmoothScroll';
import Header from '@/components/shell/Header';
import Footer from '@/components/shell/Footer';
import Cursor from '@/components/primitives/Cursor';
import '../globals.css';

const BASE_URL = 'https://www.bulgarcamo.com';
const OG_IMAGE = '/og-image.jpg';

const titles: Record<string, string> = {
  en: 'Bulgarcamo — Cuts from the archive',
  fr: "Bulgarcamo — Coupes dans l'archive",
  bg: 'Bulgarcamo — Кройки от архива',
};

const descriptions: Record<string, string> = {
  en: 'Sofia, България. Bulgarian and German military textile archives, cut into rare civilian pieces.',
  fr: 'Sofia, България. Archives textiles militaires bulgares et allemandes, taillées en pièces civiles rares.',
  bg: 'София, България. Архивни военни текстили — български и германски — изрязани в редки граждански парчета.',
};

const ogLocales: Record<string, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  bg: 'bg_BG',
};

const ogAlts: Record<string, string> = {
  en: 'Bulgarcamo — textile pieces cut from military camouflage archives, Sofia',
  fr: 'Bulgarcamo — pièces textiles taillées dans les archives de camouflage militaire, Sofia',
  bg: 'Bulgarcamo — текстилни парчета от архивни военни камуфлажи, София',
};

const languageAlternates = {
  ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
  'x-default': '/en',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = titles[locale] ?? titles.en;
  const description = descriptions[locale] ?? descriptions.en;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: title,
      template: '%s — Bulgarcamo',
    },
    description,
    verification: {
      google: 'BaYT13lGPokUJQ7dEMNZKT8d_J6r0o7usxwAeO0GuO8',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates,
    },
    openGraph: {
      type: 'website',
      siteName: 'Bulgarcamo',
      url: `/${locale}`,
      locale: ogLocales[locale] ?? 'en_US',
      title,
      description,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: ogAlts[locale] ?? ogAlts.en,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  const messages = await getMessages();

  return (
    <ViewTransitions>
      <html lang={locale} className={fontVariables}>
        <body className="bg-ivoire text-encre font-sans antialiased">
          <NextIntlClientProvider messages={messages} locale={locale}>
            <SmoothScroll />
            <Cursor />
            <Header />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
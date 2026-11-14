import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import Manifest from '@/components/Manifest';
import MotifsSequence from '@/components/sections/MotifsSequence';
import CatalogueMosaic from '@/components/sections/CatalogueMosaic';
import MadeToMeasure from '@/components/sections/MadeToMeasure';
import About from '@/components/sections/About';
import type { Locale } from '@/i18n/config';

const BASE_URL = 'https://www.bulgarcamo.com';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bulgarcamo',
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.jpg`,
  email: 'contact@bulgarcamo.com',
  sameAs: ['https://www.instagram.com/bulgarcamo/'],
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <Manifest />
      <MotifsSequence />
      <CatalogueMosaic />
      <MadeToMeasure />
      <About />
    </>
  );
}
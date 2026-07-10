import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import Manifest from '@/components/Manifest';
import MotifsSequence from '@/components/sections/MotifsSequence';
import CatalogueMosaic from '@/components/sections/CatalogueMosaic';
import MadeToMeasure from '@/components/sections/MadeToMeasure';
import About from '@/components/sections/About';
import Pro from '@/components/sections/Pro';
import type { Locale } from '@/i18n/config';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <Manifest />
      <MotifsSequence />
      <CatalogueMosaic />
      <MadeToMeasure />
      <About />
      <Pro />
    </>
  );
}
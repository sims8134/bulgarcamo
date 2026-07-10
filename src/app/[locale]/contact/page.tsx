import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import ContactForm from '@/components/sections/ContactForm';

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ subject?: string; ref?: string; piece?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale as Locale);

  return (
    <ContactForm
      initialSubject={sp.subject}
      initialRef={sp.ref}
      initialPiece={sp.piece}
    />
  );
}

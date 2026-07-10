import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { products } from '@/data/products';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';
import ProductPage from '@/components/sections/ProductPage';

// Pré-génération statique de toutes les fiches produit
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    products
      .filter((p) => p.image !== null)
      .map((p) => ({ locale, id: p.id }))
  );
}

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale as Locale);

  const product = products.find((p) => p.id === id);

  // 404 si produit inexistant ou caché (image null)
  if (!product || product.image === null) {
    notFound();
  }

  return <ProductPage product={product} />;
}
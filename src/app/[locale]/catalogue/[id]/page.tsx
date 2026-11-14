import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { activeProducts } from '@/data/products';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';
import ProductPage from '@/components/sections/ProductPage';
import ScrollTop from '@/components/primitives/ScrollTop';

// Pré-génération statique de toutes les fiches produit de la collection en cours
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    activeProducts
      .filter((p) => p.image !== null)
      .map((p) => ({ locale, id: p.id }))
  );
}

// Métadonnées propres à chaque pièce
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;

  // Même garde que la route : une pièce sans image n'est pas publiée
  const product = activeProducts.find((p) => p.id === id);
  if (!product || product.image === null) return {};
  if (!locales.includes(locale as Locale)) return {};

  const t = await getTranslations({ locale, namespace: 'products' });
  const tMotifs = await getTranslations({ locale, namespace: 'motifs' });

  const productName = t(`names.${product.nameKey}`);
  const motifName = tMotifs(`${product.motif}.name`);
  const provenance = tMotifs(`${product.motif}.provenance`);
  const era = tMotifs(`${product.motif}.era`);

  const title = `${productName} — ${motifName}`;
  const description = `${productName} — ${motifName}, ${era}. ${provenance} ${product.ref} · Sofia.`;

  const path = `/${locale}/catalogue/${product.id}`;
  const imageAlt = `${productName} ${motifName} — Bulgarcamo`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `/${l}/catalogue/${product.id}`])
        ),
        'x-default': `/en/catalogue/${product.id}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Bulgarcamo',
      url: path,
      title: `${title} — Bulgarcamo`,
      description,
      images: [{ url: product.image, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Bulgarcamo`,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale as Locale);

  const product = activeProducts.find((p) => p.id === id);

  if (!product || product.image === null) {
    notFound();
  }

  // Pas de JSON-LD Product : sans offre (ni prix, ni avis), Google le classe
  // en élément invalide pour les extraits produit.
  return (
    <>
      <ScrollTop />
      <ProductPage product={product} />
    </>
  );
}
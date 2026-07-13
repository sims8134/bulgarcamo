import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { activeProducts } from '@/data/products';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';
import ProductPage from '@/components/sections/ProductPage';

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
  const product = activeProducts.find((p) => p.id === id);

  if (!product) return {};

  const t = await getTranslations({ locale, namespace: 'products' });
  const tMotifs = await getTranslations({ locale, namespace: 'motifs' });

  const productName = t(`names.${product.nameKey}`);
  const motifName = tMotifs(`${product.motif}.name`);
  const provenance = tMotifs(`${product.motif}.provenance`);

  const title = `${productName} — ${motifName}`;
  const description = `${productName} ${motifName}. ${provenance} Textile ${product.textileYear}, Sofia. ${product.ref}, petite série.`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      siteName: 'Bulgarcamo',
      title: `${title} — Bulgarcamo`,
      description,
      images: product.image
        ? [
            {
              url: product.image,
              alt: `${productName} ${motifName} — Bulgarcamo`,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `/${locale}/catalogue/${product.id}`,
      languages: {
        en: `/en/catalogue/${product.id}`,
        fr: `/fr/catalogue/${product.id}`,
        bg: `/bg/catalogue/${product.id}`,
        'x-default': `/en/catalogue/${product.id}`,
      },
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

  // 404 si produit inexistant, hors collection, ou caché (image null)
  if (!product || product.image === null) {
    notFound();
  }

  return <ProductPage product={product} />;
}
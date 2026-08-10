import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { activeProducts } from '@/data/products';

const BASE_URL = 'https://www.bulgarcamo.com';

// Construit le bloc hreflang d'un chemin donné (ex. '/contact' ou '/catalogue/dpm-cardholder')
function languageAlternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}${path}`]),
      ),
      'x-default': `${BASE_URL}/en${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/contact', '/legal'];

  // Pages statiques, déclinées par langue
  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.5,
      alternates: languageAlternates(route),
    })),
  );

  // Pages produits de la collection en cours, déclinées par langue
  const productPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    activeProducts
      .filter((p) => p.image !== null)
      .map((product) => ({
        url: `${BASE_URL}/${locale}/catalogue/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: languageAlternates(`/catalogue/${product.id}`),
      })),
  );

  return [...staticPages, ...productPages];
}
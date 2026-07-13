import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { activeProducts } from '@/data/products';

const BASE_URL = 'https://bulgarcamo.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/catalogue', '/contact'];

  // Pages statiques, déclinées par langue
  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
  );

  // Pages produits de la collection en cours, déclinées par langue
  const productPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    activeProducts.map((product) => ({
      url: `${BASE_URL}/${locale}/catalogue/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  );

  return [...staticPages, ...productPages];
}
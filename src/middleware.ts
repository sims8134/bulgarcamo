import createMiddleware from 'next-intl/middleware';
import { locales } from '@/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale: 'en',          // ← changé de 'fr' à 'en'
  localePrefix: 'always',
  localeDetection: false,        // ← important, on garde la décision côté serveur
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
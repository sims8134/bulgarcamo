export const locales = ['en', 'fr', 'bg'] as const;  // EN en premier (convention)
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';            // ← changé de 'fr' à 'en'

export const localeNames: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  bg: 'BG',
};
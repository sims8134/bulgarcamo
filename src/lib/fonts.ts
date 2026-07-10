import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';

// Cormorant Garamond = display editorial, support cyrillique natif
export const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

// Inter = body neutre
export const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

// JetBrains Mono = technique
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});

export const fontVariables = `${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`;
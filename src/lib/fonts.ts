import localFont from 'next/font/local';

// Polices auto-hébergées (licence OFL, voir src/fonts/OFL-*.txt).
// Instances statiques sous-ensemblées latin + cyrillique, générées
// à partir des fontes variables du dépôt google/fonts.

// Inter : texte courant (400/500) et titres h1/h2 (900)
export const inter = localFont({
  src: [
    { path: '../fonts/inter-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/inter-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/inter-900.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

// Tektur : mot-symbole et noms bulgares des motifs
export const tektur = localFont({
  src: [{ path: '../fonts/tektur-500.woff2', weight: '500', style: 'normal' }],
  variable: '--font-tektur',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

// JetBrains Mono : étiquettes, références, navigation, métadonnées
export const jetbrainsMono = localFont({
  src: [{ path: '../fonts/jetbrains-mono-700.woff2', weight: '700', style: 'normal' }],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
  fallback: ['ui-monospace', 'Consolas', 'monospace'],
});

export const fontVariables = `${inter.variable} ${tektur.variable} ${jetbrainsMono.variable}`;

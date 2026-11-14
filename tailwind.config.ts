import type { Config } from 'tailwindcss';

// Identité « vision nocturne cassé ».
// Les couleurs et les polices pointent toutes vers des variables CSS
// déclarées dans src/app/globals.css (couleurs) et src/lib/fonts.ts (polices) :
// pour changer une teinte ou une police, on ne modifie que ces deux fichiers.
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        line: 'var(--line)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        tektur: ['var(--font-tektur)', 'var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'mono-xs': ['11px', { lineHeight: '1.5' }],
        'mono-sm': ['12px', { lineHeight: '1.5' }],
        meta: ['18px', { lineHeight: '1.4' }],
        caption: ['13px', { lineHeight: '1.5' }],
        body: ['16px', { lineHeight: '1.65' }],
        lede: ['18px', { lineHeight: '1.55' }],
        'h-sm': ['clamp(1.5rem, 2.4vw, 2rem)', { lineHeight: '0.95' }],
        'h-md': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '0.9' }],
        'h-lg': ['clamp(2.5rem, 6.5vw, 5.5rem)', { lineHeight: '0.88' }],
        'h-xl': ['clamp(3rem, 9vw, 8rem)', { lineHeight: '0.88' }],
      },
      letterSpacing: {
        title: '-0.045em',
        label: '0.14em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '38': '9.5rem',
      },
      maxWidth: {
        'prose-narrow': '52ch',
        'prose-editorial': '64ch',
      },
    },
  },
  plugins: [],
} satisfies Config;

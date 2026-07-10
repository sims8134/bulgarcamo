import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    // On override complètement, pas extend — pour reprendre le contrôle
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
 fontFamily: {
  display: ['var(--font-display)', 'Georgia', 'serif'],
  sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
},
    extend: {
      colors: {
        // Palette resserrée — 4 tons
        ivoire: '#F2EFE8',      // fond
        encre: '#1A1A18',       // texte
        sauge: '#7A8470',       // accent unique
        pierre: '#C9C2B6',      // neutre, séparateurs

        // Variantes utilitaires
        'ivoire-warm': '#EDE8DD',   // hover sur ivoire
        'encre-soft': '#2A2A26',    // texte sur fond clair non-pur
        'sauge-deep': '#5F6856',    // hover/active sur sauge
        'pierre-light': '#DDD7CC',  // séparateurs très subtils
      },
      fontSize: {
        // Échelle éditoriale — clamp pour fluid type
        'mono-xs': ['10px', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        'mono-sm': ['11px', { lineHeight: '1.4', letterSpacing: '0.1em' }],
        'caption': ['13px', { lineHeight: '1.5' }],
        'body': ['15px', { lineHeight: '1.65' }],
        'lede': ['17px', { lineHeight: '1.55' }],
        'h-sm': ['clamp(1.5rem, 2vw, 2rem)', { lineHeight: '1.15' }],
        'h-md': ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.1' }],
        'h-lg': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.02' }],
        'h-xl': ['clamp(3.5rem, 9vw, 8rem)', { lineHeight: '0.95' }],
        'h-display': ['clamp(4rem, 12vw, 11rem)', { lineHeight: '0.9' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        tight: '-0.015em',
        normal: '0',
        wide: '0.04em',
        wider: '0.08em',
        mono: '0.1em',
        widest: '0.2em',
      },
      spacing: {
        // Échelle 8 + valeurs éditoriales fréquentes
        '18': '4.5rem',     // 72
        '22': '5.5rem',     // 88
        '30': '7.5rem',     // 120
        '38': '9.5rem',     // 152
        '50': '12.5rem',    // 200
        '60': '15rem',      // 240
      },
      maxWidth: {
        'prose-narrow': '52ch',
        'prose-editorial': '64ch',
      },
      transitionTimingFunction: {
        // Courbes signature
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'editorial': 'cubic-bezier(0.6, 0.05, 0.1, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [],
} satisfies Config;
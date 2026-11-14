# Bulgarcamo

Site vitrine — pièces textiles en camouflages bulgares. Sofia.

**Stack** : Next.js 15 (App Router) · next-intl · Tailwind CSS · TypeScript · Vercel

## Démarrage

```bash
npm install
npm run dev
```

Le site tourne sur [http://localhost:3000](http://localhost:3000) et redirige vers `/fr`.

## Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx       # Layout avec NextIntlClientProvider
│   │   └── page.tsx          # One-pager (assemble tous les composants)
│   ├── globals.css           # Tailwind + Inter + classes utilitaires
│   └── layout.tsx            # Layout racine
├── components/
│   ├── Nav.tsx               # Header sticky + sélecteur langues
│   ├── Hero.tsx              # БЪЛГАРКАМО + tagline
│   ├── MotifsBanner.tsx      # Bandeau 5 motifs SVG
│   ├── MotifsSection.tsx     # Cards motifs détaillées
│   ├── PiecesSection.tsx     # Listes par catégorie
│   ├── AboutSection.tsx      # À propos (placeholder)
│   ├── ProSection.tsx        # B2B fond olive
│   ├── Footer.tsx            # Contact + copyright
│   └── MotifSvgs.tsx         # 5 SVG motifs réutilisables
├── i18n/
│   ├── config.ts             # locales = ['fr', 'en', 'bg']
│   └── request.ts            # next-intl getRequestConfig
└── messages/
    ├── fr.json
    ├── en.json
    └── bg.json
```

## i18n

Trois langues : **FR** (défaut) · **EN** · **BG**. Routes : `/fr`, `/en`, `/bg`.

Pour modifier les textes : éditer les fichiers dans `messages/`.

## Identité « vision nocturne cassé »

Pour changer une couleur ou une police, on ne touche qu'à deux fichiers :

- **Couleurs** : variables CSS dans `src/app/globals.css` (`:root`), mappées dans `tailwind.config.ts` (`bg-bg`, `text-accent`, `border-line`…). Aucune couleur en dur dans les composants.
- **Polices** : `src/lib/fonts.ts` (next/font/local, fichiers woff2 latin + cyrillique dans `src/fonts/`, licence OFL).

| Variable        | Valeur                   | Usage                                   |
|-----------------|--------------------------|-----------------------------------------|
| `--bg`          | `#050805`                | fond                                    |
| `--surface`     | `#0b120b`                | cartes et blocs                         |
| `--accent`      | `#7dff4f`                | vert phosphore : logo, filets, liens    |
| `--accent-dim`  | `#3f8a2a`                | métadonnées décoratives ≥ 18 px         |
| `--text`        | `#e9ffe0`                | titres et texte principal               |
| `--text-muted`  | `#cfe8c6`                | texte courant long                      |
| `--line`        | `rgba(125,255,79,.35)`   | filets fins                             |
| `--scanline`    | `rgba(125,255,79,.05)`   | lignes de balayage                      |

Effets (lignes de balayage, grain, viseur, scotch, titres cassés, étiquettes) : classes de `globals.css` (`.photo-tilt`, `.viseur-corner`, `.tag`, `.cta`…) et composant `PhotoFrame`. Les photos produit ne reçoivent jamais de filtre.

Assets de marque : `public/brand/` (les logos `cwb_logo_*` ne sont pas utilisés sur le site).

## Déploiement Vercel

1. Push le repo sur GitHub
2. Importer dans Vercel → détection auto Next.js
3. Domaine custom : `bulgarcamo.com`

Aucune variable d'environnement requise pour le V1.

## TODO

- [ ] Remplacer les SVG placeholders par photos réelles (motifs et pièces)
- [ ] Écrire le contenu de la section "À propos"
- [ ] Ajouter une page produit individuelle (préparation e-commerce)
- [ ] Ajouter analytics (Plausible recommandé)
- [ ] Optimiser les meta tags par locale (Open Graph, etc.)

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

## Palette

| Nom              | Hex       | Usage                            |
|------------------|-----------|----------------------------------|
| `cream`          | `#F1ECDC` | fond principal                   |
| `olive-deep`     | `#1F2818` | texte principal, fond Pro        |
| `olive-medium`   | `#3D4D2A` | accents                          |
| `warm-grey`      | `#7A7560` | texte secondaire                 |
| `frogskin`       | `#7FA052` | accent vert (liens hover, CTA)   |
| `earth`          | `#5C4A30` | accents bruns                    |
| `khaki`          | `#B8AC8E` | accents clairs                   |

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

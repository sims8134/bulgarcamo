import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Largeurs générées. Elles suivent les largeurs réelles d'affichage
    // (voir src/lib/imageSizes.ts) : photo mobile 334 px à 390 px d'écran
    // (×1,75 / ×2 / ×3 → 640, 750, 1080), vignettes 400 px et photos
    // 533 à 723 px à 1440 px d'écran, jusqu'à 817 px ×2 sur grand écran.
    deviceSizes: [360, 420, 480, 560, 640, 750, 828, 960, 1080, 1200, 1440, 1680, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};

export default withNextIntl(nextConfig);

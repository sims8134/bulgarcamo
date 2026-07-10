'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useTransitionRouter } from 'next-view-transitions';
import type { Product } from '@/data/products';
import { motifs } from '@/content/motifs';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/primitives/Reveal';

interface Props {
  product: Product;
  index: number;
}

export default function PieceCard({ product, index }: Props) {
  const t = useTranslations();
  const router = useTransitionRouter();
  const [hovered, setHovered] = useState(false);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const motif = motifs[product.motif];
  const primaryImage = product.image!;
  const secondaryImage = product.gallery?.[1] ?? null;

  const colSpan = product.span === 2 ? 'lg:col-span-8' : 'lg:col-span-4';
  const aspect =
    product.aspect === 'landscape'
      ? 'aspect-[4/3]'
      : product.aspect === 'square'
      ? 'aspect-square'
      : 'aspect-[3/4]';

  const delay = (index % 3) * 80;

  // Intercept click pour view transition avec next-view-transitions
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) router.push(href);
  }

  return (
    <Reveal delay={delay} className={cn('col-span-2', colSpan)}>
      <Link
        href={`/catalogue/${product.id}`}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group block"
        aria-label={`${product.ref} — ${t(`products.names.${product.nameKey}`)}`}
      >
        {/* Image avec hover organique + view-transition-name */}
        <div
          ref={imageWrapRef}
          data-cursor="image"
          className={cn('relative overflow-hidden bg-pierre/15', aspect)}
          style={{ viewTransitionName: `piece-${product.id}` } as React.CSSProperties}
        >
          {/* Wrapper qui zoome subtilement */}
          <div
            className={cn(
              'absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]',
              hovered ? 'scale-[1.04]' : 'scale-100'
            )}
          >
            <Image
              src={primaryImage}
              alt=""
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className={cn(
                'object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                hovered && secondaryImage ? 'opacity-0' : 'opacity-100'
              )}
            />
            {secondaryImage && (
              <Image
                src={secondaryImage}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className={cn(
                  'object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  hovered ? 'opacity-100' : 'opacity-0'
                )}
              />
            )}
          </div>

          {/* Voile très léger au hover (si pas de seconde image) */}
          {!secondaryImage && (
            <div
              className={cn(
                'absolute inset-0 bg-encre transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none',
                hovered ? 'opacity-[0.06]' : 'opacity-0'
              )}
            />
          )}
        </div>

        {/* Métadonnées sous l'image */}
        <div className="mt-3 space-y-1">
          <p className="font-mono text-mono-xs uppercase text-encre/55">
            {product.ref}
          </p>

          <h3
            className="piece-name text-encre"
            style={{ fontSize: 'clamp(1.125rem, 1.4vw, 1.375rem)', lineHeight: 1.2 }}
          >
            {t(`products.names.${product.nameKey}`)}
          </h3>

          <p className="font-mono text-mono-xs uppercase text-encre/45">
            {motif.name} · {product.textileYear ?? motif.year}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}
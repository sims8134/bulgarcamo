import Image from 'next/image';
import { IMAGE_SIZES } from '@/lib/imageSizes';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/data/products';
import { motifs } from '@/content/motifs';
import { cn } from '@/lib/cn';
import { PhotoFrame } from '@/components/primitives/PhotoFrame';

interface Props {
  product: Product;
  index: number;
}

export default function PieceCard({ product, index }: Props) {
  const t = useTranslations();

  const motif = motifs[product.motif];
  const primaryImage = product.image!;
  const secondaryImage = product.imageHover ?? product.gallery?.[1] ?? null;
  const name = t(`products.names.${product.nameKey}`);

  const colSpan = product.span === 2 ? 'lg:col-span-8' : 'lg:col-span-4';
  const sizes = product.span === 2 ? IMAGE_SIZES.cardWide : IMAGE_SIZES.card;
  const aspect =
    product.aspect === 'landscape'
      ? 'aspect-[4/3]'
      : product.aspect === 'square'
      ? 'aspect-square'
      : 'aspect-[3/4]';

  return (
    <div className={cn('col-span-2 px-3 sm:px-0', colSpan)}>
      <Link
        href={`/catalogue/${product.id}`}
        className="group block"
        aria-label={`${product.ref} · ${name} · ${motif.name}`}
      >
        <PhotoFrame tilt={index % 2 === 0 ? 'a' : 'b'} boxClassName={aspect}>
          <Image
            src={primaryImage}
            alt=""
            fill
            sizes={sizes}
            className={cn('object-cover', secondaryImage && 'group-hover:opacity-0')}
          />
          {secondaryImage && (
            <Image
              src={secondaryImage}
              alt=""
              fill
              sizes={sizes}
              // Vue de survol : masquée (donc jamais téléchargée) sans souris
              className="hidden [@media(hover:hover)]:block object-cover opacity-0 group-hover:opacity-100"
            />
          )}
        </PhotoFrame>

        <div className="mt-7 space-y-1">
          <p className="label text-accent">{product.ref}</p>
          <h3 className="text-text font-medium group-hover:text-accent" style={{ fontSize: 'clamp(1.0625rem, 1.4vw, 1.3rem)', lineHeight: 1.2 }}>
            {name}
          </h3>
          <p className="label text-text-muted">
            {motif.name} · {product.textileYear ?? motif.year}
          </p>
        </div>
      </Link>
    </div>
  );
}

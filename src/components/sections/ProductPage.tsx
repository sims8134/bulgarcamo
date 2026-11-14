import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/data/products';
import { motifs } from '@/content/motifs';
import { AccentTitle } from '@/components/primitives/AccentTitle';
import { PhotoFrame } from '@/components/primitives/PhotoFrame';

interface Props {
  product: Product;
}

export default function ProductPage({ product }: Props) {
  const t = useTranslations();
  const motif = motifs[product.motif];
  const allImages = product.gallery ?? [product.image!];

  const contactHref = `/contact?ref=${product.ref}&piece=${product.id}`;

  return (
    <article className="relative">
      <div className="container-page pt-10 lg:pt-16 pb-22">
        {/* Fil d'Ariane */}
        <nav aria-label={t('product.breadcrumb_catalogue')} className="mb-12 lg:mb-16 label">
          <Link href="/" className="text-text-muted hover:text-accent">
            {t('product.breadcrumb_home')}
          </Link>
          <span aria-hidden className="mx-3 text-text-muted">/</span>
          <Link href="/#catalogue" className="text-text-muted hover:text-accent">
            {t('product.breadcrumb_catalogue')}
          </Link>
          <span aria-hidden className="mx-3 text-text-muted">/</span>
          <span aria-current="page" className="text-accent">{product.ref}</span>
        </nav>

        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          {/* Galerie */}
          <div className="col-span-12 lg:col-span-7 px-3 sm:px-6 lg:px-4">
            <div className="space-y-16 lg:space-y-20">
              {allImages.map((src, i) => (
                <figure key={src}>
                  <PhotoFrame tilt={i % 2 === 0 ? 'a' : 'b'} boxClassName="aspect-[3/4]">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 90vw, 55vw"
                      priority={i === 0}
                      className="object-cover"
                    />
                  </PhotoFrame>
                </figure>
              ))}
            </div>
          </div>

          {/* Colonne d'information */}
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9 lg:row-start-1">
            <div className="lg:sticky lg:top-24 space-y-10">
              <div className="space-y-6">
                <p className="tag">
                  {product.ref} · {t(`products.categories.${product.category}`)}
                </p>
                <h1 className="heading-md">
                  <AccentTitle text={t(`products.names.${product.nameKey}`)} />
                </h1>
                <p className="label text-text-muted">
                  {motif.name} · {product.textileYear ?? motif.year}
                </p>
              </div>

              {/* Fiche technique */}
              <dl className="grid grid-cols-[7.5rem_1fr] gap-x-4 border-2 border-accent bg-surface font-mono font-bold uppercase tracking-label text-mono-sm">
                <SpecRow label="REF">{product.ref}</SpecRow>
                <SpecRow label="PATTERN">
                  {motif.name}
                  <br />
                  <span lang="bg" className="cyr-name normal-case text-[15px] text-accent">
                    {motif.nameCyrillic}
                  </span>
                </SpecRow>
                <SpecRow label="ORIGIN">{t(motif.eraKey)}</SpecRow>
                <SpecRow label="MADE" last>
                  Sofia · <span lang="bg">София</span>
                </SpecRow>
              </dl>

              {/* Provenance */}
              <div className="space-y-4 pt-8 border-t border-line">
                <p className="eyebrow">{t('product.provenance')}</p>
                <p className="lede">{t(motif.provenanceKey)}</p>
                <p className="prose-narrow">{t(motif.descriptionKey)}</p>
              </div>

              {/* Fabrication */}
              <div className="space-y-4 pt-8 border-t border-line">
                <p className="eyebrow">{t('product.atelier')}</p>
                <p className="prose-narrow">{t('product.atelier_note')}</p>
              </div>

              {/* Édition et disponibilité */}
              <div className="space-y-4 pt-8 border-t border-line">
                <p className="eyebrow">{t('product.availability')}</p>
                <dl className="space-y-2 text-body">
                  <InfoRow label={t('product.edition_label')}>
                    {product.edition
                      ? `${product.edition.current} / ${product.edition.total}`
                      : t('product.edition_default')}
                  </InfoRow>
                  <InfoRow label={t('product.price_label')}>
                    {product.price != null ? `${product.price} €` : t('product.price_value')}
                  </InfoRow>
                  {product.dimensions && (
                    <InfoRow label={t('product.dimensions_label')}>{product.dimensions}</InfoRow>
                  )}
                  <InfoRow label={t('product.lead_time_label')}>
                    {t('product.lead_time_value')}
                  </InfoRow>
                </dl>
                {product.dimensions && (
                  <p className="text-caption text-text-muted">{t('product.dimensions_note')}</p>
                )}
              </div>

              <div className="pt-8 border-t border-line">
                <Link href={contactHref} className="cta">
                  <span>{t('product.cta')}</span>
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page py-14 lg:py-18">
          <Link href="/#catalogue" className="cta">
            <span aria-hidden>←</span>
            <span>{t('product.back_to_catalogue')}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function SpecRow({
  label,
  children,
  last = false,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  const border = last ? '' : 'border-b border-line';
  return (
    <>
      <dt className={`pl-4 py-3 text-accent ${border}`}>{label}</dt>
      <dd className={`pr-4 py-3 text-text ${border}`}>{children}</dd>
    </>
  );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-text-muted">{label}</dt>
      <dd className="text-text text-right">{children}</dd>
    </div>
  );
}

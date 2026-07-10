import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/data/products';
import { motifs } from '@/content/motifs';
import { Reveal } from '@/components/primitives/Reveal';

interface Props {
  product: Product;
}

export default function ProductPage({ product }: Props) {
  const t = useTranslations();
  const motif = motifs[product.motif];
  const allImages = product.gallery ?? [product.image!];

  const contactHref = `/contact?ref=${product.ref}&piece=${product.id}`;

  return (
    <article className="relative bg-ivoire">
      <div className="container-page pt-22 lg:pt-30 pb-30">
        {/* Breadcrumb */}
        <Reveal>
          <nav className="mb-12 lg:mb-16 font-mono text-mono-xs uppercase text-encre/55">
            <Link href="/" className="hover:text-encre transition-colors duration-400">
              {t('product.breadcrumb_home')}
            </Link>
            <span className="mx-3 text-encre/30">/</span>
            <Link href="/#catalogue" className="hover:text-encre transition-colors duration-400">
              {t('product.breadcrumb_catalogue')}
            </Link>
            <span className="mx-3 text-encre/30">/</span>
            <span className="text-encre/70">{product.ref}</span>
          </nav>
        </Reveal>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          {/* COLONNE GAUCHE — Galerie */}
          <div className="col-span-12 lg:col-span-7">
            <div className="space-y-3 lg:space-y-4">
              {allImages.map((src, i) => (
                <Reveal key={src} delay={i === 0 ? 0 : 100}>
                  <figure
                    className="relative aspect-[3/4] overflow-hidden bg-pierre/15"
                    data-cursor="image"
                    style={
                      i === 0
                        ? ({ viewTransitionName: `piece-${product.id}` } as React.CSSProperties)
                        : undefined
                    }
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 56vw"
                      priority={i === 0}
                      className="object-cover"
                    />
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>

          {/* COLONNE DROITE — Sidebar sticky */}
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-24 space-y-12">
              {/* Bloc identité */}
              <Reveal>
                <div className="space-y-4">
                  <p className="font-mono text-mono-xs uppercase text-encre/55">
                    {product.ref} · {t(`products.categories.${product.category}`)}
                  </p>
                  <h1
                    className="font-display italic font-light text-encre tracking-tight"
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1.05 }}
                  >
                    {t(`products.names.${product.nameKey}`)}
                  </h1>
                  <p className="font-mono text-mono-sm uppercase text-encre/70">
                    {motif.name} · {product.textileYear ?? motif.year}
                  </p>
                </div>
              </Reveal>

              {/* Provenance */}
              <Reveal delay={150}>
                <div className="space-y-3 pt-8 border-t border-encre/15">
                  <p className="eyebrow">{t('product.provenance')}</p>
                  <p
                    className="font-display italic text-encre"
                    style={{ fontSize: '1.0625rem', lineHeight: 1.5 }}
                  >
                    {t(motif.provenanceKey)}
                  </p>
                  <p className="text-body text-encre/75">{t(motif.descriptionKey)}</p>
                </div>
              </Reveal>

              {/* Atelier */}
              <Reveal delay={200}>
                <div className="space-y-3 pt-8 border-t border-encre/15">
                  <p className="eyebrow">{t('product.atelier')}</p>
                  <p className="text-body text-encre/75">{t('product.atelier_note')}</p>
                </div>
              </Reveal>

              {/* Édition & disponibilité */}
              <Reveal delay={250}>
                <div className="space-y-4 pt-8 border-t border-encre/15">
                  <p className="eyebrow">{t('product.availability')}</p>
                  <dl className="space-y-2 text-body">
                    <div className="flex justify-between gap-4">
                      <dt className="text-encre/55">{t('product.edition_label')}</dt>
                      <dd className="text-encre text-right">
                        {product.edition
                          ? `${product.edition.current} / ${product.edition.total}`
                          : t('product.edition_default')}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-encre/55">{t('product.price_label')}</dt>
                      <dd className="text-encre text-right">{t('product.price_value')}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-encre/55">{t('product.lead_time_label')}</dt>
                      <dd className="text-encre text-right">{t('product.lead_time_value')}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>

              {/* CTA */}
              <Reveal delay={300}>
                <div className="pt-8 border-t border-encre/15">
                  <Link href={contactHref} className="cta-quiet">
                    <span>{t('product.cta')}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer de page produit — retour catalogue */}
      <div className="border-t border-encre/8">
        <div className="container-page py-16 lg:py-22">
          <Reveal>
            <Link href="/#catalogue" className="cta-quiet">
              <span aria-hidden>←</span>
              <span>{t('product.back_to_catalogue')}</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
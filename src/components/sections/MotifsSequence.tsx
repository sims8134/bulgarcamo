'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motifsList, type Motif } from '@/content/motifs';
import { ACTIVE_MOTIFS } from '@/data/products';
import { Reveal } from '@/components/primitives/Reveal';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';

const motifImages: Record<string, { src: string; alt: string }> = {
  frogskin: {
    src: '/images/products/frogskin-combi-pocket.jpg',
    alt: 'Textile Frogskin, vue rapprochée',
  },
  splinter_1991: {
    src: '/images/products/splinter-1991-multipouch.jpg',
    alt: 'Textile Splinter 1991, vue rapprochée',
  },
  dpm: {
    src: '/images/products/dpm-multipouch.jpg',
    alt: 'Textile Bulgarian DPM, vue rapprochée',
  },
  flecktarn: {
    src: '/images/products/flecktarn-multipouch.jpg',
    alt: 'Textile Flecktarn, vue rapprochée',
  },
};

export default function MotifsSequence() {
  const t = useTranslations();

  // Motifs de la collection en cours, dans l'ordre défini par ACTIVE_MOTIFS
  const activeMotifsList = ACTIVE_MOTIFS
    .map((key) => motifsList.find((m) => m.key === key))
    .filter((m): m is Motif => Boolean(m));

  return (
    <section
      id="motifs"
      className="relative bg-ivoire border-t border-encre/8"
      aria-labelledby="motifs-heading"
    >
      <div className="container-page pt-30 pb-16 lg:pt-38 lg:pb-22">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <Reveal>
              <p className="eyebrow">— {t('motifs_section.eyebrow')}</p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <Reveal delay={150}>
              <h2 id="motifs-heading" className="heading-lg text-encre">
                {t('motifs_section.title')}
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="lede mt-8 max-w-prose-narrow text-encre/80">
                {t('motifs_section.intro')}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div>
        {activeMotifsList.map((motif, index) => (
          <MotifBlock
            key={motif.key}
            motif={motif}
            index={index}
            total={activeMotifsList.length}
          />
        ))}
      </div>
    </section>
  );
}

function MotifBlock({
  motif,
  index,
  total,
}: {
  motif: Motif;
  index: number;
  total: number;
}) {
  const t = useTranslations();
  const image = motifImages[motif.key];
  const isEven = index % 2 === 0;

  const articleRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Parallax watermark — direction selon parité
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          xPercent: isEven ? -10 : 10,
          ease: 'none',
          scrollTrigger: {
            trigger: articleRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Léger parallax sur l'image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: articleRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // SplitText reveal sur le nom du motif
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: 'chars' });
        gsap.set(split.chars, { yPercent: 110, opacity: 0 });

        gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.025,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: articleRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, articleRef);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <article
      ref={articleRef}
      className={`
        relative min-h-[80vh] py-22 lg:py-30 overflow-hidden
        ${index < total - 1 ? 'border-b border-encre/8' : ''}
      `}
    >
      <div
        aria-hidden
        className={`
          absolute inset-y-0 flex items-center pointer-events-none select-none
          ${isEven ? 'right-[-5%]' : 'left-[-5%]'}
        `}
      >
        <span
          ref={watermarkRef}
          className="font-display font-light tracking-tighter leading-none whitespace-nowrap will-change-transform"
          style={{
            fontSize: 'clamp(6rem, 18vw, 16rem)',
            color: 'rgba(26, 26, 24, 0.05)',
          }}
        >
          {motif.nameCyrillic}
        </span>
      </div>

      <div className="container-page relative z-10 h-full flex items-center">
        <div
          className={`
            grid grid-cols-12 gap-x-6 gap-y-12 w-full items-center
            ${isEven ? '' : 'lg:[direction:rtl]'}
          `}
        >
          <div className="col-span-12 lg:col-span-5 space-y-8 lg:[direction:ltr]">
            <Reveal>
              <p className="font-mono text-mono-xs uppercase text-encre/45">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
            </Reveal>

            <div className="space-y-2">
              <h3
                ref={titleRef}
                className="font-display font-light text-encre tracking-tight overflow-hidden"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', lineHeight: 1.05 }}
              >
                {motif.name}
              </h3>
              <Reveal delay={200}>
                <p
                  className="font-display italic text-encre/60"
                  style={{ fontSize: 'clamp(1.125rem, 1.6vw, 1.4rem)' }}
                >
                  {motif.nameCyrillic}
                </p>
              </Reveal>
            </div>

            <Reveal delay={300}>
              <p className="font-mono text-mono-sm uppercase text-encre/70">
                {t(motif.eraKey)}
              </p>
            </Reveal>

            <Reveal delay={400}>
              <p
                className="font-display italic font-light text-encre"
                style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', lineHeight: 1.5 }}
              >
                {t(motif.provenanceKey)}
              </p>
            </Reveal>

            <Reveal delay={500}>
              <p className="text-body text-encre/75 max-w-prose-narrow">
                {t(motif.descriptionKey)}
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:[direction:ltr]">
            <Reveal delay={250}>
              <figure className="relative">
                <div
                  ref={imageRef}
                  className="relative aspect-[3/4] overflow-hidden bg-pierre/20 will-change-transform"
                  data-cursor="image"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between font-mono text-mono-xs uppercase text-encre/55">
                  <span>{motif.name}</span>
                  <span>{motif.year}</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  );
}
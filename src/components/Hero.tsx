'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';

export default function Hero() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // SplitText sur les deux lignes du titre
      const split1 = titleLine1Ref.current
        ? new SplitText(titleLine1Ref.current, { type: 'chars,words' })
        : null;
      const split2 = titleLine2Ref.current
        ? new SplitText(titleLine2Ref.current, { type: 'chars,words' })
        : null;

      // État initial — caché
      if (split1) gsap.set(split1.chars, { yPercent: 110, opacity: 0 });
      if (split2) gsap.set(split2.chars, { yPercent: 110, opacity: 0 });
      gsap.set([eyebrowRef.current, subtitleRef.current, imageRef.current, captionRef.current, metaRef.current], {
        autoAlpha: 0,
        y: 24,
      });

      // Timeline d'entrée — orchestrée
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .to(
          split1?.chars || [],
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.025, ease: 'expo.out' },
          0.15
        )
        .to(
          split2?.chars || [],
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.025, ease: 'expo.out' },
          0.4
        )
        .to(subtitleRef.current, { autoAlpha: 1, y: 0, duration: 1 }, 0.7)
        .to(imageRef.current, { autoAlpha: 1, y: 0, duration: 1.2 }, 0.5)
        .to(captionRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.9)
        .to(metaRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.0);

      // Parallax watermark — scroll plus lent que la page
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Parallax léger sur l'image du hero
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex flex-col overflow-hidden"
    >
      {/* Watermark cyrillique massif — parallax */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          ref={watermarkRef}
          className="font-display font-light tracking-tighter leading-none whitespace-nowrap will-change-transform"
          style={{
            fontSize: 'clamp(4rem, 14vw, 13rem)',
            color: 'rgba(26, 26, 24, 0.05)',
          }}
        >
          БЪЛГАРКАМО
        </span>
      </div>

      {/* Contenu principal */}
      <div className="container-page relative z-10 flex-1 grid grid-cols-12 gap-x-6 gap-y-12 pt-30 lg:pt-38 pb-24">
        {/* Colonne texte */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center space-y-8">
          <p ref={eyebrowRef} className="eyebrow">
            {t('eyebrow')}
          </p>

          <h1 className="heading-xl text-encre">
            <span ref={titleLine1Ref} className="block overflow-hidden">
              {t('title.line1')}
            </span>
            <span
              ref={titleLine2Ref}
              className="block overflow-hidden font-display italic font-light"
            >
              {t('title.line2')}
            </span>
          </h1>

          <p ref={subtitleRef} className="lede max-w-prose-narrow text-encre/80">
            {t('subtitle')}
          </p>
        </div>

        {/* Colonne image — médaillon */}
        <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col justify-center">
         <figure ref={captionRef as React.RefObject<HTMLElement>}>
            <div ref={imageRef} className="relative aspect-[3/4] overflow-hidden bg-pierre/30 will-change-transform">
              <Image
                src="/images/products/flecktarn-multipouch.jpg"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between font-mono text-mono-xs uppercase text-encre/55">
              <span>D.03 · {t('imageCaption')}</span>
              <span>1991</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Métadonnées en bas */}
      <div className="container-page relative z-10 pb-8">
        <div ref={metaRef} className="flex items-end justify-between border-t border-encre/15 pt-4 gap-4 flex-wrap">
          <div className="flex gap-x-8 gap-y-1 font-mono text-mono-xs uppercase text-encre/60 flex-wrap">
            <span>{t('meta.edition')}</span>
            <span>{t('meta.location')}</span>
            <span>{t('meta.pieces')}</span>
          </div>
          <a href="#manifest" className="cta-quiet">
            <span>{t('cta')}</span>
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
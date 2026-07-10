'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';

export default function Manifest() {
  const t = useTranslations('manifest');
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const sigRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // SplitText par mots (par chars sur un long body = trop)
      const split = bodyRef.current
        ? new SplitText(bodyRef.current, { type: 'words,lines', linesClass: 'split-line' })
        : null;

      // État initial — caché
      if (split) gsap.set(split.words, { yPercent: 60, opacity: 0 });
      gsap.set([eyebrowRef.current, sigRef.current], { autoAlpha: 0, y: 16 });

      // Timeline déclenchée au scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .to(
          split?.words || [],
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.012,
            ease: 'expo.out',
          },
          0.2
        )
        .to(sigRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifest"
      className="container-page section-y-lg border-t border-encre/8"
    >
      <div className="grid grid-cols-12 gap-6">
        {/* Eyebrow — colonne étroite à gauche */}
        <div className="col-span-12 md:col-span-2">
          <p ref={eyebrowRef} className="eyebrow">
            — {t('eyebrow')}
          </p>
        </div>

        {/* Corps — colonne large décalée */}
        <div className="col-span-12 md:col-span-9 md:col-start-4 space-y-10">
          <p
            ref={bodyRef}
            className="font-display italic font-light text-encre leading-[1.25] tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)' }}
          >
            {t('body')}
          </p>

          <p ref={sigRef} className="font-mono text-mono-xs uppercase text-encre/55">
            {t('signature')}
          </p>
        </div>
      </div>
    </section>
  );
}
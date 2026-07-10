'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

export default function Cursor() {
  const t = useTranslations('cursor');
  const cursorRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<'default' | 'link' | 'image'>('default');

  useEffect(() => {
    // Désactivé sur tactile / sans souris fine
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // QuickTo de GSAP — perf optimale, smoothing natif
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3.out' });

    function setState(state: 'default' | 'link' | 'image') {
      if (state === stateRef.current) return;
      stateRef.current = state;
      if (cursor) cursor.dataset.state = state;
    }

    function onMouseMove(e: MouseEvent) {
      xTo(e.clientX);
      yTo(e.clientY);
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      const cursorAttr = cursorEl?.getAttribute('data-cursor');

      if (cursorAttr === 'image') {
        setState('image');
      } else if (
        cursorAttr === 'link' ||
        target.closest('a, button, [role="button"], label, input, textarea')
      ) {
        setState('link');
      } else {
        setState('default');
      }
    }

    // Active le mode curseur custom sur tout le doc
    document.documentElement.classList.add('has-custom-cursor');

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    // Position initiale au centre — évite le saut au premier mouvement
    xTo(window.innerWidth / 2);
    yTo(window.innerHeight / 2);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden
      data-state="default"
      className="cursor-custom"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform, width, height',
      }}
    >
      <span className="cursor-label font-mono text-[10px] uppercase tracking-wider">
        {t('view')}
      </span>
    </div>
  );
}
'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register plugins une seule fois côté client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Defaults globaux pour cohérence
  gsap.defaults({
    ease: 'expo.out',
    duration: 1.2,
  });
}

export { gsap, ScrollTrigger, SplitText };
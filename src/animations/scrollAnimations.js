import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations(scope) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('[data-reveal]').forEach((element) => {
          gsap.fromTo(element, { y: 36, autoAlpha: 0 }, {
            y: 0, autoAlpha: 1, duration: .85, ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 94%', once: true },
          });
        });
        gsap.utils.toArray('[data-parallax]').forEach((element) => {
          gsap.fromTo(element, { yPercent: -5 }, { yPercent: 5, ease: 'none',
            scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      }, scope);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [scope]);
}

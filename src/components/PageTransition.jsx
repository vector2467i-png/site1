import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function PageTransition({ children }) {
  const location = useLocation();
  const curtain = useRef(null);
  const stage = useRef(null);
  const first = useRef(true);
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(curtain.current.children, { scaleY: 1 }, { scaleY: 0, transformOrigin: 'top', stagger: .055, duration: .55, ease: 'power3.inOut' });
      gsap.fromTo(stage.current, { y: 20, opacity: .3 }, { y: 0, opacity: 1, delay: .18, duration: .65, ease: 'power2.out' });
    });
    return () => ctx.revert();
  }, [location.pathname]);
  return <><div ref={curtain} className="page-curtain" aria-hidden="true">{[0,1,2,3].map(i => <span key={i} />)}</div><div ref={stage}>{children}</div></>;
}

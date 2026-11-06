import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Search, ShoppingBag, X, Menu, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useCart } from '../context/CartContext.jsx';

export const Brand = () => <span className="brand"><span className="brand-emblem" aria-hidden="true">K<ArrowUpRight aria-hidden="true"/></span><span>KURO<span className="brand-sub">DISTRICT</span></span><sup>®</sup></span>;
export default function Header() {
  const { cartCount, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const panel = useRef(null);
  const searchInput = useRef(null);
  const menuButton = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 36); onScroll(); window.addEventListener('scroll',onScroll,{passive:true}); return () => window.removeEventListener('scroll',onScroll); }, []);
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location]);
  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const listener = e => {
      if (e.key === 'Escape') { setMenuOpen(false); setSearchOpen(false); menuButton.current?.focus(); }
      if (e.key === 'Tab' && panel.current) {
        const nodes = [...panel.current.querySelectorAll('a,button,input')].filter(el => !el.disabled);
        const first = nodes[0], last = nodes.at(-1);
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown',listener);
    if (searchOpen) searchInput.current?.focus(); else panel.current?.querySelector('button')?.focus();
    const ctx = gsap.context(() => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.fromTo(panel.current,{y:-20,opacity:0},{y:0,opacity:1,duration:.4}); });
    return () => { document.body.style.overflow = old; document.removeEventListener('keydown',listener); ctx.revert(); };
  }, [menuOpen,searchOpen]);
  const links = [['/','Home'],['/collections','Collection'],['/about','About'],['/contact','Contact']];
  return <>
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <Link className="logo-link" to="/" aria-label="Kuro District home"><Brand /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([path,title]) => <NavLink to={path} end={path==='/'} key={path}>{title}<span className="nav-dot" /></NavLink>)}</nav>
      <div className="header-actions"><span className="header-coordinate">TOKYO INSPIRED / WORLDWIDE</span><button aria-label="Search collection" onClick={() => { setMenuOpen(false); setSearchOpen(true); }}><Search size={19} strokeWidth={1.5}/></button><button className="cart-toggle" aria-label={`Open shopping bag, ${cartCount} items`} onClick={() => setIsOpen(true)}><ShoppingBag size={19} strokeWidth={1.5}/><span>{String(cartCount).padStart(2,'0')}</span></button><button ref={menuButton} className="mobile-menu-button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => {setSearchOpen(false);setMenuOpen(true);}}><Menu size={23}/></button></div>
    </header>
    {(menuOpen || searchOpen) && <div className="navigation-overlay" ref={panel} role="dialog" aria-modal="true" aria-label={searchOpen?'Search collection':'Navigation'}>
      <div className="overlay-top"><Brand/><button aria-label="Close navigation" onClick={() => {setMenuOpen(false);setSearchOpen(false);menuButton.current?.focus();}}><X size={28}/></button></div>
      {searchOpen ? <form className="search-form" onSubmit={e=>{e.preventDefault();navigate(`/collections?q=${encodeURIComponent(query.trim())}`);}}><label className="eyebrow" htmlFor="global-search">FIND YOUR NEXT UNIFORM</label><div><input ref={searchInput} id="global-search" placeholder="Search the district…" value={query} onChange={e=>setQuery(e.target.value)} maxLength={80}/><button aria-label="Submit search"><ArrowRight size={32}/></button></div><p>Try “hoodie”, “tee”, or “void”.</p></form> : <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(([path,title],i)=><NavLink key={path} to={path}><span>0{i+1}</span>{title}<ArrowUpRight/></NavLink>)}</nav>}
      <div className="overlay-bottom eyebrow">NO DAYLIGHT REQUIRED. <span>KURO DISTRICT — EST. 2026</span></div>
    </div>}
  </>;
}

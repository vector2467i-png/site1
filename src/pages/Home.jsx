import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, MoveRight, Plus, Asterisk } from 'lucide-react';
import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import { useScrollAnimations } from '../animations/scrollAnimations.js';

export default function Home() {
  const scope = useRef(null);
  useScrollAnimations(scope);
  return <div ref={scope} className="home">
    <section className="hero">
      <img className="hero-city" src="/images/city-night.svg" alt="Original illustrated city skyline under a crimson night sky" fetchPriority="high"/>
      <div className="hero-shade"/>
      <div className="hero-topline eyebrow"><span><i className="status-dot"/> INDEPENDENT STREETWEAR / EST. 2026</span><span>35°40′N 139°42′E — CREATIVE COORDINATES</span></div>
      <div className="hero-copy"><div className="hero-kicker eyebrow"><span className="small-cross">+</span> FOR THE ONES WHO NEVER FIT IN.</div><h1>WEAR THE<br/><span>AFTERHOURS.</span></h1><div className="hero-intro"><span className="hero-number">01—</span><p>Built for the streets. Inspired by another world.<br/>An independent uniform for life after dark.</p></div><Link className="button hero-cta" to="/collections">ENTER THE COLLECTION <ArrowUpRight size={21}/></Link></div>
      <div className="hero-garment"><div className="hero-orbit"/><span className="hero-vertical">夜のために — FOR THE NIGHT</span><img src="/images/hero-tee.svg" alt="Void oversized tee — replaceable concept garment illustration"/><div className="hero-product-label"><span><i className="status-dot"/> CONCEPT 001 / VOID TEE</span><Link to="/products/void-oversized-tee" aria-label="View Void tee"><Plus size={18}/></Link></div></div>
      <div className="hero-bottom"><a href="#latest-drop" className="scroll-cue"><ArrowDown size={18}/><span>SCROLL TO EXPLORE</span></a><span className="hero-world">WORLD 001 <b>[ AFTER DARK ]</b></span><span className="hero-sidecode">KD—001 / 2026<br/>ART DIRECTION: ORIGINAL</span></div>
    </section>
    <div className="manifesto-strip" aria-label="Independent by design. Made for the afterhours."><span>INDEPENDENT BY DESIGN</span><Asterisk className="strip-star" aria-hidden="true"/><span>MADE FOR THE AFTERHOURS</span><Asterisk className="strip-star" aria-hidden="true"/><span>NO DAYLIGHT REQUIRED</span><Asterisk className="strip-star" aria-hidden="true"/></div>
    <section id="latest-drop" className="latest-drop section-padding">
      <div className="section-heading" data-reveal><div><span className="eyebrow"><span className="red-text">[ 01 ]</span> THE NEW UNIFORM</span><h2>LATEST <span className="outline-text">DROP.</span></h2></div><div className="section-aside"><p>Heavy silhouettes. Quiet rebellion.<br/>Explore the first concept collection.</p><Link className="text-link" to="/collections">VIEW ALL PIECES <ArrowUpRight size={18}/></Link></div></div>
      <div className="home-product-grid">{products.slice(0,3).map((product,i)=><div key={product.id} data-reveal className={i===1?'offset-product':''}><ProductCard product={product}/></div>)}</div>
      <div className="collection-note eyebrow"><span>ILLUSTRATED SAMPLES / YOUR PRODUCTS COMING NEXT</span><span>DESIGNED TO STAND APART. 001—006</span></div>
    </section>
    <section className="campaign"><div className="campaign-art"><img src="/images/editorial.svg" alt="Original graphic campaign featuring a hooded silhouette in a red-lit city" loading="lazy" data-parallax/><span className="campaign-photo-caption eyebrow">KURO JOURNAL / VISUAL STUDY 001</span><span className="campaign-jp" lang="ja">自分の道を</span></div><div className="campaign-copy" data-reveal><span className="eyebrow">[ 02 ] MORE THAN WHAT YOU WEAR</span><h2>NOT FOR<br/>EVERYONE.<br/><span className="red-text">FOR YOU.</span></h2><p>Some worlds are inherited. Others are built. KURO DISTRICT lives between late-night city streets, graphic storytelling, and the freedom to be whoever you are.</p><p>We’re creating a place for the ones who take their own route. The clothing is just the beginning.</p><Link to="/about" className="text-link">BEHIND THE DISTRICT <ArrowUpRight size={19}/></Link><div className="campaign-stamp">KURO<br/><span>INDEPENDENT EXPRESSION</span></div></div></section>
    <section className="category-section section-padding"><div className="section-heading" data-reveal><div><span className="eyebrow">[ 03 ] FIND YOUR FREQUENCY</span><h2>CHOOSE YOUR <span className="outline-text">SIDE.</span></h2></div><span className="eyebrow">TWO SILHOUETTES. ONE MINDSET.</span></div><div className="category-grid"><Link to="/collections?category=Hoodies" className="category-tile" data-reveal><img src="/images/signal-hoodie.svg" alt="Concept hoodie silhouette" loading="lazy"/><div className="category-caption"><span className="eyebrow">01 / HEAVYWEIGHT ENERGY</span><h3>HOODIES <ArrowUpRight/></h3><span>FIND YOUR LAYER</span></div><span className="category-index">01</span></Link><Link to="/collections?category=T-shirts" className="category-tile light-tile" data-reveal><img src="/images/district-tee.svg" alt="Concept graphic tee silhouette" loading="lazy"/><div className="category-caption"><span className="eyebrow">02 / A CANVAS FOR EXPRESSION</span><h3>GRAPHIC TEES <ArrowUpRight/></h3><span>MAKE YOUR STATEMENT</span></div><span className="category-index">02</span></Link></div></section>
    <section className="limited-section" data-reveal><span className="eyebrow">ARCHIVE 001 / LIMITED EDITION CONCEPT</span><h2>WHEN IT’S GONE.<br/><span>IT’S A MEMORY.</span></h2><div><p>Small-run thinking. Lasting impressions.<br/>Explore the Afterhours concept capsule.</p><Link to="/products/afterhours-hoodie" className="button button-light">EXPLORE AFTERHOURS <MoveRight size={20}/></Link></div><span className="limited-outline" aria-hidden="true">001</span></section>
    <div className="endnote eyebrow"><span className="status-dot"/> THIS IS JUST THE BEGINNING. WELCOME TO THE DISTRICT.</div>
  </div>;
}

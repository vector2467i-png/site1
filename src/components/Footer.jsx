import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import Newsletter from './Newsletter.jsx';
export default function Footer() {
  return <footer className="footer">
    <div className="footer-top"><div><span className="eyebrow"><i className="status-dot"/> TRANSMISSIONS FROM THE DISTRICT</span><h2>STAY IN THE LOOP.<br/><span>OUT OF THE ORDINARY.</span></h2></div><Newsletter idPrefix="footer" /></div>
    <div className="footer-links"><Link to="/collections">Shop the collection <ArrowUpRight size={16}/></Link><Link to="/about">Our story <ArrowUpRight size={16}/></Link><Link to="/contact">Get in touch <ArrowUpRight size={16}/></Link><Link to="/intro">Replay the intro <ArrowUpRight size={16}/></Link><button onClick={() => window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>Back to top <ArrowUp size={16}/></button></div>
    <div className="footer-wordmark" aria-label="Kuro District">KURO<ArrowUpRight aria-hidden="true"/>DISTRICT</div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} KURO DISTRICT</span><span>黒 — BLACK. A BLANK CANVAS FOR EXPRESSION.</span><span>CONCEPT STORE / SAMPLE PRODUCTS / NO LIVE CHECKOUT</span></div>
  </footer>;
}

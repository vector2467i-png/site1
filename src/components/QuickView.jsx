import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X } from 'lucide-react';
import ProductOptions from './ProductOptions';
import { formatPrice } from '../data/products';

export default function QuickView({ product, onClose }) {
  const modal = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.current?.querySelector('button')?.focus();
    const keydown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const controls = [...modal.current.querySelectorAll('button:not(:disabled), a[href], input, select, textarea, [tabindex="0"]')];
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keydown); if (previous?.isConnected) previous.focus(); };
  }, [onClose]);
  return <div className="commerce-modal-backdrop" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="commerce-quick-modal" ref={modal} role="dialog" aria-modal="true" aria-labelledby="quick-view-name">
      <button className="commerce-modal-close" onClick={onClose} aria-label="Close quick view"><X size={22} /></button>
      <div className="commerce-quick-image"><img src={product.images[0]} alt={`${product.name} concept illustration`} /><span>CONCEPT GARMENT / SAMPLE IMAGE</span></div>
      <div className="commerce-quick-content"><p className="eyebrow">{product.category} / DROP 001</p><h2 id="quick-view-name">{product.name}</h2><p className="commerce-detail-price">{formatPrice(product.price)}</p><p className="commerce-detail-description">{product.description}</p><ProductOptions key={product.id} product={product} onAdded={onClose} /><Link className="commerce-detail-link" to={`/products/${product.slug}`} onClick={onClose}>EXPLORE THE PIECE <ArrowUpRight size={16} /></Link></div>
    </div>
  </div>;
}

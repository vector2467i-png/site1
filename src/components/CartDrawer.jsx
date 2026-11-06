import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function CartDrawer() {
  const { items, cartCount, subtotal, isOpen, setIsOpen, updateQuantity, removeItem, clearCart } = useCart();
  const [preview, setPreview] = useState(false);
  const dialog = useRef(null);
  const closeButton = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setPreview(false);
      return undefined;
    }
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    function onKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key !== 'Tab') return;
      const focusable = [...(dialog.current?.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]') || [])];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="commerce-cart-backdrop" onClick={() => setIsOpen(false)}>
      <aside className="commerce-cart" role="dialog" aria-modal="true" aria-labelledby="bag-title" ref={dialog} onClick={(event) => event.stopPropagation()}>
        <header className="commerce-cart-header">
          <div><span className="eyebrow">YOUR PERSONAL ARCHIVE</span><h2 id="bag-title">Shopping bag <span>({cartCount})</span></h2></div>
          <button type="button" className="commerce-cart-close" aria-label="Close shopping bag" ref={closeButton} onClick={() => setIsOpen(false)}><X size={23} /></button>
        </header>

        {!items.length ? (
          <div className="commerce-cart-empty">
            <ShoppingBag size={48} strokeWidth={1} aria-hidden="true" />
            <h3>A blank canvas.</h3>
            <p>Your next uniform is out there. Explore the collection and make it yours.</p>
            <Link to="/collections" className="button" onClick={() => setIsOpen(false)}>Explore the collection <ArrowRight size={17} /></Link>
          </div>
        ) : preview ? (
          <div className="commerce-checkout-preview">
            <span className="eyebrow">ORDER PREVIEW / SAMPLE COLLECTION</span>
            <h3>Before the real drop.</h3>
            <p>Demo checkout — no payment is collected and no order is placed.</p>
            <p>These are concept garments. Live products, shipping, and a secure payment provider will be connected before launch.</p>
            <ul>{items.map((item) => <li key={item.key}><span>{item.quantity} × {item.product.name}<small>{item.color} / {item.size}</small></span><strong>{formatPrice(item.product.price * item.quantity)}</strong></li>)}</ul>
            <div className="commerce-cart-total"><span>Sample subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <p className="commerce-cart-note">All prices are sample prices in USD. Shipping and taxes are not calculated.</p>
            <button type="button" className="button button-outline" onClick={() => setPreview(false)}>Return to bag</button>
          </div>
        ) : (
          <>
            <div className="commerce-cart-items">
              {items.map((item) => (
                <article className="commerce-cart-item" key={item.key}>
                  <Link className="commerce-cart-item-image" to={`/products/${item.product.slug}`} onClick={() => setIsOpen(false)}><img src={item.product.images[0]} alt={`${item.product.name} sample garment illustration`} /></Link>
                  <div className="commerce-cart-item-info">
                    <div className="commerce-cart-item-top"><Link to={`/products/${item.product.slug}`} onClick={() => setIsOpen(false)}>{item.product.name}</Link><strong>{formatPrice(item.product.price * item.quantity)}</strong></div>
                    <p>{item.color} / {item.size}</p>
                    <span className="commerce-cart-note">CONCEPT SAMPLE</span>
                    <div className="commerce-cart-item-actions">
                      <div className="commerce-cart-quantity" aria-label={`Quantity for ${item.product.name}`}>
                        <button type="button" aria-label={`Decrease quantity of ${item.product.name}`} disabled={item.quantity <= 1} onClick={() => updateQuantity(item.key, item.quantity - 1)}><Minus size={14} /></button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button type="button" aria-label={`Increase quantity of ${item.product.name}`} disabled={item.quantity >= 10} onClick={() => updateQuantity(item.key, item.quantity + 1)}><Plus size={14} /></button>
                      </div>
                      <button type="button" className="commerce-cart-remove" aria-label={`Remove ${item.product.name} from bag`} onClick={() => removeItem(item.key)}><Trash2 size={16} /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <footer className="commerce-cart-footer">
              <div className="commerce-cart-total"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <p className="commerce-cart-note">Sample prices in USD. Shipping and taxes are not calculated.</p>
              <button type="button" className="button" onClick={() => setPreview(true)}>Preview checkout <ArrowRight size={18} /></button>
              <p className="commerce-cart-note">Demo store. No payment or order will be processed.</p>
              <button type="button" className="commerce-cart-clear" onClick={clearCart}>Clear bag</button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

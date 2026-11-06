import { useState } from 'react';
import { Check, Minus, Plus, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function ProductOptions({ product, onAdded }) {
  const [size, setSize] = useState('');
  const [color, setColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [showSizes, setShowSizes] = useState(false);
  const { addItem } = useCart();

  function addToBag() {
    if (!size) return;
    addItem(product, size, color, quantity);
    onAdded?.();
  }

  return (
    <div className="commerce-product-options">
      <div className="commerce-option-heading"><span>COLOR — {color.toUpperCase()}</span></div>
      <div className="commerce-colors">{product.colors.map((option) => <button key={option.name} className={color === option.name ? 'selected' : ''} style={{ '--swatch': option.value }} onClick={() => setColor(option.name)} aria-label={`Color ${option.name}`} aria-pressed={color === option.name}><Check size={13} /></button>)}</div>
      <div className="commerce-option-heading"><span>SELECT SIZE {size && `— ${size}`}</span><button className="commerce-text-button" onClick={() => setShowSizes(!showSizes)} aria-expanded={showSizes}>SIZE GUIDE</button></div>
      {showSizes && <div className="commerce-size-guide"><p>Concept sizing guide · chest width measured flat</p><table><thead><tr><th>Size</th><th>S</th><th>M</th><th>L</th><th>XL</th></tr></thead><tbody><tr><th>Width (cm)</th><td>56</td><td>59</td><td>62</td><td>65</td></tr></tbody></table><p>Illustrative measurements. Replace with the final garment specification before launch.</p></div>}
      <div className="commerce-sizes">{product.sizes.map((option) => <button key={option} onClick={() => setSize(option)} aria-pressed={size === option} className={size === option ? 'selected' : ''}>{option}</button>)}</div>
      <div className="commerce-buy-row"><div className="commerce-quantity" aria-label="Quantity"><button aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button><output aria-label="Selected quantity">{quantity}</output><button aria-label="Increase quantity" disabled={quantity === 10} onClick={() => setQuantity(Math.min(10, quantity + 1))}><Plus size={14} /></button></div><button className="button commerce-add-button" onClick={addToBag} disabled={!size}>{size ? `ADD TO BAG — ${formatPrice(product.price * quantity)}` : 'SELECT A SIZE'}<ArrowUpRight size={18} /></button></div>
      <p className="commerce-purchase-note">Sample product · available to explore in the demo bag. Payments and live inventory are not connected.</p>
    </div>
  );
}

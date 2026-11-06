import { ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products';

export default function ProductCard({ product, onQuickView }) {
  return (
    <article className="commerce-product-card">
      <div className="commerce-product-visual">
        <Link to={`/products/${product.slug}`} className="commerce-product-image-link" aria-label={`View ${product.name}`}>
          <img src={product.images[0]} alt={`${product.name}, ${product.colors[0].name} concept illustration`} loading="lazy" width="640" height="760" />
          {product.images[1] && <img className="commerce-product-image-alt" src={product.images[1]} alt="" loading="lazy" width="640" height="760" />}
        </Link>
        <span className="commerce-product-tag">{product.badge}</span>
        <span className="commerce-product-sample">CONCEPT GARMENT</span>
        {onQuickView && <button className="commerce-quick-button" onClick={() => onQuickView(product)} aria-label={`Quick view ${product.name}`}><Plus size={15} /> QUICK VIEW</button>}
      </div>
      <div className="commerce-product-info">
        <div><span className="commerce-product-category">{product.category} / {product.colors[0].name}</span><Link to={`/products/${product.slug}`}><h3>{product.name}</h3></Link></div>
        <span className="commerce-product-price">{formatPrice(product.price)} <ArrowUpRight size={14} /></span>
      </div>
    </article>
  );
}

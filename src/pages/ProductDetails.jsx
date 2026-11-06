import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Plus } from 'lucide-react';
import { products, formatPrice } from '../data/products';
import ProductOptions from '../components/ProductOptions';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => { setImageIndex(0); }, [slug]);
  if (!product) return <div className="page-shell commerce-not-found"><p className="eyebrow">SIGNAL LOST / 404</p><h1>PIECE NOT FOUND.</h1><p>This piece is not in the current archive.</p><Link to="/collections" className="button">EXPLORE THE COLLECTION <ArrowUpRight size={18} /></Link></div>;
  const related = products.filter((item) => item.id !== product.id).slice(0, 3);
  return <div className="page-shell commerce-detail-page">
    <div className="commerce-breadcrumb"><Link to="/collections"><ArrowLeft size={14} /> THE COLLECTION</Link><span>DROP 001 / {product.category.toUpperCase()}</span></div>
    <section className="commerce-detail-layout">
      <div className="commerce-gallery"><div className="commerce-gallery-main"><img src={product.images[Math.min(imageIndex, product.images.length - 1)]} alt={`${product.name} ${imageIndex === 0 ? 'front' : 'back'} concept illustration`} /><span className="commerce-product-tag">{product.badge}</span><span className="commerce-gallery-caption">ORIGINAL CONCEPT ILLUSTRATION / REPLACEABLE SAMPLE</span></div><div className="commerce-thumbnails">{product.images.map((src, index) => <button key={src} className={index === imageIndex ? 'active' : ''} onClick={() => setImageIndex(index)} aria-label={`Show ${index === 0 ? 'front' : 'back'} view`} aria-pressed={index === imageIndex}><img src={src} alt="" /></button>)}<p>ILLUSTRATED SAMPLE<br />Actual product photography coming from you.</p></div></div>
      <div className="commerce-detail-content"><p className="eyebrow">KURO DISTRICT / {product.id.replaceAll('-', ' ').toUpperCase()}</p><h1>{product.name}</h1><div className="commerce-detail-price-row"><p className="commerce-detail-price">{formatPrice(product.price)}</p><span>USD / SAMPLE PRICE</span></div><p className="commerce-detail-description">{product.description}</p><div className="commerce-material-meta"><span>{product.material}</span><span>{product.fit}</span></div><ProductOptions key={product.id} product={product} /><div className="commerce-details-accordions"><details open><summary>THE DETAILS <Plus size={14} /></summary><ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></details><details><summary>CARE & FIT <Plus size={14} /></summary><p>Concept care guidance: wash cold inside out, reshape and air dry. Final care instructions and sizing must follow the supplied garment label.</p></details><details><summary>SHIPPING & RETURNS <Plus size={14} /></summary><p>This is a sample storefront. Shipping rates, delivery regions, and return policies have not been configured. No purchase or payment can be completed here.</p></details></div></div>
    </section>
    <section className="commerce-related"><div className="section-heading"><div><p className="eyebrow">KEEP YOUR FREQUENCY</p><h2>IN GOOD COMPANY.</h2></div><Link to="/collections">ALL PIECES <ArrowUpRight size={16} /></Link></div><div className="commerce-product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>
  </div>;
}

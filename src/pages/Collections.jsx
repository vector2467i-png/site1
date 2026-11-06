import { useCallback, useMemo, useState } from 'react';
import { Search, X, ArrowDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { categories, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';

export default function Collections() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const category = categories.includes(params.get('category')) ? params.get('category') : 'All pieces';
  const sort = params.get('sort') || 'featured';
  const [quickProduct, setQuickProduct] = useState(null);
  const closeQuickView = useCallback(() => setQuickProduct(null), []);
  const setFilter = (key, value) => { const next = new URLSearchParams(params); if (value && value !== 'All pieces' && value !== 'featured') next.set(key, value); else next.delete(key); setParams(next, { replace: true }); };
  const result = useMemo(() => {
    const filtered = products.filter((product) => (category === 'All pieces' || product.category === category) && `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query.toLowerCase().trim()));
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [query, category, sort]);

  return <div className="page-shell commerce-collection-page">
    <header className="commerce-collection-header"><p className="eyebrow">KURO DISTRICT / THE ARCHIVE / 001</p><div><h1>THE<br /><span>COLLECTION.</span></h1><p>Uniforms for a world that never sleeps.<br />Six original concepts. One point of view.<span>Explore sample garments. Your actual products will replace this catalog.</span></p></div><div className="commerce-header-baseline"><span>DROP 001 — AFTERHOURS</span><span>SCROLL TO EXPLORE <ArrowDown size={12} /></span></div></header>
    <section className="commerce-catalog" aria-label="Browse products">
      <div className="commerce-filter-bar"><div className="commerce-categories" aria-label="Product categories">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setFilter('category', item)}>{item}<span>{item === 'All pieces' ? products.length : products.filter((product) => product.category === item).length}</span></button>)}</div><div className="commerce-filter-tools"><div className="commerce-search"><Search size={16} /><input aria-label="Search products" placeholder="Find your frequency" value={query} onChange={(event) => setFilter('q', event.target.value)} />{query && <button onClick={() => setFilter('q', '')} aria-label="Clear search"><X size={14} /></button>}</div><select aria-label="Sort products" value={sort} onChange={(event) => setFilter('sort', event.target.value)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A–Z</option></select></div></div>
      <div className="commerce-results-line"><span aria-live="polite">{result.length} {result.length === 1 ? 'PIECE' : 'PIECES'}{category !== 'All pieces' ? ` / ${category.toUpperCase()}` : ''}</span><span>CONCEPT CATALOG / PRICES IN USD</span></div>
      {result.length ? <div className="commerce-product-grid">{result.map((product) => <ProductCard key={product.id} product={product} onQuickView={setQuickProduct} />)}</div> : <div className="commerce-no-results"><span>NO SIGNAL.</span><p>No pieces match this search. Try another word or explore the complete collection.</p><button className="button button-outline" onClick={() => setParams({})}>RESET FILTERS</button></div>}
    </section>
    <div className="commerce-catalog-note"><span>NOT MADE TO FIT IN.</span><p>All garments shown are original concept illustrations. Final products, materials, pricing, and availability will be supplied by the brand.</p></div>
    {quickProduct && <QuickView product={quickProduct} onClose={closeQuickView} />}
  </div>;
}

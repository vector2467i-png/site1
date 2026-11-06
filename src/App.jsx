import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Preloader from './components/Preloader.jsx';
import PageTransition from './components/PageTransition.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Home from './pages/Home.jsx';
import Collections from './pages/Collections.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const location = useLocation();
  useEffect(() => {
    const title = location.pathname.startsWith('/products/') ? 'The piece' : ({'/': 'Wear the afterhours.', '/intro': 'Enter the district', '/collections': 'The collection', '/about': 'Our story', '/contact': 'Get in touch'}[location.pathname] || 'Signal lost');
    document.title = `${title} — KURO DISTRICT`;
  }, [location.pathname]);
  return <CartProvider>
    <div id="site-content">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />
    <PageTransition>
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intro" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collection" element={<Navigate to="/collections" replace />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </PageTransition>
    <CartDrawer />
    </div>
    <Preloader key={location.pathname === '/intro' ? location.key : 'initial'} replay={location.pathname === '/intro'} />
  </CartProvider>;
}

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';

const CartContext = createContext(null);
const STORAGE_KEY = 'kuro-district-bag-v1';
const clampQuantity = (value) => Math.min(10, Math.max(1, Math.floor(Number(value) || 1)));
const variantKey = (id, size, color) => `${id}:${size}:${color}`;

function readBag() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(stored)) return [];
    const restored = new Map();
    for (const item of stored.slice(0, 100)) {
      if (!item || typeof item !== 'object') continue;
      const product = products.find((entry) => entry.id === item.productId);
      if (!product || !product.sizes.includes(item.size)) continue;
      if (!product.colors.some((entry) => entry.name === item.color)) continue;
      const key = variantKey(product.id, item.size, item.color);
      const previous = restored.get(key);
      restored.set(key, {
        key, product, size: item.size, color: item.color,
        quantity: clampQuantity((previous?.quantity || 0) + clampQuantity(item.quantity)),
      });
    }
    return [...restored.values()];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readBag);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map((item) => ({
        productId: item.product.id, size: item.size, color: item.color, quantity: item.quantity,
      }))));
    } catch {
      // The bag remains usable in memory when browser storage is unavailable.
    }
  }, [items]);

  function addItem(product, size, color, quantity = 1) {
    const canonical = products.find((entry) => entry.id === product?.id);
    if (!canonical || !canonical.sizes.includes(size)) return false;
    const colorName = typeof color === 'string' ? color : color?.name;
    if (!canonical.colors.some((entry) => entry.name === colorName)) return false;
    const key = variantKey(canonical.id, size, colorName);
    setItems((previous) => {
      const found = previous.find((item) => item.key === key);
      if (found) return previous.map((item) => item.key === key
        ? { ...item, quantity: clampQuantity(item.quantity + clampQuantity(quantity)) } : item);
      return [...previous, { key, product: canonical, size, color: colorName, quantity: clampQuantity(quantity) }];
    });
    setIsOpen(true);
    return true;
  }

  function updateQuantity(key, quantity) {
    setItems((previous) => previous.map((item) => item.key === key
      ? { ...item, quantity: clampQuantity(quantity) } : item));
  }

  const value = useMemo(() => ({
    items,
    cartCount: items.reduce((count, item) => count + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    isOpen,
    setIsOpen,
    addItem,
    updateQuantity,
    removeItem: (key) => setItems((previous) => previous.filter((item) => item.key !== key)),
    clearCart: () => setItems([]),
  }), [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider.');
  return context;
}

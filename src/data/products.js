// Replace this concept catalog with your products and licensed product photography.
// Every item is sample data. No inventory or payment service is connected.
export const products = [
  {
    id: 'void-tee', slug: 'void-oversized-tee', name: 'VOID OVERSIZED TEE', category: 'T-shirts', price: 48,
    images: ['/images/void-tee.svg', '/images/void-tee-back.svg'],
    colors: [{ name: 'Washed black', value: '#252423' }], sizes: ['S', 'M', 'L', 'XL'],
    badge: 'DROP 001', material: '240 GSM heavyweight cotton', fit: 'Boxy, oversized fit',
    description: 'A quiet silhouette with a loud point of view. A heavyweight, dropped-shoulder tee with an original back graphic inspired by the city after midnight.',
    details: ['Dropped shoulders and a wide, boxy body', 'Ribbed crew neck', 'Original KURO DISTRICT graphic', 'Unisex sizing; choose your usual size for an oversized fit'],
  },
  {
    id: 'signal-hoodie', slug: 'signal-heavyweight-hoodie', name: 'SIGNAL HEAVYWEIGHT HOODIE', category: 'Hoodies', price: 96,
    images: ['/images/signal-hoodie.svg', '/images/signal-hoodie-back.svg'],
    colors: [{ name: 'Carbon', value: '#1e1e1e' }], sizes: ['S', 'M', 'L', 'XL'],
    badge: 'FEATURED', material: '420 GSM cotton-rich fleece', fit: 'Relaxed, structured fit',
    description: 'Built for the hours that belong to you. A substantial hood, a relaxed shape, and a restrained crimson signal mark make this concept a uniform for the afterhours.',
    details: ['Double-layer hood', 'Kangaroo pocket', 'Ribbed cuffs and hem', 'Original signal artwork'],
  },
  {
    id: 'district-tee', slug: 'district-graphic-tee', name: 'DISTRICT GRAPHIC TEE', category: 'T-shirts', price: 52,
    images: ['/images/district-tee.svg'],
    colors: [{ name: 'Bone', value: '#d8d1c4' }], sizes: ['S', 'M', 'L', 'XL'],
    badge: 'DROP 001', material: '240 GSM heavyweight cotton', fit: 'Oversized fit',
    description: 'City lines, translated into a daily uniform. Warm bone cotton meets an original architectural composition, drawn from our imaginary district.',
    details: ['Premium heavyweight construction concept', 'Architectural front artwork', 'Wide rib neckline', 'Dropped-shoulder silhouette'],
  },
  {
    id: 'ash-sweatshirt', slug: 'ash-oversized-sweatshirt', name: 'ASH OVERSIZED SWEATSHIRT', category: 'Sweatshirts', price: 82,
    images: ['/images/ash-sweatshirt.svg'],
    colors: [{ name: 'Concrete', value: '#68655f' }], sizes: ['S', 'M', 'L', 'XL'],
    badge: 'ESSENTIAL', material: '380 GSM cotton-rich fleece', fit: 'Oversized fit',
    description: 'Soft structure. Hard edges. A pared-back sweatshirt concept in concrete grey, with a subtle district insignia and generous proportions.',
    details: ['Crew neck with rib trim', 'Relaxed, dropped shoulders', 'Minimal district insignia', 'Designed as a year-round layer'],
  },
  {
    id: 'afterhours-hoodie', slug: 'afterhours-hoodie', name: 'AFTERHOURS HOODIE', category: 'Hoodies', price: 108,
    images: ['/images/afterhours-hoodie.svg'],
    colors: [{ name: 'Bone', value: '#d8d1c4' }], sizes: ['S', 'M', 'L', 'XL'],
    badge: 'CONCEPT EDITION', material: '420 GSM cotton-rich fleece', fit: 'Relaxed fit',
    description: 'The last train has left. The night has only started. Our afterhours concept pairs warm bone with an original screen-print inspired graphic.',
    details: ['Heavyweight fleece concept', 'Generous hood and front pocket', 'Tonal ribbed trims', 'Original night-division artwork'],
  },
  {
    id: 'static-tee', slug: 'static-graphic-tee', name: 'STATIC GRAPHIC TEE', category: 'T-shirts', price: 54,
    images: ['/images/static-tee.svg'],
    colors: [{ name: 'Washed black', value: '#252423' }], sizes: ['S', 'M', 'L', 'XL'],
    badge: 'DROP 001', material: '240 GSM heavyweight cotton', fit: 'Boxy fit',
    description: 'Find your frequency. A boxy washed-black tee with an original graphic study in interference, red lines, and the spaces between.',
    details: ['Boxy, unisex silhouette', 'Ribbed neckline', 'Original interference graphic', 'Heavyweight cotton concept'],
  },
];

export const formatPrice = (price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(price);

export const categories = ['All pieces', 'T-shirts', 'Hoodies', 'Sweatshirts'];

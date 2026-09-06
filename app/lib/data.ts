// Alvis Store — Product Data Layer
// Design: Black bg, white text, fuchsia-violet accent (#c026d3 → #7c3aed)

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Phones' | 'Laptops' | 'Audio' | 'Gaming' | 'Wearables' | 'Tablets';
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  isNew?: boolean;
  colors?: string[];
  storage?: string[];
  description: string;
  specs: Record<string, string>;
  ean?: string;
  itemNumber?: string;
  deliveryInfo?: string;
  instalmentMonthly?: number;
  instalmentMonths?: number;
  instalmentTotal?: number;
  instalmentRate?: string;
  tradeInValue?: number;
  protectionPlan?: { name: string; price: number; description: string };
}

export const PRODUCTS: Product[] = [
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max, 256GB — Deep Blue',
    brand: 'Apple',
    category: 'Phones',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&q=80',
      'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80',
    ],
    rating: 4.5,
    reviewCount: 31,
    inStock: true,
    featured: true,
    isNew: true,
    colors: ['Deep Blue', 'Natural Titanium', 'Black Titanium', 'Desert Titanium'],
    storage: ['256GB', '512GB', '1TB'],
    description: `All out Pro.\n\nGet 3 months of Apple TV+ free when you buy this Apple device.\n\niPhone 17 Pro Max. The most powerful iPhone ever. Brilliant 6.9-inch display, aluminium unibody design, A19 Pro chip, all 48MP rear cameras and best-ever battery life.\n\nUNIBODY DESIGN. FOR EXCEPTIONAL POWER\nHeat-forged aluminium unibody design for the most powerful iPhone ever made.\n\nDURABLE CERAMIC SHIELD. FRONT AND BACK\nCeramic Shield protects the back of iPhone 17 Pro Max, making it 4x more resistant to cracks. And the new Ceramic Shield 2 on the front has 3x better scratch resistance.\n\nTHE ULTIMATE PRO CAMERA SYSTEM\nWith all 48MP rear cameras and 8x optical-quality zoom — the widest zoom range ever in an iPhone. It's the equivalent of 8 pro lenses in your pocket.\n\n18MP CENTER STAGE FRONT CAMERA\nFlexible ways to frame your shot. Smarter group selfies, Dual Capture video for simultaneous front and rear recording, and more.\n\nA19 PRO CHIP. VAPOUR COOLED. LIGHTNING FAST\nA19 Pro is the most powerful iPhone chip yet, delivering up to 40% better sustained performance.\n\nBEST BATTERY LIFE IN AN IPHONE EVER\nThe unibody design creates massive additional battery capacity, for up to 37 hours of video playback. Charge up to 50% in 20 minutes.\n\niOS 26. NEW LOOK. EVEN MORE MAGIC\nA fresh design with Liquid Glass. Beautiful, delightful and instantly familiar.`,
    specs: {
      'Display': '6.9-inch Super Retina XDR OLED',
      'Chip': 'A19 Pro',
      'Rear Camera': '48MP Main + 48MP Ultra Wide + 48MP Telephoto',
      'Front Camera': '18MP Center Stage',
      'Battery': 'Up to 37 hours video playback',
      'Storage': '256GB',
      'OS': 'iOS 26',
      'Dimensions': '18.1 × 9.5 × 0.83 cm',
      'Weight': '227g',
      'Water Resistance': 'IP68',
      'Connectivity': '5G, Wi-Fi 7, Bluetooth 5.3, NFC',
      'Charger Included': 'Yes (USB-C)',
    },
    ean: '195950639223',
    itemNumber: 'WQZWB',
    instalmentMonthly: 41.30,
    instalmentMonths: 36,
    instalmentTotal: 1486.80,
    instalmentRate: '14.9% p.a.',
    tradeInValue: 560,
    protectionPlan: { name: 'Alvis Protect — Screen', price: 65.99, description: 'Cover for accidental screen damage. We\'ll repair it for you. Excess and exclusions apply.' },
  },
  {
    id: 'samsung-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra, 512GB — Titanium Black',
    brand: 'Samsung',
    category: 'Phones',
    price: 1099,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80',
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
      'https://images.unsplash.com/photo-1511693426e7?w=600&q=80',
    ],
    rating: 4.7,
    reviewCount: 84,
    inStock: true,
    featured: true,
    colors: ['Titanium Black', 'Titanium Silver', 'Titanium Blue'],
    storage: ['256GB', '512GB', '1TB'],
    description: 'The Galaxy S25 Ultra redefines what a smartphone can do. With the built-in S Pen, Snapdragon 8 Elite processor, and a 200MP camera system, it\'s the ultimate productivity and creativity powerhouse.',
    specs: {
      'Display': '6.9-inch QHD+ Dynamic AMOLED 2X, 120Hz',
      'Processor': 'Snapdragon 8 Elite',
      'Main Camera': '200MP + 50MP + 10MP + 50MP',
      'Front Camera': '12MP',
      'Battery': '5000mAh, 45W fast charging',
      'Storage': '512GB',
      'RAM': '12GB',
      'OS': 'Android 15 / One UI 7',
      'S Pen': 'Included',
      'Water Resistance': 'IP68',
    },
    instalmentMonthly: 37.80,
    instalmentMonths: 36,
    instalmentTotal: 1360.80,
    instalmentRate: '14.9% p.a.',
    tradeInValue: 420,
    protectionPlan: { name: 'Alvis Protect — Screen', price: 59.99, description: 'Accidental screen damage cover.' },
  },
  {
    id: 'macbook-pro-m4',
    name: 'MacBook Pro 14-inch, M4 Pro, 24GB RAM, 512GB',
    brand: 'Apple',
    category: 'Laptops',
    price: 1999,
    originalPrice: 2199,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80',
    ],
    rating: 4.9,
    reviewCount: 127,
    inStock: true,
    featured: true,
    colors: ['Space Black', 'Silver'],
    storage: ['512GB', '1TB', '2TB'],
    description: 'The MacBook Pro with M4 Pro chip delivers extraordinary performance for demanding workflows. With up to 24 CPU cores, 40 GPU cores, and up to 128GB unified memory, it\'s the most powerful MacBook Pro ever.',
    specs: {
      'Display': '14.2-inch Liquid Retina XDR, 120Hz ProMotion',
      'Chip': 'Apple M4 Pro',
      'CPU': '14-core',
      'GPU': '20-core',
      'RAM': '24GB Unified Memory',
      'Storage': '512GB SSD',
      'Battery': 'Up to 22 hours',
      'Ports': '3× Thunderbolt 5, HDMI, SD card, MagSafe 3',
      'Weight': '1.62kg',
      'OS': 'macOS Sequoia',
    },
    instalmentMonthly: 68.70,
    instalmentMonths: 36,
    instalmentTotal: 2473.20,
    instalmentRate: '14.9% p.a.',
    tradeInValue: 800,
    protectionPlan: { name: 'Alvis Protect — Complete', price: 149.99, description: 'Full accidental damage cover including screen, keyboard, and liquid damage.' },
  },
  {
    id: 'sony-wh1000xm6',
    name: 'Sony WH-1000XM6 Wireless Noise Cancelling Headphones',
    brand: 'Sony',
    category: 'Audio',
    price: 349,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80',
    ],
    rating: 4.8,
    reviewCount: 203,
    inStock: true,
    featured: true,
    colors: ['Black', 'Platinum Silver', 'Midnight Blue'],
    description: 'Industry-leading noise cancellation with the new QN3 processor. 40-hour battery life, multipoint connection to two devices, and crystal-clear hands-free calling.',
    specs: {
      'Driver': '40mm',
      'Frequency Response': '4Hz–40,000Hz',
      'Battery Life': '40 hours (NC on)',
      'Charging': 'USB-C, 3 min = 3 hours',
      'Bluetooth': '5.3, multipoint',
      'Noise Cancellation': 'QN3 processor',
      'Weight': '250g',
      'Foldable': 'Yes',
      'Microphone': 'Bone conduction + 4 beamforming mics',
    },
    instalmentMonthly: 12.00,
    instalmentMonths: 36,
    instalmentTotal: 432,
    instalmentRate: '14.9% p.a.',
    protectionPlan: { name: 'Alvis Protect — Audio', price: 29.99, description: 'Accidental damage cover for your headphones.' },
  },
  {
    id: 'ps5-pro',
    name: 'PlayStation 5 Pro Console',
    brand: 'Sony',
    category: 'Gaming',
    price: 699,
    originalPrice: 749,
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80',
    ],
    rating: 4.6,
    reviewCount: 56,
    inStock: true,
    featured: true,
    description: 'PlayStation 5 Pro delivers enhanced GPU performance, advanced ray tracing, and PlayStation Spectral Super Resolution for the most immersive gaming experience ever.',
    specs: {
      'CPU': 'AMD Zen 2, 8-core',
      'GPU': 'AMD RDNA 4 (Enhanced)',
      'RAM': '16GB GDDR6',
      'Storage': '2TB SSD',
      'Optical Drive': 'Ultra HD Blu-ray',
      'Resolution': 'Up to 8K',
      'Frame Rate': 'Up to 120fps',
      'Ray Tracing': 'Advanced',
    },
    instalmentMonthly: 24.00,
    instalmentMonths: 36,
    instalmentTotal: 864,
    instalmentRate: '14.9% p.a.',
    tradeInValue: 200,
    protectionPlan: { name: 'Alvis Protect — Gaming', price: 79.99, description: 'Accidental damage and breakdown cover.' },
  },
  {
    id: 'apple-watch-ultra-3',
    name: 'Apple Watch Ultra 3, 49mm — Black Titanium',
    brand: 'Apple',
    category: 'Wearables',
    price: 799,
    originalPrice: 849,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
    ],
    rating: 4.7,
    reviewCount: 48,
    inStock: true,
    featured: false,
    colors: ['Black Titanium', 'Natural Titanium', 'White Titanium'],
    description: 'The most rugged and capable Apple Watch ever. Built for extreme environments with a titanium case, sapphire crystal display, and up to 72 hours of battery life.',
    specs: {
      'Case': '49mm Black Titanium',
      'Display': 'Always-On Retina LTPO OLED',
      'Chip': 'S10',
      'Battery': 'Up to 72 hours (low power mode)',
      'Water Resistance': '100m',
      'GPS': 'Precision dual-frequency',
      'Health Sensors': 'ECG, Blood Oxygen, Temperature',
      'Connectivity': 'LTE, Wi-Fi 6, Bluetooth 5.3',
    },
    instalmentMonthly: 27.50,
    instalmentMonths: 36,
    instalmentTotal: 990,
    instalmentRate: '14.9% p.a.',
    protectionPlan: { name: 'Alvis Protect — Watch', price: 49.99, description: 'Screen and accidental damage cover.' },
  },
  {
    id: 'ipad-pro-m4',
    name: 'iPad Pro 13-inch, M4, 256GB — Space Black',
    brand: 'Apple',
    category: 'Tablets',
    price: 1099,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
    ],
    rating: 4.8,
    reviewCount: 72,
    inStock: true,
    featured: false,
    colors: ['Space Black', 'Silver'],
    storage: ['256GB', '512GB', '1TB', '2TB'],
    description: 'The thinnest Apple product ever. iPad Pro with M4 chip features an Ultra Retina XDR display with tandem OLED technology, delivering extreme brightness and true blacks.',
    specs: {
      'Display': '13-inch Ultra Retina XDR OLED, 120Hz',
      'Chip': 'Apple M4',
      'Storage': '256GB',
      'Front Camera': '12MP TrueDepth',
      'Rear Camera': '12MP Wide + LiDAR',
      'Battery': 'Up to 10 hours',
      'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3',
      'Thickness': '5.1mm',
    },
    instalmentMonthly: 37.80,
    instalmentMonths: 36,
    instalmentTotal: 1360.80,
    instalmentRate: '14.9% p.a.',
    protectionPlan: { name: 'Alvis Protect — Screen', price: 89.99, description: 'Accidental screen damage cover.' },
  },
  {
    id: 'dell-xps-15',
    name: 'Dell XPS 15, Intel Core Ultra 9, 32GB, 1TB',
    brand: 'Dell',
    category: 'Laptops',
    price: 1799,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    ],
    rating: 4.5,
    reviewCount: 43,
    inStock: true,
    featured: false,
    colors: ['Platinum Silver', 'Graphite'],
    storage: ['512GB', '1TB', '2TB'],
    description: 'The Dell XPS 15 combines stunning OLED display technology with Intel Core Ultra 9 performance. Perfect for creative professionals who demand the best.',
    specs: {
      'Display': '15.6-inch 3.5K OLED, 120Hz',
      'Processor': 'Intel Core Ultra 9 185H',
      'RAM': '32GB LPDDR5',
      'Storage': '1TB NVMe SSD',
      'GPU': 'NVIDIA RTX 4060 8GB',
      'Battery': 'Up to 13 hours',
      'Weight': '1.86kg',
      'OS': 'Windows 11 Pro',
    },
    instalmentMonthly: 61.80,
    instalmentMonths: 36,
    instalmentTotal: 2224.80,
    instalmentRate: '14.9% p.a.',
    tradeInValue: 500,
    protectionPlan: { name: 'Alvis Protect — Complete', price: 129.99, description: 'Full accidental damage cover.' },
  },
  {
    id: 'airpods-pro-3',
    name: 'Apple AirPods Pro (3rd Generation)',
    brand: 'Apple',
    category: 'Audio',
    price: 249,
    originalPrice: 279,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80',
    ],
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    featured: false,
    colors: ['White'],
    description: 'AirPods Pro 3 deliver next-generation Active Noise Cancellation, Adaptive Audio, and Personalised Spatial Audio for an immersive listening experience.',
    specs: {
      'Chip': 'H3',
      'ANC': 'Next-gen Active Noise Cancellation',
      'Battery (Earbuds)': 'Up to 7 hours',
      'Battery (Case)': 'Up to 35 hours total',
      'Charging': 'MagSafe, Qi2, USB-C',
      'Water Resistance': 'IP54',
      'Connectivity': 'Bluetooth 5.4',
      'Spatial Audio': 'Personalised with head tracking',
    },
    instalmentMonthly: 8.60,
    instalmentMonths: 36,
    instalmentTotal: 309.60,
    instalmentRate: '14.9% p.a.',
    protectionPlan: { name: 'Alvis Protect — Audio', price: 24.99, description: 'Accidental damage cover.' },
  },
  {
    id: 'samsung-galaxy-tab-s10',
    name: 'Samsung Galaxy Tab S10 Ultra, 512GB',
    brand: 'Samsung',
    category: 'Tablets',
    price: 1099,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80',
    ],
    rating: 4.6,
    reviewCount: 38,
    inStock: true,
    featured: false,
    colors: ['Graphite', 'Beige'],
    storage: ['256GB', '512GB', '1TB'],
    description: 'The Galaxy Tab S10 Ultra features a massive 14.6-inch Dynamic AMOLED display, Snapdragon 8 Gen 3, and an integrated S Pen for ultimate productivity.',
    specs: {
      'Display': '14.6-inch Dynamic AMOLED 2X, 120Hz',
      'Processor': 'Snapdragon 8 Gen 3',
      'RAM': '12GB',
      'Storage': '512GB',
      'Battery': '11,200mAh, 45W charging',
      'S Pen': 'Included',
      'OS': 'Android 14 / One UI 6.1',
    },
    instalmentMonthly: 37.80,
    instalmentMonths: 36,
    instalmentTotal: 1360.80,
    instalmentRate: '14.9% p.a.',
    protectionPlan: { name: 'Alvis Protect — Screen', price: 89.99, description: 'Screen and accidental damage cover.' },
  },
  {
    id: 'xbox-series-x',
    name: 'Xbox Series X — 2TB SSD Console',
    brand: 'Microsoft',
    category: 'Gaming',
    price: 499,
    originalPrice: 549,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&q=80',
    ],
    rating: 4.7,
    reviewCount: 91,
    inStock: true,
    featured: false,
    description: 'Xbox Series X delivers 4K gaming at up to 120fps with 2TB of custom NVMe SSD storage. The most powerful Xbox ever.',
    specs: {
      'CPU': 'AMD Zen 2, 8-core 3.8GHz',
      'GPU': '12 TFLOPS RDNA 2',
      'RAM': '16GB GDDR6',
      'Storage': '2TB Custom NVMe SSD',
      'Resolution': 'Up to 8K',
      'Frame Rate': 'Up to 120fps',
      'Ray Tracing': 'DirectX Raytracing',
      'Optical Drive': '4K UHD Blu-ray',
    },
    instalmentMonthly: 17.20,
    instalmentMonths: 36,
    instalmentTotal: 619.20,
    instalmentRate: '14.9% p.a.',
    tradeInValue: 150,
    protectionPlan: { name: 'Alvis Protect — Gaming', price: 59.99, description: 'Accidental damage and breakdown cover.' },
  },
  {
    id: 'google-pixel-9-pro',
    name: 'Google Pixel 9 Pro XL, 256GB — Obsidian',
    brand: 'Google',
    category: 'Phones',
    price: 999,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
    ],
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
    featured: false,
    colors: ['Obsidian', 'Porcelain', 'Hazel', 'Rose Quartz'],
    storage: ['256GB', '512GB', '1TB'],
    description: 'The Pixel 9 Pro XL with Google Tensor G4 chip delivers the best Google AI experience in a smartphone. Magic Eraser, Best Take, and Gemini built right in.',
    specs: {
      'Display': '6.8-inch LTPO OLED, 120Hz',
      'Chip': 'Google Tensor G4',
      'Main Camera': '50MP + 48MP Ultra Wide + 48MP Telephoto (5×)',
      'Front Camera': '10.5MP',
      'Battery': '5060mAh, 37W fast charging',
      'RAM': '16GB',
      'Storage': '256GB',
      'OS': 'Android 15',
      'Water Resistance': 'IP68',
    },
    instalmentMonthly: 34.40,
    instalmentMonths: 36,
    instalmentTotal: 1238.40,
    instalmentRate: '14.9% p.a.',
    tradeInValue: 350,
    protectionPlan: { name: 'Alvis Protect — Screen', price: 55.99, description: 'Screen and accidental damage cover.' },
  },
];

export const CATEGORIES = [
  { id: 'Phones', label: 'Phones', icon: '📱', count: PRODUCTS.filter(p => p.category === 'Phones').length },
  { id: 'Laptops', label: 'Laptops', icon: '💻', count: PRODUCTS.filter(p => p.category === 'Laptops').length },
  { id: 'Audio', label: 'Audio', icon: '🎧', count: PRODUCTS.filter(p => p.category === 'Audio').length },
  { id: 'Gaming', label: 'Gaming', icon: '🎮', count: PRODUCTS.filter(p => p.category === 'Gaming').length },
  { id: 'Wearables', label: 'Wearables', icon: '⌚', count: PRODUCTS.filter(p => p.category === 'Wearables').length },
  { id: 'Tablets', label: 'Tablets', icon: '📟', count: PRODUCTS.filter(p => p.category === 'Tablets').length },
];

// Cart & Wishlist helpers (localStorage)
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  storage?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string; email: string; phone: string;
    address: string; city: string; postcode: string; country: string;
  };
  createdAt: string;
  estimatedDelivery: string;
}

// Safe localStorage access (SSR-compatible)
function getStorage() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getCart(): CartItem[] {
  const storage = getStorage();
  if (!storage) return [];
  try { return JSON.parse(storage.getItem('alvis-cart') || '[]'); } catch { return []; }
}

export function saveCart(cart: CartItem[]) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem('alvis-cart', JSON.stringify(cart));
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find(c => c.productId === item.productId && c.color === item.color && c.storage === item.storage);
  if (existing) { existing.quantity += item.quantity; } else { cart.push(item); }
  saveCart(cart);
}

export function removeFromCart(productId: string, color?: string, storage?: string) {
  const cart = getCart().filter(c => !(c.productId === productId && c.color === color && c.storage === storage));
  saveCart(cart);
}

export function updateCartQty(productId: string, qty: number, color?: string, storage?: string) {
  const cart = getCart().map(c => (c.productId === productId && c.color === color && c.storage === storage) ? { ...c, quantity: qty } : c);
  saveCart(cart);
}

export function clearCart() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem('alvis-cart');
}

export function getCartCount(): number { return getCart().reduce((s, c) => s + c.quantity, 0); }

export function getWishlist(): string[] {
  const storage = getStorage();
  if (!storage) return [];
  try { return JSON.parse(storage.getItem('alvis-wishlist') || '[]'); } catch { return []; }
}

export function toggleWishlist(productId: string): boolean {
  const storage = getStorage();
  if (!storage) return false;
  const list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx >= 0) { list.splice(idx, 1); storage.setItem('alvis-wishlist', JSON.stringify(list)); return false; }
  list.push(productId); storage.setItem('alvis-wishlist', JSON.stringify(list)); return true;
}

export function isWishlisted(productId: string): boolean { return getWishlist().includes(productId); }

export function getOrders(): Order[] {
  const storage = getStorage();
  if (!storage) return [];
  try { return JSON.parse(storage.getItem('alvis-orders') || '[]'); } catch { return []; }
}

export function saveOrder(order: Order) {
  const orders = getOrders();
  orders.unshift(order);
  const storage = getStorage();
  if (!storage) return;
  storage.setItem('alvis-orders', JSON.stringify(orders));
}

export function formatPrice(price: number, currency = '£'): string {
  return `${currency}${price.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function generateOrderNumber(): string {
  return 'ALV-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

export function getEstimatedDelivery(days = 3): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export function getBrowsingHistory(): string[] {
  const storage = getStorage();
  if (!storage) return [];
  try { return JSON.parse(storage.getItem('alvis-history') || '[]'); } catch { return []; }
}

export function addToHistory(productId: string) {
  const storage = getStorage();
  if (!storage) return;
  const h = getBrowsingHistory().filter(id => id !== productId);
  h.unshift(productId);
  storage.setItem('alvis-history', JSON.stringify(h.slice(0, 20)));
}

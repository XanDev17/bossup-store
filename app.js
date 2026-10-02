/* ============================================================
   NEXUS Ecommerce Store — Full App Logic
   Features: Products, Cart, Wishlist, Checkout, Admin CRUD,
             Filters, Search, Sort, Toast, Scroll effects
   ============================================================ */

'use strict';

// ======================== INITIAL DATA ========================
const SEED_PRODUCTS = [
  {
    id: 'p001', name: 'ProBuds X3 Wireless Earbuds', category: 'Audio',
    price: 89.99, originalPrice: 129.99, stock: 45, rating: 4.8, reviews: 1024,
    badge: 'Best Seller', color: '#6366f1',
    description: 'Premium true wireless earbuds with active noise cancellation, crystal-clear sound, and all-day comfort.',
    features: ['Active Noise Cancellation', '30hr total battery life', 'IPX5 water resistant', 'Instant Bluetooth pairing', 'Built-in voice assistant'],
    image: 'product_earbuds.jpg', featured: true, isBestSeller: true, isNew: false,
    createdAt: Date.now() - 30 * 86400000
  },
  {
    id: 'p002', name: 'MagCharge 15W Wireless Pad', category: 'Charging',
    price: 39.99, originalPrice: 59.99, stock: 82, rating: 4.6, reviews: 512,
    badge: 'Sale', color: '#06b6d4',
    description: 'Ultra-slim 15W Qi2 wireless charging pad with intelligent foreign object detection and multi-coil technology.',
    features: ['15W fast charging', 'Qi2 universal compatible', 'LED indicator ring', 'Anti-slip surface', 'Over-temperature protection'],
    image: '', featured: true, isBestSeller: false, isNew: false,
    createdAt: Date.now() - 20 * 86400000
  },
  {
    id: 'p003', name: 'ArmorShield Pro Phone Case', category: 'Cases',
    price: 24.99, originalPrice: null, stock: 200, rating: 4.7, reviews: 723,
    badge: 'Hot', color: '#f97316',
    description: 'Military-grade drop protection with a slim profile. Designed to fit seamlessly while shielding your device.',
    features: ['Military-grade drop protection', 'Ultra-slim 1.2mm profile', 'Wireless charging compatible', 'Anti-scratch matte finish', 'Raised camera lip protection'],
    image: '', featured: true, isBestSeller: true, isNew: false,
    createdAt: Date.now() - 15 * 86400000
  },
  {
    id: 'p004', name: 'NexCable USB-C Braided 2m', category: 'Cables',
    price: 14.99, originalPrice: null, stock: 350, rating: 4.5, reviews: 289,
    badge: '', color: '#10b981',
    description: '240W braided nylon USB-C cable for ultra-fast charging and data transfer at up to 40Gbps.',
    features: ['240W fast charging support', '40Gbps data transfer', '2m braided nylon', '20,000 bend cycles tested', 'Universal USB-C to USB-C'],
    image: '', featured: false, isBestSeller: true, isNew: false,
    createdAt: Date.now() - 10 * 86400000
  },
  {
    id: 'p005', name: 'NexWatch Ultra Smart Band', category: 'Wearables',
    price: 149.99, originalPrice: 199.99, stock: 28, rating: 4.9, reviews: 406,
    badge: 'Limited', color: '#8b5cf6',
    description: 'Advanced fitness tracker with always-on AMOLED display, GPS, heart rate, and SpO2 monitoring.',
    features: ['Always-on AMOLED display', 'Built-in GPS', 'Heart rate & SpO2', '14-day battery life', '5ATM water resistant'],
    image: '', featured: true, isBestSeller: false, isNew: true,
    createdAt: Date.now() - 2 * 86400000
  },
  {
    id: 'p006', name: 'PowerBank 20,000mAh Pro', category: 'Charging',
    price: 59.99, originalPrice: 79.99, stock: 65, rating: 4.7, reviews: 834,
    badge: 'Best Seller', color: '#06b6d4',
    description: 'Massive 20,000mAh power bank with 65W PD, charges laptops, phones and tablets at full speed.',
    features: ['65W Power Delivery output', '20,000mAh capacity', 'Charge 3 devices simultaneously', 'LED digital display', 'Pass-through charging'],
    image: '', featured: false, isBestSeller: true, isNew: false,
    createdAt: Date.now() - 25 * 86400000
  },
  {
    id: 'p007', name: 'ProHub 7-in-1 USB-C Hub', category: 'Accessories',
    price: 49.99, originalPrice: 69.99, stock: 0, rating: 4.4, reviews: 318,
    badge: '', color: '#f59e0b',
    description: 'Expand your laptop with HDMI 4K, 3x USB-A, SD/MicroSD card reader, and 100W PD charging.',
    features: ['4K HDMI output', '3x USB-A 3.0 ports', 'SD & MicroSD reader', '100W PD charging', 'Plug & play'],
    image: '', featured: false, isBestSeller: false, isNew: true,
    createdAt: Date.now() - 1 * 86400000
  },
  {
    id: 'p008', name: 'SSD 1TB NVMe Portable', category: 'Storage',
    price: 99.99, originalPrice: 139.99, stock: 12, rating: 4.9, reviews: 2103,
    badge: 'Hot', color: '#ef4444',
    description: 'Blazing fast 2000MB/s read/write speeds in a pocket-sized aluminum enclosure for creators on the go.',
    features: ['2000MB/s read speed', '1TB NVMe storage', 'USB-C & USB-A included', 'AES 256-bit encryption', 'Shock resistant aluminum'],
    image: '', featured: true, isBestSeller: true, isNew: false,
    createdAt: Date.now() - 40 * 86400000
  },
  {
    id: 'p009', name: 'Noise-Cancelling Headphones', category: 'Audio',
    price: 179.99, originalPrice: 249.99, stock: 30, rating: 4.8, reviews: 671,
    badge: 'Sale', color: '#6366f1',
    description: 'Studio-quality over-ear headphones with industry-leading ANC, spatial audio and 40hr playback.',
    features: ['Industry-leading ANC', 'Spatial audio mode', '40hr battery', 'USB-C fast charge (10min → 3hr)', 'Foldable premium build'],
    image: '', featured: false, isBestSeller: true, isNew: false,
    createdAt: Date.now() - 35 * 86400000
  },
  {
    id: 'p010', name: 'Webcam 4K AutoFocus Pro', category: 'Accessories',
    price: 119.99, originalPrice: null, stock: 44, rating: 4.6, reviews: 241,
    badge: 'New', color: '#06b6d4',
    description: 'Crystal-clear 4K 30fps webcam with AI-powered autofocus, dual mics, and HDR for professional streaming.',
    features: ['4K 30fps or 1080p 60fps', 'AI autofocus & face tracking', 'Dual noise-cancelling mics', 'HDR + Low-light mode', 'Works with all OS'],
    image: '', featured: false, isBestSeller: false, isNew: true,
    createdAt: Date.now() - 3 * 86400000
  },
  {
    id: 'p011', name: 'Desk Charging Station 6-Port', category: 'Charging',
    price: 69.99, originalPrice: 89.99, stock: 55, rating: 4.5, reviews: 188,
    badge: '', color: '#8b5cf6',
    description: 'Clean your desk with this 6-port charging station: 2x 65W USB-C PD + 4x USB-A smart ports.',
    features: ['2x 65W USB-C PD', '4x USB-A 18W quick charge', 'Smart power distribution', 'Surge protection', 'Compact tower design'],
    image: '', featured: false, isBestSeller: false, isNew: false,
    createdAt: Date.now() - 18 * 86400000
  },
  {
    id: 'p012', name: 'MagSafe Wallet Stand', category: 'Cases',
    price: 34.99, originalPrice: null, stock: 78, rating: 4.3, reviews: 156,
    badge: 'New', color: '#f97316',
    description: 'Magnetic wallet and stand combo that snaps on securely, holds 3 cards, and doubles as a kickstand.',
    features: ['Holds 3 cards', 'Foldable kickstand', 'MagSafe magnet aligned', 'Premium leather exterior', 'RFID protection'],
    image: '', featured: false, isBestSeller: false, isNew: true,
    createdAt: Date.now() - 5 * 86400000
  }
];

const CATEGORIES = [
  { name: 'Audio', icon: '🎧', bg: 'rgba(99,102,241,0.15)', color: '#6366f1' },
  { name: 'Charging', icon: '⚡', bg: 'rgba(6,182,212,0.15)', color: '#06b6d4' },
  { name: 'Cases', icon: '📱', bg: 'rgba(249,115,22,0.15)', color: '#f97316' },
  { name: 'Cables', icon: '🔌', bg: 'rgba(16,185,129,0.15)', color: '#10b981' },
  { name: 'Wearables', icon: '⌚', bg: 'rgba(139,92,246,0.15)', color: '#8b5cf6' },
  { name: 'Storage', icon: '💾', bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
  { name: 'Accessories', icon: '🖥️', bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' }
];

// ======================== STATE ========================
let state = {
  products: [],
  cart: [],
  wishlist: [],
  currentPage: 'home',
  currentCategory: null,
  searchQuery: '',
  priceMax: 300,
  minRating: 0,
  sortBy: 'default',
  viewMode: 'grid',
  adminFilter: '',
  modalProductId: null,
  modalQty: 1,
  checkoutStep: 1,
  orders: []
};

// ======================== PERSISTENCE ========================
function saveState() {
  try {
    localStorage.setItem('nexus_products', JSON.stringify(state.products));
    localStorage.setItem('nexus_cart', JSON.stringify(state.cart));
    localStorage.setItem('nexus_wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('bossup_orders', JSON.stringify(state.orders));
  } catch(e) {}
}

function loadState() {
  try {
    const prods = localStorage.getItem('nexus_products');
    const cart = localStorage.getItem('nexus_cart');
    const wishlist = localStorage.getItem('nexus_wishlist');
    const orders = localStorage.getItem('bossup_orders');
    state.products = prods ? JSON.parse(prods) : [...SEED_PRODUCTS];
    state.cart = cart ? JSON.parse(cart) : [];
    state.wishlist = wishlist ? JSON.parse(wishlist) : [];
    state.orders = orders ? JSON.parse(orders) : generateFakeOrders();
  } catch(e) {
    state.products = [...SEED_PRODUCTS];
    state.cart = [];
    state.wishlist = [];
    state.orders = generateFakeOrders();
  }
}

function generateFakeOrders() {
  const fakeOrders = [];
  const now = new Date();
  for(let i = 6; i >= 0; i--) {
    const ordersToday = Math.floor(Math.random() * 5) + 2; // 2 to 6 orders
    for(let j=0; j<ordersToday; j++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      fakeOrders.push({
        id: Math.random().toString(36).substring(7),
        total: Math.floor(Math.random() * 200) + 49.99,
        date: d.toISOString()
      });
    }
  }
  return fakeOrders;
}

// ======================== TOAST ========================
let toastTimer = null;
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = 'toast'; }, 3000);
}

// ======================== PAGE NAVIGATION ========================
function showPage(page, category = null) {
  state.currentPage = page;
  state.currentCategory = category;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = { home: 'homePage', shop: 'shopPage', wishlist: 'wishlistPage', admin: 'adminPage' }[page];
  if(target) document.getElementById(target).classList.add('active');
  // Update nav active state
  document.querySelectorAll('.nav-link[data-page]').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Close mobile menu
  document.getElementById('navLinks').classList.remove('mobile-open');
  // Render appropriate content
  if(page === 'shop') renderShopPage(category);
  if(page === 'wishlist') renderWishlistPage();
  if(page === 'admin') renderAdminPage();
}

function toggleMobileMenu() {
  document.getElementById('navLinks').classList.toggle('mobile-open');
}

// ======================== SCROLL EFFECTS ========================
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// ======================== STARS RENDER ========================
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// ======================== PRODUCT ICON ========================
function categoryIcon(cat) {
  const found = CATEGORIES.find(c => c.name === cat);
  return found ? found.icon : '📦';
}
function categoryColor(cat) {
  const found = CATEGORIES.find(c => c.name === cat);
  return found ? found.color : '#6366f1';
}
function categoryBg(cat) {
  const found = CATEGORIES.find(c => c.name === cat);
  return found ? found.bg : 'rgba(99,102,241,0.15)';
}

function badgeClass(badge) {
  const map = { 'New':'badge-new','Hot':'badge-hot','Sale':'badge-sale','Best Seller':'badge-bestseller','Limited':'badge-limited' };
  return map[badge] || '';
}

// ======================== PRODUCT CARD ========================
function productCardHTML(product, extraClass = '') {
  const inWishlist = state.wishlist.includes(product.id);
  const inCart = state.cart.some(c => c.id === product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price/product.originalPrice)*100)
    : null;

  const imgContent = product.image
    ? `<img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="card-icon-fallback" style="display:none;background:${categoryBg(product.category)}">${categoryIcon(product.category)}</div>`
    : `<div class="card-icon-fallback" style="background:${categoryBg(product.category)}">${categoryIcon(product.category)}</div>`;

  const badgeHTML = product.badge
    ? `<span class="card-badge ${badgeClass(product.badge)}">${product.badge}</span>` : '';

  const originalHTML = product.originalPrice
    ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : '';
  const discountHTML = discount
    ? `<span class="discount-tag">-${discount}%</span>` : '';

  const stockHTML = product.stock > 0 && product.stock <= 10
    ? `<p class="stock-low">Only ${product.stock} left!</p>` : '';

  const cartIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;

  return `
    <article class="product-card ${extraClass}" onclick="openProductModal('${product.id}')" role="button" tabindex="0" aria-label="${product.name}">
      <div class="card-img-wrap">
        ${imgContent}
        ${badgeHTML}
        <div class="card-actions" onclick="event.stopPropagation()">
          <button class="card-action-btn ${inWishlist ? 'wishlisted' : ''}" onclick="toggleWishlist('${product.id}')" title="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}" aria-label="Wishlist">
            <svg viewBox="0 0 24 24" fill="${inWishlist ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="card-action-btn" onclick="openProductModal('${product.id}')" title="Quick view" aria-label="Quick view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>
      <div class="card-body">
        <p class="card-category">${product.category}</p>
        <h3 class="card-name">${product.name}</h3>
        <div class="card-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-count">(${(product.reviews||0).toLocaleString()})</span>
        </div>
        ${stockHTML}
        <div class="card-footer">
          <div class="price-group">
            <span class="price">$${product.price.toFixed(2)}</span>
            ${originalHTML}
            ${discountHTML}
          </div>
          <button class="add-to-cart-btn" onclick="event.stopPropagation();addToCart('${product.id}')" title="Add to cart" aria-label="Add to cart" ${product.stock === 0 ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>
            ${cartIcon}
          </button>
        </div>
      </div>
    </article>
  `;
}

function productListCardHTML(product) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price/product.originalPrice)*100) : null;
  const imgContent = product.image
    ? `<img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="card-icon-fallback" style="display:none;font-size:2rem;background:${categoryBg(product.category)}">${categoryIcon(product.category)}</div>`
    : `<div class="card-icon-fallback" style="font-size:2rem;background:${categoryBg(product.category)}">${categoryIcon(product.category)}</div>`;

  return `
    <article class="product-card list-card" onclick="openProductModal('${product.id}')" role="button" tabindex="0">
      <div class="card-img-wrap">${imgContent}
        ${product.badge ? `<span class="card-badge ${badgeClass(product.badge)}">${product.badge}</span>` : ''}
      </div>
      <div class="card-body" style="flex-direction:row;align-items:center;gap:24px;padding:20px">
        <div style="flex:1;min-width:0">
          <p class="card-category">${product.category}</p>
          <h3 class="card-name" style="-webkit-line-clamp:1">${product.name}</h3>
          <p style="font-size:0.82rem;margin-top:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${product.description}</p>
          <div class="card-rating" style="margin-top:8px">
            <span class="stars">${renderStars(product.rating)}</span>
            <span class="rating-count">(${(product.reviews||0).toLocaleString()})</span>
          </div>
        </div>
        <div style="flex-shrink:0;text-align:right;display:flex;flex-direction:column;gap:12px;align-items:flex-end">
          <div class="price-group">
            <span class="price">$${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            ${discount ? `<span class="discount-tag">-${discount}%</span>` : ''}
          </div>
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();addToCart('${product.id}')" ${product.stock === 0 ? 'disabled style="opacity:.4"' : ''}>
            ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  `;
}

// ======================== HOME PAGE ========================
function renderHomePage() {
  // Categories
  const catGrid = document.getElementById('catGrid');
  catGrid.innerHTML = CATEGORIES.map(cat => {
    const count = state.products.filter(p => p.category === cat.name).length;
    return `
      <div class="cat-card" onclick="showPage('shop','${cat.name}')" role="button" tabindex="0">
        <div class="cat-icon" style="background:${cat.bg};color:${cat.color}">${cat.icon}</div>
        <span class="cat-name">${cat.name}</span>
        <span class="cat-count">${count} items</span>
      </div>
    `;
  }).join('');

  // Featured
  const featured = state.products.filter(p => p.featured).slice(0, 4);
  document.getElementById('featuredGrid').innerHTML = featured.map(p => productCardHTML(p)).join('');

  // Best Sellers
  const bestSellers = state.products.filter(p => p.isBestSeller).slice(0, 4);
  document.getElementById('bestSellerGrid').innerHTML = bestSellers.map(p => productCardHTML(p)).join('');
}

// ======================== SHOP PAGE ========================
function renderShopPage(filterCategory = null) {
  if (filterCategory) {
    state.currentCategory = filterCategory;
    document.getElementById('shopTitle').textContent = filterCategory;
    document.getElementById('shopSubtitle').textContent = `Browse our ${filterCategory} collection`;
  } else if (!state.currentCategory) {
    document.getElementById('shopTitle').textContent = 'All Products';
    document.getElementById('shopSubtitle').textContent = 'Explore our complete collection';
  }

  // Render filter category chips
  const catContainer = document.getElementById('filterCategories');
  const allCount = state.products.length;
  catContainer.innerHTML = `
    <button class="filter-chip ${!state.currentCategory ? 'active' : ''}" onclick="setCategory(null)">
      <span>All</span><span class="chip-count">${allCount}</span>
    </button>
  ` + CATEGORIES.map(cat => {
    const count = state.products.filter(p => p.category === cat.name).length;
    return `
      <button class="filter-chip ${state.currentCategory === cat.name ? 'active' : ''}" onclick="setCategory('${cat.name}')">
        <span>${cat.icon} ${cat.name}</span><span class="chip-count">${count}</span>
      </button>
    `;
  }).join('');

  applyFilters();
}

function setCategory(cat) {
  state.currentCategory = cat;
  document.getElementById('shopTitle').textContent = cat || 'All Products';
  document.getElementById('shopSubtitle').textContent = cat
    ? `Browse our ${cat} collection`
    : 'Explore our complete collection';
  // Update chip active state
  document.querySelectorAll('.filter-chip').forEach((chip, i) => {
    chip.classList.toggle('active', i === 0 ? !cat : chip.textContent.includes(cat));
  });
  applyFilters();
}

function filterByPrice(val) {
  state.priceMax = Number(val);
  document.getElementById('priceLabel').textContent = '$' + val;
  applyFilters();
}

function applyFilters() {
  let products = [...state.products];

  // Category
  if(state.currentCategory) products = products.filter(p => p.category === state.currentCategory);

  // Price
  products = products.filter(p => p.price <= state.priceMax);

  // Search
  if(state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Rating
  const checkedRatings = [...document.querySelectorAll('.rating-filters input:checked')].map(i => Number(i.value));
  if(checkedRatings.length) {
    const minRating = Math.max(...checkedRatings);
    products = products.filter(p => p.rating >= minRating);
  }

  // Sort
  const sortVal = document.getElementById('sortSelect')?.value || state.sortBy;
  if(sortVal === 'price-asc') products.sort((a,b) => a.price - b.price);
  else if(sortVal === 'price-desc') products.sort((a,b) => b.price - a.price);
  else if(sortVal === 'rating') products.sort((a,b) => b.rating - a.rating);
  else if(sortVal === 'newest') products.sort((a,b) => b.createdAt - a.createdAt);

  // Render
  const grid = document.getElementById('shopGrid');
  const noRes = document.getElementById('noResults');
  const count = document.getElementById('productCount');

  if(products.length === 0) {
    grid.innerHTML = '';
    noRes.classList.remove('hidden');
    count.textContent = '0 products';
  } else {
    noRes.classList.add('hidden');
    count.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;
    grid.innerHTML = state.viewMode === 'list'
      ? products.map(p => productListCardHTML(p)).join('')
      : products.map(p => productCardHTML(p)).join('');
  }
}

function clearFilters() {
  state.currentCategory = null;
  state.searchQuery = '';
  state.priceMax = 300;
  document.getElementById('priceRange').value = 300;
  document.getElementById('priceLabel').textContent = '$300';
  document.querySelectorAll('.rating-filters input').forEach(i => i.checked = false);
  if(document.getElementById('sortSelect')) document.getElementById('sortSelect').value = 'default';
  if(document.getElementById('globalSearch')) document.getElementById('globalSearch').value = '';
  renderShopPage(null);
}

function setView(mode) {
  state.viewMode = mode;
  document.getElementById('gridViewBtn').classList.toggle('active', mode === 'grid');
  document.getElementById('listViewBtn').classList.toggle('active', mode === 'list');
  document.getElementById('shopGrid').classList.toggle('list-view', mode === 'list');
  applyFilters();
}

function handleSearch(q) {
  state.searchQuery = q;
  if(state.currentPage !== 'shop') {
    showPage('shop');
  } else {
    applyFilters();
  }
}

// ======================== CART ========================
function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  renderCart();
}
function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

function addToCart(productId, qty = 1) {
  const product = state.products.find(p => p.id === productId);
  if(!product || product.stock === 0) { showToast('Out of stock', 'error'); return; }
  const existing = state.cart.find(c => c.id === productId);
  if(existing) {
    if(existing.qty >= product.stock) { showToast('Not enough stock', 'error'); return; }
    existing.qty += qty;
  } else {
    state.cart.push({ id: productId, qty });
  }
  saveState();
  updateCartBadge();
  showToast(`✓ "${product.name}" added to cart`, 'success');
  animateBadge('cartBadge');
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(c => c.id !== productId);
  saveState();
  updateCartBadge();
  renderCart();
}

function updateCartQty(productId, delta) {
  const item = state.cart.find(c => c.id === productId);
  const product = state.products.find(p => p.id === productId);
  if(!item) return;
  item.qty = Math.max(1, Math.min(item.qty + delta, product?.stock || 99));
  saveState();
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if(state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="56"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <p>Your cart is empty</p>
        <button class="btn btn-ghost btn-sm" onclick="closeCart();showPage('shop')">Browse Products</button>
      </div>`;
    footer.style.display = 'none';
    return;
  }
  footer.style.display = 'flex';
  let subtotal = 0;
  container.innerHTML = state.cart.map(item => {
    const p = state.products.find(prod => prod.id === item.id);
    if(!p) return '';
    subtotal += p.price * item.qty;
    const imgHTML = p.image
      ? `<img src="${p.image}" alt="${p.name}" onerror="this.style.display='none'" />${categoryIcon(p.category)}`
      : categoryIcon(p.category);
    return `
      <div class="cart-item">
        <div class="cart-item-img">${imgHTML}</div>
        <div class="cart-item-info">
          <p class="cart-item-name">${p.name}</p>
          <p class="cart-item-price">$${p.price.toFixed(2)}</p>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateCartQty('${p.id}',-1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${p.id}',1)">+</button>
            <button class="remove-btn" onclick="removeFromCart('${p.id}')">Remove</button>
          </div>
        </div>
        <strong style="flex-shrink:0;font-size:0.9rem">$${(p.price*item.qty).toFixed(2)}</strong>
      </div>
    `;
  }).join('');

  const shipping = subtotal >= 50 ? 0 : 4.99;
  document.getElementById('cartSubtotal').textContent = '$' + subtotal.toFixed(2);
  document.getElementById('cartShipping').textContent = shipping === 0 ? 'Free' : '$' + shipping.toFixed(2);
  document.getElementById('cartTotal').textContent = '$' + (subtotal + shipping).toFixed(2);
}

function updateCartBadge() {
  const total = state.cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cartBadge').textContent = total;
}

function animateBadge(id) {
  const b = document.getElementById(id);
  b.classList.add('pop');
  setTimeout(() => b.classList.remove('pop'), 300);
}

// ======================== WISHLIST ========================
function toggleWishlist(productId) {
  const idx = state.wishlist.indexOf(productId);
  const product = state.products.find(p => p.id === productId);
  if(idx === -1) {
    state.wishlist.push(productId);
    showToast(`♥ "${product?.name}" saved to wishlist`, 'success');
    animateBadge('wishlistBadge');
  } else {
    state.wishlist.splice(idx, 1);
    showToast(`Removed from wishlist`);
  }
  saveState();
  updateWishlistBadge();
  // Re-render any open page
  if(state.currentPage === 'wishlist') renderWishlistPage();
  if(state.currentPage === 'shop') applyFilters();
  if(state.currentPage === 'home') renderHomePage();
}

function updateWishlistBadge() {
  document.getElementById('wishlistBadge').textContent = state.wishlist.length;
}

function renderWishlistPage() {
  const grid = document.getElementById('wishlistGrid');
  const empty = document.getElementById('emptyWishlist');
  const wishProducts = state.products.filter(p => state.wishlist.includes(p.id));
  if(wishProducts.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    grid.innerHTML = wishProducts.map(p => productCardHTML(p)).join('');
  }
}

// ======================== PRODUCT MODAL ========================
function openProductModal(productId) {
  const p = state.products.find(prod => prod.id === productId);
  if(!p) return;
  state.modalProductId = productId;
  state.modalQty = 1;

  const discount = p.originalPrice ? Math.round((1 - p.price/p.originalPrice)*100) : null;
  const inWishlist = state.wishlist.includes(productId);

  const imgContent = p.image
    ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="modal-img-fallback" style="display:none;font-size:6rem;width:100%;height:100%;align-items:center;justify-content:center;background:${categoryBg(p.category)}">${categoryIcon(p.category)}</div>`
    : `<div class="modal-img-fallback" style="font-size:6rem;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:${categoryBg(p.category)}">${categoryIcon(p.category)}</div>`;

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-img-wrap">${imgContent}</div>
    <div class="modal-info">
      <p class="modal-category">${p.category}</p>
      <h2 class="modal-name">${p.name}</h2>
      <div class="modal-rating">
        <span class="stars" style="font-size:1rem">${renderStars(p.rating)}</span>
        <span style="font-size:0.85rem;color:var(--text-muted)">${p.rating} · ${(p.reviews||0).toLocaleString()} reviews</span>
      </div>
      <div class="modal-price-row">
        <span class="modal-price">$${p.price.toFixed(2)}</span>
        ${p.originalPrice ? `<span class="original-price" style="font-size:1rem">$${p.originalPrice.toFixed(2)}</span>` : ''}
        ${discount ? `<span class="discount-tag">-${discount}%</span>` : ''}
      </div>
      <p class="modal-desc">${p.description}</p>
      ${p.features?.length ? `
        <ul class="modal-features">
          ${p.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      ` : ''}
      <div class="modal-actions">
        <div class="modal-qty-row">
          <div class="qty-control">
            <button class="qty-btn" onclick="changeModalQty(-1)">−</button>
            <span class="qty-num" id="modalQtyDisplay">1</span>
            <button class="qty-btn" onclick="changeModalQty(1)">+</button>
          </div>
          <span class="modal-stock ${p.stock > 0 ? 'stock-in' : 'stock-out'}">
            ${p.stock > 0 ? (p.stock <= 10 ? `Only ${p.stock} left!` : `In Stock`) : 'Out of Stock'}
          </span>
        </div>
        <button class="btn btn-primary" onclick="addToCartFromModal()" ${p.stock === 0 ? 'disabled' : ''}>
          Add to Cart
        </button>
        <button class="btn btn-ghost" onclick="toggleWishlist('${p.id}');this.textContent=state.wishlist.includes('${p.id}') ? '♥ Saved' : '♡ Save to Wishlist'" style="gap:8px">
          ${inWishlist ? '♥ Saved' : '♡ Save to Wishlist'}
        </button>
      </div>
    </div>
  `;

  document.getElementById('productModal').classList.add('open');
  document.getElementById('productOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function changeModalQty(delta) {
  const p = state.products.find(prod => prod.id === state.modalProductId);
  state.modalQty = Math.max(1, Math.min(state.modalQty + delta, p?.stock || 99));
  document.getElementById('modalQtyDisplay').textContent = state.modalQty;
}

function addToCartFromModal() {
  addToCart(state.modalProductId, state.modalQty);
  closeProductModal();
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
  document.getElementById('productOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ======================== CHECKOUT ========================
function openCheckout() {
  if(state.cart.length === 0) { showToast('Your cart is empty', 'error'); return; }
  closeCart();
  state.checkoutStep = 1;
  renderCheckout();
  document.getElementById('checkoutModal').classList.add('open');
  document.getElementById('checkoutOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
  document.getElementById('checkoutOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function renderCheckout() {
  const subtotal = state.cart.reduce((s,c) => {
    const p = state.products.find(pr => pr.id === c.id);
    return s + (p ? p.price * c.qty : 0);
  }, 0);
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const steps = ['Shipping', 'Payment', 'Confirm'];
  const stepsHTML = steps.map((s,i) => `
    <div class="checkout-step ${state.checkoutStep === i+1 ? 'active' : ''} ${state.checkoutStep > i+1 ? 'done' : ''}">${s}</div>
  `).join('');

  const orderItems = state.cart.map(c => {
    const p = state.products.find(pr => pr.id === c.id);
    return p ? `<div class="checkout-order-item"><span>${p.name} x${c.qty}</span><span>$${(p.price*c.qty).toFixed(2)}</span></div>` : '';
  }).join('');

  let stepContent = '';
  if(state.checkoutStep === 1) {
    stepContent = `
      <form class="checkout-form" onsubmit="event.preventDefault();nextCheckoutStep()">
        <div class="form-row">
          <div class="form-field"><label>First Name *</label><input id="co-fname" required placeholder="Alex" /></div>
          <div class="form-field"><label>Last Name *</label><input id="co-lname" required placeholder="Smith" /></div>
        </div>
        <div class="form-field"><label>Email *</label><input id="co-email" type="email" required placeholder="alex@email.com" /></div>
        <div class="form-field"><label>Address *</label><input id="co-address" required placeholder="123 Main Street" /></div>
        <div class="form-row">
          <div class="form-field"><label>City *</label><input id="co-city" required placeholder="New York" /></div>
          <div class="form-field"><label>ZIP Code *</label><input id="co-zip" required placeholder="10001" /></div>
        </div>
        <div class="form-field">
          <label>Country *</label>
          <select id="co-country" required>
            <option>United States</option><option>United Kingdom</option><option>Canada</option><option>Australia</option><option>Germany</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" style="margin-top:8px">Continue to Payment →</button>
      </form>
    `;
  } else if(state.checkoutStep === 2) {
    stepContent = `
      <form class="checkout-form" onsubmit="event.preventDefault();nextCheckoutStep()">
        <div class="form-field"><label>Cardholder Name *</label><input required placeholder="Alex Smith" /></div>
        <div class="form-field"><label>Card Number *</label><input required placeholder="4242 4242 4242 4242" maxlength="19" oninput="this.value=this.value.replace(/[^0-9 ]/g,'').replace(/(.{4})/g,'$1 ').trim()" /></div>
        <div class="form-row">
          <div class="form-field"><label>Expiry *</label><input required placeholder="MM/YY" maxlength="5" /></div>
          <div class="form-field"><label>CVV *</label><input required placeholder="123" maxlength="4" type="password" /></div>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-ghost" onclick="state.checkoutStep=1;renderCheckout()">← Back</button>
          <button type="submit" class="btn btn-primary" style="flex:1">Review Order →</button>
        </div>
      </form>
    `;
  } else if(state.checkoutStep === 3) {
    stepContent = `
      <div class="checkout-order-summary">
        <h4>Order Summary</h4>
        ${orderItems}
        <div class="checkout-order-item"><span>Shipping</span><span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span></div>
        <div class="checkout-total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-ghost" onclick="state.checkoutStep=2;renderCheckout()">← Back</button>
        <button class="btn btn-primary" style="flex:1" onclick="placeOrder()">Place Order ✓</button>
      </div>
    `;
  } else if(state.checkoutStep === 4) {
    stepContent = `
      <div class="success-screen">
        <div class="success-icon">🎉</div>
        <h3>Order Placed!</h3>
        <p style="margin-bottom:8px">Thank you for your purchase. Your order is confirmed.</p>
        <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:28px">Order #NX-${Math.random().toString(36).substr(2,8).toUpperCase()}</p>
        <button class="btn btn-primary" onclick="closeCheckout();showPage('home')">Continue Shopping</button>
      </div>
    `;
  }

  document.getElementById('checkoutContent').innerHTML = `
    <h2 class="checkout-title">Checkout</h2>
    <p class="checkout-sub">${state.checkoutStep < 4 ? 'Step ' + state.checkoutStep + ' of 3' : 'All done!'}</p>
    ${state.checkoutStep < 4 ? `<div class="checkout-steps">${stepsHTML}</div>` : ''}
    ${stepContent}
  `;
}

function nextCheckoutStep() {
  if(state.checkoutStep < 4) state.checkoutStep++;
  renderCheckout();
}

function placeOrder() {
  const subtotal = state.cart.reduce((s,c) => {
    const p = state.products.find(pr => pr.id === c.id);
    return s + (p ? p.price * c.qty : 0);
  }, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  state.orders.push({
    id: Math.random().toString(36).substring(7),
    total: total,
    date: new Date().toISOString()
  });

  state.cart = [];
  saveState();
  updateCartBadge();
  state.checkoutStep = 4;
  renderCheckout();
}

// ======================== ADMIN PANEL ========================
let salesChartInstance = null;

function renderAdminPage() {
  // Stats
  const totalProducts = state.products.length;
  const totalRevenue = state.orders.reduce((s,o) => s + o.total, 0);
  const totalStock = state.products.reduce((s, p) => s + p.stock, 0);
  const outOfStock = state.products.filter(p => p.stock === 0).length;

  document.getElementById('adminStats').innerHTML = `
    <div class="admin-stat-card"><div class="stat-label">Total Products</div><div class="stat-val accent">${totalProducts}</div></div>
    <div class="admin-stat-card"><div class="stat-label">Total Revenue</div><div class="stat-val success">$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</div></div>
    <div class="admin-stat-card"><div class="stat-label">Total Orders</div><div class="stat-val">${state.orders.length}</div></div>
    <div class="admin-stat-card"><div class="stat-label">Out of Stock</div><div class="stat-val warning">${outOfStock}</div></div>
  `;

  renderAdminChart();
  renderAdminTable(state.products);
}

function renderAdminChart() {
  const ctx = document.getElementById('salesChart');
  if(!ctx) return;

  // Group orders by date (last 7 days)
  const last7Days = [];
  const salesData = [];
  const now = new Date();
  
  for(let i=6; i>=0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    last7Days.push(d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }));
    
    const daySales = state.orders
      .filter(o => o.date.startsWith(dateStr))
      .reduce((s, o) => s + o.total, 0);
    salesData.push(daySales);
  }

  if (salesChartInstance) {
    salesChartInstance.destroy();
  }

  salesChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: last7Days,
      datasets: [{
        label: 'Revenue ($)',
        data: salesData,
        borderColor: '#087f98',
        backgroundColor: 'rgba(8,127,152,0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
        x: { grid: { display: false } }
      }
    }
  });
}

function renderAdminTable(products) {
  document.getElementById('adminProductCount').textContent = products.length;
  const tbody = document.getElementById('adminTableBody');
  if(products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted)">No products found</td></tr>`;
    return;
  }
  tbody.innerHTML = products.map(p => {
    const stockBadge = p.stock === 0
      ? `<span class="stock-badge stock-none">Out of Stock</span>`
      : p.stock <= 10
        ? `<span class="stock-badge stock-low-badge">${p.stock} low</span>`
        : `<span class="stock-badge stock-ok">${p.stock}</span>`;

    const iconHTML = p.image
      ? `<div class="admin-product-icon"><img src="${p.image}" alt="${p.name}" onerror="this.style.display='none'" /></div>`
      : `<div class="admin-product-icon" style="background:${categoryBg(p.category)}">${categoryIcon(p.category)}</div>`;

    return `
      <tr>
        <td>
          <div class="admin-product-cell">
            ${iconHTML}
            <div>
              <div class="admin-product-name">${p.name}</div>
              ${p.badge ? `<span class="card-badge ${badgeClass(p.badge)}" style="position:static;display:inline-block;margin-top:4px">${p.badge}</span>` : ''}
            </div>
          </div>
        </td>
        <td><span class="cat-tag">${p.category}</span></td>
        <td style="font-weight:600;color:var(--text-primary)">$${p.price.toFixed(2)}</td>
        <td>${stockBadge}</td>
        <td>
          <span class="stars" style="font-size:0.8rem">${renderStars(p.rating)}</span>
          <span style="font-size:0.75rem;color:var(--text-muted)"> ${p.rating}</span>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn btn-sm btn-ghost" onclick="editProduct('${p.id}')">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteProduct('${p.id}')">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function filterAdminProducts(q) {
  const lower = q.toLowerCase();
  const filtered = state.products.filter(p =>
    p.name.toLowerCase().includes(lower) ||
    p.category.toLowerCase().includes(lower)
  );
  renderAdminTable(filtered);
}

function saveProduct(e) {
  e.preventDefault();
  const id = document.getElementById('editProductId').value;
  const name = document.getElementById('pName').value.trim();
  const category = document.getElementById('pCategory').value;
  const price = parseFloat(document.getElementById('pPrice').value);
  const originalPrice = parseFloat(document.getElementById('pOriginalPrice').value) || null;
  const stock = parseInt(document.getElementById('pStock').value);
  const rating = parseFloat(document.getElementById('pRating').value) || 4.0;
  const badge = document.getElementById('pBadge').value;
  const color = document.getElementById('pColor').value;
  const description = document.getElementById('pDescription').value.trim();
  const featuresRaw = document.getElementById('pFeatures').value.trim();
  const features = featuresRaw ? featuresRaw.split('\n').map(f => f.trim()).filter(Boolean) : [];
  const image = document.getElementById('pImage').value.trim();

  if(id) {
    // Edit existing
    const idx = state.products.findIndex(p => p.id === id);
    if(idx !== -1) {
      state.products[idx] = { ...state.products[idx], name, category, price, originalPrice, stock, rating, badge, color, description, features, image };
      showToast('✓ Product updated successfully', 'success');
    }
  } else {
    // New product
    const newProd = {
      id: 'p' + Date.now(),
      name, category, price, originalPrice, stock, rating, badge, color, description, features, image,
      reviews: 0, featured: false, isBestSeller: false, isNew: true,
      createdAt: Date.now()
    };
    state.products.unshift(newProd);
    showToast('✓ Product added successfully', 'success');
  }

  saveState();
  resetForm();
  renderAdminPage();
  renderHomePage();
}

function editProduct(productId) {
  const p = state.products.find(prod => prod.id === productId);
  if(!p) return;
  document.getElementById('editProductId').value = p.id;
  document.getElementById('pName').value = p.name;
  document.getElementById('pCategory').value = p.category;
  document.getElementById('pPrice').value = p.price;
  document.getElementById('pOriginalPrice').value = p.originalPrice || '';
  document.getElementById('pStock').value = p.stock;
  document.getElementById('pRating').value = p.rating;
  document.getElementById('pBadge').value = p.badge || '';
  document.getElementById('pColor').value = p.color || '#6366f1';
  document.getElementById('pDescription').value = p.description;
  document.getElementById('pFeatures').value = (p.features || []).join('\n');
  document.getElementById('pImage').value = p.image || '';
  document.getElementById('formTitle').textContent = 'Edit Product';
  document.getElementById('saveBtn').textContent = 'Update Product';
  document.querySelector('.admin-card').scrollIntoView({ behavior: 'smooth' });
}

function deleteProduct(productId) {
  const p = state.products.find(prod => prod.id === productId);
  if(!p) return;
  if(!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
  state.products = state.products.filter(prod => prod.id !== productId);
  state.cart = state.cart.filter(c => c.id !== productId);
  state.wishlist = state.wishlist.filter(id => id !== productId);
  saveState();
  showToast(`"${p.name}" deleted`, 'error');
  renderAdminPage();
  renderHomePage();
}

function resetForm() {
  document.getElementById('productForm').reset();
  document.getElementById('editProductId').value = '';
  document.getElementById('formTitle').textContent = 'Add New Product';
  document.getElementById('saveBtn').textContent = 'Add Product';
  document.getElementById('pColor').value = '#6366f1';
}

// ======================== NEWSLETTER ========================
function subscribeNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  showToast(`✓ ${email} subscribed! Thank you.`, 'success');
  document.getElementById('newsletterEmail').value = '';
}

// ======================== INIT ========================
// ======================== BANNER CAROUSEL ========================
let carouselIndex = 0;
let carouselTimer = null;
const CAROUSEL_INTERVAL = 4500; // ms

function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dotsContainer = document.getElementById('carouselDots');
  if (!slides.length || !dotsContainer) return;

  // Create dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to banner ${i + 1}`);
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  });

  // Auto-play
  startCarouselTimer();

  // Pause on hover
  const carousel = document.querySelector('.banner-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(carouselTimer));
    carousel.addEventListener('mouseleave', () => startCarouselTimer());
  }
}

function startCarouselTimer() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => carouselNext(), CAROUSEL_INTERVAL);
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!slides.length) return;

  slides[carouselIndex].classList.remove('active');
  if (dots[carouselIndex]) dots[carouselIndex].classList.remove('active');

  carouselIndex = ((index % slides.length) + slides.length) % slides.length;

  slides[carouselIndex].classList.add('active');
  if (dots[carouselIndex]) dots[carouselIndex].classList.add('active');
}

function carouselNext() {
  goToSlide(carouselIndex + 1);
}

function carouselPrev() {
  goToSlide(carouselIndex - 1);
}

// ======================== INIT ========================
function init() {
  loadState();
  renderHomePage();
  updateCartBadge();
  updateWishlistBadge();
  initCarousel();

  // Keyboard nav for cards
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') {
      closeProductModal();
      closeCheckout();
      closeCart();
    }
  });

  // Keyboard support for cards
  document.addEventListener('keydown', e => {
    if(e.key === 'Enter' && e.target.classList.contains('product-card')) {
      e.target.click();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);

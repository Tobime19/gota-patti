// ============================================================================
// GOTA PATTI — Global Product Catalog, Cart, Detail View, Checkout & Auth
// ============================================================================

const CART_KEY = 'gota_patti_cart';
const USER_KEY = 'gota_patti_user';
const CHECKOUT_DRAFT_KEY = 'gota_patti_checkout_draft';

// Configuration structure for backend & payment gateway integration.
// Leaving apiEndpoint and publicKey null ensures no fake order confirmation
// or fake payment success is ever shown when backend integration is absent.
window.GOTA_PATTI_CHECKOUT_CONFIG = {
  apiEndpoint: null,       // e.g. 'https://api.gotapatti-atelier.com/v1/orders'
  paymentProvider: null,   // e.g. 'razorpay' or 'stripe'
  paymentPublicKey: null,  // e.g. 'rzp_live_...' or 'pk_live_...'
  currency: 'INR'
};

// Canonical Product Catalog
window.GOTA_PATTI_PRODUCTS = [
  {
    id: 'gp-109',
    title: 'The Shekhawati Tree of Life Odhni',
    category: 'Apparel',
    type: 'Odhni / Drape',
    color: 'Crimson & Maroon',
    colorHex: '#6b0f1a',
    price: 88000,
    priceFormatted: '₹88,000',
    featuredRank: 1,
    dateAdded: '2025-02-18',
    img: './images/products/odhni-tree-of-life.jpg',
    material: 'Handspun Crimson Mulberry Silk • 24k Gilded Gota Tukdi & Zardozi',
    origin: 'Jaipur Guild, Rajasthan',
    hours: '78 Artisan Hours',
    shortDesc: 'Deep crimson handspun mulberry silk embroidered with beaten-gold Gota Patti leaves in traditional Shekhawati arboreal motifs.',
    description: 'Handcrafted in Jaipur by Master Artisan Radha Devi, this heirloom Odhni features over 3,200 hand-folded diamond-shaped gilded ribbons arranged into the sacred Tree of Life canopy, framed by serrated Bijia borders.'
  },
  {
    id: 'gp-204',
    title: 'Lotus Rosette Raw Silk Potli',
    category: 'Accessories',
    type: 'Potli Bag',
    color: 'Ivory & Gold',
    colorHex: '#f3ead8',
    price: 16500,
    priceFormatted: '₹16,500',
    featuredRank: 2,
    dateAdded: '2025-03-05',
    img: './images/products/potli-lotus-rosette.jpg',
    material: 'Undyed Raw Mulberry Silk • Phool Patti Appliqué & Basra Seed Pearls',
    origin: 'Atelier Nayla, Jaipur',
    hours: '22 Artisan Hours',
    shortDesc: 'Sculpted petals of brushed antique gold ribbon clustered around natural seed pearls with a braided zari drawcord.',
    description: 'Each lotus rosette is individually folded from 92.5% silver-core metallic ribbon dipped in a 24k gold bath, hand-tacked onto raw ivory silk and finished with hand-knotted zari tassels.'
  },
  {
    id: 'gp-312',
    title: 'Chevron Lappa Chanderi Kurta',
    category: 'Apparel',
    type: 'Chanderi Kurta',
    color: 'Chanderi Gold & Beige',
    colorHex: '#d4b483',
    price: 34000,
    priceFormatted: '₹34,000',
    featuredRank: 3,
    dateAdded: '2025-01-25',
    img: './images/products/kurta-chevron-lappa.jpg',
    material: 'Handwoven Silk-Cotton Chanderi • Antique Gold & Silver Lappa Inset',
    origin: 'Raw Mango Archive Collaboration',
    hours: '36 Artisan Hours',
    shortDesc: 'Pit-loom Chanderi silk-cotton tunic inlaid with geometric chevron Lappa metallic ribbons across the yoke, cuffs, and hem.',
    description: 'Woven on traditional pit looms in Chanderi, this architectural kurta incorporates continuous unrolled Lappa metallic tape stitched with gossamer zari thread across the neckline, cuffs, and border.'
  },
  {
    id: 'gp-508',
    title: 'Keri Motif Handcrafted Bridal Lehenga',
    category: 'Apparel',
    type: 'Bridal Lehenga',
    color: 'Crimson & Maroon',
    colorHex: '#4a0714',
    price: 245000,
    priceFormatted: '₹2,45,000',
    featuredRank: 4,
    dateAdded: '2025-02-02',
    img: './images/products/lehenga-keri-motif.jpg',
    material: 'Deep Maroon Silk Velvet • Dimensional Keri Patti & Tankaayi Zardozi',
    origin: 'Amber Heritage Atelier, Jaipur',
    hours: '210 Artisan Hours',
    shortDesc: 'Sixteen-kali maroon silk velvet bridal lehenga richly embroidered with royal Keri paisley medallions and tiered floral borders.',
    description: 'Created over 210 hours by three master karigars in Amber, this collector bridal lehenga pairs plush maroon silk velvet with dense hand-folded Keri motifs anchored by micro gold-wire Tankaayi stitches.'
  },
  {
    id: 'gp-442',
    title: 'Suraj Solar Disc Silk Cushion Cover',
    category: 'Home & Décor',
    type: 'Cushion Cover',
    color: 'Chanderi Gold & Beige',
    colorHex: '#cbb389',
    price: 12000,
    priceFormatted: '₹12,000',
    featuredRank: 5,
    dateAdded: '2024-12-19',
    img: './images/products/cushion-suraj-solar.jpg',
    material: 'Wild Tussar Silk • 64-Ray Suraj Chakra Gota Appliqué',
    origin: 'Grassroot Artisan Guild, Jaipur',
    hours: '18 Artisan Hours',
    shortDesc: 'Handspun sand-beige tussar silk cushion cover centered with a radiant 64-ray Rajput solar medallion in folded gold ribbon.',
    description: 'Inspired by the solar emblems of Jaipur palace facades, 64 tapering rays of hand-beaten metallic ribbon converge around a multi-layered lotus center on slubbed wild tussar silk.'
  },
  {
    id: 'gp-188',
    title: 'Bijia-Edged Organza Dupatta',
    category: 'Apparel',
    type: 'Organza Dupatta',
    color: 'Blush Rose',
    colorHex: '#e4bfb8',
    price: 24000,
    priceFormatted: '₹24,000',
    featuredRank: 6,
    dateAdded: '2025-01-12',
    img: './images/products/dupatta-bijia-organza.jpg',
    material: 'Pure Mulberry Silk Organza • Serrated Bijia Border & Floral Butis',
    origin: 'Atelier Nayla, Shekhawati',
    hours: '32 Artisan Hours',
    shortDesc: 'Gossamer blush-rose silk organza framed with continuous folded triangular Bijia gold edging and scattered four-petal butis.',
    description: 'Delicate translucent silk organza finished along all four borders with hand-folded triangular Bijia ribbon teeth that prevent fraying while catching warm ambient light.'
  },
  {
    id: 'gp-721',
    title: 'Archival Jaipur Peepal Leaf Wall Panel',
    category: 'Craft Objects',
    type: 'Framed Textile Art',
    color: 'Midnight Indigo',
    colorHex: '#162238',
    price: 62000,
    priceFormatted: '₹62,000',
    featuredRank: 7,
    dateAdded: '2024-11-28',
    img: './images/products/wall-panel-peepal.jpg',
    material: 'Indigo Dyed Raw Silk • 24k Gold Leaf Ribbon in Walnut Shadow-Box',
    origin: 'Jaipur Master Guild',
    hours: '54 Artisan Hours',
    shortDesc: 'Museum-framed botanical textile study crafted from continuous folded gold ribbons set against natural indigo raw silk.',
    description: 'Mounted in a conservation-grade dark walnut frame, this botanical study showcases 18th-century Kachhwaha court single-ribbon folding techniques forming the intricate venation of a sacred Peepal leaf.'
  },
  {
    id: 'gp-602',
    title: 'Hand-Folded Metallic Ribbon Mojaris',
    category: 'Accessories',
    type: 'Handcrafted Footwear',
    color: 'Camel & Tan',
    colorHex: '#9c5a25',
    price: 14500,
    priceFormatted: '₹14,500',
    featuredRank: 8,
    dateAdded: '2024-11-10',
    img: './images/products/mojaris-metallic-ribbon.jpg',
    material: 'Vegetable-Tanned Camel Leather • Seekhi Jaal Gota Lattice',
    origin: 'Johari Bazaar Guild, Jaipur',
    hours: '19 Artisan Hours',
    shortDesc: 'Traditional curved-toe leather mojaris embroidered across the vamp and heel with an interlocking geometric Gota Patti lattice.',
    description: 'Shaped over wooden lasts using supple vegetable-tanned leather, each pair is hand-embroidered with an interlocking rhomboid jaal of antique gold and silver Gota ribbons.'
  }
];

function findProduct(idOrTitle) {
  if (!idOrTitle) return null;
  const q = String(idOrTitle).trim().toLowerCase();
  return window.GOTA_PATTI_PRODUCTS.find(
    p => p.id.toLowerCase() === q || p.title.toLowerCase() === q
  ) || null;
}

function parseNumericPrice(priceVal) {
  if (typeof priceVal === 'number') return priceVal;
  return parseInt(String(priceVal || '0').replace(/[^0-9]/g, ''), 10) || 0;
}

function formatINR(amount) {
  return '₹' + (Number(amount) || 0).toLocaleString('en-IN');
}

// ==========================================
// Cart Persistence & Calculations
// ==========================================

function getCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    return raw.map(item => {
      const catalogMatch = findProduct(item.id || item.title);
      const unitPrice = parseNumericPrice(item.unitPrice || item.price || (catalogMatch && catalogMatch.price));
      return {
        id: item.id || (catalogMatch ? catalogMatch.id : item.title),
        title: item.title || (catalogMatch ? catalogMatch.title : 'Gota Patti Piece'),
        price: formatINR(unitPrice),
        unitPrice: unitPrice,
        img: item.img || (catalogMatch ? catalogMatch.img : ''),
        category: item.category || (catalogMatch ? catalogMatch.category : ''),
        qty: Math.max(1, parseInt(item.qty, 10) || 1)
      };
    });
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function calculateCartTotals(cartInput) {
  const cart = cartInput || getCart();
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + (parseNumericPrice(i.unitPrice || i.price) * i.qty), 0);
  const shipping = 0; // Complimentary insured archival courier
  const total = subtotal + shipping;
  return { itemCount, subtotal, shipping, total };
}

function addToCart(item, quantity = 1) {
  const qtyToAdd = Math.max(1, parseInt(quantity, 10) || 1);
  const catalogMatch = findProduct(item.id || item.title);
  const title = item.title || (catalogMatch ? catalogMatch.title : 'Gota Patti Archival Piece');
  const unitPrice = parseNumericPrice(item.unitPrice || item.price || (catalogMatch && catalogMatch.price));
  const img = item.img || (catalogMatch ? catalogMatch.img : '');
  const id = item.id || (catalogMatch ? catalogMatch.id : title);
  const category = item.category || (catalogMatch ? catalogMatch.category : '');

  const cart = getCart();
  const existing = cart.find(i => i.id === id || i.title === title);
  if (existing) {
    existing.qty += qtyToAdd;
    existing.unitPrice = unitPrice;
    existing.price = formatINR(unitPrice);
    if (img) existing.img = img;
  } else {
    cart.push({
      id,
      title,
      price: formatINR(unitPrice),
      unitPrice,
      img,
      category,
      qty: qtyToAdd
    });
  }
  saveCart(cart);
  showToast(`Added ${qtyToAdd > 1 ? qtyToAdd + ' × ' : ''}"${title}" to bag`);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartModalContent();
  renderCheckoutSummary();
}

function updateQty(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart(cart);
  renderCartModalContent();
  renderCheckoutSummary();
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.getCart = getCart;
window.calculateCartTotals = calculateCartTotals;

// ==========================================
// User Auth State
// ==========================================

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null;
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
  updateAuthUI();
}

// ==========================================
// Toast Notification
// ==========================================

function showToast(message) {
  let toast = document.getElementById('gp-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'gp-toast';
    toast.className = 'fixed bottom-6 right-6 z-[250] bg-[#3d020d] text-[#fff9ef] px-5 py-3.5 shadow-2xl border border-[#c5a059]/40 font-label text-xs tracking-wider uppercase transition-all duration-300 opacity-0 translate-y-4 pointer-events-none flex items-center gap-3';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="material-symbols-outlined text-[#ffd778] text-base">check_circle</span><span>${message}</span>`;
  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');
  });
  clearTimeout(window._gpToastTimer);
  window._gpToastTimer = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
  }, 2800);
}
window.showToast = showToast;

// ==========================================
// Header Badge & Auth Label Updates
// ==========================================

function updateCartUI() {
  const { itemCount } = calculateCartTotals();
  document.querySelectorAll('.gp-cart-badge').forEach(badge => {
    badge.textContent = itemCount;
    badge.style.display = itemCount > 0 ? 'flex' : 'none';
  });
}

function updateAuthUI() {
  const user = getCurrentUser();
  document.querySelectorAll('.gp-auth-label').forEach(el => {
    if (user && user.name) {
      el.textContent = user.name.split(' ')[0].toUpperCase();
    } else {
      el.textContent = '';
    }
  });
}

// ==========================================
// Inject Global Modals (Product Detail, Cart Drawer, Checkout Modal, Auth Modal)
// ==========================================

function injectModals() {
  if (document.getElementById('gp-modals-container')) return;

  const container = document.createElement('div');
  container.id = 'gp-modals-container';
  container.innerHTML = `
    <!-- PRODUCT DETAIL MODAL -->
    <div id="gp-product-detail-modal" class="fixed inset-0 z-[160] hidden items-center justify-center p-4 sm:p-6">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeProductDetail()"></div>
      <div class="relative bg-[#fff9ef] text-[#1d1b16] w-full max-w-4xl shadow-2xl border border-[#c5a059]/30 z-10 overflow-hidden max-h-[92vh] flex flex-col md:flex-row">
        <button type="button" onclick="closeProductDetail()" aria-label="Close Product Detail" class="absolute top-4 right-4 z-20 w-9 h-9 bg-[#fff9ef]/90 text-[#3d020d] hover:bg-[#3d020d] hover:text-[#fff9ef] flex items-center justify-center transition-colors border border-[#c5a059]/30">
          <span class="material-symbols-outlined text-lg">close</span>
        </button>
        <div id="gp-product-detail-body" class="w-full flex flex-col md:flex-row overflow-y-auto"></div>
      </div>
    </div>

    <!-- CART DRAWER -->
    <div id="gp-cart-modal" class="fixed inset-0 z-[170] hidden">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeCartModal()"></div>
      <div class="absolute right-0 top-0 h-full w-full max-w-md bg-[#fff9ef] text-[#1d1b16] shadow-2xl border-l border-[#c5a059]/30 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
        <div>
          <div class="flex items-center justify-between border-b border-[#c5a059]/30 pb-5 mb-6">
            <div>
              <span class="text-[11px] font-medium tracking-[0.2em] uppercase text-[#735b25] block">Shopping Bag</span>
              <h3 class="text-xl font-semibold text-[#3d020d] mt-0.5">Your Selection</h3>
            </div>
            <button type="button" onclick="closeCartModal()" aria-label="Close Bag" class="text-[#3d020d] hover:text-[#735b25] p-1">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div id="gp-cart-items" class="space-y-5"></div>
        </div>
        <div id="gp-cart-footer" class="border-t border-[#c5a059]/30 pt-5 mt-6"></div>
      </div>
    </div>

    <!-- CHECKOUT MODAL -->
    <div id="gp-checkout-modal" class="fixed inset-0 z-[180] hidden items-center justify-center p-3 sm:p-6">
      <div class="absolute inset-0 bg-black/65 backdrop-blur-sm" onclick="closeCheckoutModal()"></div>
      <div class="relative bg-[#fff9ef] text-[#1d1b16] w-full max-w-4xl shadow-2xl border border-[#c5a059]/40 z-10 max-h-[92vh] overflow-y-auto p-6 sm:p-10">
        <div class="flex items-center justify-between border-b border-[#c5a059]/30 pb-4 mb-6">
          <div>
            <span class="text-[11px] font-medium tracking-[0.2em] uppercase text-[#735b25] block">Gota Patti — Atelier Checkout</span>
            <h3 class="text-2xl font-semibold text-[#3d020d] mt-0.5">Customer &amp; Delivery Details</h3>
          </div>
          <button type="button" onclick="closeCheckoutModal()" aria-label="Close Checkout" class="text-[#3d020d] hover:text-[#735b25] p-1">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Checkout Form -->
          <form id="gp-checkout-form" onsubmit="handleCheckoutSubmit(event)" class="lg:col-span-7 space-y-5">
            <div>
              <h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-[#3d020d] mb-3">1. Contact Information</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                  <label for="chk-name" class="block text-xs font-medium text-[#4a3c3d] mb-1">Full Name *</label>
                  <input id="chk-name" name="fullName" type="text" required placeholder="Arundhati Rathore" class="w-full bg-white border border-[#d9c1c1] px-3.5 py-2.5 text-sm text-[#1d1b16] focus:outline-none focus:border-[#3d020d]"/>
                </div>
                <div>
                  <label for="chk-email" class="block text-xs font-medium text-[#4a3c3d] mb-1">Email Address *</label>
                  <input id="chk-email" name="email" type="email" required placeholder="arundhati@example.com" class="w-full bg-white border border-[#d9c1c1] px-3.5 py-2.5 text-sm text-[#1d1b16] focus:outline-none focus:border-[#3d020d]"/>
                </div>
                <div>
                  <label for="chk-phone" class="block text-xs font-medium text-[#4a3c3d] mb-1">Phone Number *</label>
                  <input id="chk-phone" name="phone" type="tel" required placeholder="+91 98290 00000" class="w-full bg-white border border-[#d9c1c1] px-3.5 py-2.5 text-sm text-[#1d1b16] focus:outline-none focus:border-[#3d020d]"/>
                </div>
              </div>
            </div>

            <div class="pt-2 border-t border-[#c5a059]/20">
              <h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-[#3d020d] mb-3">2. Delivery Address</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                  <label for="chk-address1" class="block text-xs font-medium text-[#4a3c3d] mb-1">Street Address / House No. *</label>
                  <input id="chk-address1" name="addressLine1" type="text" required placeholder="14, Civil Lines, Hawa Sadak" class="w-full bg-white border border-[#d9c1c1] px-3.5 py-2.5 text-sm text-[#1d1b16] focus:outline-none focus:border-[#3d020d]"/>
                </div>
                <div class="sm:col-span-2">
                  <label for="chk-address2" class="block text-xs font-medium text-[#4a3c3d] mb-1">Apartment, Suite, or Landmark (Optional)</label>
                  <input id="chk-address2" name="addressLine2" type="text" placeholder="Near Rambagh Circle" class="w-full bg-white border border-[#d9c1c1] px-3.5 py-2.5 text-sm text-[#1d1b16] focus:outline-none focus:border-[#3d020d]"/>
                </div>
                <div>
                  <label for="chk-city" class="block text-xs font-medium text-[#4a3c3d] mb-1">City *</label>
                  <input id="chk-city" name="city" type="text" required placeholder="Jaipur" class="w-full bg-white border border-[#d9c1c1] px-3.5 py-2.5 text-sm text-[#1d1b16] focus:outline-none focus:border-[#3d020d]"/>
                </div>
                <div>
                  <label for="chk-state" class="block text-xs font-medium text-[#4a3c3d] mb-1">State / Province *</label>
                  <input id="chk-state" name="state" type="text" required placeholder="Rajasthan" class="w-full bg-white border border-[#d9c1c1] px-3.5 py-2.5 text-sm text-[#1d1b16] focus:outline-none focus:border-[#3d020d]"/>
                </div>
                <div>
                  <label for="chk-pin" class="block text-xs font-medium text-[#4a3c3d] mb-1">PIN / Postal Code *</label>
                  <input id="chk-pin" name="postalCode" type="text" required pattern="[0-9A-Za-z -]{4,10}" placeholder="302006" class="w-full bg-white border border-[#d9c1c1] px-3.5 py-2.5 text-sm text-[#1d1b16] focus:outline-none focus:border-[#3d020d]"/>
                </div>
                <div>
                  <label for="chk-country" class="block text-xs font-medium text-[#4a3c3d] mb-1">Country *</label>
                  <input id="chk-country" name="country" type="text" required value="India" class="w-full bg-white border border-[#d9c1c1] px-3.5 py-2.5 text-sm text-[#1d1b16] focus:outline-none focus:border-[#3d020d]"/>
                </div>
                <div class="sm:col-span-2">
                  <label for="chk-notes" class="block text-xs font-medium text-[#4a3c3d] mb-1">Delivery or Custom Sizing Notes (Optional)</label>
                  <textarea id="chk-notes" name="notes" rows="2" placeholder="Special delivery instructions or custom measurement notes..." class="w-full bg-white border border-[#d9c1c1] px-3.5 py-2 text-sm text-[#1d1b16] focus:outline-none focus:border-[#3d020d]"></textarea>
                </div>
              </div>
            </div>

            <div id="gp-checkout-status-box" class="hidden"></div>

            <div class="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button type="button" onclick="backToCartFromCheckout()" class="w-full sm:w-auto px-5 py-3.5 border border-[#3d020d]/40 text-[#3d020d] text-xs font-medium uppercase tracking-[0.14em] hover:bg-[#f3ede4] transition-colors">
                ← Back to Bag
              </button>
              <button type="submit" class="w-full sm:flex-1 bg-[#3d020d] text-[#fff9ef] py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#5a1720] transition-colors">
                Continue to Payment
              </button>
            </div>
          </form>

          <!-- Order Summary Column -->
          <div class="lg:col-span-5 bg-[#f3ede4] p-6 border border-[#c5a059]/30 flex flex-col justify-between h-fit">
            <div>
              <h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-[#3d020d] pb-3 border-b border-[#c5a059]/25">Order Summary</h4>
              <div id="gp-checkout-items" class="divide-y divide-[#c5a059]/20 my-4 max-h-64 overflow-y-auto pr-1"></div>
            </div>
            <div id="gp-checkout-totals" class="border-t border-[#c5a059]/30 pt-4 space-y-2 text-sm"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- AUTH MODAL (SIGN IN / SIGN UP) -->
    <div id="gp-auth-modal" class="fixed inset-0 z-[190] hidden items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeAuthModal()"></div>
      <div class="relative bg-[#fff9ef] text-[#1d1b16] w-full max-w-md p-8 shadow-2xl border border-[#c5a059]/40 z-10">
        <button type="button" onclick="closeAuthModal()" class="absolute top-5 right-5 text-[#3d020d] hover:text-[#735b25]">
          <span class="material-symbols-outlined">close</span>
        </button>
        <div id="gp-auth-body"></div>
      </div>
    </div>
  `;
  document.body.appendChild(container);
}

// ==========================================
// Product Detail Modal Functions
// ==========================================

let activeDetailProduct = null;
let activeDetailQty = 1;

window.openProductDetail = function(productIdOrTitle) {
  injectModals();
  const product = findProduct(productIdOrTitle);
  if (!product) return;

  activeDetailProduct = product;
  activeDetailQty = 1;
  renderProductDetailContent();

  const modal = document.getElementById('gp-product-detail-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

// Keep backwards compatibility with openQuickLook calls
window.openQuickLook = function(title, price, meta, desc, img) {
  const existing = findProduct(title);
  if (existing) {
    window.openProductDetail(existing.id);
    return;
  }
  injectModals();
  activeDetailProduct = {
    id: title,
    title: title,
    category: 'Curated Archive',
    type: 'Handcrafted Piece',
    color: 'Antique Gold',
    price: parseNumericPrice(price),
    priceFormatted: price,
    img: img || './images/products/odhni-tree-of-life.jpg',
    material: meta || 'Pure Silk & 24k Gilded Gota Ribbon',
    origin: 'Jaipur Guild, Rajasthan',
    hours: 'Archival Craft',
    description: desc || ''
  };
  activeDetailQty = 1;
  renderProductDetailContent();
  const modal = document.getElementById('gp-product-detail-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeProductDetail = function() {
  const modal = document.getElementById('gp-product-detail-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};
window.closeQuickLook = window.closeProductDetail;

window.changeDetailQty = function(delta) {
  activeDetailQty = Math.max(1, Math.min(10, activeDetailQty + delta));
  const qtyEl = document.getElementById('gp-detail-qty-val');
  if (qtyEl) qtyEl.textContent = activeDetailQty;
};

window.addDetailProductToCart = function(openCheckoutImmediately = false) {
  if (!activeDetailProduct) return;
  addToCart(activeDetailProduct, activeDetailQty);
  closeProductDetail();
  if (openCheckoutImmediately) {
    openCheckoutModal();
  } else {
    openCartModal();
  }
};

function renderProductDetailContent() {
  const body = document.getElementById('gp-product-detail-body');
  if (!body || !activeDetailProduct) return;
  const p = activeDetailProduct;

  body.innerHTML = `
    <div class="w-full md:w-1/2 bg-[#f3ede4] relative aspect-[3/4] md:aspect-auto md:min-h-[480px]">
      <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover object-center"/>
      <span class="absolute top-4 left-4 bg-[#fff9ef]/95 text-[#3d020d] text-[11px] font-medium uppercase tracking-[0.14em] px-3 py-1 border border-[#c5a059]/30">
        ${p.category}
      </span>
    </div>
    <div class="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-[#fff9ef]">
      <div class="space-y-4">
        <div class="flex items-center justify-between text-xs text-[#735b25] font-medium uppercase tracking-[0.14em]">
          <span>${p.origin}</span>
          <span>${p.hours}</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-semibold text-[#3d020d] leading-tight">${p.title}</h2>
        <div class="text-2xl font-bold text-[#3d020d]">${p.priceFormatted || formatINR(p.price)}</div>
        <p class="text-sm text-[#4a3c3d] leading-relaxed pt-1">${p.description}</p>

        <div class="bg-[#f3ede4] p-4 border border-[#c5a059]/25 space-y-2 mt-4">
          <div class="flex justify-between text-xs">
            <span class="text-[#4a3c3d] font-medium">Material &amp; Craft</span>
            <span class="text-[#1d1b16] font-semibold text-right">${p.material}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-[#4a3c3d] font-medium">Colour Palette</span>
            <span class="text-[#1d1b16] font-semibold">${p.color}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-[#4a3c3d] font-medium">Authenticity</span>
            <span class="text-[#3d020d] font-semibold">GI Certified Handcrafted Zari</span>
          </div>
        </div>
      </div>

      <div class="pt-6 mt-6 border-t border-[#c5a059]/25 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium uppercase tracking-[0.14em] text-[#4a3c3d]">Quantity</span>
          <div class="inline-flex items-center border border-[#c5a059]/50 bg-white">
            <button type="button" onclick="changeDetailQty(-1)" class="w-9 h-9 flex items-center justify-center text-sm font-semibold text-[#3d020d] hover:bg-[#f3ede4] transition-colors" aria-label="Decrease quantity">−</button>
            <span id="gp-detail-qty-val" class="w-10 text-center text-sm font-semibold text-[#1d1b16]">${activeDetailQty}</span>
            <button type="button" onclick="changeDetailQty(1)" class="w-9 h-9 flex items-center justify-center text-sm font-semibold text-[#3d020d] hover:bg-[#f3ede4] transition-colors" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button type="button" onclick="addDetailProductToCart(false)" class="w-full py-3.5 px-5 bg-[#3d020d] text-[#fff9ef] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#5a1720] transition-colors flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-base">shopping_bag</span>
            <span>Add to Cart</span>
          </button>
          <button type="button" onclick="addDetailProductToCart(true)" class="w-full py-3.5 px-5 border border-[#3d020d] text-[#3d020d] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#3d020d] hover:text-[#fff9ef] transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// Cart Drawer Functions
// ==========================================

window.openCartModal = function() {
  injectModals();
  renderCartModalContent();
  document.getElementById('gp-cart-modal').classList.remove('hidden');
};

window.closeCartModal = function() {
  const modal = document.getElementById('gp-cart-modal');
  if (modal) modal.classList.add('hidden');
};

function renderCartModalContent() {
  const cart = getCart();
  const itemsEl = document.getElementById('gp-cart-items');
  const footerEl = document.getElementById('gp-cart-footer');
  if (!itemsEl || !footerEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="py-16 text-center">
        <span class="material-symbols-outlined text-4xl text-[#c5a059] mb-3 block">shopping_bag</span>
        <p class="text-base font-semibold text-[#3d020d] mb-1">Your Shopping Bag is Empty</p>
        <p class="text-xs text-[#4a3c3d] mb-6">Explore our curated Gota Patti collection to add handcrafted pieces.</p>
        <a href="products.html" onclick="closeCartModal()" class="inline-block px-6 py-3 bg-[#3d020d] text-[#fff9ef] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#5a1720] transition-colors">
          Browse Products
        </a>
      </div>
    `;
    footerEl.innerHTML = '';
    return;
  }

  const { itemCount, subtotal, total } = calculateCartTotals(cart);

  itemsEl.innerHTML = cart.map((item, idx) => {
    const unit = parseNumericPrice(item.unitPrice || item.price);
    const lineTotal = unit * item.qty;
    return `
      <div class="flex gap-4 border-b border-[#c5a059]/20 pb-4">
        ${item.img ? `<img src="${item.img}" class="w-16 h-20 object-cover border border-[#c5a059]/25 flex-shrink-0 cursor-pointer" alt="${item.title}" onclick="closeCartModal(); openProductDetail('${item.id.replace(/'/g, "\\'")}')">` : ''}
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold text-[#3d020d] leading-snug truncate">${item.title}</h4>
          <p class="text-xs text-[#735b25] font-medium mt-0.5">${formatINR(unit)} each</p>
          <div class="flex items-center justify-between mt-3">
            <div class="inline-flex items-center border border-[#c5a059]/40 bg-white">
              <button type="button" onclick="updateQty(${idx}, -1)" class="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#3d020d] hover:text-white transition-colors" aria-label="Decrease quantity">−</button>
              <span class="px-2.5 text-xs font-medium">${item.qty}</span>
              <button type="button" onclick="updateQty(${idx}, 1)" class="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#3d020d] hover:text-white transition-colors" aria-label="Increase quantity">+</button>
            </div>
            <span class="text-xs font-semibold text-[#1d1b16]">${formatINR(lineTotal)}</span>
          </div>
          <button type="button" onclick="removeFromCart(${idx})" class="mt-2 text-[11px] text-[#877273] hover:text-[#ba1a1a] font-medium uppercase tracking-wider">
            Remove
          </button>
        </div>
      </div>
    `;
  }).join('');

  footerEl.innerHTML = `
    <div class="space-y-2 mb-4 text-sm">
      <div class="flex justify-between text-[#4a3c3d]">
        <span>Subtotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'})</span>
        <span class="font-medium text-[#1d1b16]">${formatINR(subtotal)}</span>
      </div>
      <div class="flex justify-between text-[#4a3c3d]">
        <span>Insured Archival Delivery</span>
        <span class="text-[#3d020d] font-medium">Complimentary</span>
      </div>
      <div class="flex justify-between items-baseline pt-2 border-t border-[#c5a059]/25">
        <span class="text-xs font-semibold uppercase tracking-[0.14em] text-[#3d020d]">Order Total</span>
        <span class="text-xl font-bold text-[#3d020d]">${formatINR(total)}</span>
      </div>
    </div>
    <button type="button" onclick="proceedToCheckout()" class="w-full bg-[#3d020d] text-[#fff9ef] py-3.5 text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#5a1720] transition-colors">
      Proceed to Checkout
    </button>
  `;
}

// ==========================================
// Checkout Modal & Order Preparation
// ==========================================

window.proceedToCheckout = function() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your shopping bag is empty');
    return;
  }
  closeCartModal();
  openCheckoutModal();
};

window.openCheckoutModal = function() {
  injectModals();
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Please add an item to your bag first');
    return;
  }

  // Pre-fill saved draft or current user info
  const user = getCurrentUser();
  let draft = {};
  try {
    draft = JSON.parse(localStorage.getItem(CHECKOUT_DRAFT_KEY)) || {};
  } catch {
    draft = {};
  }

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el && val && !el.value) el.value = val;
  };

  setVal('chk-name', draft.fullName || (user && user.name) || '');
  setVal('chk-email', draft.email || (user && user.email) || '');
  setVal('chk-phone', draft.phone || '');
  setVal('chk-address1', draft.addressLine1 || '');
  setVal('chk-address2', draft.addressLine2 || '');
  setVal('chk-city', draft.city || '');
  setVal('chk-state', draft.state || '');
  setVal('chk-pin', draft.postalCode || '');
  setVal('chk-country', draft.country || 'India');
  setVal('chk-notes', draft.notes || '');

  const statusBox = document.getElementById('gp-checkout-status-box');
  if (statusBox) {
    statusBox.classList.add('hidden');
    statusBox.innerHTML = '';
  }

  renderCheckoutSummary();
  const modal = document.getElementById('gp-checkout-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeCheckoutModal = function() {
  const modal = document.getElementById('gp-checkout-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.backToCartFromCheckout = function() {
  closeCheckoutModal();
  openCartModal();
};

function renderCheckoutSummary() {
  const itemsContainer = document.getElementById('gp-checkout-items');
  const totalsContainer = document.getElementById('gp-checkout-totals');
  if (!itemsContainer || !totalsContainer) return;

  const cart = getCart();
  const { itemCount, subtotal, total } = calculateCartTotals(cart);

  itemsContainer.innerHTML = cart.map(item => {
    const unit = parseNumericPrice(item.unitPrice || item.price);
    return `
      <div class="py-3 flex items-center gap-3">
        ${item.img ? `<img src="${item.img}" alt="${item.title}" class="w-12 h-14 object-cover border border-[#c5a059]/25 flex-shrink-0"/>` : ''}
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold text-[#3d020d] truncate">${item.title}</p>
          <p class="text-[11px] text-[#4a3c3d]">Qty: ${item.qty} × ${formatINR(unit)}</p>
        </div>
        <div class="text-xs font-semibold text-[#1d1b16]">${formatINR(unit * item.qty)}</div>
      </div>
    `;
  }).join('');

  totalsContainer.innerHTML = `
    <div class="flex justify-between text-xs text-[#4a3c3d]">
      <span>Items (${itemCount})</span>
      <span>${formatINR(subtotal)}</span>
    </div>
    <div class="flex justify-between text-xs text-[#4a3c3d]">
      <span>Insured Archival Courier</span>
      <span class="text-[#3d020d] font-medium">Complimentary</span>
    </div>
    <div class="flex justify-between items-baseline pt-2 border-t border-[#c5a059]/30">
      <span class="text-xs font-semibold uppercase tracking-[0.12em] text-[#3d020d]">Total Payable</span>
      <span class="text-lg font-bold text-[#3d020d]">${formatINR(total)}</span>
    </div>
  `;
}

window.handleCheckoutSubmit = function(e) {
  e.preventDefault();
  const form = e.target;
  const customerData = {
    fullName: form.fullName.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    addressLine1: form.addressLine1.value.trim(),
    addressLine2: form.addressLine2.value.trim(),
    city: form.city.value.trim(),
    state: form.state.value.trim(),
    postalCode: form.postalCode.value.trim(),
    country: form.country.value.trim(),
    notes: form.notes.value.trim()
  };

  // Persist customer delivery details draft so user input is preserved
  localStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(customerData));

  const cart = getCart();
  const totals = calculateCartTotals(cart);
  const preparedOrderPayload = {
    customer: {
      fullName: customerData.fullName,
      email: customerData.email,
      phone: customerData.phone
    },
    shippingAddress: {
      addressLine1: customerData.addressLine1,
      addressLine2: customerData.addressLine2,
      city: customerData.city,
      state: customerData.state,
      postalCode: customerData.postalCode,
      country: customerData.country,
      notes: customerData.notes
    },
    items: cart,
    pricing: {
      currency: 'INR',
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total
    },
    preparedAt: new Date().toISOString()
  };

  window.lastPreparedOrderPayload = preparedOrderPayload;

  const cfg = window.GOTA_PATTI_CHECKOUT_CONFIG || {};
  const statusBox = document.getElementById('gp-checkout-status-box');

  // Honest handling when backend / payment gateway is not yet connected:
  // Never show fake payment success or fake order confirmation.
  if (!cfg.apiEndpoint || !cfg.paymentPublicKey) {
    if (statusBox) {
      statusBox.classList.remove('hidden');
      statusBox.innerHTML = `
        <div class="p-4 bg-[#f3ede4] border-l-4 border-[#3d020d] text-xs text-[#1d1b16] space-y-2">
          <div class="flex items-center gap-2 text-[#3d020d] font-semibold uppercase tracking-wider">
            <span class="material-symbols-outlined text-base">info</span>
            <span>Payment Gateway &amp; Order Backend Integration Pending</span>
          </div>
          <p class="text-[#4a3c3d] leading-relaxed">
            Your delivery details for <strong>${customerData.fullName}</strong> (${customerData.city}, ${customerData.postalCode}) and cart summary (<strong>${formatINR(totals.total)}</strong>) have been validated and saved locally. No payment has been charged and no order has been placed yet.
          </p>
          <p class="text-[11px] text-[#4a3c3d]">
            <strong>Remaining Setup for Live Orders:</strong> Configure <code>GOTA_PATTI_CHECKOUT_CONFIG.apiEndpoint</code> (POST order creation route) and <code>GOTA_PATTI_CHECKOUT_CONFIG.paymentPublicKey</code> (Razorpay / Stripe key) in <code>auth.js</code>.
          </p>
        </div>
      `;
      statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    showToast('Checkout details validated — payment gateway setup required');
    return;
  }
};

// ==========================================
// Auth Modal Functions
// ==========================================

window.openAuthModal = function(mode = 'signin') {
  injectModals();
  renderAuthModalContent(mode);
  const modal = document.getElementById('gp-auth-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeAuthModal = function() {
  const modal = document.getElementById('gp-auth-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.renderAuthModalContent = function(mode) {
  const user = getCurrentUser();
  const body = document.getElementById('gp-auth-body');
  if (!body) return;

  if (user) {
    body.innerHTML = `
      <span class="text-[10px] font-medium tracking-[0.25em] uppercase text-[#735b25] block mb-2">PATRON PROFILE</span>
      <h3 class="text-2xl font-semibold text-[#3d020d] mb-1">${user.name}</h3>
      <p class="text-sm text-[#4a3c3d] mb-6">${user.email}</p>
      <div class="bg-[#f3ede4] p-4 border border-[#c5a059]/30 mb-6">
        <p class="text-[10px] font-medium uppercase tracking-widest text-[#735b25] mb-1">Membership Tier</p>
        <p class="text-base font-semibold text-[#3d020d]">Royal Archive Patron</p>
      </div>
      <button type="button" onclick="handleSignOut()" class="w-full border border-[#3d020d] text-[#3d020d] py-3 text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#3d020d] hover:text-white transition-colors">
        Sign Out
      </button>
    `;
    return;
  }

  if (mode === 'signup') {
    body.innerHTML = `
      <span class="text-[10px] font-medium tracking-[0.25em] uppercase text-[#735b25] block mb-2">ATELIER REGISTRY</span>
      <h3 class="text-2xl font-semibold text-[#3d020d] mb-6">Create Patron Account</h3>
      <form onsubmit="handleSignUp(event)" class="space-y-4">
        <div>
          <label class="text-[11px] font-medium uppercase tracking-wider text-[#4a3c3d] block mb-1">Full Name</label>
          <input type="text" id="gp-signup-name" required placeholder="Maharani Gayatri Devi" class="w-full bg-white border border-[#c5a059]/40 px-4 py-3 text-sm focus:outline-none focus:border-[#3d020d]"/>
        </div>
        <div>
          <label class="text-[11px] font-medium uppercase tracking-wider text-[#4a3c3d] block mb-1">Email Address</label>
          <input type="email" id="gp-signup-email" required placeholder="patron@atelier.com" class="w-full bg-white border border-[#c5a059]/40 px-4 py-3 text-sm focus:outline-none focus:border-[#3d020d]"/>
        </div>
        <div>
          <label class="text-[11px] font-medium uppercase tracking-wider text-[#4a3c3d] block mb-1">Password</label>
          <input type="password" id="gp-signup-password" required placeholder="••••••••" class="w-full bg-white border border-[#c5a059]/40 px-4 py-3 text-sm focus:outline-none focus:border-[#3d020d]"/>
        </div>
        <button type="submit" class="w-full bg-[#3d020d] text-[#fff9ef] py-3.5 text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#5a1720] transition-colors">
          Register as Patron
        </button>
      </form>
      <p class="text-xs text-center text-[#4a3c3d] mt-6">
        Already registered? <button type="button" onclick="renderAuthModalContent('signin')" class="text-[#3d020d] font-semibold underline">Sign In</button>
      </p>
    `;
  } else {
    body.innerHTML = `
      <span class="text-[10px] font-medium tracking-[0.25em] uppercase text-[#735b25] block mb-2">WELCOME BACK</span>
      <h3 class="text-2xl font-semibold text-[#3d020d] mb-6">Patron Sign In</h3>
      <form onsubmit="handleSignIn(event)" class="space-y-4">
        <div>
          <label class="text-[11px] font-medium uppercase tracking-wider text-[#4a3c3d] block mb-1">Email Address</label>
          <input type="email" id="gp-signin-email" required placeholder="patron@atelier.com" class="w-full bg-white border border-[#c5a059]/40 px-4 py-3 text-sm focus:outline-none focus:border-[#3d020d]"/>
        </div>
        <div>
          <label class="text-[11px] font-medium uppercase tracking-wider text-[#4a3c3d] block mb-1">Password</label>
          <input type="password" id="gp-signin-password" required placeholder="••••••••" class="w-full bg-white border border-[#c5a059]/40 px-4 py-3 text-sm focus:outline-none focus:border-[#3d020d]"/>
        </div>
        <button type="submit" class="w-full bg-[#3d020d] text-[#fff9ef] py-3.5 text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#5a1720] transition-colors">
          Sign In
        </button>
      </form>
      <p class="text-xs text-center text-[#4a3c3d] mt-6">
        New to the Archive? <button type="button" onclick="renderAuthModalContent('signup')" class="text-[#3d020d] font-semibold underline">Create Account</button>
      </p>
    `;
  }
};

window.handleSignIn = function(e) {
  e.preventDefault();
  const email = document.getElementById('gp-signin-email').value.trim();
  const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  setCurrentUser({ name, email });
  closeAuthModal();
  showToast(`Welcome back, ${name}`);
};

window.handleSignUp = function(e) {
  e.preventDefault();
  const name = document.getElementById('gp-signup-name').value.trim();
  const email = document.getElementById('gp-signup-email').value.trim();
  setCurrentUser({ name, email });
  closeAuthModal();
  showToast(`Welcome to the Archive, ${name}`);
};

window.handleSignOut = function() {
  setCurrentUser(null);
  closeAuthModal();
  showToast('You have signed out');
};

// ==========================================
// Initialize on DOMContentLoaded
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  injectModals();
  updateCartUI();
  updateAuthUI();

  // Delegate [data-add-to-cart] clicks dynamically so dynamically rendered cards work too
  document.body.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add-to-cart]');
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = addBtn.getAttribute('data-id') || '';
      const title = addBtn.getAttribute('data-title') || 'Gota Patti Archival Piece';
      const price = addBtn.getAttribute('data-price') || '₹45,000';
      const img = addBtn.getAttribute('data-img') || '';
      addToCart({ id, title, price, img }, 1);
      return;
    }

    const detailTrigger = e.target.closest('[data-open-product]');
    if (detailTrigger) {
      e.preventDefault();
      const prodKey = detailTrigger.getAttribute('data-open-product');
      if (prodKey) openProductDetail(prodKey);
    }
  });

  // Wire navbar search input across pages
  document.querySelectorAll('.site-search input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = input.value.trim();
        if (window.location.pathname.endsWith('products.html') && typeof window.setProductSearchQuery === 'function') {
          window.setProductSearchQuery(q);
        } else if (q) {
          window.location.href = `products.html?q=${encodeURIComponent(q)}`;
        } else {
          window.location.href = 'products.html';
        }
      }
    });
  });
});


(function () {
  const ALIAS_MAP = {
    'products.html': 'collection.html',
    'collection-new.html': 'collection.html',
    'shopping-cart.html': 'cart.html',
    'gift-sets.html': 'Gift Sets.html',
    'sustainability.html': 'Sustainability.html',
    'track-order.html': 'TrackOrder.html',
    'returns-exchanges.html': 'Returns & Exchanges.html'
  };

  function safeParse(value) {
    if (!value) {
      return [];
    }

    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function normalizeItem(item, index) {
    if (!item || typeof item !== 'object') {
      return null;
    }

    const quantityValue = Number.parseInt(item.quantity, 10);
    const quantity = Number.isFinite(quantityValue) && quantityValue > 0 ? quantityValue : 1;
    const priceValue = Number.parseFloat(item.price);
    const price = Number.isFinite(priceValue) ? priceValue : 0;

    const name = item.name || item.title || item.productName || `Item ${index + 1}`;

    return {
      id: item.id || `${name.toLowerCase().replace(/\s+/g, '-')}-${index}`,
      name,
      price,
      quantity,
      image: item.image || '',
      description: item.description || '',
      stock: Number.isFinite(Number(item.stock)) ? Number(item.stock) : 99,
      emoji: item.emoji || ''
    };
  }

  function mergeCartArrays(primary, secondary) {
    const map = new Map();

    function add(items) {
      items
        .map(normalizeItem)
        .filter(Boolean)
        .forEach((item) => {
          const key = item.id || item.name;
          const existing = map.get(key);
          if (existing) {
            existing.quantity += item.quantity;
            return;
          }
          map.set(key, item);
        });
    }

    add(primary);
    add(secondary);

    return Array.from(map.values());
  }

  function readCart() {
    const mainCart = safeParse(localStorage.getItem('cart'));
    const legacyCart = safeParse(localStorage.getItem('aurayanCart'));

    if (!mainCart.length && !legacyCart.length) {
      return [];
    }

    return mergeCartArrays(mainCart, legacyCart);
  }

  function writeCart(cart) {
    const normalized = Array.isArray(cart)
      ? cart.map(normalizeItem).filter(Boolean)
      : [];

    const payload = JSON.stringify(normalized);
    localStorage.setItem('cart', payload);
    localStorage.setItem('aurayanCart', payload);

    return normalized;
  }

  function getCartCount(cart) {
    return cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
  }

  function updateCartBadges(cart) {
    const selectors = [
      '#cart-count',
      '#cartCount',
      'nav .cart-count',
      '.navbar .cart-count',
      '.cart-btn .cart-count'
    ];

    const count = getCartCount(cart);
    const targets = new Set();

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        targets.add(element);
      });
    });

    targets.forEach((element) => {
      element.textContent = String(count);
    });
  }

  function formatMoney(value) {
    return `\u20b9${Number(value || 0).toLocaleString('en-IN')}`;
  }

  function renderCartSidebar(cart) {
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    if (!cartItemsEl || !cartTotalEl) {
      return;
    }

    if (!cart.length) {
      cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      cartTotalEl.textContent = formatMoney(0);
      return;
    }

    cartItemsEl.innerHTML = cart
      .map((item) => {
        const lineTotal = (Number(item.price) || 0) * (Number(item.quantity) || 1);
        return `
          <div class="cart-item-row" style="display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid #eee;">
            <div>
              <strong>${item.name}</strong>
              <p style="margin:4px 0 0;color:#777;font-size:0.85rem;">Qty: ${item.quantity}</p>
            </div>
            <strong>${formatMoney(lineTotal)}</strong>
          </div>
        `;
      })
      .join('');

    const total = cart.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
    cartTotalEl.textContent = formatMoney(total);
  }

  function syncCartUI() {
    const normalizedCart = writeCart(readCart());
    updateCartBadges(normalizedCart);
    renderCartSidebar(normalizedCart);
    return normalizedCart;
  }

  function addToCart(product, quantity) {
    const qtyValue = Number.parseInt(quantity, 10);
    const qty = Number.isFinite(qtyValue) && qtyValue > 0 ? qtyValue : 1;
    const cart = readCart();

    const productId = product.id || product.name;
    const existing = cart.find((item) => item.id === productId || item.name === product.name);

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push(
        normalizeItem(
          {
            id: productId,
            name: product.name,
            price: product.price,
            quantity: qty,
            image: product.image,
            description: product.description || ''
          },
          cart.length
        )
      );
    }

    writeCart(cart);
    syncCartUI();
  }

  function parsePrice(value) {
    const numeric = String(value || '').replace(/[^\d.]/g, '');
    const parsed = Number.parseFloat(numeric);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function bindProductButtons() {
    document.querySelectorAll('.btn-add-cart[data-product]').forEach((button) => {
      button.addEventListener('click', () => {
        const card = button.closest('.product-card');
        const name =
          card?.querySelector('.product-name')?.textContent.trim() ||
          button.dataset.product ||
          'AURAYAN Fragrance';

        const rawPrice = card?.querySelector('.price')?.textContent || '';
        const price = parsePrice(rawPrice);

        const image = card?.querySelector('img')?.getAttribute('src') || '';

        addToCart(
          {
            id: button.dataset.product || name,
            name,
            price,
            image
          },
          1
        );
      });
    });
  }

  function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu') || document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu') || document.querySelector('.nav-links');

    if (!hamburger || !navMenu) {
      return;
    }

    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  function setupSearchModal() {
    const searchButton = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const closeButton = searchModal?.querySelector('.close-btn');

    if (!searchButton || !searchModal) {
      return;
    }

    function closeSearch() {
      searchModal.classList.remove('active');
      searchModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    searchButton.addEventListener('click', () => {
      searchModal.classList.add('active');
      searchModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const input = searchModal.querySelector('input[type="search"]');
      input?.focus();
    });

    closeButton?.addEventListener('click', closeSearch);

    searchModal.addEventListener('click', (event) => {
      if (event.target === searchModal) {
        closeSearch();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeSearch();
      }
    });
  }

  function setupBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button) {
      return;
    }

    function refresh() {
      button.hidden = window.scrollY < 500;
    }

    window.addEventListener('scroll', refresh, { passive: true });
    refresh();

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function setupCartSidebar() {
    const cartButton = document.getElementById('cart-btn');
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');

    if (!cartButton) {
      return;
    }

    if (!sidebar || !overlay) {
      cartButton.addEventListener('click', () => {
        window.location.href = 'cart.html';
      });
      return;
    }

    const closeButton = sidebar.querySelector('.close-btn');
    const checkoutButton = sidebar.querySelector('.btn');

    function open() {
      sidebar.classList.add('active');
      overlay.classList.add('active');
      sidebar.setAttribute('aria-hidden', 'false');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      sidebar.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    cartButton.addEventListener('click', open);
    overlay.addEventListener('click', close);
    closeButton?.addEventListener('click', close);

    checkoutButton?.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        close();
      }
    });
  }

  function rewriteKnownLinks() {
    document.querySelectorAll('a[href]').forEach((anchor) => {
      const rawHref = anchor.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('http') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
        return;
      }

      const match = rawHref.match(/^([^?#]+)([?#].*)?$/);
      if (!match) {
        return;
      }

      const base = match[1];
      const suffix = match[2] || '';
      const mapped = ALIAS_MAP[base];

      if (mapped) {
        anchor.setAttribute('href', `${mapped}${suffix}`);
      }
    });
  }

  window.AurayanSite = {
    getCart: readCart,
    setCart: writeCart,
    addToCart,
    syncCartCount: syncCartUI
  };

  document.addEventListener('DOMContentLoaded', () => {
    rewriteKnownLinks();
    setupMobileMenu();
    setupSearchModal();
    setupBackToTop();
    setupCartSidebar();
    bindProductButtons();
    syncCartUI();

    window.addEventListener('storage', () => {
      syncCartUI();
    });
  });
})();

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

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getCartItemKey(item) {
    return String(item?.id || item?.name || '');
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
    const clearCartButton = document.getElementById('clear-cart-btn');
    const checkoutButton =
      document.getElementById('checkout-btn') ||
      document.querySelector('#cart-sidebar .cart-footer .btn-primary.btn-block') ||
      document.querySelector('#cart-sidebar .cart-footer .btn.btn-primary');
    if (!cartItemsEl || !cartTotalEl) {
      return;
    }

    if (!cart.length) {
      cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      cartTotalEl.textContent = formatMoney(0);
      if (clearCartButton) {
        clearCartButton.disabled = true;
      }
      if (checkoutButton) {
        checkoutButton.disabled = true;
      }
      return;
    }

    cartItemsEl.innerHTML = cart
      .map((item) => {
        const quantity = Number(item.quantity) || 1;
        const unitPrice = Number(item.price) || 0;
        const lineTotal = unitPrice * quantity;
        const encodedKey = encodeURIComponent(getCartItemKey(item));
        const safeName = escapeHtml(item.name);

        return `
          <div class="cart-item-row">
            <div class="cart-item-main">
              <strong class="cart-item-name">${safeName}</strong>
              <p class="cart-item-meta">${formatMoney(unitPrice)} each</p>
              <div class="cart-item-controls">
                <button class="cart-qty-btn" data-cart-action="decrease" data-cart-id="${encodedKey}" aria-label="Decrease quantity of ${safeName}" ${quantity <= 1 ? 'disabled' : ''}>-</button>
                <span class="cart-item-qty">${quantity}</span>
                <button class="cart-qty-btn" data-cart-action="increase" data-cart-id="${encodedKey}" aria-label="Increase quantity of ${safeName}">+</button>
                <button class="cart-remove-btn" data-cart-action="remove" data-cart-id="${encodedKey}" aria-label="Remove ${safeName}">Remove</button>
              </div>
            </div>
            <strong class="cart-line-total">${formatMoney(lineTotal)}</strong>
          </div>
        `;
      })
      .join('');

    const total = cart.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
    cartTotalEl.textContent = formatMoney(total);
    if (clearCartButton) {
      clearCartButton.disabled = false;
    }
    if (checkoutButton) {
      checkoutButton.disabled = false;
    }
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

  function setCartItemQuantity(itemKey, nextQuantity) {
    const targetKey = String(itemKey || '');
    if (!targetKey) {
      return;
    }

    const cart = readCart();
    const item = cart.find((entry) => getCartItemKey(entry) === targetKey);
    if (!item) {
      return;
    }

    const safeQuantity = Number.parseInt(nextQuantity, 10);
    if (!Number.isFinite(safeQuantity) || safeQuantity <= 0) {
      const filtered = cart.filter((entry) => getCartItemKey(entry) !== targetKey);
      writeCart(filtered);
      syncCartUI();
      return;
    }

    item.quantity = Math.min(99, safeQuantity);
    writeCart(cart);
    syncCartUI();
  }

  function removeFromCart(itemKey) {
    const targetKey = String(itemKey || '');
    if (!targetKey) {
      return;
    }

    const cart = readCart().filter((entry) => getCartItemKey(entry) !== targetKey);
    writeCart(cart);
    syncCartUI();
  }

  function clearCart() {
    writeCart([]);
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
        const explicitQuantityInputId = button.dataset.qtyInput;
        const quantityInput = explicitQuantityInputId
          ? document.getElementById(explicitQuantityInputId)
          : card?.querySelector('.qty-input');
        const quantityValue = Number.parseInt(quantityInput?.value || '1', 10);
        const quantity = Number.isFinite(quantityValue) && quantityValue > 0 ? quantityValue : 1;

        addToCart(
          {
            id: button.dataset.product || name,
            name,
            price,
            image
          },
          quantity
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
    const viewCartButton = sidebar.querySelector('#view-cart-btn');
    const clearCartButton = sidebar.querySelector('#clear-cart-btn');
    const cartItemsContainer = sidebar.querySelector('#cart-items');
    const checkoutButton =
      sidebar.querySelector('#checkout-btn') ||
      sidebar.querySelector('.cart-footer .btn-primary.btn-block') ||
      sidebar.querySelector('.cart-footer .btn.btn-primary');

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

    cartButton.addEventListener('click', (event) => {
      event.preventDefault();
      open();
    });
    overlay.addEventListener('click', close);
    closeButton?.addEventListener('click', close);

    viewCartButton?.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });

    clearCartButton?.addEventListener('click', () => {
      clearCart();
    });

    cartItemsContainer?.addEventListener('click', (event) => {
      const control = event.target.closest('[data-cart-action][data-cart-id]');
      if (!control) {
        return;
      }

      const action = control.getAttribute('data-cart-action');
      const encodedKey = control.getAttribute('data-cart-id') || '';
      let itemKey = encodedKey;

      try {
        itemKey = decodeURIComponent(encodedKey);
      } catch (error) {
        itemKey = encodedKey;
      }

      if (!itemKey) {
        return;
      }

      if (action === 'remove') {
        removeFromCart(itemKey);
        return;
      }

      const targetItem = readCart().find((item) => getCartItemKey(item) === itemKey);
      if (!targetItem) {
        return;
      }

      const currentQuantity = Number.parseInt(targetItem.quantity, 10) || 1;
      if (action === 'increase') {
        setCartItemQuantity(itemKey, currentQuantity + 1);
      }

      if (action === 'decrease') {
        setCartItemQuantity(itemKey, currentQuantity - 1);
      }
    });

    checkoutButton?.addEventListener('click', () => {
      window.location.href = 'checkout.html';
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
    setCartItemQuantity,
    removeFromCart,
    clearCart,
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

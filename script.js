(function () {
  const searchCatalog = [
    {
      id: 'velvet-oud',
      name: 'Noor Elixir',
      notes: 'Deep, Warm, Magnetic',
      price: 200,
      url: 'collection.html'
    },
    {
      id: 'imperial-rose',
      name: 'AURAYAN Sultan Reserve Collection',
      notes: 'Soft power. Royal elegance.',
      price: 800,
      url: 'collection.html'
    },
    {
      id: 'crown-amber',
      name: 'AURAYAN Infinite Aura',
      notes: 'Rich. Addictive. Luxurious.',
      price: 300,
      url: 'collection.html'
    }
  ];

  function showInlineMessage(target, message, className) {
    const existing = target.parentElement.querySelector('.inline-feedback');
    if (existing) {
      existing.remove();
    }

    const notice = document.createElement('p');
    notice.className = `inline-feedback ${className}`;
    notice.style.marginTop = '10px';
    notice.style.fontSize = '0.9rem';
    notice.textContent = message;

    target.parentElement.appendChild(notice);

    setTimeout(() => {
      notice.remove();
    }, 3500);
  }

  function setupNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) {
      return;
    }

    const emailInput = form.querySelector('input[type="email"]');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = emailInput?.value.trim() || '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(value)) {
        showInlineMessage(form, 'Please enter a valid email address.', 'error');
        emailInput?.focus();
        return;
      }

      showInlineMessage(form, 'Subscribed successfully. Welcome to AURAYAN updates.', 'success');
      form.reset();
    });
  }

  function setupHeroActions() {
    const discoverButton = document.querySelector('.hero-buttons .btn-secondary');
    const storySection = document.querySelector('.story');

    if (!discoverButton || !storySection) {
      return;
    }

    discoverButton.addEventListener('click', () => {
      storySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function normalizeQuantityInput(input) {
    if (!input) {
      return 1;
    }

    const min = Number.parseInt(input.min || '1', 10);
    const max = Number.parseInt(input.max || '10', 10);
    const raw = Number.parseInt(input.value || String(min), 10);

    const safeMin = Number.isFinite(min) ? min : 1;
    const safeMax = Number.isFinite(max) ? max : 10;
    const safeValue = Number.isFinite(raw) ? raw : safeMin;
    const clamped = Math.min(safeMax, Math.max(safeMin, safeValue));

    input.value = String(clamped);
    return clamped;
  }

  function setupQuantityControls() {
    document.querySelectorAll('.qty-btn[data-qty-target]').forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.dataset.qtyTarget;
        const input = targetId ? document.getElementById(targetId) : null;
        if (!input) {
          return;
        }

        const current = normalizeQuantityInput(input);
        const direction = button.dataset.action === 'decrease' ? -1 : 1;
        input.value = String(current + direction);
        normalizeQuantityInput(input);
      });
    });

    document.querySelectorAll('.qty-input').forEach((input) => {
      input.addEventListener('change', () => {
        normalizeQuantityInput(input);
      });

      input.addEventListener('blur', () => {
        normalizeQuantityInput(input);
      });
    });
  }

  function setupStarterKitCart() {
    const starterButtons = ['hero-kit-btn', 'add-starter-kit-btn'];
    const feedback = document.getElementById('starter-kit-feedback');

    function addStarterKit() {
      if (!window.AurayanSite || typeof window.AurayanSite.addToCart !== 'function') {
        if (feedback) {
          feedback.textContent = 'Cart is unavailable right now. Please try again.';
          feedback.className = 'starter-kit-feedback error';
        }
        return;
      }

      window.AurayanSite.addToCart(
        {
          id: 'starter-kit',
          name: 'AURAYAN Starter Kit',
          price: 1200,
          image: '10.png',
          description: 'Noor Elixir, Sultan Reserve, Infinite Aura'
        },
        1
      );

      if (feedback) {
        feedback.textContent = 'Starter Kit added to cart.';
        feedback.className = 'starter-kit-feedback success';
      }
    }

    starterButtons.forEach((buttonId) => {
      const button = document.getElementById(buttonId);
      if (!button) {
        return;
      }
      button.addEventListener('click', addStarterKit);
    });
  }

  function renderSearchResults(results, query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) {
      return;
    }

    if (!query) {
      resultsContainer.innerHTML = '<p style="padding: 12px; color: #777;">Search for a fragrance name or note.</p>';
      return;
    }

    if (!results.length) {
      resultsContainer.innerHTML = '<p style="padding: 12px; color: #777;">No matching fragrances found.</p>';
      return;
    }

    resultsContainer.innerHTML = results
      .map((product) => {
        return `
          <a href="${product.url}" style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid #eee;color:inherit;text-decoration:none;">
            <div>
              <strong>${product.name}</strong>
              <p style="margin:4px 0 0;font-size:0.85rem;color:#777;">${product.notes}</p>
            </div>
            <strong>\u20b9${product.price}</strong>
          </a>
        `;
      })
      .join('');
  }

  function setupSearchExperience() {
    const searchInput = document.querySelector('#search-modal .search-input');
    if (!searchInput) {
      return;
    }

    renderSearchResults([], '');

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      const filtered = searchCatalog.filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.notes.toLowerCase().includes(query)
        );
      });

      renderSearchResults(filtered, query);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupNewsletter();
    setupHeroActions();
    setupQuantityControls();
    setupStarterKitCart();
    setupSearchExperience();

    if (window.AurayanSite && typeof window.AurayanSite.syncCartCount === 'function') {
      window.AurayanSite.syncCartCount();
    }
  });
})();

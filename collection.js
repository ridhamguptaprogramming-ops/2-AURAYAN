const productsDatabase = [
  {
    id: 'noor-elixir',
    name: 'Noor Elixir',
    notes: 'Deep, Warm, Magnetic',
    category: 'oud',
    price: 200,
    originalPrice: 500,
    discount: '-22%',
    rating: 12,
    stars: 5,
    badge: 'BEST SELLER',
    image: '3.png',
    thumbs: ['3.png', '4.png', '5.png', '6.png'],
    topNotes: 'Incense, Geranium, Saffron',
    heartNotes: 'Amber, Rose',
    baseNotes: 'Agarwood, Amberwood',
    type: 'Agarwood Blend',
    occasion: 'Evening / Night',
    description:
      'A bold woody profile with warm amber and rose in the heart, finished by deep agarwood and amberwood for long-lasting presence.'
  },
  {
    id: 'imperial-rose',
    name: 'Imperial Rose',
    notes: 'Soft, Powerful, Royal Elegance',
    category: 'floral',
    price: 2299,
    originalPrice: 2899,
    discount: '-21%',
    rating: 156,
    stars: 5,
    badge: 'NEW',
    image: '6.png',
    thumbs: ['6.png', '7.png', '8.png', '9.png'],
    topNotes: 'Bergamot, Lemon',
    heartNotes: 'Rose, Peony',
    baseNotes: 'Musk, Sandalwood',
    type: 'Floral',
    occasion: 'Day & Evening',
    description:
      'A modern floral built around premium rose and peony with a soft musk finish for elegant everyday wear.'
  },
  {
    id: 'crown-amber',
    name: 'Crown Amber',
    notes: 'Rich, Addictive, Luxurious',
    category: 'woody',
    price: 2699,
    originalPrice: 3499,
    discount: '-23%',
    rating: 312,
    stars: 5,
    badge: 'SALE',
    image: '8.png',
    thumbs: ['8.png', '9.png', '10.png', '11.png'],
    topNotes: 'Cinnamon, Orange',
    heartNotes: 'Amber, Vanilla',
    baseNotes: 'Cedar, Oud',
    type: 'Woody',
    occasion: 'All Occasions',
    description:
      'Warm amber resin layered with soft vanilla and cedar to deliver a deep and memorable signature trail.'
  },
  {
    id: 'noir-night',
    name: 'Noir Night',
    notes: 'Mysterious, Dark, Seductive',
    category: 'woody',
    price: 2799,
    originalPrice: 3599,
    discount: '-22%',
    rating: 189,
    stars: 5,
    badge: null,
    image: '12.png',
    thumbs: ['12.png', '13.png', '14.png', '15.png'],
    topNotes: 'Black Pepper, Ginger',
    heartNotes: 'Vetiver, Tobacco',
    baseNotes: 'Oud, Leather',
    type: 'Woody',
    occasion: 'Evening / Night',
    description:
      'A dark woody profile with black pepper and tobacco accords designed for bold evening wear.'
  },
  {
    id: 'fresh-citrus',
    name: 'Fresh Citrus',
    notes: 'Zesty, Energetic, Refreshing',
    category: 'fresh',
    price: 1899,
    originalPrice: 2599,
    discount: '-27%',
    rating: 234,
    stars: 4,
    badge: 'NEW',
    image: '4.png',
    thumbs: ['4.png', '5.png', '6.png', '7.png'],
    topNotes: 'Lemon, Grapefruit',
    heartNotes: 'Green Apple, Mint',
    baseNotes: 'Cedarwood, Musk',
    type: 'Fresh',
    occasion: 'Day',
    description:
      'A bright citrus opening with crisp green notes, created for fresh daytime confidence.'
  },
  {
    id: 'silk-roses',
    name: 'Silk & Roses',
    notes: 'Elegant, Romantic, Timeless',
    category: 'floral',
    price: 2199,
    originalPrice: 2899,
    discount: '-24%',
    rating: 278,
    stars: 5,
    badge: null,
    image: '7.png',
    thumbs: ['7.png', '8.png', '9.png', '10.png'],
    topNotes: 'Rose, Jasmine',
    heartNotes: 'Peony, Freesia',
    baseNotes: 'Sandalwood, Musk',
    type: 'Floral',
    occasion: 'Evening',
    description:
      'A romantic floral bouquet balanced by soft musk and sandalwood for a smooth finish.'
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    notes: 'Aquatic, Cool, Crisp',
    category: 'fresh',
    price: 1799,
    originalPrice: 2399,
    discount: '-25%',
    rating: 195,
    stars: 4,
    badge: null,
    image: '9.png',
    thumbs: ['9.png', '10.png', '11.png', '12.png'],
    topNotes: 'Sea Salt, Bergamot',
    heartNotes: 'Water Lily, Aquatic Accord',
    baseNotes: 'Driftwood, Musk',
    type: 'Aquatic',
    occasion: 'Day',
    description:
      'A clean marine blend with citrus lift and a smooth driftwood base, ideal for daytime wear.'
  },
  {
    id: 'spiced-vanilla',
    name: 'Spiced Vanilla',
    notes: 'Warm, Sweet, Comforting',
    category: 'woody',
    price: 2399,
    originalPrice: 3099,
    discount: '-23%',
    rating: 267,
    stars: 5,
    badge: null,
    image: '10.png',
    thumbs: ['10.png', '11.png', '12.png', '13.png'],
    topNotes: 'Nutmeg, Cinnamon',
    heartNotes: 'Vanilla, Amber',
    baseNotes: 'Sandalwood, Tonka',
    type: 'Woody',
    occasion: 'All Occasions',
    description:
      'Warm spices and ambered vanilla create a comforting, premium scent profile with strong longevity.'
  }
];

const dom = {
  productsGrid: document.getElementById('productsGrid'),
  productModal: document.getElementById('productModal'),
  modalClose: document.getElementById('modalClose'),
  modalOverlay: document.getElementById('modalOverlay'),
  categoryFilter: document.getElementById('categoryFilter'),
  priceFilter: document.getElementById('priceFilter'),
  priceDisplay: document.getElementById('priceDisplay'),
  notification: document.getElementById('notification'),
  exploreBtn: document.getElementById('exploreBtn')
};

let activeProduct = null;

function currency(value) {
  return `\u20b9${Number(value || 0).toLocaleString('en-IN')}`;
}

function showNotification(message) {
  if (!dom.notification) {
    return;
  }

  dom.notification.textContent = message;
  dom.notification.classList.add('show');

  setTimeout(() => {
    dom.notification.classList.remove('show');
  }, 2500);
}

function displayProducts(products) {
  if (!dom.productsGrid) {
    return;
  }

  dom.productsGrid.innerHTML = products
    .map((product) => {
      const stars = `${'★'.repeat(product.stars)}${'☆'.repeat(5 - product.stars)}`;
      const badgeClass = product.badge && product.badge.toLowerCase() === 'sale' ? 'sale' : '';

      return `
        <article class="product-card" data-product-id="${product.id}">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            ${product.badge ? `<span class="product-badge ${badgeClass}">${product.badge}</span>` : ''}
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-notes">${product.notes}</p>
            <div class="product-rating">${stars} (${product.rating})</div>
            <div class="product-price">
              <span class="product-current-price">${currency(product.price)}</span>
              <span class="product-original-price">${currency(product.originalPrice)}</span>
              <span class="product-discount">${product.discount}</span>
            </div>
            <div class="product-actions">
              <button class="product-view-btn" data-product-id="${product.id}">View Details</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

function setThumbnailImages(product) {
  const thumbnailButtons = document.querySelectorAll('.modal-thumbnail');
  const sources = product.thumbs || [];

  thumbnailButtons.forEach((button, index) => {
    const image = button.querySelector('img');
    const source = sources[index] || product.image;

    if (!image) {
      return;
    }

    image.src = source;
    image.alt = `${product.name} view ${index + 1}`;
    button.classList.toggle('active', index === 0);
  });
}

function openProductModal(productId) {
  const product = productsDatabase.find((item) => item.id === productId);
  if (!product || !dom.productModal) {
    return;
  }

  activeProduct = product;

  document.getElementById('modalProductName').textContent = product.name;
  document.getElementById('modalProductSubtitle').textContent = product.notes;
  document.getElementById('modalMainImage').src = product.image;
  document.getElementById('modalMainImage').alt = product.name;
  document.getElementById('modalStars').textContent = `${'★'.repeat(product.stars)}${'☆'.repeat(5 - product.stars)}`;
  document.getElementById('modalReviewCount').textContent = `(${product.rating} reviews)`;
  document.getElementById('modalCurrentPrice').textContent = currency(product.price);
  document.getElementById('modalOriginalPrice').textContent = currency(product.originalPrice);
  document.getElementById('modalDiscount').textContent = product.discount;
  document.getElementById('modalDescription').textContent = product.description;
  document.getElementById('modalTopNotes').textContent = product.topNotes;
  document.getElementById('modalHeartNotes').textContent = product.heartNotes;
  document.getElementById('modalBaseNotes').textContent = product.baseNotes;
  document.getElementById('modalType').textContent = product.type;
  document.getElementById('modalOccasion').textContent = product.occasion;
  document.getElementById('modalQty').value = 1;

  const badge = document.getElementById('modalBadge');
  if (product.badge) {
    badge.textContent = product.badge;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }

  setThumbnailImages(product);

  dom.productModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!dom.productModal) {
    return;
  }

  dom.productModal.classList.remove('show');
  document.body.style.overflow = '';
  activeProduct = null;
}

function filterProducts() {
  const category = dom.categoryFilter?.value || 'all';
  const maxPrice = Number.parseInt(dom.priceFilter?.value, 10) || Number.MAX_SAFE_INTEGER;

  const filtered = productsDatabase.filter((product) => {
    const categoryMatch = category === 'all' || product.category === category;
    const priceMatch = product.price <= maxPrice;
    return categoryMatch && priceMatch;
  });

  displayProducts(filtered);
}

function addActiveProductToCart() {
  if (!activeProduct) {
    return;
  }

  const qty = Number.parseInt(document.getElementById('modalQty').value, 10) || 1;

  if (window.AurayanSite && typeof window.AurayanSite.addToCart === 'function') {
    window.AurayanSite.addToCart(
      {
        id: activeProduct.id,
        name: activeProduct.name,
        price: activeProduct.price,
        image: activeProduct.image,
        description: activeProduct.notes
      },
      qty
    );
  }

  showNotification(`${activeProduct.name} added to cart.`);
  closeModal();
}

function setupEvents() {
  dom.productsGrid?.addEventListener('click', (event) => {
    const button = event.target.closest('.product-view-btn');
    if (!button) {
      return;
    }

    openProductModal(button.dataset.productId);
  });

  dom.modalClose?.addEventListener('click', closeModal);
  dom.modalOverlay?.addEventListener('click', closeModal);

  dom.categoryFilter?.addEventListener('change', filterProducts);

  dom.priceFilter?.addEventListener('input', () => {
    if (dom.priceDisplay) {
      dom.priceDisplay.textContent = `\u20b9200 - ${currency(dom.priceFilter.value)}`;
    }
    filterProducts();
  });

  document.querySelectorAll('.modal-thumbnail').forEach((button) => {
    button.addEventListener('click', () => {
      const image = button.querySelector('img');
      if (!image) {
        return;
      }

      document.getElementById('modalMainImage').src = image.src;
      document.querySelectorAll('.modal-thumbnail').forEach((thumb) => thumb.classList.remove('active'));
      button.classList.add('active');
    });
  });

  document.getElementById('qtyMinus')?.addEventListener('click', () => {
    const qtyInput = document.getElementById('modalQty');
    const current = Number.parseInt(qtyInput.value, 10) || 1;
    qtyInput.value = String(Math.max(1, current - 1));
  });

  document.getElementById('qtyPlus')?.addEventListener('click', () => {
    const qtyInput = document.getElementById('modalQty');
    const current = Number.parseInt(qtyInput.value, 10) || 1;
    qtyInput.value = String(Math.min(10, current + 1));
  });

  document.getElementById('modalAddCartBtn')?.addEventListener('click', addActiveProductToCart);

  document.getElementById('modalWishlistBtn')?.addEventListener('click', () => {
    if (!activeProduct) {
      return;
    }
    showNotification(`${activeProduct.name} added to wishlist.`);
  });

  dom.exploreBtn?.addEventListener('click', () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('newsletterForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    showNotification('Thank you for subscribing.');
    event.target.reset();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayProducts(productsDatabase);
  setupEvents();

  if (window.AurayanSite && typeof window.AurayanSite.syncCartCount === 'function') {
    window.AurayanSite.syncCartCount();
  }
});

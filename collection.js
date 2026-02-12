// Product Database
const productsDatabase = [
    {
        id: 1,
        name: 'Velvet Oud',
        notes: 'Deep, Warm, Magnetic',
        category: 'oud',
        price: 2499,
        originalPrice: 3199,
        discount: '-22%',
        rating: 248,
        stars: 5,
        badge: 'BEST SELLER',
        image: 'https://via.placeholder.com/500x600?text=Velvet+Oud',
        thumb1: 'https://via.placeholder.com/100x100?text=V1',
        thumb2: 'https://via.placeholder.com/100x100?text=V2',
        thumb3: 'https://via.placeholder.com/100x100?text=V3',
        thumb4: 'https://via.placeholder.com/100x100?text=V4',
        topNotes: 'Spice, Bergamot',
        heartNotes: 'Amber, Rose',
        baseNotes: 'Oud, Musk, Sandalwood',
        type: 'Oud',
        occasion: 'Evening/Night',
        description: 'Deep woody oud blended with amber and spice for night luxury. Experience the perfect balance of warmth and sophistication. This exquisite fragrance is meticulously crafted with premium globally-sourced ingredients, designed for exceptional longevity and presence.'
    },
    {
        id: 2,
        name: 'Imperial Rose',
        notes: 'Soft, Power, Royal elegance',
        category: 'floral',
        price: 2299,
        originalPrice: 2899,
        discount: '-21%',
        rating: 156,
        stars: 5,
        badge: 'NEW',
        image: 'https://via.placeholder.com/500x600?text=Imperial+Rose',
        thumb1: 'https://via.placeholder.com/100x100?text=IR1',
        thumb2: 'https://via.placeholder.com/100x100?text=IR2',
        thumb3: 'https://via.placeholder.com/100x100?text=IR3',
        thumb4: 'https://via.placeholder.com/100x100?text=IR4',
        topNotes: 'Bergamot, Lemon',
        heartNotes: 'Rose, Peony',
        baseNotes: 'Musk, Sandalwood',
        type: 'Floral',
        occasion: 'Day & Evening',
        description: 'Royal rose layered with soft musk and creamy woods. A perfect blend of femininity and elegance.'
    },
    {
        id: 3,
        name: 'Crown Amber',
        notes: 'Rich, Addictive, Luxurious',
        category: 'woody',
        price: 2699,
        originalPrice: 3499,
        discount: '-23%',
        rating: 312,
        stars: 5,
        badge: 'SALE',
        image: 'https://via.placeholder.com/500x600?text=Crown+Amber',
        thumb1: 'https://via.placeholder.com/100x100?text=CA1',
        thumb2: 'https://via.placeholder.com/100x100?text=CA2',
        thumb3: 'https://via.placeholder.com/100x100?text=CA3',
        thumb4: 'https://via.placeholder.com/100x100?text=CA4',
        topNotes: 'Cinnamon, Orange',
        heartNotes: 'Amber, Vanilla',
        baseNotes: 'Cedar, Oud',
        type: 'Woody',
        occasion: 'All Occasions',
        description: 'Warm amber resin with sweet balsamic depth. An addictive fragrance for the modern royalty.'
    },
    {
        id: 4,
        name: 'Noir Night',
        notes: 'Mysterious, Dark, Seductive',
        category: 'woody',
        price: 2799,
        originalPrice: 3599,
        discount: '-22%',
        rating: 189,
        stars: 5,
        badge: null,
        image: 'https://via.placeholder.com/500x600?text=Noir+Night',
        thumb1: 'https://via.placeholder.com/100x100?text=NN1',
        thumb2: 'https://via.placeholder.com/100x100?text=NN2',
        thumb3: 'https://via.placeholder.com/100x100?text=NN3',
        thumb4: 'https://via.placeholder.com/100x100?text=NN4',
        topNotes: 'Black Pepper, Ginger',
        heartNotes: 'Vetiver, Tobacco',
        baseNotes: 'Oud, Leather',
        type: 'Woody',
        occasion: 'Evening/Night',
        description: 'Dark smoky woods with sensual musk for unforgettable nights.'
    },
    {
        id: 5,
        name: 'Fresh Citrus',
        notes: 'Zesty, Energetic, Refreshing',
        category: 'fresh',
        price: 1899,
        originalPrice: 2599,
        discount: '-27%',
        rating: 234,
        stars: 4,
        badge: 'NEW',
        image: 'https://via.placeholder.com/500x600?text=Fresh+Citrus',
        thumb1: 'https://via.placeholder.com/100x100?text=FC1',
        thumb2: 'https://via.placeholder.com/100x100?text=FC2',
        thumb3: 'https://via.placeholder.com/100x100?text=FC3',
        thumb4: 'https://via.placeholder.com/100x100?text=FC4',
        topNotes: 'Lemon, Grapefruit',
        heartNotes: 'Green Apple, Mint',
        baseNotes: 'Cedarwood, Musk',
        type: 'Fresh',
        occasion: 'Day',
        description: 'Vibrant citrus blend for daytime freshness and energy.'
    },
    {
        id: 6,
        name: 'Silk & Roses',
        notes: 'Elegant, Romantic, Timeless',
        category: 'floral',
        price: 2199,
        originalPrice: 2899,
        discount: '-24%',
        rating: 278,
        stars: 5,
        badge: null,
        image: 'https://via.placeholder.com/500x600?text=Silk+Roses',
        thumb1: 'https://via.placeholder.com/100x100?text=SR1',
        thumb2: 'https://via.placeholder.com/100x100?text=SR2',
        thumb3: 'https://via.placeholder.com/100x100?text=SR3',
        thumb4: 'https://via.placeholder.com/100x100?text=SR4',
        topNotes: 'Rose, Jasmine',
        heartNotes: 'Peony, Freesia',
        baseNotes: 'Sandalwood, Musk',
        type: 'Floral',
        occasion: 'Evening',
        description: 'Delicate floral composition with silky base notes.'
    },
    {
        id: 7,
        name: 'Ocean Breeze',
        notes: 'Aquatic, Cool, Crisp',
        category: 'fresh',
        price: 1799,
        originalPrice: 2399,
        discount: '-25%',
        rating: 195,
        stars: 4,
        badge: null,
        image: 'https://via.placeholder.com/500x600?text=Ocean+Breeze',
        thumb1: 'https://via.placeholder.com/100x100?text=OB1',
        thumb2: 'https://via.placeholder.com/100x100?text=OB2',
        thumb3: 'https://via.placeholder.com/100x100?text=OB3',
        thumb4: 'https://via.placeholder.com/100x100?text=OB4',
        topNotes: 'Sea Salt, Bergamot',
        heartNotes: 'Water Lily, Aquamarine',
        baseNotes: 'Driftwood, Musk',
        type: 'Aquatic',
        occasion: 'Day',
        description: 'Fresh oceanic scent for cool sophistication.'
    },
    {
        id: 8,
        name: 'Spiced Vanilla',
        notes: 'Warm, Sweet, Comforting',
        category: 'woody',
        price: 2399,
        originalPrice: 3099,
        discount: '-23%',
        rating: 267,
        stars: 5,
        badge: null,
        image: 'https://via.placeholder.com/500x600?text=Spiced+Vanilla',
        thumb1: 'https://via.placeholder.com/100x100?text=SV1',
        thumb2: 'https://via.placeholder.com/100x100?text=SV2',
        thumb3: 'https://via.placeholder.com/100x100?text=SV3',
        thumb4: 'https://via.placeholder.com/100x100?text=SV4',
        topNotes: 'Nutmeg, Cinnamon',
        heartNotes: 'Vanilla, Amber',
        baseNotes: 'Sandalwood, Tonka',
        type: 'Woody',
        occasion: 'All Occasions',
        description: 'Warm spiced vanilla for intimate moments.'
    }
];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const priceDisplay = document.getElementById('priceDisplay');
const notification = document.getElementById('notification');
const exploreBtn = document.getElementById('exploreBtn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(productsDatabase);
    setupEventListeners();
    updateCartCount();
});

// Display Products
function displayProducts(products) {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge ${product.badge.toLowerCase() === 'sale' ? 'sale' : ''}">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-notes">${product.notes}</p>
                <div class="product-rating">${'★'.repeat(product.stars)}${'☆'.repeat(5 - product.stars)} (${product.rating})</div>
                <div class="product-price">
                    <span class="product-current-price">₹${product.price.toLocaleString()}</span>
                    <span class="product-original-price">₹${product.originalPrice.toLocaleString()}</span>
                    <span class="product-discount">${product.discount}</span>
                </div>
                <div class="product-actions">
                    <button class="product-view-btn" onclick="openProductModal(${product.id})">
                        View Details
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Open Product Modal
function openProductModal(productId) {
    const product = productsDatabase.find(p => p.id === productId);
    if (!product) return;

    // Populate modal
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductSubtitle').textContent = product.notes;
    document.getElementById('modalMainImage').src = product.image;
    document.getElementById('modalStars').textContent = '★'.repeat(product.stars) + '☆'.repeat(5 - product.stars);
    document.getElementById('modalReviewCount').textContent = `(${product.rating} reviews)`;
    document.getElementById('modalCurrentPrice').textContent = `₹${product.price.toLocaleString()}`;
    document.getElementById('modalOriginalPrice').textContent = `₹${product.originalPrice.toLocaleString()}`;
    document.getElementById('modalDiscount').textContent = product.discount;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalTopNotes').textContent = product.topNotes;
    document.getElementById('modalHeartNotes').textContent = product.heartNotes;
    document.getElementById('modalBaseNotes').textContent = product.baseNotes;
    document.getElementById('modalType').textContent = product.type;
    document.getElementById('modalOccasion').textContent = product.occasion;

    // Set badge
    const badgeEl = document.getElementById('modalBadge');
    if (product.badge) {
        badgeEl.textContent = product.badge;
        badgeEl.style.display = 'inline-block';
    } else {
        badgeEl.style.display = 'none';
    }

    // Set thumbnails
    document.getElementById('thumb1').src = product.thumb1;
    document.getElementById('thumb2').src = product.thumb2;
    document.getElementById('thumb3').src = product.thumb3;
    document.getElementById('thumb4').src = product.thumb4;

    // Show modal
    productModal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Modal button actions
    document.getElementById('modalAddCartBtn').onclick = () => addToCart(product);
    document.getElementById('modalWishlistBtn').onclick = () => toggleWishlist(product);
}

// Close Modal
function closeModal() {
    productModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Setup Event Listeners
function setupEventListeners() {
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('input', function() {
        priceDisplay.textContent = `₹500 - ₹${this.value}`;
        filterProducts();
    });

    // Thumbnail clicks
    document.querySelectorAll('.modal-thumbnail').forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            const img = this.querySelector('img').src;
            document.getElementById('modalMainImage').src = img;
            document.querySelectorAll('.modal-thumbnail').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Quantity buttons
    document.getElementById('qtyMinus').addEventListener('click', function() {
        const qty = document.getElementById('modalQty');
        if (qty.value > 1) qty.value--;
    });

    document.getElementById('qtyPlus').addEventListener('click', function() {
        const qty = document.getElementById('modalQty');
        if (qty.value < 10) qty.value++;
    });

    exploreBtn.addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('newsletterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Thank you for subscribing!');
        e.target.reset();
    });
}

// Filter Products
function filterProducts() {
    let filtered = productsDatabase;
    
    const category = categoryFilter.value;
    const maxPrice = parseInt(priceFilter.value);
    
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    filtered = filtered.filter(p => p.price <= maxPrice);
    displayProducts(filtered);
}

// Cart Functions
function addToCart(product) {
    const qty = parseInt(document.getElementById('modalQty').value);
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: qty,
            image: product.image
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
    closeModal();
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = total;
}

function toggleWishlist(product) {
    showNotification(`${product.name} added to wishlist!`);
}

// Notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
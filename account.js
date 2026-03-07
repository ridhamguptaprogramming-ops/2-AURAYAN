// Account Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  initializeSideMenu();
  initializeFormHandlers();
  initializeWishlistActions();
  initializeCartActions();
});

/**
 * Initialize side menu navigation
 */
function initializeSideMenu() {
  const menuLinks = document.querySelectorAll('.account-menu .menu-link');
  const contentSections = document.querySelectorAll('.content-section');

  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      
      // Remove active class from all links and sections
      menuLinks.forEach(l => l.classList.remove('active'));
      contentSections.forEach(s => s.classList.remove('active'));
      
      // Add active class to clicked link and corresponding section
      this.classList.add('active');
      document.getElementById(sectionId).classList.add('active');
    });
  });
}

/**
 * Initialize form submission handlers
 */
function initializeFormHandlers() {
  // Profile form handler
  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleProfileSubmit();
    });
  }

  // Settings form handler
  const settingsForm = document.getElementById('settings-form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleSettingsSubmit();
    });
  }
}

/**
 * Handle profile form submission
 */
function handleProfileSubmit() {
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();

  // Basic validation
  if (!firstName || !lastName || !email) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  // Simulate API call
  setTimeout(() => {
    showNotification('Profile updated successfully!', 'success');
  }, 500);
}

/**
 * Handle settings form submission
 */
function handleSettingsSubmit() {
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // If password fields are filled, validate them
  if (newPassword || confirmPassword) {
    if (!currentPassword) {
      showNotification('Please enter your current password', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification('New passwords do not match', 'error');
      return;
    }

    if (newPassword.length < 8) {
      showNotification('Password must be at least 8 characters long', 'error');
      return;
    }
  }

  // Simulate API call
  setTimeout(() => {
    showNotification('Settings saved successfully!', 'success');
    // Clear password fields
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
  }, 500);
}

/**
 * Initialize wishlist actions
 */
function initializeWishlistActions() {
  const removeButtons = document.querySelectorAll('.btn-remove');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      handleRemoveFromWishlist(this);
    });
  });
}

/**
 * Handle removing item from wishlist
 */
function handleRemoveFromWishlist(button) {
  const wishlistItem = button.closest('.wishlist-item');
  const productName = wishlistItem.querySelector('h4').textContent;

  wishlistItem.remove();
  showNotification(`${productName} removed from wishlist`, 'success');

  // Check if wishlist is empty
  const remainingItems = document.querySelectorAll('.wishlist-item');
  if (remainingItems.length === 0) {
    const wishlistGrid = document.getElementById('wishlist-grid');
    wishlistGrid.innerHTML = `
      <p class="empty-message">
        <i class="fas fa-heart"></i><br>
        Your wishlist is empty
      </p>
    `;
  }
}

/**
 * Initialize add to cart actions
 */
function initializeCartActions() {
  const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      handleAddToCart(this);
    });
  });
}

/**
 * Handle adding product to cart
 */
function handleAddToCart(button) {
  const wishlistItem = button.closest('.wishlist-item');
  const productName = wishlistItem.querySelector('h4').textContent;
  const productPrice = wishlistItem.querySelector('.wishlist-item-price').textContent;

  // Get current cart count
  const cartCount = document.getElementById('cart-count');
  let count = parseInt(cartCount.textContent) || 0;
  cartCount.textContent = count + 1;

  showNotification(`${productName} (${productPrice}) added to cart!`, 'success');
}

/**
 * Show notification message
 */
function showNotification(message, type = 'success') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
    color: ${type === 'success' ? '#155724' : '#721c24'};
    padding: 15px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Load user data from localStorage (mock)
 */
function loadUserData() {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const user = JSON.parse(userData);
    
    // Populate form fields
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const profileEmail = document.getElementById('profile-email');

    if (firstNameInput) firstNameInput.value = user.firstName || '';
    if (lastNameInput) lastNameInput.value = user.lastName || '';
    if (emailInput) emailInput.value = user.email || '';
    if (phoneInput) phoneInput.value = user.phone || '';
    if (profileEmail) profileEmail.textContent = user.email || 'user@example.com';
  }
}

/**
 * Save user data to localStorage (mock)
 */
function saveUserData(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}

// Load user data when page loads
document.addEventListener('DOMContentLoaded', function() {
  loadUserData();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

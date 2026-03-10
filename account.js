// Account Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  initializeSideMenu();
  initializeFormHandlers();
  initializeWishlistActions();
  initializeCartActions();
  initializeAddressActions();
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

  // Logout button handler
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      handleLogout();
    });
  }
}

/**
 * Handle profile form submission
 */
function handleProfileSubmit() {
  const submitBtn = document.querySelector('#profile-form .btn-save');
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

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Saving...';

  // Simulate API call
  setTimeout(() => {
    showNotification('Profile updated successfully!', 'success');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Save Changes';
  }, 1000);
}

/**
 * Handle settings form submission
 */
function handleSettingsSubmit() {
  const submitBtn = document.querySelector('#settings-form .btn-save');
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

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Saving...';

  // Simulate API call
  setTimeout(() => {
    showNotification('Settings saved successfully!', 'success');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Save Settings';
    // Clear password fields
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
  }, 1000);
}

/**
 * Handle logout
 */
function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    // Clear user data from localStorage
    localStorage.removeItem('userData');
    // Simulate logout
    showNotification('Logged out successfully!', 'success');
    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
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
 * Initialize address actions
 */
function initializeAddressActions() {
  const addAddressBtn = document.getElementById('add-address-btn');
  const cancelAddressBtn = document.getElementById('cancel-address');
  const addressForm = document.getElementById('address-form');

  if (addAddressBtn) {
    addAddressBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showAddressForm();
    });
  }

  if (cancelAddressBtn) {
    cancelAddressBtn.addEventListener('click', function(e) {
      e.preventDefault();
      hideAddressForm();
    });
  }

  if (addressForm) {
    addressForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleAddressSubmit();
    });
  }
}

/**
 * Show address form
 */
function showAddressForm() {
  const form = document.getElementById('new-address-form');
  const btn = document.getElementById('add-address-btn');
  form.style.display = 'block';
  btn.style.display = 'none';
}

/**
 * Hide address form
 */
function hideAddressForm() {
  const form = document.getElementById('new-address-form');
  const btn = document.getElementById('add-address-btn');
  form.style.display = 'none';
  btn.style.display = 'inline-block';
  // Clear form
  document.getElementById('address-form').reset();
}

/**
 * Handle address form submission
 */
function handleAddressSubmit() {
  const addressType = document.getElementById('address-type').value;
  const fullName = document.getElementById('full-name').value.trim();
  const streetAddress = document.getElementById('street-address').value.trim();
  const city = document.getElementById('city').value.trim();
  const state = document.getElementById('state').value.trim();
  const zipCode = document.getElementById('zip-code').value.trim();
  const country = document.getElementById('country').value;
  const phone = document.getElementById('address-phone').value.trim();

  // Validation
  if (!addressType || !fullName || !streetAddress || !city || !state || !zipCode || !country || !phone) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  // Create new address element
  const addressesContainer = document.getElementById('addresses-container');
  const newAddress = document.createElement('div');
  newAddress.style.cssText = 'background: #f9f7f4; padding: 20px; border-radius: 8px; margin-bottom: 15px;';
  newAddress.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: start;">
      <div>
        <h4 style="margin: 0 0 10px 0; color: #1a1a1a;">${addressType.charAt(0).toUpperCase() + addressType.slice(1)} Address</h4>
        <p style="margin: 0; color: #666; line-height: 1.6;">
          ${streetAddress}<br>
          ${city}, ${state} ${zipCode}<br>
          ${country}<br>
          Phone: ${phone}
        </p>
      </div>
      <div style="display: flex; gap: 10px;">
        <button style="background: #C6A14A; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Edit</button>
        <button style="background: #f0f0f0; color: #666; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;" onclick="this.closest('div').remove(); showNotification('Address deleted', 'success');">Delete</button>
      </div>
    </div>
  `;

  addressesContainer.appendChild(newAddress);
  hideAddressForm();
  showNotification('Address added successfully!', 'success');
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

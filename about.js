// ============================================
// ABOUT PAGE JAVASCRIPT
// ============================================

// Initialize cart from localStorage
function initializeCart() {
  const cart = JSON.parse(localStorage.getItem('aurayanCart')) || [];
  document.getElementById('cartCount').textContent = cart.length;
}

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Scroll animations for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.value-card, .sustainability-card, .award-item, .team-member').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Timeline item animations
document.querySelectorAll('.timeline-content').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  
  setTimeout(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, index * 100);
});

// Counter animation for commitment numbers
function animateCounter(element) {
  const finalValue = parseInt(element.textContent);
  const duration = 2000;
  const increment = finalValue / (duration / 50);
  let currentValue = 0;

  const counter = setInterval(() => {
    currentValue += increment;
    if (currentValue >= finalValue) {
      element.textContent = finalValue;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(currentValue);
    }
  }, 50);
}

// Trigger counter animation when in view
const commitmentObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const numberElement = entry.target.querySelector('.commitment-number');
      if (numberElement) {
        animateCounter(numberElement);
        entry.target.classList.add('animated');
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.commitment-item').forEach(el => {
  commitmentObserver.observe(el);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeCart();
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
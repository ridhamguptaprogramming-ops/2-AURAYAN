// ============================================
// CONTACT PAGE JAVASCRIPT - ENHANCED
// ============================================

// Initialize EmailJS (Replace with your credentials)
emailjs.init("YOUR_PUBLIC_KEY");

// DOM Elements
const contactForm = document.getElementById('contactForm');
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('charCount');
const successMsg = document.getElementById('successMsg');
const errorAlert = document.getElementById('errorAlert');
const errorText = document.getElementById('errorText');
const chatWidget = document.getElementById('chatWidget');
const chatBox = document.getElementById('chatBox');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

// ============================================
// CHARACTER COUNTER
// ============================================

messageTextarea.addEventListener('input', () => {
  const count = messageTextarea.value.length;
  charCount.textContent = Math.min(count, 500);
  
  if (count > 500) {
    messageTextarea.value = messageTextarea.value.substring(0, 500);
    charCount.textContent = '500';
  }
});

// ============================================
// FORM VALIDATION
// ============================================

function validateForm() {
  let isValid = true;
  
  document.querySelectorAll('.form-group').forEach(group => {
    group.classList.remove('error');
  });

  // Name validation
  const name = document.getElementById('name').value.trim();
  if(name === '') {document.getElementById('name').parentElement.classList.add('error'); isValid = false; } }
  
  // Email validation const email = document.getElementById('email').value.trim(); const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; if(!emailPattern.test(email)) { document.getElementById('email').parentElement.classList.add('error'); isValid = false; } // Message validation const message = messageTextarea.value.trim(); if(message === '') { messageTextarea.parentElement.classList.add('error'); isValid = false; } return isValid; } // ============================================ // FORM SUBMISSION // ============================================ contactForm.addEventListener('submit', (e) => { e.preventDefault(); if(validateForm()) { const formData = { name: document.getElementById('name').

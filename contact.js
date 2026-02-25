(function () {
  const contactForm = document.getElementById('contactForm');
  const messageTextarea = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  const successMsg = document.getElementById('successMsg');
  const errorAlert = document.getElementById('errorAlert');
  const errorText = document.getElementById('errorText');
  const chatBox = document.getElementById('chatBox');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');

  function safeInitEmailJs() {
    if (!window.emailjs || typeof window.emailjs.init !== 'function') {
      return;
    }

    const publicKey =
      document.body.getAttribute('data-emailjs-public-key') ||
      'YOUR_PUBLIC_KEY';

    if (publicKey !== 'YOUR_PUBLIC_KEY') {
      window.emailjs.init(publicKey);
    }
  }

  function updateCharacterCount() {
    if (!messageTextarea || !charCount) {
      return;
    }

    if (messageTextarea.value.length > 500) {
      messageTextarea.value = messageTextarea.value.slice(0, 500);
    }

    charCount.textContent = String(messageTextarea.value.length);
  }

  function setGroupError(elementId, message) {
    const field = document.getElementById(elementId);
    if (!field) {
      return;
    }

    const group = field.closest('.form-group');
    const errorNode = document.getElementById(`${elementId}Error`);

    group?.classList.add('error');
    if (errorNode) {
      errorNode.textContent = message;
    }
  }

  function clearErrors() {
    document.querySelectorAll('.form-group.error').forEach((group) => {
      group.classList.remove('error');
    });

    document.querySelectorAll('.error-message').forEach((node) => {
      node.textContent = '';
    });

    hideError();
  }

  function showError(message) {
    if (!errorAlert || !errorText) {
      return;
    }

    errorText.textContent = message;
    errorAlert.style.display = 'flex';
  }

  function hideError() {
    if (!errorAlert) {
      return;
    }

    errorAlert.style.display = 'none';
  }

  function validateForm() {
    if (!contactForm) {
      return false;
    }

    clearErrors();

    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const subject = document.getElementById('subject')?.value || '';
    const message = messageTextarea?.value.trim() || '';
    const termsAccepted = document.getElementById('terms')?.checked;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    if (name.length < 2) {
      setGroupError('name', 'Please enter your full name.');
      valid = false;
    }

    if (!emailPattern.test(email)) {
      setGroupError('email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!subject) {
      setGroupError('subject', 'Please select a subject.');
      valid = false;
    }

    if (message.length < 10) {
      setGroupError('message', 'Please enter at least 10 characters.');
      valid = false;
    }

    if (!termsAccepted) {
      showError('Please agree to the privacy policy before submitting.');
      valid = false;
    }

    return valid;
  }

  function buildPayload() {
    return {
      name: document.getElementById('name')?.value.trim() || '',
      email: document.getElementById('email')?.value.trim() || '',
      phone: document.getElementById('phone')?.value.trim() || '',
      subject: document.getElementById('subject')?.value || '',
      priority: document.getElementById('priority')?.value || 'normal',
      message: messageTextarea?.value.trim() || '',
      newsletter: Boolean(document.getElementById('newsletter')?.checked)
    };
  }

  function showSuccess() {
    if (!successMsg) {
      return;
    }

    successMsg.style.display = 'flex';
    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 5000);
  }

  function submitWithEmailJs(payload) {
    if (!window.emailjs || typeof window.emailjs.send !== 'function') {
      return Promise.resolve();
    }

    const serviceId = contactForm?.dataset.serviceId;
    const templateId = contactForm?.dataset.templateId;

    if (!serviceId || !templateId) {
      return Promise.resolve();
    }

    return window.emailjs.send(serviceId, templateId, payload);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = buildPayload();
    const submitButton = contactForm.querySelector('.btn-submit');
    submitButton?.setAttribute('disabled', 'disabled');

    submitWithEmailJs(payload)
      .catch(() => Promise.resolve())
      .finally(() => {
        contactForm.reset();
        updateCharacterCount();
        showSuccess();
        hideError();
        submitButton?.removeAttribute('disabled');

        if (window.AurayanSite && typeof window.AurayanSite.syncCartCount === 'function') {
          window.AurayanSite.syncCartCount();
        }
      });
  }

  function setActiveFaqTab(category) {
    document.querySelectorAll('.faq-tab-btn').forEach((button) => {
      const active = button.textContent.trim().toLowerCase() === category || (category === 'all' && button.textContent.trim().toLowerCase() === 'all');
      button.classList.toggle('active', active);
    });
  }

  function appendChatMessage(text, type) {
    if (!chatMessages) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = `message ${type === 'bot' ? 'bot-message' : 'user-message'}`;

    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    wrapper.appendChild(paragraph);

    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function botReply() {
    const replies = [
      'Thanks for reaching out. A support expert will reply shortly.',
      'Happy to help. You can also share your order ID for faster support.',
      'We got your message. Expect a response within 24 hours.'
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    setTimeout(() => appendChatMessage(reply, 'bot'), 500);
  }

  function sendChatMessage() {
    const text = chatInput?.value.trim() || '';
    if (!text) {
      return;
    }

    appendChatMessage(text, 'user');
    chatInput.value = '';
    botReply();
  }

  function toggleChat() {
    if (!chatBox) {
      return;
    }

    chatBox.classList.toggle('active');
    if (chatBox.classList.contains('active')) {
      chatInput?.focus();
    }
  }

  function handleChatInput(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendChatMessage();
    }
  }

  function openLiveChat() {
    if (!chatBox) {
      return;
    }

    chatBox.classList.add('active');
    chatInput?.focus();
  }

  function filterFAQ(category) {
    setActiveFaqTab(category);

    document.querySelectorAll('.faq-item').forEach((item) => {
      const categories = item.dataset.category || 'all';
      const shouldShow = category === 'all' || categories.includes(category);
      item.classList.toggle('hidden', !shouldShow);
      if (!shouldShow) {
        item.removeAttribute('open');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    safeInitEmailJs();
    updateCharacterCount();

    if (messageTextarea) {
      messageTextarea.addEventListener('input', updateCharacterCount);
    }

    if (contactForm) {
      contactForm.addEventListener('submit', handleSubmit);
    }

    filterFAQ('all');

    if (window.AurayanSite && typeof window.AurayanSite.syncCartCount === 'function') {
      window.AurayanSite.syncCartCount();
    }
  });

  window.filterFAQ = filterFAQ;
  window.toggleChat = toggleChat;
  window.sendChatMessage = sendChatMessage;
  window.handleChatInput = handleChatInput;
  window.openLiveChat = openLiveChat;
})();

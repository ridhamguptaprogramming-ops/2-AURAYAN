(function () {
  function animateCounter(element) {
    const rawValue = element.textContent.replace(/[^\d]/g, '');
    const finalValue = Number.parseInt(rawValue, 10);

    if (!Number.isFinite(finalValue)) {
      return;
    }

    const duration = 1800;
    const stepTime = 40;
    const increment = finalValue / (duration / stepTime);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= finalValue) {
        element.textContent = String(finalValue);
        clearInterval(timer);
        return;
      }
      element.textContent = String(Math.floor(current));
    }, stepTime);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
      }
    );

    document
      .querySelectorAll('.value-card, .sustainability-card, .award-item, .team-member, .timeline-content')
      .forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
      });

    const commitmentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.target.classList.contains('animated')) {
            return;
          }

          const numberElement = entry.target.querySelector('.commitment-number');
          if (numberElement) {
            animateCounter(numberElement);
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.commitment-item').forEach((item) => {
      commitmentObserver.observe(item);
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const targetSelector = anchor.getAttribute('href');
        const target = document.querySelector(targetSelector);
        if (!target) {
          return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    if (window.AurayanSite && typeof window.AurayanSite.syncCartCount === 'function') {
      window.AurayanSite.syncCartCount();
    }
  });
})();

(function () {
  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return '00:00';
    }

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function setupHeroScroll() {
    const trigger = document.getElementById('watch-film-btn');
    const target = document.getElementById('brand-film-section');

    if (!trigger || !target) {
      return;
    }

    trigger.addEventListener('click', () => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function setupVideoChapterControls() {
    const video = document.getElementById('brand-film');
    const chapterButtons = Array.from(document.querySelectorAll('.chapter-btn[data-seek]'));

    if (!video || !chapterButtons.length) {
      return;
    }

    chapterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const seekTo = Number.parseFloat(button.dataset.seek || '0');
        if (Number.isFinite(seekTo)) {
          video.currentTime = seekTo;
        }

        video.play().catch(() => {
          // Play can be blocked until user interacts with native controls.
        });
      });
    });

    function setActiveChapter(currentTime) {
      let activeIndex = 0;

      chapterButtons.forEach((button, index) => {
        const seekTo = Number.parseFloat(button.dataset.seek || '0');
        if (Number.isFinite(seekTo) && currentTime >= seekTo) {
          activeIndex = index;
        }
      });

      chapterButtons.forEach((button, index) => {
        button.classList.toggle('active', index === activeIndex);
      });
    }

    video.addEventListener('timeupdate', () => {
      setActiveChapter(video.currentTime || 0);
    });

    setActiveChapter(0);
  }

  function setupVideoProgress() {
    const video = document.getElementById('brand-film');
    const timeLabel = document.getElementById('video-time');
    const progressFill = document.getElementById('video-progress');

    if (!video || !timeLabel || !progressFill) {
      return;
    }

    function update() {
      const current = Number(video.currentTime) || 0;
      const duration = Number(video.duration) || 0;
      const progress = duration > 0 ? (current / duration) * 100 : 0;

      timeLabel.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
      progressFill.style.width = `${progress}%`;
    }

    video.addEventListener('loadedmetadata', update);
    video.addEventListener('timeupdate', update);
    video.addEventListener('durationchange', update);

    update();
  }

  function setupFeaturedKitAddToCart() {
    const button = document.getElementById('add-featured-kit');
    const feedback = document.getElementById('kit-feedback');

    if (!button || !feedback) {
      return;
    }

    button.addEventListener('click', () => {
      if (!window.AurayanSite || typeof window.AurayanSite.addToCart !== 'function') {
        feedback.textContent = 'Cart system is unavailable right now. Please try again.';
        feedback.className = 'kit-feedback error';
        return;
      }

      window.AurayanSite.addToCart(
        {
          id: 'video-signature-kit',
          name: 'AURAYAN Video Signature Kit',
          price: 1200,
          image: '10.png',
          description: 'Bundle of Noor Elixir, Sultan Reserve, and Infinite Aura.'
        },
        1
      );

      feedback.textContent = 'Video Signature Kit added to cart.';
      feedback.className = 'kit-feedback success';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupHeroScroll();
    setupVideoChapterControls();
    setupVideoProgress();
    setupFeaturedKitAddToCart();

    if (window.AurayanSite && typeof window.AurayanSite.syncCartCount === 'function') {
      window.AurayanSite.syncCartCount();
    }
  });
})();

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
  });
}

// Floating contact toggle
const floatingMain = document.getElementById('floatingMain');
const floatingContact = document.querySelector('.floating-contact');

if (floatingMain && floatingContact) {
  floatingMain.addEventListener('click', () => {
    floatingContact.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!floatingContact.contains(e.target)) {
      floatingContact.classList.remove('active');
    }
  });
}

// Handle dropdown menu behavior on mobile devices
document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle('show');
    }
  });
});

// Banner slider
(function () {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtns = document.querySelectorAll('.slider-arrow.prev');
  const nextBtns = document.querySelectorAll('.slider-arrow.next');
  const slider = document.getElementById('bannerSlider');

  if (!slides.length || !slider) return;

  let current = 0;
  let timer = null;
  const INTERVAL = 8000; // ms between auto-advances

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  function resetAuto() {
    clearInterval(timer);
    startAuto();
  }

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goTo(current - 1);
      resetAuto();
    });
  });

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goTo(current + 1);
      resetAuto();
    });
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
      resetAuto();
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', startAuto);

  // Swipe support
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
  });

  startAuto();
})();

// Image Modal Functionality for Product Pages
(function () {
  const modal = document.getElementById('imageModal');
  if (!modal) return;

  const modalImg = document.getElementById('modalImage');
  const closeBtn = modal.querySelector('.modal-close');

  // Add click handlers to all view sketch/dimension links
  document.querySelectorAll('.view-sketch, .view-dimension').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const imagePath = this.getAttribute('data-image');
      if (imagePath && modalImg) {
        modalImg.src = imagePath;
        modal.style.display = 'flex';
      }
    });
  });

  // Close modal when clicking X
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Close modal when clicking outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
})();
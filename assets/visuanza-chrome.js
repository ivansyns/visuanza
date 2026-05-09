/* ============================================================
   VISUANZA CHROME v6 — shared nav behavior.
   - Hide the floating nav pill on scroll-down, restore on scroll-up.
   - Reveal-on-scroll for any element with class="fx-up" or
     class="reveal" / data-reveal-cards (matches index.html).
   ============================================================ */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  let lastY = window.scrollY;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const goingDown = y > lastY && y > 100;
      nav.classList.toggle('nav--hidden', goingDown);
      lastY = y;
      ticking = false;
    });
  }, { passive: true });
})();

/* fx-up reveal — flips the .visible class once an element crosses
   threshold. No-op for users who set prefers-reduced-motion (the
   CSS already shows them in the resting state). */
(function () {
  const els = document.querySelectorAll('.fx-up');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
})();

/* Mobile nav overlay — hamburger toggles full-screen menu.
   Closes on: close-button click, link click, Escape key. */
(function () {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('nav-mobile');
  if (!hamburger || !overlay) return;

  const closeBtn = overlay.querySelector('.nav__mobile-close');
  const links = overlay.querySelectorAll('a');

  function open() {
    overlay.classList.add('is-open');
    overlay.removeAttribute('inert');
    overlay.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-mobile-open');
  }
  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('inert', '');
    overlay.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-mobile-open');
  }

  hamburger.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  links.forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });

  // Close menu if viewport is resized to desktop
  const mq = window.matchMedia('(min-width: 901px)');
  const onResize = () => { if (mq.matches && overlay.classList.contains('is-open')) close(); };
  mq.addEventListener?.('change', onResize);
})();

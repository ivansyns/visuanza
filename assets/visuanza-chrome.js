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

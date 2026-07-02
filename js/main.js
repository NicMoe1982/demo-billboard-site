// ============================================
// BASE TEMPLATE — shared behavior
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCompareSliders();
  initContactForm();
});

/* Mobile nav toggle */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = open ? '✕' : '☰';
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    });
  });
}

/* Before/after drag comparison sliders */
function initCompareSliders() {
  document.querySelectorAll('.compare').forEach(el => {
    const after = el.querySelector('.after');
    const divider = el.querySelector('.divider');
    if (!after || !divider) return;

    let dragging = false;

    const setPosition = (clientX) => {
      const rect = el.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(4, Math.min(96, pct));
      after.style.clipPath = `inset(0 0 0 ${pct}%)`;
      divider.style.left = `${pct}%`;
    };

    divider.addEventListener('pointerdown', (e) => {
      dragging = true;
      divider.setPointerCapture(e.pointerId);
    });
    divider.addEventListener('pointermove', (e) => {
      if (dragging) setPosition(e.clientX);
    });
    divider.addEventListener('pointerup', () => { dragging = false; });

    el.addEventListener('click', (e) => setPosition(e.clientX));

    // keyboard accessibility
    divider.setAttribute('tabindex', '0');
    divider.setAttribute('role', 'slider');
    divider.setAttribute('aria-label', 'Drag to compare before and after');
    divider.addEventListener('keydown', (e) => {
      const rect = el.getBoundingClientRect();
      const current = parseFloat(divider.style.left) || 50;
      if (e.key === 'ArrowLeft') setPosition(rect.left + (rect.width * (current - 5) / 100));
      if (e.key === 'ArrowRight') setPosition(rect.left + (rect.width * (current + 5) / 100));
    });
  });
}

/* Contact form: lightweight client-side handling (no backend wired up) */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = document.querySelector('.form-success');
    // Swap this block for a real submit (fetch to your backend, Formspree, Netlify Forms, etc.)
    form.reset();
    if (success) success.style.display = 'block';
  });
}

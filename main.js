// =============================================
// REI DAS CONTAS — main.js
// =============================================

/* --- PARTICLES --- */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = Math.random() * 0.5 + 0.1;
    container.appendChild(p);
  }
}

/* --- SCROLL HEADER --- */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --- HAMBURGER MENU --- */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
    });
  });
}

/* --- FAQ ACCORDION --- */
function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const isOpen = q.getAttribute('aria-expanded') === 'true';
      // Close all
      questions.forEach(other => {
        other.setAttribute('aria-expanded', 'false');
        const ans = other.nextElementSibling;
        if (ans) ans.classList.remove('open');
      });
      // Open clicked if was closed
      if (!isOpen) {
        q.setAttribute('aria-expanded', 'true');
        const ans = q.nextElementSibling;
        if (ans) ans.classList.add('open');
      }
    });
  });
}

/* --- SCROLL REVEAL --- */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  const els = document.querySelectorAll(
    '.category-card, .step, .testimonial-card, .faq-item, .trust-item'
  );

  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ${i * 0.08}s ease, transform 0.6s ${i * 0.08}s ease`;
    observer.observe(el);
  });
}

/* --- SMOOTH ANCHOR SCROLL --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --- CARD SHIMMER EFFECT --- */
function initCardShimmer() {
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
}

/* --- STAT COUNTER ANIMATION --- */
function animateCounter(el, target, suffix = '') {
  const duration = 1500;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNums = entry.target.querySelectorAll('.stat-num');
        statNums.forEach(el => {
          const text = el.textContent.trim();
          if (text === '+2K') animateCounter(el, 2, 'K+');
          else if (text === '99%') animateCounter(el, 99, '%');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) observer.observe(statsEl);
}

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initHeader();
  initHamburger();
  initFAQ();
  initScrollReveal();
  initSmoothScroll();
  initCardShimmer();
  initCounters();

  // Re-trigger scroll check
  window.dispatchEvent(new Event('scroll'));
});

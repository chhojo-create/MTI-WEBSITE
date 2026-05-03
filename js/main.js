/* ===========================
   MTI — Shared JS
   =========================== */

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 40 ? '0 4px 32px rgba(5,42,71,.22)' : 'none';
  });
}

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar__nav');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      navMenu.style.cssText = `
        display:flex;flex-direction:column;position:fixed;
        top:72px;left:0;right:0;background:rgba(5,42,71,.98);
        padding:2rem;gap:1.5rem;border-top:1px solid rgba(73,160,192,.15);
      `;
    } else {
      navMenu.removeAttribute('style');
    }
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar__nav a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// Intersection observer for fade-up
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
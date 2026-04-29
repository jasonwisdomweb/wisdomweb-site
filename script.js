/* =============================================
   WISDOMWEB — script.js
   ============================================= */

// ===== ZODIAC YEAR DETECTION =====

const ZODIAC_CYCLE = [
  { name: 'Rat',     emoji: '🐭' },  // 2020
  { name: 'Ox',      emoji: '🐂' },  // 2021
  { name: 'Tiger',   emoji: '🐯' },  // 2022
  { name: 'Rabbit',  emoji: '🐰' },  // 2023
  { name: 'Dragon',  emoji: '🐉' },  // 2024
  { name: 'Snake',   emoji: '🐍' },  // 2025
  { name: 'Horse',   emoji: '🐴' },  // 2026
  { name: 'Goat',    emoji: '🐐' },  // 2027
  { name: 'Monkey',  emoji: '🐒' },  // 2028
  { name: 'Rooster', emoji: '🐓' },  // 2029
  { name: 'Dog',     emoji: '🐕' },  // 2030
  { name: 'Pig',     emoji: '🐷' },  // 2031
];

function getZodiacAnimal(year) {
  const BASE_YEAR = 2020;
  const index = ((year - BASE_YEAR) % 12 + 12) % 12;
  return ZODIAC_CYCLE[index];
}

function initZodiac() {
  const year = new Date().getFullYear();
  const animal = getZodiacAnimal(year);

  const badge = document.getElementById('zodiac-badge');
  if (badge) {
    badge.textContent = `Year of the ${animal.name} ${animal.emoji}`;
  }

  document.querySelectorAll('.zodiac-accent').forEach(el => {
    el.textContent = animal.emoji;
  });
}


// ===== STICKY NAV SHADOW =====

function initStickyNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 8);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


// ===== HAMBURGER MENU =====

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navbar    = document.getElementById('navbar');
  if (!hamburger || !navLinks) return;

  function close() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

  document.addEventListener('click', e => {
    if (navbar && !navbar.contains(e.target)) close();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}


// ===== FAQ ACCORDION =====

function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      // Open clicked (unless it was already open)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}


// ===== SMOOTH SCROLL (offset for sticky nav) =====

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight ?? 70;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


// ===== SCROLL-IN ANIMATIONS =====

function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  const selectors = [
    '.feature-card',
    '.programme-card',
    '.testimonial-card',
    '.faq-item',
    '.trust-item',
    '.ctp-content',
    '.ctp-visual',
    '.hero-text',
    '.hero-visual',
  ];

  document.querySelectorAll(selectors.join(',')).forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });
}


// ===== INIT =====

document.addEventListener('DOMContentLoaded', () => {
  initZodiac();
  initStickyNav();
  initHamburger();
  initFAQ();
  initSmoothScroll();
  initScrollAnimations();
});

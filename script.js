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


// ===== ZODIAC SCATTER ACROSS SECTIONS =====

function scatterZodiacAccents() {
  const year   = new Date().getFullYear();
  const animal = getZodiacAnimal(year);

  const ALL_ANIMALS = ['🐭','🐂','🐯','🐰','🐲','🐍','🐴','🐑','🐵','🐓','🐶','🐷'];

  const SECTION_SELECTORS = [
    '#home',
    '.trust-bar',
    '#about',
    '#ctp',
    '#programmes',
    '.testimonials-section',
    '#faq',
  ];

  // Placement slots: [top%, left%] pairs per section
  const SLOTS = [
    [{ t: 15, l: 92 }, { t: 75, l: 5  }, { t: 45, l: 96 }],
    [{ t: 20, l: 3  }, { t: 60, l: 90 }],
    [{ t: 10, l: 94 }, { t: 80, l: 2  }, { t: 50, l: 97 }],
    [{ t: 8,  l: 3  }, { t: 85, l: 95 }],
    [{ t: 12, l: 96 }, { t: 78, l: 3  }, { t: 40, l: 94 }],
    [{ t: 10, l: 2  }, { t: 70, l: 95 }],
    [{ t: 8,  l: 94 }, { t: 82, l: 2  }, { t: 45, l: 96 }],
  ];

  SECTION_SELECTORS.forEach((sel, sIdx) => {
    const section = document.querySelector(sel);
    if (!section) return;

    const computed = getComputedStyle(section).position;
    if (computed === 'static') section.style.position = 'relative';

    const slots = SLOTS[sIdx];
    slots.forEach((slot, i) => {
      const emoji   = ALL_ANIMALS[(sIdx * 3 + i) % ALL_ANIMALS.length];
      const isHero  = emoji === animal.emoji;

      const span        = document.createElement('span');
      span.textContent  = emoji;
      span.setAttribute('aria-hidden', 'true');
      span.style.cssText = `
        position: absolute;
        top: ${slot.t}%;
        left: ${slot.l}%;
        font-size: ${isHero ? '2.5rem' : '2rem'};
        opacity: ${isHero ? '0.25' : '0.12'};
        pointer-events: none;
        user-select: none;
        z-index: 0;
        animation: zodiacFloat ${5 + (i * 1.3)}s ease-in-out infinite;
        animation-delay: ${i * 0.7}s;
      `;
      section.appendChild(span);
    });
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
  scatterZodiacAccents();
  initStickyNav();
  initHamburger();
  initFAQ();
  initSmoothScroll();
  initScrollAnimations();
});

/* =============================================
   WISDOMWEB — script.js
   ============================================= */

// ===== ZODIAC YEAR DETECTION =====

const ZODIAC_CYCLE = [
  { name: 'Rat',     file: 'Rat.png'     },  // 2020
  { name: 'Ox',      file: 'Ox.png'      },  // 2021
  { name: 'Tiger',   file: 'Tiger.png'   },  // 2022
  { name: 'Rabbit',  file: 'Rabbit.png'  },  // 2023
  { name: 'Dragon',  file: 'Dragon.png'  },  // 2024
  { name: 'Snake',   file: 'Snake.png'   },  // 2025
  { name: 'Horse',   file: 'Horse.png'   },  // 2026
  { name: 'Goat',    file: 'Goat.png'    },  // 2027
  { name: 'Monkey',  file: 'Monkey.png'  },  // 2028
  { name: 'Rooster', file: 'Rooster.png' },  // 2029
  { name: 'Dog',     file: 'Dog.png'     },  // 2030
  { name: 'Pig',     file: 'Pig.png'     },  // 2031
];

function getZodiacAnimal(year) {
  const BASE_YEAR = 2020;
  const index = ((year - BASE_YEAR) % 12 + 12) % 12;
  return ZODIAC_CYCLE[index];
}

function initZodiac() {
  // ZODIAC_CYCLE is used by injectZodiacPNGs; badge element removed from HTML
}


// ===== ZODIAC PNG SCATTER =====

function injectZodiacPNGs() {
  const PLACEMENTS = [
    { section: '#home',                 file: 'Horse.png',   top: 20, left: 72, featured: true  },
    { section: '#home',                 file: 'Rat.png',     top: 70, left: 1,  featured: false },
    { section: '#ctp',                  file: 'Dragon.png',  top: 15, left: 2,  featured: false },
    { section: '#ctp',                  file: 'Goat.png',    top: 60, left: 88, featured: false },
    { section: '#about',                file: 'Snake.png',   top: 60, left: 1,  featured: false },
    { section: '#programmes',           file: 'Ox.png',      top: 20, left: 1,  featured: false },
    { section: '.testimonials-section', file: 'Rooster.png', top: 15, left: 1,  featured: false },
    { section: '.testimonials-section', file: 'Dog.png',     top: 60, left: 88, featured: false },
    { section: '#faq',                  file: 'Pig.png',     top: 15, left: 1,  featured: false },
    { section: '#faq',                  file: 'Monkey.png',  top: 60, left: 88, featured: false },
  ];

  PLACEMENTS.forEach(({ section, file, top, left, featured }, i) => {
    const el = document.querySelector(section);
    if (!el) return;

    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }

    const size = featured ? 200 : 140;
    const opacity = featured ? 0.45 : 0.28;
    const glowColor = featured
      ? 'rgba(249,115,22,0.18)'
      : 'rgba(124,58,237,0.12)';

    const wrapper = document.createElement('div');
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.className = 'zodiac-wrapper';
    if (file === 'Horse.png' && section === '#home') {
      wrapper.classList.add('zodiac-unicorn');
    }
    wrapper.style.cssText = `
      position: absolute;
      top: ${top}%;
      left: ${left}%;
      width: ${size}px;
      pointer-events: none;
      user-select: none;
      z-index: 0;
    `;

    const glow = document.createElement('div');
    glow.style.cssText = `
      position: absolute;
      inset: -24px;
      border-radius: 50%;
      background: radial-gradient(circle, ${glowColor} 0%, transparent 70%);
      z-index: 0;
    `;

    const img = document.createElement('img');
    img.src = `assets/images/${file}`;
    img.alt = '';
    img.style.cssText = `
      position: relative;
      width: 100%;
      height: auto;
      opacity: ${opacity};
      animation: zodiacFloat ${6 + (i % 3) * 1.5}s ease-in-out infinite;
      animation-delay: ${(i * 0.6).toFixed(1)}s;
      z-index: 1;
    `;

    wrapper.appendChild(glow);
    wrapper.appendChild(img);
    el.appendChild(wrapper);
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

      items.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

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
    '.faq-item',
    '.trust-item',
    '.ctp-content',
    '.ctp-visual',
    '.hero-text',
    '.hero-visual',
    '.testimonials-grid',
  ];

  document.querySelectorAll(selectors.join(',')).forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });
}


// ===== STICKY CTP BANNER =====

function initCTPBanner() {
  const banner   = document.getElementById('ctp-banner');
  const closeBtn = document.getElementById('ctp-banner-close');
  if (!banner || !closeBtn) return;

  if (sessionStorage.getItem('ctp-banner-dismissed')) {
    banner.style.display = 'none';
    return;
  }

  closeBtn.addEventListener('click', () => {
    banner.style.display = 'none';
    sessionStorage.setItem('ctp-banner-dismissed', '1');
  });
}


// ===== INIT =====

document.addEventListener('DOMContentLoaded', () => {
  initZodiac();
  injectZodiacPNGs();
  initStickyNav();
  initHamburger();
  initFAQ();
  initSmoothScroll();
  initScrollAnimations();
  initCTPBanner();
});

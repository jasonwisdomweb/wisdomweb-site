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
  const year   = new Date().getFullYear();
  const animal = getZodiacAnimal(year);

  const badge = document.getElementById('zodiac-badge');
  if (badge) {
    badge.textContent = `Year of the ${animal.name}`;
  }
}


// ===== ZODIAC PNG SCATTER =====

function injectZodiacPNGs() {
  const PLACEMENTS = [
    { section: '#home',         file: 'Horse.png',  top: 8,  left: 62, featured: true  },
    { section: '#home',         file: 'Dragon.png', top: 78, left: 3,  featured: false },
    { section: '.trust-bar',    file: 'Rat.png',    top: 30, left: 1,  featured: false },
    { section: '.trust-bar',    file: 'Tiger.png',  top: 30, left: 95, featured: false },
    { section: '#about',        file: 'Monkey.png', top: 8,  left: 90, featured: false },
    { section: '#about',        file: 'Goat.png',   top: 75, left: 2,  featured: false },
    { section: '#about',        file: 'Horse.png',  top: 45, left: 86, featured: true  },
    { section: '#ctp',          file: 'Snake.png',  top: 5,  left: 2,  featured: false },
    { section: '#ctp',          file: 'Rabbit.png', top: 75, left: 90, featured: false },
    { section: '#programmes',   file: 'Ox.png',     top: 5,  left: 1,  featured: false },
    { section: '#programmes',   file: 'Horse.png',  top: 80, left: 90, featured: true  },
    { section: '#faq',          file: 'Dragon.png', top: 5,  left: 92, featured: false },
    { section: '#faq',          file: 'Tiger.png',  top: 85, left: 2,  featured: false },
  ];

  PLACEMENTS.forEach(({ section, file, top, left, featured }, i) => {
    const el = document.querySelector(section);
    if (!el) return;

    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }

    const img = document.createElement('img');
    img.src = `assets/images/${file}`;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.style.cssText = `
      position: absolute;
      top: ${top}%;
      left: ${left}%;
      width: ${featured ? '140px' : '90px'};
      opacity: ${featured ? '0.28' : '0.13'};
      pointer-events: none;
      user-select: none;
      z-index: 0;
      animation: zodiacFloat ${6 + (i % 3) * 1.5}s ease-in-out infinite;
      animation-delay: ${(i * 0.6).toFixed(1)}s;
    `;
    el.appendChild(img);
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


// ===== TESTIMONIALS CAROUSEL =====

function initCarousel() {
  const track          = document.getElementById('carousel-track');
  const dotsContainer  = document.getElementById('carousel-dots');
  const prevBtn        = document.getElementById('carousel-prev');
  const nextBtn        = document.getElementById('carousel-next');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.carousel-slide'));
  const dots   = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.dot')) : [];
  let current  = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('dot--active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('dot--active');
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 6000);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startTimer(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  startTimer();
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
    '.testimonial-carousel',
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
  injectZodiacPNGs();
  initStickyNav();
  initHamburger();
  initFAQ();
  initCarousel();
  initSmoothScroll();
  initScrollAnimations();
});

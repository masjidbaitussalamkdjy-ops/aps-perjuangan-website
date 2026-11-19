/**
 * APS Perjuangan - Main JavaScript
 * Handles Navigation, Dynamic Opening Hours, Smooth Scroll, and Global Interaction Tracking
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation elements
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navBackdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  // 1. Mobile Menu Toggle
  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !navMenu.classList.contains('active');
    
    if (isOpen) {
      navMenu.classList.add('active');
      if (navBackdrop) navBackdrop.classList.add('active');
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      navMenu.classList.remove('active');
      if (navBackdrop) navBackdrop.classList.remove('active');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  }

  // Close mobile nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  });

  // Close on ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
      toggleMobileMenu(false);
    }
  });

  // 2. Sticky Navbar & Back to Top
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active Section Spy
    highlightActiveSection();
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 3. Opening Hours Real-Time Calculator & Today Highlighter
  function updateOpeningHours() {
    const now = new Date();
    const day = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTotalMinutes = hours * 60 + minutes;

    // Schedule definitions in minutes
    // Monday (1) & Tuesday (2): 11:00 AM – 7:00 PM (660 to 1140 min)
    // Wednesday (3) to Sunday (0): 11:00 AM – 8:00 PM (660 to 1200 min)
    const isMonOrTue = (day === 1 || day === 2);
    const openMinutes = 11 * 60; // 11:00
    const closeMinutes = isMonOrTue ? 19 * 60 : 20 * 60; // 19:00 or 20:00
    const closeTimeString = isMonOrTue ? '19:00 WIB' : '20:00 WIB';

    const isOpen = (currentTotalMinutes >= openMinutes && currentTotalMinutes < closeMinutes);

    // Update status badge UI
    const statusBadge = document.getElementById('store-status-badge');
    const statusText = document.getElementById('store-status-text');

    if (statusBadge && statusText) {
      if (isOpen) {
        statusBadge.className = 'status-indicator open';
        statusText.innerHTML = `<strong>Buka Sekarang</strong> • Tutup pukul ${closeTimeString}`;
      } else {
        statusBadge.className = 'status-indicator closed';
        statusText.innerHTML = `<strong>Sedang Tutup</strong> • Buka kembali pukul 11:00 WIB`;
      }
    }

    // Highlight current day in hours table
    // Day mapping: 1: 'senin', 2: 'selasa', 3: 'rabu', 4: 'kamis', 5: 'jumat', 6: 'sabtu', 0: 'minggu'
    const dayIds = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    const currentDayId = dayIds[day];

    document.querySelectorAll('.schedule-row').forEach(row => {
      row.classList.remove('today');
      if (row.getAttribute('data-day') === currentDayId) {
        row.classList.add('today');
      }
    });
  }

  updateOpeningHours();
  // Check every 60 seconds
  setInterval(updateOpeningHours, 60000);

  // 4. Global Analytics Event Handlers
  // WhatsApp Clicks
  document.querySelectorAll('a[href*="wa.me"]').forEach(waLink => {
    waLink.addEventListener('click', () => {
      const href = waLink.getAttribute('href');
      let optionName = 'WhatsApp';
      if (href.includes('628116180528')) {
        optionName = 'CS 1 (08116180528)';
      } else if (href.includes('628116816442')) {
        optionName = 'CS 2 (08116816442)';
      }
      if (window.APSTracking) {
        window.APSTracking.trackClickWhatsapp(optionName);
      }
    });
  });

  // Google Maps Clicks
  document.querySelectorAll('a[href*="maps.app.goo.gl"], a[href*="google.com/maps"]').forEach(mapsLink => {
    mapsLink.addEventListener('click', () => {
      const linkType = mapsLink.getAttribute('data-link-type') || 'directions_button';
      if (window.APSTracking) {
        window.APSTracking.trackClickMaps(linkType);
      }
    });
  });

  // Hero CTAs & Nav Links
  const heroMenuCta = document.getElementById('hero-menu-cta');
  if (heroMenuCta) {
    heroMenuCta.addEventListener('click', () => {
      if (window.APSTracking) {
        window.APSTracking.trackViewMenu('hero_cta');
      }
    });
  }

  const navMenuLink = document.querySelector('a[href="#menu"]');
  if (navMenuLink) {
    navMenuLink.addEventListener('click', () => {
      if (window.APSTracking) {
        window.APSTracking.trackViewMenu('nav_click');
      }
    });
  }
});

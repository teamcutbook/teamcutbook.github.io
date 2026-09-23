/**
 * CutBook — Smart Salon Management
 * Master Interactive JavaScript
 * High-Performance Vanilla JS (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Scroll Handler
  initStickyHeader();

  // 2. Mobile Menu Drawer
  initMobileNav();

  // 3. Reveal on Scroll Animation (IntersectionObserver)
  initScrollAnimations();

  // 4. Counter Up Animation for Stats
  initCounterAnimation();

  // 5. Interactive Product Overview Tabs
  initProductTabs();

  // 6. Interactive Pricing Calculator Simulator
  initPricingCalculator();

  // 7. FAQ Accordion
  initFaqAccordion();

  // 8. 3D Tilt Effect on Hero Mockup
  initTiltEffect();

  // 9. CutBook Owner Summary Screen Telemetry
  initSummaryTelemetryInteractive();

  // 10. Interactive Commission Mode Switcher
  initCommissionModeSwitcher();

  // 12. CutBook Owner Work Entry UI Simulator
  initPosSimulatorInteractive();

  // 13. CutBook Owner Dashboard Screen UI Simulator
  initDashSimulatorInteractive();

  // 14. CutBook Work Entries & Transactions History Screen Simulator
  initWorkEntriesSimulator();

  // 15. CutBook Shop Expenses & Petty Cash Screen Simulator
  initExpensesSimulator();

  // 16. CutBook Staff Express Payout Screen Simulator
  initExpressPayoutSimulator();

  // 17. CutBook Stylist / Employee Dashboard Screen Simulator
  initEmployeeDashboardSimulator();

  // 18. CutBook P&L Reports & Net Profit Screen Simulator
  initReportsScreenSimulator();

  // 19. Simulator Bottom Navigation Inter-Tab Wiring
  initSimulatorBottomNav();

  // 12. Galaxy Orbit System — 3D perspective projection
  initGalaxyOrbit();
});

/* --------------------------------------------------------------------------
   1. Sticky Header
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-footer .btn');

  if (!hamburger || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   3. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. Animated Number Counters
   -------------------------------------------------------------------------- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter-target'));
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const isDecimal = el.getAttribute('data-counter-decimal') === 'true';

        animateValue(el, 0, target, 1600, prefix, suffix, isDecimal);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

function animateValue(obj, start, end, duration, prefix = '', suffix = '', isDecimal = false) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = easeProgress * (end - start);

    if (isDecimal) {
      obj.textContent = prefix + (start + currentVal).toFixed(1) + suffix;
    } else {
      obj.textContent = prefix + Math.floor(start + currentVal).toLocaleString() + suffix;
    }

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* --------------------------------------------------------------------------
   5. Interactive Product Tabs (Grassfeld Style)
   -------------------------------------------------------------------------- */
function initProductTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (!tabButtons.length || !tabPanes.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Update active button & ARIA state
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Smoothly center active button in scrollable container on smaller screens
      button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

      // Update active pane
      tabPanes.forEach(pane => {
        if (pane.getAttribute('data-pane') === targetTab) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Testimonial Carousel
   -------------------------------------------------------------------------- */
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();
}

/* --------------------------------------------------------------------------
   7. Final Pricing Model Interactive Pills
   -------------------------------------------------------------------------- */
function initPricingCalculator() {
  const pills = document.querySelectorAll('.scan-pill-item');
  if (!pills.length) return;
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('featured-example'));
      pill.classList.add('featured-example');
    });
  });
}


/* --------------------------------------------------------------------------
   8. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerPane = item.querySelector('.faq-answer-pane');

    if (!questionBtn || !answerPane) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const pane = otherItem.querySelector('.faq-answer-pane');
        if (pane) pane.style.maxHeight = null;
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        answerPane.style.maxHeight = answerPane.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. 3D Tilt Interaction
   -------------------------------------------------------------------------- */
function initTiltEffect() {
  const tiltCard = document.querySelector('.hero-phone-container');
  if (!tiltCard || window.innerWidth < 992) return;

  const wrap = document.querySelector('.hero-visual-wrap');
  if (!wrap) return;

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  wrap.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
}

/* --------------------------------------------------------------------------
   10. Analytics Chart Dynamic Fill Animation
   -------------------------------------------------------------------------- */
function initSummaryTelemetryInteractive() {
  const periodPills = document.querySelectorAll('.summary-period-selector .period-pill');
  if (!periodPills.length) return;

  const telemetryData = {
    today: {
      totalBalance: '৳28,450',
      balanceSub: 'সকল পেমেন্ট ও খরচের পর বর্তমান মোট ব্যালেন্স (Live balance after payouts & expenses)',
      entryBadge: '34 Entries Completed',
      grossRevenue: '৳28,450',
      grossSub: '34 Total Services Logged',
      ownerProfit: '৳17,160',
      ownerMargin: '60.3% Clean Operating Margin',
      withoutTips: '৳26,950',
      tips: '৳1,500',
      paidPayouts: '৳9,840',
      expenses: '৳1,450',
      cash: '৳16,850',
      cashPct: '59%',
      bkash: '৳8,200',
      bkashPct: '29%',
      nagad: '৳3,400',
      nagadPct: '12%',
      unpaidStaff: '৳2,400',
      pendingBadge: '2 Stylists Pending',
      unpaidPills: '<div class="mini-staff-pill">Rahim: ৳1,400</div><div class="mini-staff-pill">Tanvir: ৳1,000</div>'
    },
    week: {
      totalBalance: '৳1,94,800',
      balanceSub: 'গত ৭ দিনের মোট রিকনসাইল্ড ব্যালেন্স (7-day live bank & cash balance)',
      entryBadge: '248 Entries Completed',
      grossRevenue: '৳2,10,500',
      grossSub: '248 Total Services Logged',
      ownerProfit: '৳1,26,900',
      ownerMargin: '60.2% Clean Operating Margin',
      withoutTips: '৳1,99,200',
      tips: '৳11,300',
      paidPayouts: '৳72,800',
      expenses: '৳10,800',
      cash: '৳1,24,200',
      cashPct: '59%',
      bkash: '৳61,000',
      bkashPct: '29%',
      nagad: '৳25,300',
      nagadPct: '12%',
      unpaidStaff: '৳6,800',
      pendingBadge: '3 Stylists Pending',
      unpaidPills: '<div class="mini-staff-pill">Rahim: ৳2,800</div><div class="mini-staff-pill">Farzana: ৳2,200</div><div class="mini-staff-pill">Tanvir: ৳1,800</div>'
    },
    month: {
      totalBalance: '৳8,42,600',
      balanceSub: 'চলতি মাসের মোট নেট লাভ ও তহবিল (Current month total salon balance)',
      entryBadge: '1,042 Entries Completed',
      grossRevenue: '৳8,95,000',
      grossSub: '1,042 Total Services Logged',
      ownerProfit: '৳5,39,800',
      ownerMargin: '60.3% Clean Operating Margin',
      withoutTips: '৳8,47,000',
      tips: '৳48,000',
      paidPayouts: '৳3,09,700',
      expenses: '৳45,500',
      cash: '৳5,28,000',
      cashPct: '59%',
      bkash: '৳2,59,600',
      bkashPct: '29%',
      nagad: '৳1,07,400',
      nagadPct: '12%',
      unpaidStaff: '৳14,500',
      pendingBadge: '4 Stylists Pending',
      unpaidPills: '<div class="mini-staff-pill">Rahim: ৳5,200</div><div class="mini-staff-pill">Farzana: ৳4,100</div><div class="mini-staff-pill">Karim: ৳3,200</div><div class="mini-staff-pill">Tanvir: ৳2,000</div>'
    },
    year: {
      totalBalance: '৳98,50,000',
      balanceSub: 'বার্ষিক সর্বমোট নিরীক্ষিত তহবিল (Fiscal year audited salon balance)',
      entryBadge: '12,850 Entries Completed',
      grossRevenue: '৳1,04,20,000',
      grossSub: '12,850 Total Services Logged',
      ownerProfit: '৳62,80,000',
      ownerMargin: '60.2% Clean Operating Margin',
      withoutTips: '৳98,60,000',
      tips: '৳5,60,000',
      paidPayouts: '৳36,00,000',
      expenses: '৳5,40,000',
      cash: '৳61,47,800',
      cashPct: '59%',
      bkash: '৳30,21,800',
      bkashPct: '29%',
      nagad: '৳12,50,400',
      nagadPct: '12%',
      unpaidStaff: '৳0',
      pendingBadge: 'All Settled',
      unpaidPills: '<div class="mini-staff-pill" style="background:#ECFDF5; color:#065F46; border-color:#A7F3D0;">✓ 100% Payouts Disbursed</div>'
    }
  };

  const elTotalBalance = document.getElementById('valTotalBalance');
  const elTotalSub = document.getElementById('subTotalBalance');
  const elEntryBadge = document.getElementById('valEntryCountBadge');
  const elGrossRevenue = document.getElementById('valGrossRevenue');
  const elGrossSub = document.getElementById('subGrossRevenue');
  const elOwnerProfit = document.getElementById('valOwnerProfit');
  const elOwnerMargin = document.getElementById('subMargin');
  const elWithoutTips = document.getElementById('valWithoutTips');
  const elTips = document.getElementById('valTips');
  const elPaidPayouts = document.getElementById('valPaidPayouts');
  const elExpenses = document.getElementById('valExpenses');
  const elCash = document.getElementById('valCash');
  const elCashPct = document.getElementById('pctCash');
  const elBarCash = document.getElementById('barCash');
  const elBkash = document.getElementById('valBkash');
  const elBkashPct = document.getElementById('pctBkash');
  const elBarBkash = document.getElementById('barBkash');
  const elNagad = document.getElementById('valNagad');
  const elNagadPct = document.getElementById('pctNagad');
  const elBarNagad = document.getElementById('barNagad');
  const elUnpaidStaff = document.getElementById('valUnpaidStaff');
  const elPendingBadge = document.getElementById('valPendingBadge');
  const elUnpaidPills = document.querySelector('.unpaid-stylist-breakdown');

  periodPills.forEach(pill => {
    pill.addEventListener('click', () => {
      periodPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const period = pill.getAttribute('data-period');
      const data = telemetryData[period];
      if (!data) return;

      const animatedElements = [
        elTotalBalance, elGrossRevenue, elOwnerProfit,
        elWithoutTips, elTips, elPaidPayouts, elExpenses,
        elCash, elBkash, elNagad, elUnpaidStaff
      ];

      animatedElements.forEach(el => {
        if (el) {
          el.style.opacity = '0.35';
          el.style.transform = 'scale(0.97)';
          el.style.transition = 'all 0.15s ease';
        }
      });

      setTimeout(() => {
        if (elTotalBalance) elTotalBalance.textContent = data.totalBalance;
        if (elTotalSub) elTotalSub.textContent = data.balanceSub;
        if (elEntryBadge) elEntryBadge.textContent = data.entryBadge;
        if (elGrossRevenue) elGrossRevenue.textContent = data.grossRevenue;
        if (elGrossSub) elGrossSub.textContent = data.grossSub;
        if (elOwnerProfit) elOwnerProfit.textContent = data.ownerProfit;
        if (elOwnerMargin) elOwnerMargin.textContent = data.ownerMargin;
        if (elWithoutTips) elWithoutTips.textContent = data.withoutTips;
        if (elTips) elTips.textContent = data.tips;
        if (elPaidPayouts) elPaidPayouts.textContent = data.paidPayouts;
        if (elExpenses) elExpenses.textContent = data.expenses;
        if (elCash) elCash.textContent = data.cash;
        if (elCashPct) elCashPct.textContent = data.cashPct;
        if (elBarCash) elBarCash.style.width = data.cashPct;
        if (elBkash) elBkash.textContent = data.bkash;
        if (elBkashPct) elBkashPct.textContent = data.bkashPct;
        if (elBarBkash) elBarBkash.style.width = data.bkashPct;
        if (elNagad) elNagad.textContent = data.nagad;
        if (elNagadPct) elNagadPct.textContent = data.nagadPct;
        if (elBarNagad) elBarNagad.style.width = data.nagadPct;
        if (elUnpaidStaff) elUnpaidStaff.textContent = data.unpaidStaff;
        if (elPendingBadge) elPendingBadge.textContent = data.pendingBadge;
        if (elUnpaidPills) elUnpaidPills.innerHTML = data.unpaidPills;

        animatedElements.forEach(el => {
          if (el) {
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
          }
        });
      }, 150);
    });
  });
}

/* --------------------------------------------------------------------------
   11. Organize Salon Future Together Carousel (8 Cards & Interactive Controls)
   -------------------------------------------------------------------------- */
function initSharedFutureCarousel() {
  const viewport = document.querySelector('.shared-carousel-viewport');
  const track = document.getElementById('futureCarouselTrack');
  const prevBtn = document.getElementById('futurePrevBtn');
  const nextBtn = document.getElementById('futureNextBtn');
  const indicatorsContainer = document.getElementById('futureIndicators');
  const counterEl = document.getElementById('futureActiveIndex');
  const totalCountEl = document.getElementById('futureTotalCount');

  if (!viewport || !track) return;

  const cards = Array.from(viewport.querySelectorAll('.shared-feature-card'));
  if (!cards.length) return;

  if (totalCountEl) totalCountEl.textContent = cards.length;

  // Build pagination dots
  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = 'shared-indicator-dot' + (idx === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to card ${idx + 1}`);
      dot.addEventListener('click', () => {
        scrollToIndex(idx);
        resetAutoPlay();
      });
      indicatorsContainer.appendChild(dot);
    });
  }

  let cachedStep = 0;
  let cachedPad = -1;
  function getCardStep() {
    if (cachedStep > 0) return cachedStep;
    if (cards.length > 1) {
      cachedStep = cards[1].offsetLeft - cards[0].offsetLeft;
      if (cachedStep > 0) return cachedStep;
    }
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 28;
    cachedStep = (cards[0].offsetWidth || 320) + gap;
    return cachedStep;
  }

  function getViewportPad() {
    if (cachedPad >= 0) return cachedPad;
    cachedPad = parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0;
    return cachedPad;
  }
  window.addEventListener('resize', () => { cachedStep = 0; cachedPad = -1; }, { passive: true });

  function scrollToIndex(index) {
    const card = cards[index];
    if (!card) return;
    const target = card.offsetLeft - getViewportPad();
    viewport.scrollTo({ left: target, behavior: 'smooth' });
  }

  function updateActiveState() {
    const step = getCardStep() || 320;
    const currentScroll = viewport.scrollLeft;
    let activeIdx = Math.round(currentScroll / step);
    activeIdx = Math.max(0, Math.min(cards.length - 1, activeIdx));

    if (counterEl) {
      counterEl.textContent = activeIdx + 1;
    }

    if (indicatorsContainer) {
      const dots = indicatorsContainer.querySelectorAll('.shared-indicator-dot');
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === activeIdx);
      });
    }

    return activeIdx;
  }

  let scrollTimeout;
  viewport.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveState, 40);
  }, { passive: true });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const current = updateActiveState();
      if (current >= cards.length - 1) {
        scrollToIndex(0);
      } else {
        scrollToIndex(current + 1);
      }
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const current = updateActiveState();
      if (current <= 0) {
        scrollToIndex(cards.length - 1);
      } else {
        scrollToIndex(current - 1);
      }
      resetAutoPlay();
    });
  }

  // Drag-to-scroll functionality for desktop mouse
  let isDown = false;
  let startX;
  let scrollLeft;

  viewport.addEventListener('mousedown', (e) => {
    isDown = true;
    viewport.classList.add('active');
    startX = e.pageX - viewport.offsetLeft;
    scrollLeft = viewport.scrollLeft;
    stopAutoPlay();
  });

  viewport.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      viewport.classList.remove('active');
      startAutoPlay();
    }
  });

  viewport.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      viewport.classList.remove('active');
      startAutoPlay();
    }
  });

  viewport.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const walk = (x - startX) * 1.5;
    viewport.scrollLeft = scrollLeft - walk;
  });

  // Auto-play / gentle showcase advance
  let autoPlayTimer = null;
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
      const current = updateActiveState();
      const next = (current + 1) % cards.length;
      scrollToIndex(next);
    }, 5000);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    setTimeout(startAutoPlay, 8000);
  }

  // Pause autoplay when user hovers or touches
  const section = document.getElementById('shared-growth') || viewport;
  section.addEventListener('mouseenter', stopAutoPlay);
  section.addEventListener('mouseleave', startAutoPlay);
  section.addEventListener('touchstart', stopAutoPlay, { passive: true });
  section.addEventListener('touchend', () => setTimeout(startAutoPlay, 6000), { passive: true });

  requestAnimationFrame(() => {
    startAutoPlay();
    updateActiveState();
  });
}

/* --------------------------------------------------------------------------
   12. ONE SINGLE SOURCE OF TRUTH (Cosmic Ecosystem Engine)
   ─────────────────────────────────────────────────────────────────────────
   • Pure empty center representing the invisible connected salon core
   • 7 Salon Operation Nodes: Sales, Staff, Work Entries, Payments, Expenses, Earnings, Reports
   • 3 Intersecting graceful elliptical orbits with flowing light pulses
   • Celestial starlight dust & fine constellation lines
   • Interactive 3D camera parallax & smooth chip navigation
   -------------------------------------------------------------------------- */
function initGalaxyOrbit() {
  const canvasEl  = document.getElementById('galaxyOrbitCanvas');
  const stageEl   = document.getElementById('ecosystemStage') || document.getElementById('ecosystem');
  const cvs       = document.getElementById('cosmicCanvas');
  if (!canvasEl || !cvs) return;

  const nodeEls   = Array.from(canvasEl.querySelectorAll('.orbit-cosmic-node'));
  const chips     = Array.from(document.querySelectorAll('.eco-chip'));
  const toggleBtn = document.getElementById('ecoToggleOrbit');
  const ctx       = cvs.getContext('2d');
  if (!nodeEls.length || !ctx) return;

  // Harmonious Cosmic Palette per Salon Operation
  const NODE_CONFIG = [
    { name: 'Sales',        color: { r: 251, g: 191, b: 36,  hex: '#FBBF24' }, orbit: 0, slot: 0 },
    { name: 'Staff',        color: { r: 96,  g: 165, b: 250, hex: '#60A5FA' }, orbit: 1, slot: 0 },
    { name: 'Work Entries', color: { r: 52,  g: 211, b: 153, hex: '#34D399' }, orbit: 1, slot: 1 },
    { name: 'Payments',     color: { r: 56,  g: 189, b: 248, hex: '#38BDF8' }, orbit: 0, slot: 1 },
    { name: 'Expenses',     color: { r: 244, g: 114, b: 182, hex: '#F472B6' }, orbit: 2, slot: 0 },
    { name: 'Earnings',     color: { r: 250, g: 204, b: 21,  hex: '#FACC15' }, orbit: 1, slot: 2 },
    { name: 'Reports',      color: { r: 167, g: 139, b: 250, hex: '#A78BFA' }, orbit: 2, slot: 1 }
  ];

  // 1. High-DPI Canvas Resize
  let dpr = window.devicePixelRatio || 1;
  let stageW = 0;
  let stageH = 0;

  function resizeCvs() {
    dpr = window.devicePixelRatio || 1;
    stageW = canvasEl.offsetWidth || window.innerWidth;
    stageH = canvasEl.offsetHeight || window.innerHeight;
    cvs.width = stageW * dpr;
    cvs.height = stageH * dpr;
    cvs.style.width = stageW + 'px';
    cvs.style.height = stageH + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  resizeCvs();
  window.addEventListener('resize', resizeCvs);

  // 2. Responsive Scale & Positioning (Empty center comfortably below header text)
  function getResponsiveScale() {
    const w = window.innerWidth;
    if (w < 480)  return 0.48;
    if (w < 768)  return 0.62;
    if (w < 1100) return 0.82;
    return 0.98;
  }

  function getCenterY(h) {
    const w = window.innerWidth;
    return h * (w < 768 ? 0.64 : 0.61);
  }

  // 3. Celestial Starlight & Cosmic Dust Particles (Subtle glowing dust motes)
  const DUST_COUNT = window.innerWidth < 768 ? 75 : 150;
  const dustParticles = [];
  for (let i = 0; i < DUST_COUNT; i++) {
    const isGold = Math.random() < 0.22;
    const isBlue = Math.random() < 0.25;
    const isViolet = Math.random() < 0.25;
    let color = 'rgba(255, 255, 255, ';
    if (isGold) color = 'rgba(251, 191, 36, ';
    else if (isBlue) color = 'rgba(147, 197, 253, ';
    else if (isViolet) color = 'rgba(196, 181, 253, ';

    dustParticles.push({
      x: Math.random(),
      y: Math.random(),
      radius: 0.6 + Math.random() * 1.5,
      baseAlpha: 0.12 + Math.random() * 0.45,
      twinkleSpeed: 0.8 + Math.random() * 2.2,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.003,
      driftY: (Math.random() - 0.5) * 0.003,
      color
    });
  }

  // 4. Definition of 3 Graceful Elliptical Orbits Surrounding the Empty Center
  // Orbit 0 (Inner-Mid track): semiMajor: 215, semiMinor: 110, tiltZ: -0.24 rad
  // Orbit 1 (Mid track):       semiMajor: 315, semiMinor: 155, tiltZ: +0.20 rad
  // Orbit 2 (Outer track):     semiMajor: 405, semiMinor: 190, tiltZ: -0.10 rad
  const ORBIT_TRACKS = [
    { semiMajor: 215, semiMinor: 110, tiltZ: -0.24, speed: 0.16,  dir: 1,  photons: [0.15, 0.65], stroke: 'rgba(251, 191, 36, 0.18)' },
    { semiMajor: 315, semiMinor: 155, tiltZ: 0.20,  speed: -0.11, dir: -1, photons: [0.05, 0.45, 0.80], stroke: 'rgba(96, 165, 250, 0.16)' },
    { semiMajor: 405, semiMinor: 190, tiltZ: -0.10, speed: 0.08,  dir: 1,  photons: [0.30, 0.75], stroke: 'rgba(167, 139, 250, 0.15)' }
  ];

  // 5. Initialize the 7 Orbiting Salon Operation Nodes
  const satellites = nodeEls.map((el, idx) => {
    const cfg = NODE_CONFIG[idx];

    // Compute base angle spacing on its orbit
    let baseAngle = 0;
    if (cfg.orbit === 0) {
      baseAngle = cfg.slot === 0 ? 0.3 : Math.PI + 0.3;
    } else if (cfg.orbit === 1) {
      baseAngle = (cfg.slot * (Math.PI * 2 / 3)) + 0.5;
    } else {
      baseAngle = (cfg.slot * Math.PI) + 1.2;
    }

    return {
      el,
      idx,
      name: cfg.name,
      color: cfg.color,
      orbitIdx: cfg.orbit,
      angle: baseAngle,
      targetAngle: null,
      x: 0,
      y: 0,
      z: 0,
      screenX: 0,
      screenY: 0,
      depth: 0.5,
      scale: 1,
      isHovered: false
    };
  });

  // 6. Interactive 3D Cursor Parallax
  let mouseTiltX = 0;
  let mouseTiltY = 0;
  let curTiltX = 0;
  let curTiltY = 0;

  if (stageEl) {
    stageEl.addEventListener('mousemove', (e) => {
      const rect = stageEl.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseTiltX = ny * 0.08; // ±4.5° pitch
      mouseTiltY = nx * 0.11; // ±6.3° yaw
    });
    stageEl.addEventListener('mouseleave', () => {
      mouseTiltX = 0;
      mouseTiltY = 0;
    });
  }

  // 7. Node Hover Listeners (Slows down orbital speed gently)
  let isUserInteracting = false;
  satellites.forEach((sat) => {
    sat.el.addEventListener('mouseenter', () => {
      sat.isHovered = true;
      isUserInteracting = true;
    });
    sat.el.addEventListener('mouseleave', () => {
      sat.isHovered = false;
      isUserInteracting = false;
    });
  });

  // 8. Draw Celestial Starlight & Dust
  function renderDust(w, h, t, dt) {
    dustParticles.forEach((p) => {
      p.x += p.driftX * dt;
      p.y += p.driftY * dt;
      if (p.x < 0) p.x = 1;
      if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1;
      if (p.y > 1) p.y = 0;

      const alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(t * p.twinkleSpeed + p.phase));
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + alpha.toFixed(3) + ')';
      ctx.fill();
    });
  }

  // 9. Draw 3D Perspective Elliptical Orbit Rail with Flowing Light Photons
  const FOCAL = 950;
  const BASE_PITCH = 67 * (Math.PI / 180);

  function drawEllipticalOrbit(track, cx, cy, rs, tiltX, tiltY, dt, t) {
    const a = track.semiMajor * rs;
    const b = track.semiMinor * rs;
    const cosRoll = Math.cos(track.tiltZ);
    const sinRoll = Math.sin(track.tiltZ);

    ctx.save();
    ctx.beginPath();
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const ex = a * Math.cos(theta);
      const ey = b * Math.sin(theta);

      const rx = ex * cosRoll - ey * sinRoll;
      const rz = ex * sinRoll + ey * cosRoll;

      const x3 = rx * Math.cos(tiltY) - rz * Math.sin(tiltY);
      const y3 = (rx * Math.sin(tiltY) + rz * Math.cos(tiltY)) * Math.sin(tiltX);
      const z3 = (rx * Math.sin(tiltY) + rz * Math.cos(tiltY)) * Math.cos(tiltX);

      const sc = FOCAL / (FOCAL - z3);
      const px = cx + x3 * sc;
      const py = cy + y3 * sc;

      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = track.stroke;
    ctx.lineWidth = 1.0;
    ctx.stroke();

    // Flowing light particles traveling gracefully along the elliptical orbit
    track.photons.forEach((progress, pIdx) => {
      const newProgress = (progress + track.dir * 0.12 * dt + 1) % 1;
      track.photons[pIdx] = newProgress;

      const theta = newProgress * Math.PI * 2;
      const ex = a * Math.cos(theta);
      const ey = b * Math.sin(theta);
      const rx = ex * cosRoll - ey * sinRoll;
      const rz = ex * sinRoll + ey * cosRoll;

      const x3 = rx * Math.cos(tiltY) - rz * Math.sin(tiltY);
      const y3 = (rx * Math.sin(tiltY) + rz * Math.cos(tiltY)) * Math.sin(tiltX);
      const z3 = (rx * Math.sin(tiltY) + rz * Math.cos(tiltY)) * Math.cos(tiltX);

      const sc = FOCAL / (FOCAL - z3);
      const px = cx + x3 * sc;
      const py = cy + y3 * sc;

      const depth = Math.max(0, Math.min(1, (z3 + a) / (2 * a)));
      const alpha = 0.35 + depth * 0.55;

      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
      ctx.fill();

      const grad = ctx.createRadialGradient(px, py, 0, px, py, 7.0);
      grad.addColorStop(0, `rgba(255, 255, 255, ${(alpha * 0.6).toFixed(2)})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.beginPath();
      ctx.arc(px, py, 7.0, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    ctx.restore();
  }

  // 10. Draw Fine Constellation-like Connection Lines between Orbiting Nodes
  // NOTE: The center remains completely clear! We skip lines that would cross the central void.
  function drawConstellations(cx, cy, rs, t) {
    const maxLinkDist = 240 * rs;
    const centerClearance = 55 * rs; // Exact center stays 100% empty

    for (let i = 0; i < satellites.length; i++) {
      for (let j = i + 1; j < satellites.length; j++) {
        const s1 = satellites[i];
        const s2 = satellites[j];

        const dx = s1.screenX - s2.screenX;
        const dy = s1.screenY - s2.screenY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxLinkDist && dist > 20) {
          const midX = (s1.screenX + s2.screenX) * 0.5;
          const midY = (s1.screenY + s2.screenY) * 0.5;
          const distToCenter = Math.hypot(midX - cx, midY - cy);

          if (distToCenter > centerClearance) {
            const linkRatio = 1 - (dist / maxLinkDist);
            const alpha = linkRatio * 0.22 * ((s1.depth + s2.depth) * 0.5);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(s1.screenX, s1.screenY);
            ctx.lineTo(s2.screenX, s2.screenY);

            const grad = ctx.createLinearGradient(s1.screenX, s1.screenY, s2.screenX, s2.screenY);
            grad.addColorStop(0, `rgba(${s1.color.r}, ${s1.color.g}, ${s1.color.b}, ${alpha.toFixed(3)})`);
            grad.addColorStop(1, `rgba(${s2.color.r}, ${s2.color.g}, ${s2.color.b}, ${alpha.toFixed(3)})`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Occasional gentle energy pulse along active constellation lines
            const pulseT = (t * 0.6 + (i + j) * 0.4) % 1;
            const pulseX = s1.screenX + (s2.screenX - s1.screenX) * pulseT;
            const pulseY = s1.screenY + (s2.screenY - s1.screenY) * pulseT;

            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${(alpha * 2.2).toFixed(2)})`;
            ctx.fill();

            ctx.restore();
          }
        }
      }
    }
  }

  // 11. Main 60-120fps Animation Loop (IntersectionObserver Throttled)
  let isPaused = false;
  let isIntersecting = false;
  let animFrameId = null;
  let lastTs = null;
  let highlightTimer = null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animate(ts) {
    if (!isIntersecting) {
      animFrameId = null;
      return;
    }
    animFrameId = requestAnimationFrame(animate);

    if (isPaused && !isUserInteracting) return;

    const dt = lastTs ? Math.min((ts - lastTs) * 0.001, 0.05) : 0.016;
    lastTs = ts;
    const t = ts * 0.001;

    const w = canvasEl.offsetWidth || window.innerWidth;
    const h = canvasEl.offsetHeight || window.innerHeight;
    const cx = w * 0.5;
    const cy = getCenterY(h);
    const rs = getResponsiveScale();

    // Smooth lerp for interactive 3D camera parallax
    curTiltX += (mouseTiltX - curTiltX) * 0.05;
    curTiltY += (mouseTiltY - curTiltY) * 0.05;

    const tiltX = BASE_PITCH + curTiltX;
    const tiltY = curTiltY;

    // Clear Canvas
    ctx.clearRect(0, 0, w, h);

    // Layer 1: Celestial Micro Dust
    renderDust(w, h, t, dt);

    // Layer 2: 3 Graceful Elliptical Orbits with Flowing Photons
    ORBIT_TRACKS.forEach((track) => {
      drawEllipticalOrbit(track, cx, cy, rs, tiltX, tiltY, dt, t);
    });

    // Speed damping on user hover
    const speedDamping = prefersReduced ? 0 : (isUserInteracting ? 0.22 : 1.0);

    // Layer 3: Calculate 3D Orbital Trajectory for the 7 Salon Nodes
    satellites.forEach((sat) => {
      const track = ORBIT_TRACKS[sat.orbitIdx];

      if (sat.targetAngle !== null) {
        let diff = sat.targetAngle - sat.angle;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        sat.angle += diff * 0.08;
        if (Math.abs(diff) < 0.005) {
          sat.targetAngle = null;
        }
      } else {
        sat.angle += track.speed * speedDamping * dt;
      }

      const a = track.semiMajor * rs;
      const b = track.semiMinor * rs;
      const cosRoll = Math.cos(track.tiltZ);
      const sinRoll = Math.sin(track.tiltZ);

      const ex = a * Math.cos(sat.angle);
      const ey = b * Math.sin(sat.angle);

      const rx = ex * cosRoll - ey * sinRoll;
      const rz = ex * sinRoll + ey * cosRoll;

      const x3 = rx * Math.cos(tiltY) - rz * Math.sin(tiltY);
      const y3 = (rx * Math.sin(tiltY) + rz * Math.cos(tiltY)) * Math.sin(tiltX);
      const z3 = (rx * Math.sin(tiltY) + rz * Math.cos(tiltY)) * Math.cos(tiltX);

      const floatOffsetY = Math.sin(t * 1.5 + sat.idx) * 3.5;

      const sc = FOCAL / (FOCAL - z3);
      const sx = cx + x3 * sc;
      const sy = cy + (y3 + floatOffsetY) * sc;

      const depth = Math.max(0, Math.min(1, (z3 + a) / (2 * a)));

      sat.x = x3;
      sat.y = y3;
      sat.z = z3;
      sat.screenX = sx;
      sat.screenY = sy;
      sat.depth = depth;
      sat.scale = sc;
    });

    // Soft Collision Repulsion pass: ensure cards glide past each other without overlap
    const minCardDist = 110 * rs;
    for (let i = 0; i < satellites.length; i++) {
      for (let j = i + 1; j < satellites.length; j++) {
        const s1 = satellites[i];
        const s2 = satellites[j];
        const dx = s1.screenX - s2.screenX;
        const dy = s1.screenY - s2.screenY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minCardDist && dist > 1) {
          const overlap = (minCardDist - dist) * 0.5;
          const nx = (dx / dist) * overlap * 0.35;
          const ny = (dy / dist) * overlap * 0.35;
          s1.screenX += nx;
          s1.screenY += ny;
          s2.screenX -= nx;
          s2.screenY -= ny;
        }
      }
    }

    // Layer 4: Draw Fine Constellation Connection Lines between Nodes
    drawConstellations(cx, cy, rs, t);

    // Layer 5: Apply Physical CSS 3D Transforms to Floating Glass Cards
    satellites.forEach((sat) => {
      const sx = sat.screenX;
      const sy = sat.screenY;
      const depth = sat.depth;
      const isBehind = sat.z < 0;

      sat.el.style.left = `${sx}px`;
      sat.el.style.top  = `${sy}px`;

      const visualScale = (0.85 + depth * 0.25) * (sat.isHovered ? 1.08 : 1.0);
      sat.el.style.transform = `translate(-50%, -50%) scale(${visualScale.toFixed(3)})`;
      sat.el.style.opacity = (0.52 + depth * 0.48).toFixed(2);

      if (depth < 0.32) {
        sat.el.style.filter = 'blur(1.2px)';
      } else if (depth < 0.50) {
        sat.el.style.filter = 'blur(0.5px)';
      } else {
        sat.el.style.filter = 'none';
      }

      sat.el.style.zIndex = isBehind ? 6 : 14;
    });
  }

  // 12. Quick-Select Chips (Smoothly guides targeted operation card to front focal center)
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const targetIdx = parseInt(chip.dataset.node, 10);
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      nodeEls.forEach((n) => n.classList.remove('is-focused'));
      const tgtNode = document.getElementById('cosmicNode' + targetIdx);
      if (tgtNode) tgtNode.classList.add('is-focused');

      const targetSat = satellites[targetIdx];
      if (targetSat) {
        const desiredAngle = Math.PI * 0.5;
        const currentAngle = targetSat.angle;
        const delta = desiredAngle - currentAngle;

        satellites.forEach((s) => {
          if (s.orbitIdx === targetSat.orbitIdx) {
            s.targetAngle = s.angle + delta;
          }
        });
      }

      clearTimeout(highlightTimer);
      highlightTimer = setTimeout(() => {
        chips.forEach((c) => c.classList.remove('active'));
        nodeEls.forEach((n) => n.classList.remove('is-focused'));
      }, 4000);
    });
  });

  // 13. Accessible Pause / Resume Toggle
  if (toggleBtn) {
    const pauseIcon = toggleBtn.querySelector('.icon-pause');
    const playIcon  = toggleBtn.querySelector('.icon-play');
    const labelSpan = toggleBtn.querySelector('.ctrl-label');

    toggleBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      if (!isPaused) lastTs = null;
      toggleBtn.classList.toggle('active', isPaused);

      if (pauseIcon && playIcon) {
        pauseIcon.style.display = isPaused ? 'none' : 'block';
        playIcon.style.display  = isPaused ? 'block' : 'none';
      }
      if (labelSpan) {
        labelSpan.textContent = isPaused ? 'চালান' : 'পজ';
      }
    });
  }

  // 14. Visibility and IntersectionObserver (Save 100% CPU/GPU when out of view or tab inactive)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      lastTs = null;
    } else if (isIntersecting && !animFrameId) {
      lastTs = null;
      animFrameId = requestAnimationFrame(animate);
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !animFrameId) {
          lastTs = null;
          animFrameId = requestAnimationFrame(animate);
        }
      });
    }, { rootMargin: '150px 0px 150px 0px' });
    const targetSection = canvasEl.closest('.section-ecosystem') || canvasEl;
    observer.observe(targetSection);
  } else {
    isIntersecting = true;
    animFrameId = requestAnimationFrame(animate);
  }
}


/* --------------------------------------------------------------------------
   13. Interactive 5-in-1 Problem &amp; CutBook Terminal Stream Linkage
   -------------------------------------------------------------------------- */
function initProblemStreamHover() {
  const headacheCards = document.querySelectorAll('.headache-card');
  const streamItems = document.querySelectorAll('.terminal-stream-item, .terminal-net-card');

  if (!headacheCards.length || !streamItems.length) return;

  headacheCards.forEach(card => {
    const streamId = card.getAttribute('data-stream');
    const targetStream = document.getElementById(`stream-${streamId}`);

    card.addEventListener('mouseenter', () => {
      headacheCards.forEach(c => c.classList.remove('is-active'));
      streamItems.forEach(s => s.classList.remove('is-highlighted'));

      card.classList.add('is-active');
      if (targetStream) {
        targetStream.classList.add('is-highlighted');
      }
    });

    // Mobile tap support
    card.addEventListener('click', () => {
      headacheCards.forEach(c => c.classList.remove('is-active'));
      streamItems.forEach(s => s.classList.remove('is-highlighted'));
      card.classList.add('is-active');
      if (targetStream) {
        targetStream.classList.add('is-highlighted');
      }
    });
  });

  const stack = document.querySelector('.headaches-stack');
  if (stack) {
    stack.addEventListener('mouseleave', () => {
      headacheCards.forEach(c => c.classList.remove('is-active'));
      streamItems.forEach(s => s.classList.remove('is-highlighted'));
    });
  }
}

/* --------------------------------------------------------------------------
   14. Interactive Commission Mode Switcher (Section 05)
   -------------------------------------------------------------------------- */
function initCommissionModeSwitcher() {
  const modeBtns = document.querySelectorAll('.comm-mode-btn');
  const modeStatusText = document.getElementById('modeStatusText');
  const settleBtn = document.getElementById('settleAllBtn');
  const terminalTotal = document.querySelector('.terminal-total-pill .total-amount');

  if (!modeBtns.length) return;

  const modeData = {
    percentage: {
      statusHtml: 'Showing: <strong>Percentage Split Mode</strong> (Rates: 35% – 40% per completed service)',
      total: '৳7,680',
      stylists: {
        rahim: {
          tag: '40% Split',
          tagClass: 'tag-percentage',
          comm: '+৳2,560 split',
          tips: '+৳350 tips',
          adv: '-৳500 advance',
          advClass: 'chip-neg',
          net: '৳2,410',
          badge: 'Settled in Cash ✓',
          badgeClass: 'payout-badge settled'
        },
        farzana: {
          tag: '35% Split',
          tagClass: 'tag-percentage',
          comm: '+৳3,220 split',
          tips: '+৳500 tips',
          adv: '৳0 advance',
          advClass: 'chip-neutral',
          net: '৳3,720',
          badge: 'Settled in Cash ✓',
          badgeClass: 'payout-badge settled'
        },
        karim: {
          tag: 'Fixed ৳150/cut',
          tagClass: 'tag-fixed',
          comm: '+৳1,650 split',
          tips: '+৳200 tips',
          adv: '-৳300 advance',
          advClass: 'chip-neg',
          net: '৳1,550',
          badge: 'Ready to Pay ⚡',
          badgeClass: 'payout-badge ready'
        }
      }
    },
    fixed: {
      statusHtml: 'Showing: <strong>Fixed Rate Mode</strong> (Flat ৳150 – ৳600 per service regardless of discounts)',
      total: '৳6,300',
      stylists: {
        rahim: {
          tag: 'Fixed ৳250/cut',
          tagClass: 'tag-fixed',
          comm: '+৳2,000 fixed',
          tips: '+৳350 tips',
          adv: '-৳500 advance',
          advClass: 'chip-neg',
          net: '৳1,850',
          badge: 'Settled in Cash ✓',
          badgeClass: 'payout-badge settled'
        },
        farzana: {
          tag: 'Fixed ৳600/spa',
          tagClass: 'tag-fixed',
          comm: '+৳2,400 fixed',
          tips: '+৳500 tips',
          adv: '৳0 advance',
          advClass: 'chip-neutral',
          net: '৳2,900',
          badge: 'Settled in Cash ✓',
          badgeClass: 'payout-badge settled'
        },
        karim: {
          tag: 'Fixed ৳150/cut',
          tagClass: 'tag-fixed',
          comm: '+৳1,650 fixed',
          tips: '+৳200 tips',
          adv: '-৳300 advance',
          advClass: 'chip-neg',
          net: '৳1,550',
          badge: 'Ready to Pay ⚡',
          badgeClass: 'payout-badge ready'
        }
      }
    },
    salary: {
      statusHtml: 'Showing: <strong>Monthly Salary + Tips Mode</strong> (Base salary + performance volume incentives & 100% tips)',
      total: '৳4,138',
      stylists: {
        rahim: {
          tag: 'Base ৳18,000',
          tagClass: 'tag-salary',
          comm: '+৳1,240 day rate',
          tips: '+৳350 tips',
          adv: '-৳500 advance',
          advClass: 'chip-neg',
          net: '৳1,090',
          badge: 'Settled in Cash ✓',
          badgeClass: 'payout-badge settled'
        },
        farzana: {
          tag: 'Base ৳22,000',
          tagClass: 'tag-salary',
          comm: '+৳1,653 day rate',
          tips: '+৳500 tips',
          adv: '৳0 advance',
          advClass: 'chip-neutral',
          net: '৳2,153',
          badge: 'Settled in Cash ✓',
          badgeClass: 'payout-badge settled'
        },
        karim: {
          tag: 'Base ৳15,000',
          tagClass: 'tag-salary',
          comm: '+৳995 day rate',
          tips: '+৳200 tips',
          adv: '-৳300 advance',
          advClass: 'chip-neg',
          net: '৳895',
          badge: 'Ready to Pay ⚡',
          badgeClass: 'payout-badge ready'
        }
      }
    }
  };

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-comm-mode');
      const data = modeData[mode];

      // Dynamically reflect compensation model on the payroll phone simulator
      const payrollPhone = document.querySelector('.payroll-phone-wrapper');
      if (payrollPhone) {
        const ratePill = payrollPhone.querySelector('#payrollRatePill') || payrollPhone.querySelector('.rn-emp-rate-pill');
        const commLabel = payrollPhone.querySelector('#empCommLabel');
        const commAmount = payrollPhone.querySelector('#empCommAmount');
        if (mode === 'percentage') {
          if (ratePill) ratePill.textContent = '৩৫% কমিশন';
          if (commLabel) commLabel.textContent = 'কমিশন (৩৫%)';
          if (commAmount) commAmount.textContent = '৳4,340.00';
        } else if (mode === 'fixed') {
          if (ratePill) ratePill.textContent = '৳১৫০ ফিক্সড';
          if (commLabel) commLabel.textContent = 'ফিক্সড রেট (৳১৫০)';
          if (commAmount) commAmount.textContent = '৳3,600.00';
        } else if (mode === 'salary') {
          if (ratePill) ratePill.textContent = 'মাসিক বেতন + টিপস';
          if (commLabel) commLabel.textContent = 'দিন প্রতি হাজিরা';
          if (commAmount) commAmount.textContent = '৳1,650.00';
        }
      }

      if (!data) return;

      if (modeStatusText) modeStatusText.innerHTML = data.statusHtml;
      if (terminalTotal) terminalTotal.textContent = data.total;

      // Update rows
      Object.keys(data.stylists).forEach(stylistKey => {
        const row = document.querySelector(`.settlement-row[data-stylist="${stylistKey}"]`);
        if (!row) return;

        const info = data.stylists[stylistKey];
        const tagEl = row.querySelector('.stylist-tag');
        const commEl = row.querySelector('.comm-chip');
        const tipsEl = row.querySelector('.tip-chip');
        const advEl = row.querySelector('.adv-chip');
        const netEl = row.querySelector('.net-chip');
        const badgeEl = row.querySelector('.payout-badge');

        if (tagEl) {
          tagEl.textContent = info.tag;
          tagEl.className = `stylist-tag ${info.tagClass}`;
        }
        if (commEl) commEl.textContent = info.comm;
        if (tipsEl) tipsEl.textContent = info.tips;
        if (advEl) {
          advEl.textContent = info.adv;
          advEl.className = `${info.advClass} adv-chip`;
        }
        if (netEl) netEl.textContent = info.net;
        if (badgeEl) {
          badgeEl.textContent = info.badge;
          badgeEl.className = info.badgeClass;
        }

        // Quick row flash to indicate recalculation
        row.style.transform = 'scale(0.99)';
        setTimeout(() => {
          row.style.transform = '';
        }, 150);
      });
    });
  });

  // Interactive Settlement Action Button
  if (settleBtn) {
    settleBtn.addEventListener('click', () => {
      const originalHtml = settleBtn.innerHTML;
      settleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>✓ Today's Shift Locked & Receipt Dispatched!</span>
      `;
      settleBtn.style.background = '#059669';

      // Update pending badge to settled
      const pendingRow = document.querySelector('.settlement-row.highlight-pending');
      if (pendingRow) {
        pendingRow.classList.remove('highlight-pending');
        const badge = pendingRow.querySelector('.payout-badge');
        if (badge) {
          badge.textContent = 'Settled in Cash ✓';
          badge.className = 'payout-badge settled';
        }
      }

      setTimeout(() => {
        settleBtn.innerHTML = originalHtml;
        settleBtn.style.background = '';
      }, 3500);
    });
  }
}

/* --------------------------------------------------------------------------
   15. Team & Stylist Hub Interactions (Section 06)
   -------------------------------------------------------------------------- */
function initTeamHubInteractions() {
  const copyBtn = document.getElementById('copyInviteCodeBtn');
  const copyText = document.getElementById('copyInviteText');
  const codeEl = document.getElementById('salonInviteCode');
  const stylistCards = document.querySelectorAll('.stylist-hub-card');

  // Copy Salon Invite Code
  if (copyBtn && codeEl) {
    copyBtn.addEventListener('click', () => {
      const code = codeEl.textContent.trim();
      navigator.clipboard.writeText(code).then(() => {
        const originalText = copyText ? copyText.textContent : 'Copy Code';
        if (copyText) copyText.textContent = '✓ Copied PIN!';
        copyBtn.style.background = '#059669';

        setTimeout(() => {
          if (copyText) copyText.textContent = originalText;
          copyBtn.style.background = '';
        }, 2500);
      }).catch(() => {
        // Fallback
        if (copyText) copyText.textContent = '✓ Code: ' + code;
      });
    });
  }

  // Card interactive feedback
  stylistCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = '#10B981';
    });
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('top-ranked')) {
        card.style.borderColor = '';
      } else {
        card.style.borderColor = '#FCD34D';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   16. Service Lifecycle Pipeline Flow (Section 07)
   -------------------------------------------------------------------------- */
function initPipelineFlowInteractions() {
  const stepCards = document.querySelectorAll('.pipeline-step-card');
  if (!stepCards.length) return;

  stepCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      stepCards.forEach(c => c.style.opacity = '0.65');
      card.style.opacity = '1';
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      stepCards.forEach(c => {
        c.style.opacity = '1';
        c.style.transform = '';
      });
    });
  });
}

/* --------------------------------------------------------------------------
   17. Dedicated Stylist Portal Simulation (Section 10)
   Ground-truth replication of EmployeeHomeScreen.tsx & EmployeeTransactionsScreen.tsx
   -------------------------------------------------------------------------- */
function initStylistPortalInteractive() {
  // Screen Mode Switching (Home vs Payout Transactions)
  const btnShowHome = document.getElementById('btnShowHomeScreen');
  const btnShowTxns = document.getElementById('btnShowTxnScreen');
  const screenHome = document.getElementById('stylistHomeScreen');
  const screenTxns = document.getElementById('stylistTxnScreen');

  if (btnShowHome && btnShowTxns && screenHome && screenTxns) {
    btnShowHome.addEventListener('click', () => {
      btnShowHome.classList.add('active');
      btnShowTxns.classList.remove('active');
      screenHome.classList.add('active');
      screenTxns.classList.remove('active');
    });

    btnShowTxns.addEventListener('click', () => {
      btnShowTxns.classList.add('active');
      btnShowHome.classList.remove('active');
      screenTxns.classList.add('active');
      screenHome.classList.remove('active');
    });
  }

  // Time Period Filter Switcher (Today, Weekly, Monthly, Yearly)
  const filterBtns = document.querySelectorAll('.stylist-filter-container .stylist-filter-btn');
  const elHeading = document.getElementById('stylistSummaryHeading');
  const elHeroIncome = document.getElementById('stylistHeroIncome');
  const elHeroSubtext = document.getElementById('stylistHeroSubtext');
  const elCardServices = document.getElementById('stylistCardServices');
  const elCardServicesSub = document.getElementById('stylistCardServicesSub');
  const elCardTips = document.getElementById('stylistCardTips');
  const elCardTipsSub = document.getElementById('stylistCardTipsSub');
  const elCardComm = document.getElementById('stylistCardComm');
  const elCardCommSub = document.getElementById('stylistCardCommSub');
  const elCardPayouts = document.getElementById('stylistCardPayouts');
  const elCardPayoutsSub = document.getElementById('stylistCardPayoutsSub');
  const elViewAll = document.getElementById('stylistViewAllLink');

  const periodStats = {
    today: {
      heading: "Today's Summary (আজকের সারসংক্ষেপ)",
      income: '৳ 3,650',
      subtext: 'Your Share: Comm <strong>৳3,200</strong> + Tips <strong>৳450</strong>',
      services: '9',
      servicesSub: 'Great work! (অসাধারণ কাজ!)',
      tips: '৳ 450',
      tipsSub: 'Excellent! (চমৎকার!)',
      comm: '৳ 3,200',
      commSub: '40% rate',
      payouts: '৳ 2,250',
      payoutsSub: 'From salon (সেলুন থেকে)',
      viewAll: 'View All 9 Services →'
    },
    weekly: {
      heading: 'Weekly Summary (সাপ্তাহিক সারসংক্ষেপ)',
      income: '৳ 24,800',
      subtext: 'Your Share: Comm <strong>৳21,600</strong> + Tips <strong>৳3,200</strong>',
      services: '58',
      servicesSub: '58 Services Completed',
      tips: '৳ 3,200',
      tipsSub: '32 Tips Received',
      comm: '৳ 21,600',
      commSub: '40% rate average',
      payouts: '৳ 18,000',
      payoutsSub: 'Cleared to cash/bKash',
      viewAll: 'View All 58 Services →'
    },
    monthly: {
      heading: 'Monthly Summary (মাসিক সারসংক্ষেপ)',
      income: '৳ 96,400',
      subtext: 'Your Share: Comm <strong>৳84,200</strong> + Tips <strong>৳12,200</strong>',
      services: '232',
      servicesSub: '232 Services Completed',
      tips: '৳ 12,200',
      tipsSub: '124 Tips Received',
      comm: '৳ 84,200',
      commSub: 'Top Stylist Commission',
      payouts: '৳ 80,000',
      payoutsSub: 'Settled to Bank & Drawer',
      viewAll: 'View All 232 Services →'
    },
    yearly: {
      heading: 'Yearly Summary (বার্ষিক সারসংক্ষেপ)',
      income: '৳ 1,180,000',
      subtext: 'Your Share: Comm <strong>৳1,032,000</strong> + Tips <strong>৳148,000</strong>',
      services: '2,840',
      servicesSub: '2,840 Services in 2026',
      tips: '৳ 148,000',
      tipsSub: '1,420 Tips Received',
      comm: '৳ 1,032,000',
      commSub: 'Annual Gross Commission',
      payouts: '৳ 980,000',
      payoutsSub: 'Fully Disbursed',
      viewAll: 'View Annual Record →'
    }
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const period = btn.getAttribute('data-period');
      const data = periodStats[period];
      if (!data || !elHeroIncome) return;

      elHeroIncome.style.opacity = '0.3';
      elHeroIncome.style.transform = 'scale(0.96)';

      setTimeout(() => {
        elHeading.textContent = data.heading;
        elHeroIncome.textContent = data.income;
        elHeroSubtext.innerHTML = data.subtext;
        elCardServices.textContent = data.services;
        elCardServicesSub.textContent = data.servicesSub;
        elCardTips.textContent = data.tips;
        elCardTipsSub.textContent = data.tipsSub;
        elCardComm.textContent = data.comm;
        elCardCommSub.textContent = data.commSub;
        elCardPayouts.textContent = data.payouts;
        elCardPayoutsSub.textContent = data.payoutsSub;
        elViewAll.textContent = data.viewAll;

        elHeroIncome.style.opacity = '1';
        elHeroIncome.style.transform = 'scale(1)';
      }, 150);
    });
  });

  // Entry Cards micro-interaction
  const entryCards = document.querySelectorAll('.rn-entry-card');
  entryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-1px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Interactive Payout Acceptance (From EmployeeTransactionsScreen.tsx)
  const btnAcceptPayout = document.getElementById('btnAcceptPayout');
  const btnRejectPayout = document.getElementById('btnRejectPayout');
  const payoutBtnGroup = document.getElementById('payoutBtnGroup');
  const payoutFeedback = document.getElementById('payoutAcceptedFeedback');
  const payoutBadge = document.getElementById('payoutStatusBadge');
  const screenBadgePulse = document.querySelector('.screen-badge-pulse');

  if (btnAcceptPayout && payoutBtnGroup && payoutFeedback && payoutBadge) {
    btnAcceptPayout.addEventListener('click', () => {
      payoutBtnGroup.style.display = 'none';
      payoutFeedback.style.display = 'flex';
      payoutBadge.textContent = 'Accepted ✓';
      payoutBadge.className = 'txn-status-badge accepted';
      payoutBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      payoutBadge.style.color = '#34D399';
      payoutBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';

      if (screenBadgePulse) {
        screenBadgePulse.style.display = 'none';
      }
    });
  }

  if (btnRejectPayout) {
    btnRejectPayout.addEventListener('click', () => {
      if (confirm('Reject payout request? The owner will be notified to correct the amount.')) {
        payoutBadge.textContent = 'Rejected ✕';
        payoutBadge.style.background = 'rgba(239, 68, 68, 0.2)';
        payoutBadge.style.color = '#F87171';
        payoutBtnGroup.style.opacity = '0.4';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   18. Section 12: Flagship 3-Phone Showcase & Interactive Ergonomics
   -------------------------------------------------------------------------- */
function initPocketShowcase() {
  const row = document.getElementById('pocketPhonesRow');
  const navBtns = document.querySelectorAll('.pocket-nav-btn');
  const phoneCards = document.querySelectorAll('#pocketPhonesRow .mockup-card-small');
  if (!row) return;

  function setActivePhone(target) {
    // Reset focus classes
    row.classList.remove('focus-left', 'focus-center', 'focus-right');
    if (target === 'left') {
      row.classList.add('focus-left');
    } else if (target === 'right') {
      row.classList.add('focus-right');
    } // 'center' has no focus- class, defaults to center-raised

    // Update nav buttons
    navBtns.forEach(btn => {
      if (btn.getAttribute('data-target') === target) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Nav buttons click
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = btn.getAttribute('data-target');
      setActivePhone(target);
    });
  });

  // Clicking any phone card directly focuses it
  phoneCards.forEach(card => {
    card.addEventListener('click', () => {
      const phoneType = card.getAttribute('data-phone');
      if (phoneType) {
        setActivePhone(phoneType);
      }
    });
  });

  // Phone 1 (POS Logger): Interactive service checkbox toggle
  const posItems = document.querySelectorAll('.pos-service-item');
  const posSubmitBtn = document.getElementById('posSubmitDemo');
  if (posItems.length) {
    posItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        item.classList.toggle('is-checked');
        const box = item.querySelector('.service-checkbox');
        if (box) {
          box.textContent = item.classList.contains('is-checked') ? '✓' : '+';
        }
      });
    });
  }

  if (posSubmitBtn) {
    posSubmitBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const origHtml = posSubmitBtn.innerHTML;
      posSubmitBtn.innerHTML = `<span>✓ Entry Logged! Sent to Chair 02</span>`;
      posSubmitBtn.style.background = '#10B981';
      setTimeout(() => {
        posSubmitBtn.innerHTML = origHtml;
        posSubmitBtn.style.background = '';
      }, 2500);
    });
  }

  // Phone 3 (Stylist Portal): Interactive 1-Tap Payout Acceptance
  const stylistAcceptBtn = document.getElementById('stylistAcceptBtn');
  const stylistSettleStatus = document.getElementById('stylistSettleStatus');
  if (stylistAcceptBtn && stylistSettleStatus) {
    stylistAcceptBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      stylistAcceptBtn.classList.add('accepted');
      stylistAcceptBtn.innerHTML = `<span>✓ Payout Accepted &amp; Verified</span>`;
      stylistSettleStatus.textContent = 'Accepted ✓';
      stylistSettleStatus.classList.add('accepted');
      stylistAcceptBtn.style.background = '#0F172A';
      stylistAcceptBtn.disabled = true;
    });
  }
}

/* --------------------------------------------------------------------------
   19. Section 13: 24-Hour Salon Rhythm Workflow Timeline
   -------------------------------------------------------------------------- */
function initWorkflowTimeline() {
  const timeNavSteps = document.querySelectorAll('.time-nav-step');
  const stepBoxes = document.querySelectorAll('.workflow-step-box');
  const navLines = document.querySelectorAll('.time-nav-line');
  if (!timeNavSteps.length || !stepBoxes.length) return;

  function setActiveStep(targetIndex) {
    // Update nav buttons
    timeNavSteps.forEach((btn, idx) => {
      if (idx === targetIndex) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update connecting lines (fill passed ones)
    navLines.forEach((line, idx) => {
      if (idx < targetIndex) {
        line.classList.add('passed');
      } else {
        line.classList.remove('passed');
      }
    });

    // Update cards
    stepBoxes.forEach((box, idx) => {
      if (idx === targetIndex) {
        box.classList.add('is-active');
      } else {
        box.classList.remove('is-active');
      }
    });
  }

  // Click on nav step button
  timeNavSteps.forEach((btn) => {
    btn.addEventListener('click', () => {
      const stepIdx = parseInt(btn.getAttribute('data-step') || '0', 10);
      setActiveStep(stepIdx);
    });
  });

  // Click or hover on step card to sync nav
  stepBoxes.forEach((box) => {
    box.addEventListener('click', () => {
      const stepIdx = parseInt(box.getAttribute('data-step') || '0', 10);
      setActiveStep(stepIdx);
    });

    box.addEventListener('mouseenter', () => {
      const stepIdx = parseInt(box.getAttribute('data-step') || '0', 10);
      setActiveStep(stepIdx);
    });
  });
}

/* --------------------------------------------------------------------------
   20. Section 14: The Old Way vs. CutBook Matrix Filter
   -------------------------------------------------------------------------- */
function initComparisonMatrix() {
  const filterChips = document.querySelectorAll('.comp-filter-chip');
  const matrixRows = document.querySelectorAll('.matrix-row');
  if (!filterChips.length || !matrixRows.length) return;

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      // Update active chip styling
      filterChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const filterVal = chip.getAttribute('data-filter') || 'all';

      // Filter rows
      matrixRows.forEach((row) => {
        const rowCategory = row.getAttribute('data-category');
        if (filterVal === 'all' || rowCategory === filterVal) {
          row.classList.remove('is-hidden');
          // brief subtle fade in
          row.style.animation = 'none';
          row.offsetHeight; // trigger reflow
          row.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          row.classList.add('is-hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   21. Section 15: Revenue Intelligence Bento Lens Switcher
   -------------------------------------------------------------------------- */
function initInsightsLensSwitcher() {
  const lensTabs = document.querySelectorAll('.lens-tab');
  const bentoCards = document.querySelectorAll('.insight-bento-card');
  if (!lensTabs.length || !bentoCards.length) return;

  lensTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      lensTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const targetLens = tab.getAttribute('data-lens');

      bentoCards.forEach((card) => {
        const cardLens = card.getAttribute('data-lens');
        if (cardLens === targetLens) {
          card.classList.add('lens-highlight');
          if (window.innerWidth < 1024) {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          card.classList.remove('lens-highlight');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   22. CutBook Owner Work Entry Native UI Simulator (100% AddWorkEntryScreen Parity)
   -------------------------------------------------------------------------- */
function initPosSimulatorInteractive() {
  const billPriceEl = document.getElementById('rnBillPrice');
  const totalDisplayEl = document.getElementById('rnTotalDisplay');
  const summaryBillEl = document.getElementById('rnSummaryBill');
  const summaryStaffEl = document.getElementById('rnSummaryStaff');
  const summaryStaffLabelEl = document.getElementById('rnSummaryStaffLabel');
  const summaryAvatarEl = document.getElementById('rnSummaryAvatar');
  const tipPlaceholderEl = document.getElementById('rnTipPlaceholder');
  const tipClearBtn = document.getElementById('rnTipClearBtn');
  const saveBtn = document.getElementById('rnSaveEntryBtn');
  const serviceChips = document.querySelectorAll('.rn-quick-chip');
  const staffChips = document.querySelectorAll('.rn-staff-chip');
  const tipChips = document.querySelectorAll('.rn-tip-chip');
  const payCards = document.querySelectorAll('.rn-pay-card');
  const selectedCountBadge = document.getElementById('rnSelectedCountBadge');
  const selectedCardsWrap = document.getElementById('rnSelectedCardsWrap');
  const clearServicesBtn = document.getElementById('rnClearServicesBtn');
  const staffAddBtn = document.getElementById('rnStaffAddBtn');

  // Custom Service Main Screen Drawer
  const mainCustomCard = document.getElementById('rnMainCustomCard');
  const quickCustomLink = document.getElementById('rnQuickCustomLink');
  const addCustomBtn = document.getElementById('rnAddCustomBtn');
  const quickChipCustomBtn = document.getElementById('rnQuickChipCustomBtn');
  const mainCustomCloseBtn = document.getElementById('rnMainCustomCloseBtn');
  const mainCustomNameInput = document.getElementById('rnMainCustomNameInput');
  const mainCustomPriceInput = document.getElementById('rnMainCustomPriceInput');
  const mainCustomAddBtn = document.getElementById('rnMainCustomAddBtn');

  // Notes toggle
  const notesBtn = document.getElementById('rnNotesToggleBtn');
  const notesWrap = document.getElementById('rnNotesExpandWrap');
  const notesLabel = document.getElementById('rnNotesBtnLabel');

  if (notesBtn && notesWrap) {
    notesBtn.addEventListener('click', () => {
      const isVisible = notesWrap.style.display !== 'none';
      notesWrap.style.display = isVisible ? 'none' : 'block';
      notesBtn.classList.toggle('active', !isVisible);
      if (notesLabel) {
        notesLabel.textContent = !isVisible ? 'নোট ✓' : '+ নোট';
      }
    });
  }

  // Catalog Modal elements
  const catalogModal = document.getElementById('rnCatalogModal') || document.getElementById('rnServiceCatalogModal');
  const btnBrowseAll = document.getElementById('rnBrowseAllBtn');
  const btnAddMore = document.getElementById('rnAddMoreServicesBtn');
  const btnCloseCatalog = document.getElementById('rnCatalogCloseBtn');
  const btnDoneCatalog = document.getElementById('rnCatalogDoneBtn');
  const btnConfirmCatalog = document.getElementById('rnCatalogConfirmBtn');
  const catalogSearchInput = document.getElementById('rnCatalogSearchInput');
  const catalogSearchClear = document.getElementById('rnCatalogSearchClear');
  const catalogCatPills = document.querySelectorAll('.rn-catalog-cat-pill, .rn-cat-chip');
  const catalogItems = document.querySelectorAll('.rn-catalog-item');
  const catalogBottomCount = document.getElementById('rnCatalogBottomCount');
  const catalogBottomTotal = document.getElementById('rnCatalogBottomTotal');
  const catalogCustomCard = document.getElementById('rnCatalogCustomCard');
  const catalogCustomDrawer = document.getElementById('rnCatalogCustomDrawer');
  const catalogCustomChevron = document.getElementById('rnCatalogCustomChevron');
  const modalCustomNameInput = document.getElementById('rnModalCustomNameInput');
  const modalCustomPriceInput = document.getElementById('rnModalCustomPriceInput');
  const modalCustomAddBtn = document.getElementById('rnModalCustomAddBtn');
  const catalogEmptyWrap = document.getElementById('rnCatalogEmptyWrap');
  const catalogEmptyAddBtn = document.getElementById('rnCatalogEmptyAddBtn');
  const customTipInput = document.getElementById('rnCustomTipInput');

  // History / Records Modal elements
  const historyModal = document.getElementById('rnHistoryModal');
  const headerHistoryBtn = document.getElementById('rnHeaderHistoryBtn');
  const historyCloseBtn = document.getElementById('rnHistoryCloseBtn');
  const historyList = document.getElementById('rnHistoryList');
  const historySubtitle = document.getElementById('rnHistorySubtitle');

  if (!billPriceEl || !totalDisplayEl) return;

  let currentPrice = 0;
  let currentTip = 0;
  let currentStaff = 'kabbo';
  let currentStaffName = 'kabbo';
  let currentStaffInitials = 'KA';
  let currentStaffRate = 'owner'; // 'owner' | 35 | 40
  let currentPaymentMethod = 'ক্যাশ';
  let currentPaymentColor = '#059669';
  let customServiceName = '';
  let customServicePrice = 0;

  // Services catalog database
  const catalogData = {
    haircut: { name: 'চুল কাটা', price: 150, cat: 'hair', icon: '✂️' },
    spa: { name: 'Spa', price: 50000, cat: 'spa', icon: '✂️' },
    facial: { name: 'Facial', price: 6000, cat: 'facial', icon: '✂️' },
    beard: { name: 'দাড়ি ট্রিম', price: 100, cat: 'beard', icon: '🧔' },
    shave: { name: 'ক্লিন শেভ', price: 80, cat: 'shave', icon: '🪒' },
    color: { name: 'হেয়ার কালার / ডাই', price: 450, cat: 'color', icon: '🎨' }
  };

  let activeServiceIds = new Set();

  function renderSelectedTags() {
    if (!selectedCardsWrap) return;
    selectedCardsWrap.innerHTML = '';

    const totalSelectedCount = activeServiceIds.size + (customServiceName ? 1 : 0);

    if (totalSelectedCount === 0) {
      selectedCardsWrap.innerHTML = `<div style="font-size:0.62rem;color:#94A3B8;padding:4px 0">কোনো সেবা নির্বাচিত নেই। দ্রুত যোগ করতে নিচের বাটনে চাপ দিন।</div>`;
      if (selectedCountBadge) selectedCountBadge.textContent = '০টি নির্বাচিত';
      return;
    }

    if (selectedCountBadge) {
      selectedCountBadge.textContent = `${totalSelectedCount}টি নির্বাচিত`;
    }

    // Render regular services
    activeServiceIds.forEach((id) => {
      const item = catalogData[id] || { name: id, price: 150 };
      const card = document.createElement('div');
      card.className = 'rn-selected-tag-card';
      card.setAttribute('data-service-id', id);
      card.innerHTML = `
        <div class="rn-selected-tag-left">
          <span class="rn-selected-tag-check">✓</span>
          <span class="rn-selected-tag-name">${item.name}</span>
        </div>
        <div class="rn-selected-tag-right">
          <span class="rn-selected-tag-price">৳${item.price}</span>
          <button type="button" class="rn-selected-tag-remove-btn" data-remove="${id}" title="মুছুন">✕</button>
        </div>
      `;

      const removeBtn = card.querySelector('.rn-selected-tag-remove-btn');
      if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleServiceById(id);
        });
      }

      selectedCardsWrap.appendChild(card);
    });

    // Render custom service if present (selectedTagCardCustom)
    if (customServiceName && customServicePrice > 0) {
      const customCard = document.createElement('div');
      customCard.className = 'rn-selected-tag-card';
      customCard.style.background = '#ECFDF5';
      customCard.style.borderColor = '#A7F3D0';
      customCard.innerHTML = `
        <div class="rn-selected-tag-left">
          <span style="color:#059669;font-size:0.75rem;">✨</span>
          <span class="rn-selected-tag-name" style="color:#065F46;font-weight:700;">${customServiceName}</span>
        </div>
        <div class="rn-selected-tag-right">
          <span class="rn-selected-tag-price">৳${customServicePrice}</span>
          <button type="button" class="rn-selected-tag-remove-btn" id="rnRemoveCustomTagBtn" title="মুছুন">✕</button>
        </div>
      `;

      const removeCustomBtn = customCard.querySelector('#rnRemoveCustomTagBtn');
      if (removeCustomBtn) {
        removeCustomBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          customServiceName = '';
          customServicePrice = 0;
          calculatePriceFromSelected();
          renderSelectedTags();
        });
      }

      selectedCardsWrap.appendChild(customCard);
    }
  }

  function calculatePriceFromSelected() {
    let sum = 0;
    activeServiceIds.forEach((id) => {
      const item = catalogData[id];
      if (item) sum += item.price;
    });
    sum += customServicePrice;
    currentPrice = sum;
    updateTotals();
  }

  function updateTotals() {
    const total = currentPrice + currentTip;
    billPriceEl.textContent = currentPrice.toString();
    totalDisplayEl.textContent = `৳${total.toFixed(2)}`;

    if (saveBtn) {
      if (total > 0) {
        saveBtn.style.background = '#059669';
        saveBtn.style.cursor = 'pointer';
      } else {
        saveBtn.style.background = '#8492A6';
      }
    }

    if (summaryBillEl) summaryBillEl.textContent = `৳${total.toFixed(2)}`;

    // Staff Commission Calculation matching AddWorkEntryScreen.tsx
    let staffShare = 0;
    if (currentStaffRate === 'owner') {
      staffShare = total; // Working owner receives full amount
    } else {
      const rateNum = typeof currentStaffRate === 'number' ? currentStaffRate : 35;
      staffShare = Math.round(currentPrice * (rateNum / 100)) + currentTip;
    }

    if (summaryStaffEl) summaryStaffEl.textContent = `৳${staffShare.toFixed(2)}`;
    if (catalogBottomTotal) catalogBottomTotal.textContent = `৳${currentPrice.toFixed(2)}`;
    const totalCount = activeServiceIds.size + (customServiceName ? 1 : 0);
    if (catalogBottomCount) catalogBottomCount.textContent = `${totalCount}টি সেবা নির্বাচিত`;
  }

  function toggleServiceById(id) {
    if (activeServiceIds.has(id)) {
      activeServiceIds.delete(id);
    } else {
      activeServiceIds.add(id);
    }

    // Sync quick chips
    serviceChips.forEach((chip) => {
      const cId = chip.getAttribute('data-id');
      if (cId) {
        chip.classList.toggle('active', activeServiceIds.has(cId));
      }
    });

    // Sync catalog modal items
    catalogItems.forEach((ci) => {
      const cId = ci.getAttribute('data-id');
      const isSelected = activeServiceIds.has(cId);
      ci.classList.toggle('selected', isSelected);
      const checkEl = ci.querySelector('.rn-catalog-check');
      if (checkEl) checkEl.textContent = isSelected ? '✓' : '+';
    });

    calculatePriceFromSelected();
    renderSelectedTags();
  }

  // Clear all services
  if (clearServicesBtn) {
    clearServicesBtn.addEventListener('click', () => {
      activeServiceIds.clear();
      customServiceName = '';
      customServicePrice = 0;
      serviceChips.forEach((c) => {
        if (!c.classList.contains('rn-chip-custom')) c.classList.remove('active');
      });
      catalogItems.forEach((ci) => {
        ci.classList.remove('selected');
        const checkEl = ci.querySelector('.rn-catalog-check');
        if (checkEl) checkEl.textContent = '+';
      });
      calculatePriceFromSelected();
      renderSelectedTags();
    });
  }

  // Toggle Services via Quick Chips
  serviceChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      if (chip.classList.contains('rn-chip-custom')) return;
      const cId = chip.getAttribute('data-id');
      if (cId) toggleServiceById(cId);
    });
  });

  // Main Screen Custom Service Drawer Handlers
  function toggleMainCustomDrawer(show) {
    if (!mainCustomCard) return;
    const isVisible = mainCustomCard.style.display !== 'none';
    const nextState = show !== undefined ? show : !isVisible;
    mainCustomCard.style.display = nextState ? 'block' : 'none';
    if (nextState && mainCustomNameInput) {
      mainCustomNameInput.focus();
    }
  }

  if (quickCustomLink) quickCustomLink.addEventListener('click', () => toggleMainCustomDrawer(true));
  if (addCustomBtn) addCustomBtn.addEventListener('click', () => toggleMainCustomDrawer(true));
  if (quickChipCustomBtn) quickChipCustomBtn.addEventListener('click', () => toggleMainCustomDrawer(true));
  if (mainCustomCloseBtn) mainCustomCloseBtn.addEventListener('click', () => toggleMainCustomDrawer(false));

  if (mainCustomAddBtn) {
    mainCustomAddBtn.addEventListener('click', () => {
      const name = (mainCustomNameInput?.value || '').trim();
      const priceVal = parseFloat(mainCustomPriceInput?.value || '0');

      if (!name) {
        alert('দয়া করে সেবার নাম লিখুন');
        return;
      }
      if (isNaN(priceVal) || priceVal <= 0) {
        alert('দয়া করে সঠিক সেবা মূল্য লিখুন');
        return;
      }

      customServiceName = name;
      customServicePrice = priceVal;
      toggleMainCustomDrawer(false);
      calculatePriceFromSelected();
      renderSelectedTags();

      if (mainCustomNameInput) mainCustomNameInput.value = '';
      if (mainCustomPriceInput) mainCustomPriceInput.value = '';
    });
  }

  // Switch Staff
  staffChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      staffChips.forEach((c) => {
        c.classList.remove('active');
        const check = c.querySelector('.rn-avatar-check');
        if (check) check.remove();
      });
      chip.classList.add('active');

      const staffKey = chip.getAttribute('data-staff') || 'kabbo';
      currentStaff = staffKey;

      if (staffKey === 'kabbo') {
        currentStaffName = 'kabbo';
        currentStaffInitials = 'KA';
        currentStaffRate = 'owner';
      } else if (staffKey === 'masum') {
        currentStaffName = 'masum';
        currentStaffInitials = 'MA';
        currentStaffRate = 35;
      } else {
        currentStaffName = 'xMan';
        currentStaffInitials = 'XM';
        currentStaffRate = 40;
      }

      if (summaryStaffLabelEl) summaryStaffLabelEl.textContent = `${currentStaffName}:`;
      if (summaryAvatarEl) summaryAvatarEl.textContent = currentStaffInitials;

      const avatar = chip.querySelector('.rn-staff-avatar');
      if (avatar && !avatar.querySelector('.rn-avatar-check')) {
        const check = document.createElement('span');
        check.className = 'rn-avatar-check';
        check.textContent = '✓';
        avatar.appendChild(check);
      }

      updateTotals();
    });
  });

  if (staffAddBtn) {
    staffAddBtn.addEventListener('click', () => {
      alert('নতুন স্টাফ যুক্ত করতে বা কমিশন কনফিগার করতে CutBook অ্যাপের টিম ট্যাব ব্যবহার করুন।');
    });
  }

  // Switch Tip with Suggestions
  tipChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      tipChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const val = parseInt(chip.getAttribute('data-tip') || '0', 10);
      currentTip = val;
      if (customTipInput) customTipInput.value = '';

      if (tipPlaceholderEl) {
        tipPlaceholderEl.textContent = val > 0 ? `+৳${val}` : 'বকশিসের পরিমাণ লিখুন...';
        tipPlaceholderEl.style.color = val > 0 ? '#059669' : '#94A3B8';
        tipPlaceholderEl.style.fontWeight = val > 0 ? '700' : '400';
      }

      if (tipClearBtn) {
        tipClearBtn.style.display = val > 0 ? 'inline-block' : 'none';
      }

      updateTotals();
    });
  });

  if (customTipInput) {
    customTipInput.addEventListener('input', () => {
      const val = parseFloat(customTipInput.value || '0');
      if (!isNaN(val) && val >= 0) {
        tipChips.forEach((c) => c.classList.remove('active'));
        currentTip = val;
        updateTotals();
      }
    });
  }

  if (tipClearBtn) {
    tipClearBtn.addEventListener('click', () => {
      currentTip = 0;
      tipChips.forEach((c) => {
        c.classList.remove('active');
      });
      if (customTipInput) customTipInput.value = '';
      if (tipPlaceholderEl) {
        tipPlaceholderEl.textContent = 'বকশিসের পরিমাণ লিখুন...';
        tipPlaceholderEl.style.color = '#94A3B8';
        tipPlaceholderEl.style.fontWeight = '400';
      }
      updateTotals();
    });
  }

  // Switch Payment
  const paymentMap = {
    cash: { name: 'ক্যাশ', color: '#059669' },
    bkash: { name: 'bKash', color: '#E2136E' },
    nagad: { name: 'Nagad', color: '#F37021' },
    qr: { name: 'Bangla QR', color: '#006A4E' },
    rocket: { name: 'Rocket', color: '#8C2D8B' },
    card: { name: 'কার্ড', color: '#2563EB' }
  };

  payCards.forEach((card) => {
    card.addEventListener('click', () => {
      payCards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      const method = card.getAttribute('data-method') || 'cash';
      const mInfo = paymentMap[method] || { name: 'Cash', color: '#4a7c59' };
      currentPaymentMethod = mInfo.name;
      currentPaymentColor = mInfo.color;
    });
  });

  // Complete Button Feedback & Dynamic History Entry
  let savedEntriesCount = 3;
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      if (currentPrice <= 0) {
        alert('দয়া করে কমপক্ষে একটি সেবা নির্বাচন করুন।');
        return;
      }

      const total = currentPrice + currentTip;
      const originalText = saveBtn.innerHTML;
      saveBtn.innerHTML = `<span>✓ ${currentStaffName}-এর কাজের হিসাব সেভ হয়েছে!</span>`;
      saveBtn.style.background = '#047857';

      // Coin decrement visual feedback
      const coinEl = document.querySelector('.rn-coin-balance');
      if (coinEl && coinEl.textContent === '৫৫৭৫') {
        coinEl.textContent = '৫৫৭৪';
        coinEl.style.color = '#059669';
        setTimeout(() => {
          coinEl.style.color = '';
        }, 2500);
      }

      // Prepend newly saved entry into History Modal (WorkEntryCard.tsx Parity)
      if (historyList) {
        savedEntriesCount++;
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const timeStr = `${displayHours}:${displayMinutes} ${ampm}`;

        const namesList = [];
        activeServiceIds.forEach((id) => {
          if (catalogData[id]) namesList.push(catalogData[id].name);
        });
        if (customServiceName) namesList.push(customServiceName);
        const serviceNameStr = namesList.join(' & ') || 'সেলুন সেবা';

        const newCard = document.createElement('div');
        newCard.className = 'rn-work-card';
        newCard.style.animation = 'fadeIn 0.3s ease';
        newCard.innerHTML = `
          <div class="rn-work-card-header">
            <div class="rn-work-service-info">
              <div class="rn-work-service-name">${serviceNameStr}</div>
              <div class="rn-work-time">${timeStr} • এইমাত্র</div>
            </div>
            <div class="rn-work-price-container">
              <div class="rn-work-price">৳${total.toFixed(2)}</div>
              ${currentTip > 0 ? `<div class="rn-work-tip-badge">+৳${currentTip} tip</div>` : ''}
            </div>
          </div>
          <div class="rn-work-card-footer">
            <div class="rn-work-emp-container">
              <div class="rn-work-emp-avatar" style="background:#059669">${currentStaffInitials}</div>
              <div class="rn-work-emp-name">${currentStaffName}</div>
            </div>
            <div class="rn-work-payment-badge" style="background:${currentPaymentColor};">${currentPaymentMethod}</div>
          </div>
        `;
        historyList.insertBefore(newCard, historyList.firstChild);

        if (historySubtitle) {
          historySubtitle.textContent = `${savedEntriesCount}টি এন্ট্রি সংরক্ষিত • মায়ের দোয়া সেলুন`;
        }
      }

      setTimeout(() => {
        saveBtn.innerHTML = originalText;
        saveBtn.style.background = '';
      }, 2500);
    });
  }

  // --- CATALOG MODAL CONTROLS ---
  function openCatalog() {
    if (catalogModal) catalogModal.classList.add('active');
  }

  function closeCatalog() {
    if (catalogModal) catalogModal.classList.remove('active');
  }

  if (btnBrowseAll) btnBrowseAll.addEventListener('click', openCatalog);
  if (btnAddMore) btnAddMore.addEventListener('click', openCatalog);
  if (btnCloseCatalog) btnCloseCatalog.addEventListener('click', closeCatalog);
  if (btnDoneCatalog) btnDoneCatalog.addEventListener('click', closeCatalog);
  if (btnConfirmCatalog) btnConfirmCatalog.addEventListener('click', closeCatalog);

  // Modal Custom Drawer Toggle
  if (catalogCustomCard && catalogCustomDrawer) {
    catalogCustomCard.addEventListener('click', () => {
      const isVisible = catalogCustomDrawer.style.display !== 'none';
      catalogCustomDrawer.style.display = isVisible ? 'none' : 'block';
      if (catalogCustomChevron) {
        catalogCustomChevron.textContent = isVisible ? '▾' : '▴';
      }
    });
  }

  if (modalCustomAddBtn) {
    modalCustomAddBtn.addEventListener('click', () => {
      const name = (modalCustomNameInput?.value || '').trim();
      const priceVal = parseFloat(modalCustomPriceInput?.value || '0');

      if (!name) {
        alert('দয়া করে সেবার নাম লিখুন');
        return;
      }
      if (isNaN(priceVal) || priceVal <= 0) {
        alert('সঠিক সেবা মূল্য লিখুন');
        return;
      }

      customServiceName = name;
      customServicePrice = priceVal;
      if (catalogCustomDrawer) catalogCustomDrawer.style.display = 'none';
      if (modalCustomNameInput) modalCustomNameInput.value = '';
      if (modalCustomPriceInput) modalCustomPriceInput.value = '';
      calculatePriceFromSelected();
      renderSelectedTags();
    });
  }

  // Catalog Item Selection
  catalogItems.forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      if (id) toggleServiceById(id);
    });
  });

  // Catalog Category Filters
  catalogCatPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      catalogCatPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-cat') || 'all';

      let visibleCount = 0;
      catalogItems.forEach((ci) => {
        const itemCat = ci.getAttribute('data-cat');
        const show = (cat === 'all' || itemCat === cat);
        ci.style.display = show ? 'flex' : 'none';
        if (show) visibleCount++;
      });

      if (catalogEmptyWrap) {
        catalogEmptyWrap.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });

  // Catalog Search Filter
  if (catalogSearchInput) {
    catalogSearchInput.addEventListener('input', (e) => {
      const query = (e.target.value || '').trim().toLowerCase();
      if (catalogSearchClear) {
        catalogSearchClear.style.display = query ? 'inline-block' : 'none';
      }

      let visibleCount = 0;
      catalogItems.forEach((ci) => {
        const name = (ci.getAttribute('data-name') || '').toLowerCase();
        const cat = (ci.getAttribute('data-cat') || '').toLowerCase();
        const match = name.includes(query) || cat.includes(query);
        ci.style.display = match ? 'flex' : 'none';
        if (match) visibleCount++;
      });

      if (catalogEmptyWrap) {
        catalogEmptyWrap.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  }

  if (catalogSearchClear) {
    catalogSearchClear.addEventListener('click', () => {
      if (catalogSearchInput) {
        catalogSearchInput.value = '';
        catalogSearchInput.dispatchEvent(new Event('input'));
      }
    });
  }

  if (catalogEmptyAddBtn) {
    catalogEmptyAddBtn.addEventListener('click', () => {
      const query = (catalogSearchInput?.value || '').trim();
      if (query) {
        customServiceName = query;
        customServicePrice = 200;
        calculatePriceFromSelected();
        renderSelectedTags();
        closeCatalog();
      }
    });
  }

  // --- HISTORY MODAL CONTROLS ---
  if (headerHistoryBtn && historyModal) {
    headerHistoryBtn.addEventListener('click', () => {
      historyModal.classList.add('active');
    });
  }

  if (historyCloseBtn && historyModal) {
    historyCloseBtn.addEventListener('click', () => {
      historyModal.classList.remove('active');
    });
  }

  // Initial tag render
  renderSelectedTags();
}

/* --------------------------------------------------------------------------
   23. CutBook Owner Dashboard Screen Native UI Simulator
   -------------------------------------------------------------------------- */
/**
 * CutBook Owner Dashboard Screen Native UI Simulator Logic
 * 100% DashboardScreen.tsx Parity
 */
function initDashSimulatorInteractive() {
  const dashData = {
    today: {
      balance: '৳8,474,209.00',
      gross: '৳214,040.00',
      customers: '11',
      periodLabel: 'Daily',
      ownerProfit: '৳116,524.50',
      expenses: '৳0.00',
      expCount: 'কোনো খরচ হয়নি',
      payouts: '৳20.00',
      tips: '৳440.00',
      unpaid: '৳97,495.50',
      withoutTips: '৳213,600.00',
      cash: '৳107,400',
      mobile: '৳106,400',
      date: '20 Sep 2026'
    },
    weekly: {
      balance: '৳8,620,500.00',
      gross: '৳1,480,200.00',
      customers: '84',
      periodLabel: 'Weekly',
      ownerProfit: '৳792,400.00',
      expenses: '৳18,500.00',
      expCount: '৫টি খরচ',
      payouts: '৳140.00',
      tips: '৳3,200.00',
      unpaid: '৳680,200.00',
      withoutTips: '৳1,477,000.00',
      cash: '৳745,000',
      mobile: '৳735,200',
      date: '14 - 20 Sep 2026'
    },
    monthly: {
      balance: '৳9,150,000.00',
      gross: '৳6,250,000.00',
      customers: '340',
      periodLabel: 'Monthly',
      ownerProfit: '৳3,450,000.00',
      expenses: '৳85,000.00',
      expCount: '১৮টি খরচ',
      payouts: '৳600.00',
      tips: '৳14,500.00',
      unpaid: '৳2,850,000.00',
      withoutTips: '৳6,235,500.00',
      cash: '৳3,150,000',
      mobile: '৳3,100,000',
      date: 'September 2026'
    },
    yearly: {
      balance: '৳12,850,000.00',
      gross: '৳48,500,000.00',
      customers: '4,100',
      periodLabel: 'Yearly',
      ownerProfit: '৳26,800,000.00',
      expenses: '৳640,000.00',
      expCount: '১৪২টি খরচ',
      payouts: '৳7,500.00',
      tips: '৳115,000.00',
      unpaid: '৳21,700,000.00',
      withoutTips: '৳48,385,000.00',
      cash: '৳24,500,000',
      mobile: '৳24,000,000',
      date: 'Year 2026'
    }
  };

  const elBalance = document.getElementById('dashLiveBalance');
  const elGross = document.getElementById('dashGrossRevenue');
  const elCustomers = document.getElementById('dashCustomerCount');
  const elPeriodLabel = document.getElementById('dashPeriodLabel');
  const elProfit = document.getElementById('dashOwnerProfit');
  const elExpenses = document.getElementById('dashExpenses');
  const elExpCount = document.getElementById('dashExpCount');
  const elPayouts = document.getElementById('dashPayouts');
  const elTips = document.getElementById('dashTips');
  const elUnpaid = document.getElementById('dashUnpaid');
  const elWithoutTips = document.getElementById('dashWithoutTips');
  const elCash = document.getElementById('dashCash');
  const elMobile = document.getElementById('dashMobileBanking');
  const elSelectedDate = document.getElementById('dashSelectedDate');

  const tabs = document.querySelectorAll('.rn-dash-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const period = tab.getAttribute('data-dash-period') || 'today';
      const d = dashData[period];
      if (!d) return;

      // Subtle scale and fade transition
      if (elBalance) {
        elBalance.style.opacity = '0.3';
        elBalance.style.transform = 'scale(0.96)';
        setTimeout(() => {
          elBalance.textContent = d.balance;
          if (elGross) elGross.textContent = d.gross;
          if (elCustomers) elCustomers.textContent = d.customers;
          if (elPeriodLabel) elPeriodLabel.textContent = d.periodLabel;
          if (elProfit) elProfit.textContent = d.ownerProfit;
          if (elExpenses) elExpenses.textContent = d.expenses;
          if (elExpCount) elExpCount.textContent = d.expCount;
          if (elPayouts) elPayouts.textContent = d.payouts;
          if (elTips) elTips.textContent = d.tips;
          if (elUnpaid) elUnpaid.textContent = d.unpaid;
          if (elWithoutTips) elWithoutTips.textContent = d.withoutTips;
          if (elCash) elCash.textContent = d.cash;
          if (elMobile) elMobile.textContent = d.mobile;
          if (elSelectedDate) elSelectedDate.textContent = d.date;

          elBalance.style.opacity = '1';
          elBalance.style.transform = 'scale(1)';
        }, 140);
      }
    });
  });

  // FAB Trigger
  const fabBtn = document.querySelector('.rn-dash-fab');
  if (fabBtn) {
    fabBtn.addEventListener('click', () => {
      const quickLoggerTab = document.querySelector('[data-tab="quick-entry"]');
      if (quickLoggerTab) {
        quickLoggerTab.click();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   24. CutBook Work Entries & Transactions History Screen Simulator
   -------------------------------------------------------------------------- */
/**
 * CutBook Work Entries & Transactions History Screen Simulator Logic
 * 100% WorkEntriesScreen.tsx Parity with Dynamic User Filter & Financial Summary
 */
function initTransactionsHistorySimulator() {
  // Staff Database with Commissions & Real Transactions
  const staffData = {
    masum: {
      name: 'masum',
      role: 'স্টাফ',
      rate: '৩৫%',
      grossWork: '৳12,400.00',
      commission: '৳4,340.00',
      tips: '৳450.00',
      payouts: '-৳3,000.00',
      netBalance: '৳1,790.00',
      transactions: [
        { type: 'entry', name: 'হেড স্পা ও ম্যাসাজ', meta: 'Cash • masum', amount: '+৳500.00', time: '11:15 AM' },
        { type: 'entry', name: 'চুল কাটা & স্টাইলিং', meta: 'bKash • masum', amount: '+৳350.00', time: '11:45 AM' },
        { type: 'payout', name: 'স্টাফ কমিশন পরিশোধ', meta: 'Cash Payout • masum', amount: '-৳3,000.00', time: '12:30 PM' },
        { type: 'entry', name: 'গোল্ডেন ফেসিয়াল', meta: 'Cash • masum', amount: '+৳800.00', time: '02:15 PM' }
      ]
    },
    xman: {
      name: 'xMan',
      role: 'স্টাফ',
      rate: '৪০%',
      grossWork: '৳18,200.00',
      commission: '৳7,280.00',
      tips: '৳800.00',
      payouts: '-৳5,000.00',
      netBalance: '৳3,080.00',
      transactions: [
        { type: 'entry', name: 'গোল্ডেন ফেসিয়াল & শেভ', meta: 'Nagad • xMan', amount: '+৳880.00', time: '12:30 PM' },
        { type: 'entry', name: 'হেয়ার কালার & স্পা', meta: 'bKash • xMan', amount: '+৳1,450.00', time: '01:20 PM' },
        { type: 'payout', name: 'স্টাফ অগ্রিম প্রদান', meta: 'Cash Payout • xMan', amount: '-৳5,000.00', time: '03:00 PM' }
      ]
    },
    kabbo: {
      name: 'kabbo',
      role: 'মালিক',
      rate: '১০০%',
      grossWork: '৳24,500.00',
      commission: '৳24,500.00',
      tips: '৳1,200.00',
      payouts: '৳0.00',
      netBalance: '৳25,700.00',
      transactions: [
        { type: 'entry', name: 'এক্সিকিউটিভ হেয়ারকাট & বিয়ার্ড', meta: 'Cash • kabbo', amount: '+৳650.00', time: '10:15 AM' },
        { type: 'entry', name: 'কেরাটিন হেয়ার ট্রিটমেন্ট', meta: 'Card • kabbo', amount: '+৳2,500.00', time: '01:45 PM' }
      ]
    }
  };

  // DOM Elements
  const empChips = document.querySelectorAll('.rn-emp-chip');
  const datePills = document.querySelectorAll('.rn-date-pill');
  const earningsView = document.getElementById('rnEmployeeEarningsView');
  const salonView = document.getElementById('rnSalonSummaryView');
  
  const elGrossMini = document.getElementById('rnEmpGrossWork');
  const elCommMini = document.getElementById('rnEmpCommission');
  const elTitle = document.getElementById('rnEmpSummaryTitle');
  const elGrossFull = document.getElementById('rnEmpGrossWorkFull');
  const elCommLabel = document.getElementById('rnEmpCommLabel');
  const elCommFull = document.getElementById('rnEmpCommFull');
  const elTips = document.getElementById('rnEmpTips');
  const elPayouts = document.getElementById('rnEmpPayouts');
  const elNet = document.getElementById('rnEmpNetBalance');
  const txnCountEl = document.getElementById('rnTxnCount');
  const txnContainer = document.getElementById('rnTxnItemsContainer');

  let currentEmployee = 'masum';

  function renderView() {
    // 1. Check if 'all' or specific employee is selected
    if (currentEmployee === 'all') {
      if (earningsView) earningsView.style.display = 'none';
      if (salonView) salonView.style.display = 'block';

      // Combine all transactions for 'all' view
      const allTxns = [
        ...staffData.masum.transactions,
        ...staffData.xman.transactions,
        ...staffData.kabbo.transactions,
        { type: 'expense', name: 'সেলুনের চা ও নাস্তা', meta: 'Cash • Expense', amount: '-৳180.00', time: '04:00 PM' }
      ];

      renderTransactions(allTxns);
      if (txnCountEl) txnCountEl.textContent = `${allTxns.length}টি এন্ট্রি`;
    } else {
      if (salonView) salonView.style.display = 'none';
      if (earningsView) earningsView.style.display = 'block';

      const data = staffData[currentEmployee];
      if (!data) return;

      // Update Financial Summary Breakdown Cards
      if (elGrossMini) elGrossMini.textContent = data.grossWork;
      if (elCommMini) elCommMini.textContent = data.commission;
      if (elTitle) elTitle.textContent = `${data.name} এর কাজের ও আয়ের হিসাব`;
      if (elGrossFull) elGrossFull.textContent = data.grossWork;
      if (elCommLabel) elCommLabel.textContent = `স্টাফ কমিশন (${data.rate}):`;
      if (elCommFull) elCommFull.textContent = data.commission;
      if (elTips) elTips.textContent = data.tips;
      if (elPayouts) elPayouts.textContent = data.payouts;
      if (elNet) elNet.textContent = data.netBalance;

      // Render Filtered Transactions
      renderTransactions(data.transactions);
      if (txnCountEl) txnCountEl.textContent = `${data.transactions.length}টি এন্ট্রি`;
    }
  }

  function renderTransactions(txns) {
    if (!txnContainer) return;
    txnContainer.innerHTML = '';

    txns.forEach((t) => {
      const card = document.createElement('div');
      card.className = 'rn-custom-txn-card';

      let iconClass = 'icon-entry';
      let iconEmoji = '✂️';
      let amtColor = '#059669';

      if (t.type === 'payout') {
        iconClass = 'icon-payout';
        iconEmoji = '💸';
        amtColor = '#D97706';
      } else if (t.type === 'expense') {
        iconClass = 'icon-expense';
        iconEmoji = '🛒';
        amtColor = '#EF4444';
      }

      card.innerHTML = `
        <div class="rn-txn-left">
          <div class="rn-txn-icon-box ${iconClass}">${iconEmoji}</div>
          <div class="rn-txn-info-col">
            <span class="rn-txn-name">${t.name}</span>
            <span class="rn-txn-meta">
              <span class="rn-txn-pay-tag">${t.meta}</span>
            </span>
          </div>
        </div>
        <div class="rn-txn-right">
          <strong class="rn-txn-amount" style="color:${amtColor}">${t.amount}</strong>
          <span class="rn-txn-time">${t.time}</span>
        </div>
      `;
      txnContainer.appendChild(card);
    });
  }

  // Employee Filter Click Event
  empChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      empChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      currentEmployee = chip.dataset.employee;
      renderView();
    });
  });

  // Date Filter Click Event
  datePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      datePills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Initial Execution
  renderView();

  // Add work & back button triggers
  const btnBack = document.querySelector('.rn-txn-header .rn-header-back-btn');
  const btnAddWork = document.querySelector('.rn-add-work-btn');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      const loggerTab = document.querySelector('[data-tab="quick-entry"]');
      if (loggerTab) loggerTab.click();
    });
  }
  if (btnAddWork) {
    btnAddWork.addEventListener('click', () => {
      const loggerTab = document.querySelector('[data-tab="quick-entry"]');
      if (loggerTab) loggerTab.click();
    });
  }
}
const initWorkEntriesSimulator = initTransactionsHistorySimulator;

/* --------------------------------------------------------------------------
   15. CutBook Shop Expenses & Petty Cash Screen Simulator
   -------------------------------------------------------------------------- */
/**
 * CutBook Shop Expenses & Petty Cash Screen Simulator Logic
 * 100% ExpensesScreen.tsx Parity with Dynamic Adding & Presets
 */
function initExpensesScreenSimulator() {
  // Expenses Database
  let expensesList = [
    { id: 1, name: 'চা ও নাস্তা (কাস্টমার ও স্টাফ)', amount: 180, time: 'Today, 03:45 PM', creator: 'kabbo (মালিক)' },
    { id: 2, name: 'ব্লেড ও কটন রোল প্যাক', amount: 450, time: 'Today, 01:20 PM', creator: 'masum (ম্যানেজার)' },
    { id: 3, name: 'দোকান ভাড়া ও ক্লিনিং', amount: 12220, time: '20 Sep, 11:00 AM', creator: 'kabbo (মালিক)' }
  ];

  // DOM Elements
  const tabButtons = document.querySelectorAll('.rn-exp-nav-tab');
  const paneExpenses = document.getElementById('rnPaneExpenses');
  const panePayouts = document.getElementById('rnPanePayouts');
  const headerTitle = document.getElementById('rnExpHeaderTitle');
  const headerSub = document.getElementById('rnExpHeaderSub');
  const totalAmountEl = document.getElementById('rnExpTotalAmount');
  const numEntriesEl = document.getElementById('rnExpNumEntries');
  const countSubEl = document.getElementById('rnExpCountSub');
  const listBadgeEl = document.getElementById('rnExpListCountBadge');
  const itemsContainer = document.getElementById('rnExpItemsContainer');
  
  const inputName = document.getElementById('rnInputExpName');
  const inputAmount = document.getElementById('rnInputExpAmount');
  const btnAdd = document.getElementById('rnBtnAddExpense');
  const pettyChips = document.querySelectorAll('.rn-petty-chip');
  const btnPayout = document.getElementById('rnBtnSendPayout');

  // Recalculate & Render Expenses
  function renderExpenses() {
    const total = expensesList.reduce((sum, item) => sum + item.amount, 0);

    if (totalAmountEl) {
      totalAmountEl.textContent = total.toLocaleString('en-BD', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    const countText = `${expensesList.length} টি এন্ট্রি`;
    if (numEntriesEl) numEntriesEl.textContent = countText;
    if (countSubEl) countSubEl.textContent = countText;
    if (listBadgeEl) listBadgeEl.textContent = `সর্বমোট ${expensesList.length}টি`;

    if (!itemsContainer) return;
    itemsContainer.innerHTML = '';

    expensesList.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'rn-exp-item-card';
      card.innerHTML = `
        <div class="rn-exp-item-left">
          <span class="rn-exp-item-name">${item.name}</span>
          <div class="rn-exp-item-meta">
            <span>${item.time}</span>
            <span class="rn-creator-badge">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              ${item.creator}
            </span>
          </div>
        </div>
        <div class="rn-exp-item-right">
          <strong class="rn-exp-item-amount">-৳${item.amount.toLocaleString()}</strong>
          <button type="button" class="rn-exp-delete-btn" title="মুছুন">✕</button>
        </div>
      `;

      card.querySelector('.rn-exp-delete-btn').addEventListener('click', () => {
        deleteExpense(item.id);
      });

      itemsContainer.appendChild(card);
    });
  }

  function deleteExpense(id) {
    expensesList = expensesList.filter(item => item.id !== id);
    renderExpenses();
  }

  // 1-Tap Petty Cash Quick Fill
  pettyChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (inputName) inputName.value = chip.dataset.name;
      if (inputAmount) inputAmount.value = chip.dataset.price;
      if (inputName) inputName.focus();
    });
  });

  // Add Expense Handler
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      const name = inputName.value.trim();
      const amount = parseFloat(inputAmount.value) || 0;

      if (!name || amount <= 0) {
        alert('অনুগ্রহ করে খরচের বিবরণ এবং সঠিক পরিমাণ লিখুন!');
        return;
      }

      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
        time: 'Just now',
        creator: 'kabbo (মালিক)'
      };

      expensesList.unshift(newExpense);
      inputName.value = '';
      inputAmount.value = '';
      renderExpenses();
    });
  }

  // Tab Switching
  tabButtons.forEach(tab => {
    tab.addEventListener('click', () => {
      tabButtons.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.tab;
      if (target === 'expenses') {
        if (paneExpenses) paneExpenses.style.display = 'block';
        if (panePayouts) panePayouts.style.display = 'none';
        if (headerTitle) headerTitle.textContent = 'দোকানের খরচ';
      } else {
        if (paneExpenses) paneExpenses.style.display = 'none';
        if (panePayouts) panePayouts.style.display = 'block';
        if (headerTitle) headerTitle.textContent = 'স্টাফ পেআউট';
      }
    });
  });

  // Payout Button Demo
  if (btnPayout) {
    btnPayout.addEventListener('click', () => {
      alert('✓ পেআউট সফলভাবে সম্পন্ন হয়েছে!');
    });
  }

  // Back button
  const backBtn = document.querySelector('.rn-exp-header .rn-header-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      const dashTab = document.querySelector('[data-tab="dashboard"]');
      if (dashTab) dashTab.click();
    });
  }

  // Initial Run
  renderExpenses();
}
const initExpensesSimulator = initExpensesScreenSimulator;

function initSimulatorBottomNav() {
  // Bottom navigation inter-tab wiring across all simulator screens
  const bottomNavItems = document.querySelectorAll('.rn-bottom-nav-item');
  bottomNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      const label = item.querySelector('span')?.textContent.trim();
      if (label === 'হোম') {
        document.querySelector('.tab-btn[data-tab="dashboard"]')?.click();
      } else if (label === 'খরচ') {
        document.querySelector('.tab-btn[data-tab="expenses"]')?.click();
      } else if (label === 'টিম') {
        document.querySelector('.tab-btn[data-tab="commissions"]')?.click();
      } else if (label === 'আমার অ্যাকাউন্ট' || label === 'লগার') {
        document.querySelector('.tab-btn[data-tab="quick-entry"]')?.click();
      }
    });
  });
}


/* --------------------------------------------------------------------------
   16. CutBook Staff Express Payout Simulator Logic (ExpressPayoutModal.tsx)
   -------------------------------------------------------------------------- */
function initStaffPayoutsSimulator() {
  // Staff Database
  const staffLedger = {
    masum: {
      name: 'masum',
      meta: '01712-345678 • ৩৫% কমিশন',
      paid: '৳9,840',
      due: 1790
    },
    xman: {
      name: 'xMan',
      meta: '01823-456789 • ৪০% কমিশন',
      paid: '৳14,200',
      due: 3080
    },
    farzana: {
      name: 'Farzana',
      meta: '01934-567890 • বেতন + ১০%',
      paid: '৳18,000',
      due: 4500
    }
  };

  // Payout History Receipts
  let historyReceipts = [
    { name: 'masum', initials: 'MA', meta: '[CASH] সাপ্তাহিক কমিশন সেটেলমেন্ট', amount: '৳3,000', time: 'Today, 12:30 PM' },
    { name: 'xMan', initials: 'XM', meta: '[BKASH] অগ্রিম স্টাফ উইথড্রয়াল', amount: '৳5,000', time: 'Yesterday, 03:00 PM' },
    { name: 'Farzana', initials: 'FA', meta: '[NAGAD] প্রোডাক্ট ইনসেনティブ বোনাস', amount: '৳2,500', time: '20 Sep, 06:15 PM' }
  ];

  // DOM Elements
  const staffChips = document.querySelectorAll('.rn-payout-staff-chip');
  const statNameEl = document.getElementById('rnStaffStatName');
  const statMetaEl = document.getElementById('rnStaffStatMeta');
  const statDueEl = document.getElementById('rnStaffStatDue');
  const statPaidEl = document.getElementById('rnStaffStatPaid');
  const amountInput = document.getElementById('rnPayoutAmountInput');
  const clearAmtBtn = document.getElementById('rnPayoutClearBtn');
  const quickAmtChips = document.querySelectorAll('.rn-quick-amt-chip');
  const btnFullDue = document.getElementById('rnBtnFullDue');
  const methodPills = document.querySelectorAll('.rn-method-pill');
  const noteInput = document.getElementById('rnPayoutNote');
  const submitBtn = document.getElementById('rnBtnConfirmPayout');
  const submitTextEl = document.getElementById('rnPayoutSubmitText');
  const historyListEl = document.getElementById('rnPayoutHistoryList');

  let currentStaffId = 'masum';
  let activeMethod = 'CASH';

  // Render Selected Staff Details
  function updateStaffDetails() {
    const data = staffLedger[currentStaffId];
    if (!data) return;

    if (statNameEl) statNameEl.textContent = data.name;
    if (statMetaEl) statMetaEl.textContent = data.meta;
    if (statDueEl) statDueEl.textContent = `৳${data.due.toLocaleString()}`;
    if (statPaidEl) statPaidEl.textContent = data.paid;

    // Default amount to full due
    if (amountInput) {
      amountInput.value = data.due;
      updateSubmitButtonText();
    }
  }

  function updateSubmitButtonText() {
    if (!amountInput) return;
    const val = parseFloat(amountInput.value) || 0;
    if (submitTextEl) {
      submitTextEl.textContent = `টাকা পরিশোধ নিশ্চিত করুন (৳${val.toLocaleString()})`;
    }
  }

  // Render History Receipts
  function renderHistory() {
    if (!historyListEl) return;
    historyListEl.innerHTML = '';

    historyReceipts.forEach((r) => {
      const card = document.createElement('div');
      card.className = 'rn-p-history-card';
      card.innerHTML = `
        <div class="rn-ph-left">
          <div class="rn-ph-avatar">${r.initials}</div>
          <div class="rn-ph-info">
            <span class="rn-ph-name">${r.name}</span>
            <span class="rn-ph-meta">${r.meta} • ${r.time}</span>
          </div>
        </div>
        <div class="rn-ph-right">
          <strong class="rn-ph-amount">-${r.amount}</strong>
          <span class="rn-ph-settled">✓ Settled</span>
        </div>
      `;
      historyListEl.appendChild(card);
    });
  }

  // Staff Selection Click
  staffChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      staffChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      currentStaffId = chip.dataset.staffId;
      updateStaffDetails();
    });
  });

  // Quick Amount Chips
  quickAmtChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      quickAmtChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const amtAttr = chip.dataset.amt;
      if (amtAttr === 'due') {
        amountInput.value = staffLedger[currentStaffId].due;
      } else {
        amountInput.value = amtAttr;
      }
      updateSubmitButtonText();
    });
  });

  // Amount Input Typing
  if (amountInput) {
    amountInput.addEventListener('input', () => {
      quickAmtChips.forEach((c) => c.classList.remove('active'));
      updateSubmitButtonText();
    });
  }

  // Clear Input
  if (clearAmtBtn) {
    clearAmtBtn.addEventListener('click', () => {
      amountInput.value = '';
      quickAmtChips.forEach((c) => c.classList.remove('active'));
      updateSubmitButtonText();
    });
  }

  // Payment Method Selection
  methodPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      methodPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      activeMethod = pill.dataset.method.toUpperCase();
    });
  });

  // Confirm Payout Submission
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const amt = parseFloat(amountInput.value) || 0;
      if (amt <= 0) {
        alert('অনুগ্রহ করে সঠিক টাকার পরিমাণ লিখুন!');
        return;
      }

      const staff = staffLedger[currentStaffId];
      const note = (noteInput && noteInput.value.trim()) || 'কমিশন পেআউট';

      // Insert new receipt
      historyReceipts.unshift({
        name: staff.name,
        initials: staff.name.slice(0, 2).toUpperCase(),
        meta: `[${activeMethod}] ${note}`,
        amount: `৳${amt.toLocaleString()}`,
        time: 'Just now'
      });

      // Adjust remaining due
      staff.due = Math.max(0, staff.due - amt);

      // Button animation
      submitBtn.innerHTML = `<span>✓ পেআউট সম্পন্ন হয়েছে!</span>`;
      submitBtn.style.background = '#10B981';

      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span id="rnPayoutSubmitText">টাকা পরিশোধ নিশ্চিত করুন (৳${staff.due.toLocaleString()})</span>
        `;
        submitBtn.style.background = '#059669';
        updateStaffDetails();
        renderHistory();
        if (noteInput) noteInput.value = '';
      }, 1600);
    });
  }

  // Back button
  const backBtn = document.querySelector('.rn-payout-header .rn-header-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      const expensesTab = document.querySelector('.tab-btn[data-tab="expenses"]');
      if (expensesTab) expensesTab.click();
    });
  }

  // Initial Run
  updateStaffDetails();
  renderHistory();
}
const initExpressPayoutSimulator = initStaffPayoutsSimulator;

/* --------------------------------------------------------------------------
   17. CutBook Stylist / Employee Dashboard Simulator (EmployeeHomeScreen.tsx)
   -------------------------------------------------------------------------- */
function initEmployeeDashboardSimulator() {
  const staffTimeData = {
    today: {
      totalEarnings: '৳4,790.00',
      subtitle: 'কমিশন: ৳৪,৩৪০ • বকশিস: ৳৪৫০',
      cutsCount: '12',
      cutsSub: 'আজকের সম্পন্ন কাজ',
      tips: '৳450.00',
      commission: '৳4,340.00',
      payouts: '৳3,000.00',
      genValue: '৳12,400',
      myCut: '৳4,790',
      works: '12',
      avg: '৳1,033',
      due: '৳1,790'
    },
    weekly: {
      totalEarnings: '৳28,450.00',
      subtitle: 'কমিশন: ৳২৫,৬৫০ • বকশিস: ৳২,৮০০',
      cutsCount: '68',
      cutsSub: 'সাপ্তাহিক সম্পন্ন কাজ',
      tips: '৳2,800.00',
      commission: '৳25,650.00',
      payouts: '৳20,000.00',
      genValue: '৳73,280',
      myCut: '৳28,450',
      works: '68',
      avg: '৳1,077',
      due: '৳8,450'
    },
    monthly: {
      totalEarnings: '৳118,500.00',
      subtitle: 'কমিশন: ৳১০৭,৩০০ • বকশিস: ৳১১,২০০',
      cutsCount: '284',
      cutsSub: 'মাসিক সম্পন্ন কাজ',
      tips: '৳11,200.00',
      commission: '৳107,300.00',
      payouts: '৳95,000.00',
      genValue: '৳306,500',
      myCut: '৳118,500',
      works: '284',
      avg: '৳1,079',
      due: '৳23,500'
    },
    yearly: {
      totalEarnings: '৳1,420,000.00',
      subtitle: 'কমিশন: ৳১,২৮০,০০০ • বকশিস: ৳১৪০,০০০',
      cutsCount: '3,450',
      cutsSub: 'বাৎসরিক সম্পন্ন কাজ',
      tips: '৳140,000.00',
      commission: '৳1,280,000.00',
      payouts: '৳1,350,000.00',
      genValue: '৳3,650,000',
      myCut: '৳1,420,000',
      works: '3,450',
      avg: '৳1,057',
      due: '৳70,000'
    }
  };

  const simViewports = document.querySelectorAll('.rn-emp-dash-scroll-body');
  if (!simViewports.length) return;

  simViewports.forEach((scrollBody) => {
    const parent = scrollBody.closest('.phone-screen-viewport') || scrollBody;
    const tabs = parent.querySelectorAll('.rn-emp-tab');
    const elHeroBal = parent.querySelector('#empHeroBalance') || parent.querySelector('.rn-emp-hero-balance');
    const elHeroSub = parent.querySelector('#empHeroSub') || parent.querySelector('.rn-emp-hero-sub');
    const elCutsCount = parent.querySelector('#empCutsCount');
    const elCutsSub = parent.querySelector('#empCutsSub');
    const elTips = parent.querySelector('#empTipsAmount');
    const elComm = parent.querySelector('#empCommAmount');
    const elPayouts = parent.querySelector('#empPayoutsAmount');
    const elGenValue = parent.querySelector('#empGenValue');
    const elMyCut = parent.querySelector('#empMyCut');
    const elMicroWorks = parent.querySelector('#empMicroWorks');
    const elMicroAvg = parent.querySelector('#empMicroAvg');
    const elMicroDue = parent.querySelector('#empMicroDue');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const period = tab.dataset.period || 'today';
        const d = staffTimeData[period];
        if (!d) return;

        // Smooth transition
        if (elHeroBal) {
          elHeroBal.style.opacity = '0.3';
          elHeroBal.style.transform = 'scale(0.96)';

          setTimeout(() => {
            elHeroBal.textContent = d.totalEarnings;
            if (elHeroSub) elHeroSub.textContent = d.subtitle;
            if (elCutsCount) elCutsCount.textContent = d.cutsCount;
            if (elCutsSub) elCutsSub.textContent = d.cutsSub;
            if (elTips) elTips.textContent = d.tips;
            if (elComm) elComm.textContent = d.commission;
            if (elPayouts) elPayouts.textContent = d.payouts;
            if (elGenValue) elGenValue.textContent = d.genValue;
            if (elMyCut) elMyCut.textContent = d.myCut;
            if (elMicroWorks) elMicroWorks.textContent = d.works;
            if (elMicroAvg) elMicroAvg.textContent = d.avg;
            if (elMicroDue) elMicroDue.textContent = d.due;

            elHeroBal.style.opacity = '1';
            elHeroBal.style.transform = 'scale(1)';
          }, 130);
        }
      });
    });

    // Stylist bottom nav items
    const empNavItems = parent.querySelectorAll('.rn-bottom-nav-bar .rn-nav-item');
    empNavItems.forEach((item) => {
      item.addEventListener('click', () => {
        empNavItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        const label = item.querySelector('span')?.textContent.trim();
        if (label === 'কাজের হিস্ট্রি') {
          document.querySelector('.tab-btn[data-tab="commissions"]')?.click();
        } else if (label === 'প্রোফাইল') {
          document.querySelector('.tab-btn[data-tab="payout"]')?.click();
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   18. CutBook P&L Reports & Net Profit Screen Simulator (ReportsScreen.tsx)
   -------------------------------------------------------------------------- */
function initReportsScreenSimulator() {
  const reportsData = {
    today: {
      rangeSubtitle: 'আজকের হিসাব • মায়ের দোয়া সেলুন',
      rangeHero: 'আজ',
      netProfit: '৳28,450.00',
      grossSales: '৳52,400',
      expenses: '-৳6,200',
      staffTotal: '৳17,750',
      entries: '24 টি',
      tips: '৳1,450',
      serviceNoTips: '৳50,950',
      margin: '54.3%',
      bars: [
        { green: 65, blue: 45 },
        { green: 80, blue: 55 },
        { green: 50, blue: 35 },
        { green: 70, blue: 48 },
        { green: 95, blue: 68 },
        { green: 60, blue: 40 },
        { green: 100, blue: 72 }
      ],
      cashPct: '55.4%',
      cashAmt: '৳29,050.00',
      bkashPct: '32.1%',
      bkashAmt: '৳16,800.00',
      nagadPct: '12.5%',
      nagadAmt: '৳6,550.00'
    },
    week: {
      rangeSubtitle: 'এই সপ্তাহের হিসাব • মায়ের দোয়া সেলুন',
      rangeHero: 'এই সপ্তাহ',
      netProfit: '৳184,200.00',
      grossSales: '৳348,000',
      expenses: '-৳38,500',
      staffTotal: '৳125,300',
      entries: '156 টি',
      tips: '৳9,800',
      serviceNoTips: '৳338,200',
      margin: '52.9%',
      bars: [
        { green: 75, blue: 50 },
        { green: 60, blue: 40 },
        { green: 85, blue: 60 },
        { green: 90, blue: 65 },
        { green: 70, blue: 45 },
        { green: 100, blue: 75 },
        { green: 95, blue: 70 }
      ],
      cashPct: '52.0%',
      cashAmt: '৳180,960.00',
      bkashPct: '35.5%',
      bkashAmt: '৳123,540.00',
      nagadPct: '12.5%',
      nagadAmt: '৳43,500.00'
    },
    month: {
      rangeSubtitle: 'চলতি মাসের হিসাব • মায়ের দোয়া সেলুন',
      rangeHero: 'এই মাস',
      netProfit: '৳792,500.00',
      grossSales: '৳1,520,000',
      expenses: '-৳165,000',
      staffTotal: '৳562,500',
      entries: '680 টি',
      tips: '৳42,000',
      serviceNoTips: '৳1,478,000',
      margin: '52.1%',
      bars: [
        { green: 60, blue: 40 },
        { green: 75, blue: 50 },
        { green: 85, blue: 60 },
        { green: 95, blue: 70 },
        { green: 70, blue: 45 },
        { green: 80, blue: 55 },
        { green: 100, blue: 75 }
      ],
      cashPct: '48.5%',
      cashAmt: '৳737,200.00',
      bkashPct: '38.5%',
      bkashAmt: '৳585,200.00',
      nagadPct: '13.0%',
      nagadAmt: '৳197,600.00'
    },
    year: {
      rangeSubtitle: '২০২৬ সালের হিসাব • মায়ের দোয়া সেলুন',
      rangeHero: 'এই বছর',
      netProfit: '৳9,850,000.00',
      grossSales: '৳18,500,000',
      expenses: '-৳1,950,000',
      staffTotal: '৳6,700,000',
      entries: '8,450 টি',
      tips: '৳520,000',
      serviceNoTips: '৳17,980,000',
      margin: '53.2%',
      bars: [
        { green: 70, blue: 48 },
        { green: 85, blue: 60 },
        { green: 65, blue: 42 },
        { green: 90, blue: 65 },
        { green: 80, blue: 55 },
        { green: 95, blue: 70 },
        { green: 100, blue: 75 }
      ],
      cashPct: '46.0%',
      cashAmt: '৳8,510,000.00',
      bkashPct: '41.0%',
      bkashAmt: '৳7,585,000.00',
      nagadPct: '13.0%',
      nagadAmt: '৳2,405,000.00'
    }
  };

  const simViewports = document.querySelectorAll('.rn-rep-scroll-body');
  if (!simViewports.length) return;

  simViewports.forEach((scrollBody) => {
    const parent = scrollBody.closest('.phone-screen-viewport') || scrollBody;
    const dateButtons = parent.querySelectorAll('.rn-rep-date-btn');
    const subTitleEl = parent.querySelector('#rnRepHeaderSubtitle') || parent.querySelector('.rn-rep-subtitle');
    const heroRangeEl = parent.querySelector('#rnRepHeroRange') || parent.querySelector('.rn-rep-range-label');
    const netProfitEl = parent.querySelector('#rnRepNetProfit') || parent.querySelector('.rn-rep-hero-amount');
    const grossSalesEl = parent.querySelector('#rnRepGrossSales');
    const expensesEl = parent.querySelector('#rnRepExpenses');
    const staffTotalEl = parent.querySelector('#rnRepStaffTotal');
    const entriesEl = parent.querySelector('#rnRepEntries');
    const tipsEl = parent.querySelector('#rnRepTips');
    const serviceWithoutTipsEl = parent.querySelector('#rnRepServiceWithoutTips');
    const marginEl = parent.querySelector('#rnRepMargin');
    const chartBars = parent.querySelectorAll('.rn-chart-col');
    const backBtn = parent.querySelector('.rn-header-back-btn');
    const exportBtn = parent.querySelector('.rn-rep-export-btn');
    const payStatItems = parent.querySelectorAll('.rn-pay-stat-item');

    dateButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        dateButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const range = btn.dataset.range || 'today';
        const d = reportsData[range];
        if (!d) return;

        // Smooth number update
        if (netProfitEl) {
          netProfitEl.style.opacity = '0.3';
          netProfitEl.style.transform = 'scale(0.96)';

          setTimeout(() => {
            if (subTitleEl) subTitleEl.textContent = d.rangeSubtitle;
            if (heroRangeEl) heroRangeEl.textContent = d.rangeHero;
            netProfitEl.textContent = d.netProfit;
            if (grossSalesEl) grossSalesEl.textContent = d.grossSales;
            if (expensesEl) expensesEl.textContent = d.expenses;
            if (staffTotalEl) staffTotalEl.textContent = d.staffTotal;
            if (entriesEl) entriesEl.textContent = d.entries;
            if (tipsEl) tipsEl.textContent = d.tips;
            if (serviceWithoutTipsEl) serviceWithoutTipsEl.textContent = d.serviceNoTips;
            if (marginEl) marginEl.textContent = d.margin;

            // Update chart bars
            chartBars.forEach((col, idx) => {
              if (d.bars[idx]) {
                const gBar = col.querySelector('.bar-green');
                const bBar = col.querySelector('.bar-blue');
                if (gBar) gBar.style.height = `${d.bars[idx].green}%`;
                if (bBar) bBar.style.height = `${d.bars[idx].blue}%`;
              }
            });

            // Update Payment Channels
            if (payStatItems.length >= 3) {
              // Cash
              const cashBar = payStatItems[0].querySelector('.rn-psi-bar-fill');
              const cashAmt = payStatItems[0].querySelector('.rn-psi-amount');
              const cashPct = payStatItems[0].querySelector('.rn-psi-pct');
              if (cashBar) cashBar.style.width = d.cashPct;
              if (cashAmt) cashAmt.textContent = d.cashAmt;
              if (cashPct) cashPct.textContent = d.cashPct;

              // bKash
              const bkashBar = payStatItems[1].querySelector('.rn-psi-bar-fill');
              const bkashAmt = payStatItems[1].querySelector('.rn-psi-amount');
              const bkashPct = payStatItems[1].querySelector('.rn-psi-pct');
              if (bkashBar) bkashBar.style.width = d.bkashPct;
              if (bkashAmt) bkashAmt.textContent = d.bkashAmt;
              if (bkashPct) bkashPct.textContent = d.bkashPct;

              // Nagad
              const nagadBar = payStatItems[2].querySelector('.rn-psi-bar-fill');
              const nagadAmt = payStatItems[2].querySelector('.rn-psi-amount');
              const nagadPct = payStatItems[2].querySelector('.rn-psi-pct');
              if (nagadBar) nagadBar.style.width = d.nagadPct;
              if (nagadAmt) nagadAmt.textContent = d.nagadAmt;
              if (nagadPct) nagadPct.textContent = d.nagadPct;
            }

            netProfitEl.style.opacity = '1';
            netProfitEl.style.transform = 'scale(1)';
          }, 130);
        }
      });
    });

    // Back button
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        const dashTab = document.querySelector('.tab-btn[data-tab="dashboard"]');
        if (dashTab) dashTab.click();
      });
    }

    // Export CSV button feedback
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const originalHtml = exportBtn.innerHTML;
        exportBtn.innerHTML = `<span>✓ এক্সপোর্ট সম্পন্ন!</span>`;
        exportBtn.style.background = '#059669';
        exportBtn.style.color = '#FFFFFF';
        setTimeout(() => {
          exportBtn.innerHTML = originalHtml;
          exportBtn.style.background = '#ECFDF5';
          exportBtn.style.color = '#059669';
        }, 1800);
      });
    }
  });
}









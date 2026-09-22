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

  // 11. Interactive 360° 3D Ecosystem Galaxy Orbit
  init3DEcosystem();
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
   7. Interactive Pricing Calculator Simulator
   -------------------------------------------------------------------------- */
function initPricingCalculator() {
  const slider = document.getElementById('pricingEntriesSlider');
  const countEl = document.getElementById('calcEntriesCount');
  const paidCountEl = document.getElementById('calcPaidCount');
  const dailyCostEl = document.getElementById('calcDailyCost');
  const monthlyCostEl = document.getElementById('calcMonthlyCost');
  const equivTagEl = document.getElementById('calcEquivalentTag');

  if (!slider || !countEl || !paidCountEl || !dailyCostEl || !monthlyCostEl) return;

  function updatePricing() {
    const totalEntries = parseInt(slider.value, 10) || 5;
    const freeQuota = 5;
    const paidEntries = Math.max(0, totalEntries - freeQuota);
    const dailyCost = paidEntries * 1; // ৳1 per entry
    const monthlyCost = dailyCost * 30; // 30-day billing cycle

    countEl.textContent = totalEntries;
    paidCountEl.textContent = paidEntries;
    dailyCostEl.textContent = '৳ ' + dailyCost.toLocaleString('en-US');
    monthlyCostEl.textContent = '৳ ' + monthlyCost.toLocaleString('en-US');

    // Dynamic equivalent comparator
    if (equivTagEl) {
      if (dailyCost === 0) {
        equivTagEl.textContent = '🎉 100% Free Forever (0 Taka)';
      } else if (monthlyCost <= 300) {
        equivTagEl.textContent = '☕ Less than 1 cup of roadside tea per day';
      } else if (monthlyCost <= 750) {
        equivTagEl.textContent = '✂️ Cheaper than 1 single haircut (৳800)';
      } else if (monthlyCost <= 1200) {
        equivTagEl.textContent = '💆 Less than 1 facial or hair spa treatment';
      } else {
        equivTagEl.textContent = '⚡ High salon volume! Super cost-effective';
      }
    }

    // Dynamic slider track fill gradient
    const min = parseInt(slider.min, 10) || 5;
    const max = parseInt(slider.max, 10) || 100;
    const pct = ((totalEntries - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #10B981 0%, #10B981 ${pct}%, #E2E8F0 ${pct}%, #E2E8F0 100%)`;
  }

  slider.addEventListener('input', updatePricing);
  // Initial run to render correct styles and values
  updatePricing();
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
   12. 360° Interactive Three.js 3D Ecosystem Universe (Classy & Centered)
   -------------------------------------------------------------------------- */
function init3DEcosystem() {
  const container = document.getElementById('ecosystem-three-canvas');
  const stage = document.getElementById('ecosystem3DStage');
  if (!container || !stage) return;

  if (typeof THREE === 'undefined') {
    let attempts = 0;
    const pollTimer = setInterval(() => {
      attempts++;
      if (typeof THREE !== 'undefined') {
        clearInterval(pollTimer);
        init3DEcosystem();
      } else if (attempts > 30) {
        clearInterval(pollTimer);
      }
    }, 100);
    return;
  }

  // Scene & Sizing
  const scene = new THREE.Scene();
  let width = stage.clientWidth || 1040;
  let height = stage.clientHeight || 640;

  // Perspective Camera (Generous spatial depth)
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
  camera.position.set(0, 0, 50);

  // High-Performance WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Master Universe Group for 360° Rotation (Generous vertical clearance from header)
  const universeGroup = new THREE.Group();
  universeGroup.position.set(0, -3.2, 0);
  scene.add(universeGroup);

  // 1. Perspective Horizon Grid (Cyber Spatial Floor)
  const polarGrid = new THREE.PolarGridHelper(36, 18, 8, 64, 0x10B981, 0x064E3B);
  polarGrid.position.y = -10.5;
  if (polarGrid.material) {
    polarGrid.material.transparent = true;
    polarGrid.material.opacity = 0.16;
  }
  universeGroup.add(polarGrid);

  // 2. Central 3D Radiant Holographic Crystal Core (Replaces static 2D badge)
  const coreGroup = new THREE.Group();
  universeGroup.add(coreGroup);

  // A. Inner Radiant Octahedron Crystal Nucleus
  const crystalGeo = new THREE.OctahedronGeometry(2.2, 0);
  const crystalMat = new THREE.MeshBasicMaterial({
    color: 0x10B981,
    wireframe: false,
    transparent: true,
    opacity: 0.85
  });
  const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
  coreGroup.add(crystalMesh);

  // B. Inner Glowing Plasma Sphere Core
  const innerGeo = new THREE.SphereGeometry(1.4, 32, 32);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x047857,
    transparent: true,
    opacity: 0.9
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  coreGroup.add(innerMesh);

  // C. Outer Sacred Geometry Lattice (Glowing Icosahedron Wireframe)
  const wireGeo = new THREE.IcosahedronGeometry(3.3, 1);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x34D399,
    wireframe: true,
    transparent: true,
    opacity: 0.65
  });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  coreGroup.add(wireMesh);

  // D. Ambient Holographic Halo Cloud (Pulsing Energy Stardust)
  const haloParticleCount = 90;
  const haloGeo = new THREE.BufferGeometry();
  const haloPositions = new Float32Array(haloParticleCount * 3);
  for (let h = 0; h < haloParticleCount * 3; h += 3) {
    const hr = 2.2 + Math.random() * 2.8;
    const htheta = Math.random() * Math.PI * 2;
    const hphi = (Math.random() - 0.5) * Math.PI;
    haloPositions[h] = hr * Math.cos(htheta) * Math.cos(hphi);
    haloPositions[h + 1] = hr * Math.sin(hphi);
    haloPositions[h + 2] = hr * Math.sin(htheta) * Math.cos(hphi);
  }
  haloGeo.setAttribute('position', new THREE.BufferAttribute(haloPositions, 3));
  const haloMat = new THREE.PointsMaterial({
    color: 0x6EE7B7,
    size: 0.35,
    transparent: true,
    opacity: 0.8
  });
  const haloPoints = new THREE.Points(haloGeo, haloMat);
  coreGroup.add(haloPoints);

  // E. Concentric Gimbal Gyro Rings (Multi-Axis Cyber Gimbal)
  const ringGeo1 = new THREE.TorusGeometry(4.2, 0.05, 16, 120);
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x10B981, transparent: true, opacity: 0.75 });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  ring1.rotation.x = Math.PI / 3;
  coreGroup.add(ring1);

  const ringGeo2 = new THREE.TorusGeometry(5.2, 0.045, 16, 120);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.65 });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.y = Math.PI / 4;
  ring2.rotation.x = -Math.PI / 6;
  coreGroup.add(ring2);

  const ringGeo3 = new THREE.TorusGeometry(6.2, 0.04, 16, 120);
  const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x818CF8, transparent: true, opacity: 0.45 });
  const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
  ring3.rotation.z = Math.PI / 5;
  ring3.rotation.y = Math.PI / 3;
  coreGroup.add(ring3);

  // Primary Elliptical Orbital Track (Planetary Guide - Expanded)
  const orbitRingGeo = new THREE.TorusGeometry(23.4, 0.035, 16, 180);
  const orbitRingMat = new THREE.MeshBasicMaterial({ color: 0x10B981, transparent: true, opacity: 0.28 });
  const orbitGuideRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
  orbitGuideRing.rotation.x = Math.PI / 2.06;
  universeGroup.add(orbitGuideRing);

  // Secondary Outer Halo Orbit (Expanded)
  const outerHaloGeo = new THREE.TorusGeometry(27.8, 0.02, 16, 160);
  const outerHaloMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.14 });
  const outerHalo = new THREE.Mesh(outerHaloGeo, outerHaloMat);
  outerHalo.rotation.x = Math.PI / 2.12;
  universeGroup.add(outerHalo);

  // 3. Ambient Floating Starfield / Cosmic Telemetry Particles
  const particleCount = 560;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    const r = 14 + Math.random() * 36;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    particlePositions[i] = r * Math.cos(theta) * Math.cos(phi);
    particlePositions[i + 1] = r * Math.sin(phi) * 0.5;
    particlePositions[i + 2] = r * Math.sin(theta) * Math.cos(phi);
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x34D399,
    size: 0.22,
    transparent: true,
    opacity: 0.45
  });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  universeGroup.add(particleSystem);

  // 4. 6 Satellite 3D Node Anchors & Data Connection Beams (Expanded Breathable Orbit)
  const nodeConfigs = [
    { angle: 0, r: 23.4, y: 0.6, color: 0x10B981 },
    { angle: (Math.PI / 3), r: 24.2, y: -2.0, color: 0x38BDF8 },
    { angle: (2 * Math.PI / 3), r: 23.2, y: 0.8, color: 0xA855F7 },
    { angle: Math.PI, r: 23.8, y: -1.8, color: 0xF59E0B },
    { angle: (4 * Math.PI / 3), r: 23.0, y: 0.6, color: 0x06B6D4 },
    { angle: (5 * Math.PI / 3), r: 24.2, y: -2.0, color: 0xF43F5E }
  ];

  const nodeMeshes = [];
  const beamLines = [];
  const beamPackets = [];
  const htmlNodes = [];

  for (let i = 0; i < 6; i++) {
    const el = document.getElementById('ecoNode' + i);
    if (el) htmlNodes.push(el);
  }

  nodeConfigs.forEach((cfg, idx) => {
    const nodeObj = new THREE.Group();
    const x = cfg.r * Math.cos(cfg.angle);
    const z = cfg.r * Math.sin(cfg.angle);
    const y = cfg.y;
    nodeObj.position.set(x, y, z);
    universeGroup.add(nodeObj);
    nodeMeshes.push(nodeObj);

    const beaconGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.85 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    nodeObj.add(beacon);

    const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)]);
    const lineMat = new THREE.LineBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.35 });
    const line = new THREE.Line(lineGeo, lineMat);
    universeGroup.add(line);
    beamLines.push(line);

    for (let p = 0; p < 2; p++) {
      const pktGeo = new THREE.SphereGeometry(0.18, 12, 12);
      const pktMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.95
      });
      const pkt = new THREE.Mesh(pktGeo, pktMat);
      pkt.position.set(0, 0, 0);
      universeGroup.add(pkt);
      beamPackets.push({
        mesh: pkt,
        targetPos: new THREE.Vector3(x, y, z),
        progress: p * 0.5,
        speed: 0.007 + p * 0.003
      });
    }
  });

  // Enable direct click-to-focus on 3D node cards
  htmlNodes.forEach((node, idx) => {
    node.addEventListener('mouseenter', () => { isHoveringNode = true; });
    node.addEventListener('mouseleave', () => { isHoveringNode = false; });
    node.addEventListener('click', () => {
      if (dragDistance > 8) return;
      focusOnNode(idx);
    });
  });

  const chips = document.querySelectorAll('.eco-chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const idx = parseInt(chip.getAttribute('data-node'), 10);
      focusOnNode(idx);
    });
  });

  function focusOnNode(nodeIdx) {
    if (nodeIdx < 0 || nodeIdx >= nodeConfigs.length) return;
    const cfg = nodeConfigs[nodeIdx];
    targetRotY = Math.PI / 2 - cfg.angle;
    targetRotX = 0.05;
    chips.forEach(c => {
      if (parseInt(c.getAttribute('data-node'), 10) === nodeIdx) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
  }

  // 5. Interactive Mouse Orbit Controls (Smooth drag inertia with deadband)
  let isDragging = false;
  let isOrbitPaused = false;
  let isHoveringNode = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotY = 0;
  let targetRotX = 0.04;
  let currentRotX = 0.04;
  let currentRotY = 0;
  let dragDistance = 0;

  const toggleBtn = document.getElementById('ecoToggleOrbit');
  const resetBtn = document.getElementById('ecoResetOrbit');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isOrbitPaused = !isOrbitPaused;
      toggleBtn.classList.toggle('active', isOrbitPaused);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      targetRotX = 0.04;
      targetRotY = 0;
      chips.forEach(c => c.classList.remove('active'));
    });
  }

  stage.addEventListener('pointerdown', (e) => {
    isDragging = true;
    dragDistance = 0;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  stage.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;
    dragDistance += Math.abs(deltaX) + Math.abs(deltaY);

    targetRotY += deltaX * 0.0055;
    targetRotX += deltaY * 0.0035;

    targetRotX = Math.max(-0.25, Math.min(0.35, targetRotX));

    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  function stopDrag() {
    setTimeout(() => {
      isDragging = false;
    }, 40);
  }
  stage.addEventListener('pointerup', stopDrag);
  stage.addEventListener('pointercancel', stopDrag);

  // Responsive Resize Handling
  let stageW = stage.clientWidth || 1040;
  let stageH = stage.clientHeight || 640;
  function onResize() {
    width = stage.clientWidth || 1040;
    height = stage.clientHeight || 640;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    stageW = width;
    stageH = height;
  }
  window.addEventListener('resize', onResize, { passive: true });

  // 6. Animation Render Loop
  const tempVec = new THREE.Vector3();

  function animate(timestamp) {
    requestAnimationFrame(animate);

    if (!isOrbitPaused && !isDragging) {
      targetRotY += isHoveringNode ? 0.001 : 0.005;
    }

    currentRotY += (targetRotY - currentRotY) * 0.08;
    currentRotX += (targetRotX - currentRotX) * 0.08;
    universeGroup.rotation.y = currentRotY;
    universeGroup.rotation.x = currentRotX;

    // Internal Core Animations (Holographic Crystal & Multi-Axis Gyro)
    const timeSec = (timestamp || performance.now()) * 0.0018;
    const corePulse = 1 + Math.sin(timeSec * 2.5) * 0.07;
    crystalMesh.scale.set(corePulse, corePulse, corePulse);
    crystalMesh.rotation.y += 0.014;
    crystalMesh.rotation.x += 0.009;

    wireMesh.rotation.y -= 0.006;
    wireMesh.rotation.x += 0.004;

    haloPoints.rotation.y += 0.004;

    ring1.rotation.z += 0.012;
    ring1.rotation.x += 0.008;
    ring2.rotation.z -= 0.014;
    ring2.rotation.y += 0.006;
    ring3.rotation.x += 0.009;
    ring3.rotation.z -= 0.005;

    // Animate Data Packets along beams
    beamPackets.forEach(pkt => {
      pkt.progress = (pkt.progress + pkt.speed) % 1.0;
      pkt.mesh.position.lerpVectors(new THREE.Vector3(0, 0, 0), pkt.targetPos, pkt.progress);
    });

    renderer.render(scene, camera);

    nodeMeshes.forEach((mesh, idx) => {
      const el = htmlNodes[idx];
      if (!el) return;

      mesh.getWorldPosition(tempVec);
      const worldZ = tempVec.z;
      const depthFactor = Math.max(0, Math.min(1, (worldZ + 25) / 50));

      tempVec.project(camera);
      const screenX = (tempVec.x * 0.5 + 0.5) * stageW;
      const screenY = (-(tempVec.y * 0.5) + 0.5) * stageH;
      const bobY = Math.sin(timeSec + idx * 1.05) * 5.0;

      const scale = 0.72 + depthFactor * 0.36;
      const opacity = 0.38 + depthFactor * 0.62;
      const zIndex = worldZ >= 0 ? Math.round(20 + depthFactor * 20) : Math.round(4 + depthFactor * 8);

      el.style.transform = `translate3d(${screenX}px, ${(screenY + bobY).toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      el.style.opacity = opacity.toFixed(2);
      el.style.zIndex = zIndex;

      if (depthFactor > 0.82) {
        el.classList.add('is-front-active');
      } else {
        el.classList.remove('is-front-active');
      }
    });
  }

  animate();
}

/* --------------------------------------------------------------------------
   13. Interactive 5-in-1 Problem & CutBook Terminal Stream Linkage
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


/* ==========================================================================
   TITANBAR PRO — INTERACTIVE ANIMATION & LAUNCH ENGINE
   Synchronized with 30-Frame Video Reference Blueprint
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------------------------
  // 1. STATE & AUDIO ENGINE (Self-contained Web Audio API)
  // ---------------------------------------------------------------------------
  const state = {
    audioEnabled: true,
    favoritesCount: 0,
    cartCount: 0,
    currentExtension: 78,
    maxLoad: 320,
    activeTimelineIndex: 3,
    selectedSize: '65 - 100 CM',
    selectedColor: 'Vermelho Competição & Preto Fosco',
    isFavorited: false,
    transparentBarUrl: null
  };

  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!state.audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'lock') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'reveal') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.35);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Audio Toggle UI
  const soundBtn = document.getElementById('sound-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      state.audioEnabled = !state.audioEnabled;
      soundBtn.style.opacity = state.audioEnabled ? '1' : '0.4';
      if (state.audioEnabled) playSound('click');
    });
  }

  // ---------------------------------------------------------------------------
  // 2. HIGH-DEFINITION ASSET PIPELINE
  // ---------------------------------------------------------------------------
  // Scene 2 and Scene 3 use the native 1024x341 RGBA transparent asset
  // (assets/titanbar-transparent.png) at full uncompressed resolution.

  // ---------------------------------------------------------------------------
  // 3. SCENE 0: ISOMETRIC MULTI-SCREEN PRESENTATION (Frames 01-03)
  // ---------------------------------------------------------------------------
  const isoOverlay = document.getElementById('iso-overlay');
  const isoStage = document.getElementById('iso-stage');
  const startBtn = document.getElementById('start-btn');
  const isoCards = document.querySelectorAll('.iso-card');

  function startLaunchSequence() {
    playSound('reveal');

    // Camera zooms smoothly in towards Screen 1 (Initialization Preloader)
    if (isoStage) {
      isoStage.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
      isoStage.style.transform = 'scale(2.2) translate(180px, 80px) rotateX(0deg) rotateY(0deg)';
    }

    setTimeout(() => {
      if (isoOverlay) {
        isoOverlay.classList.add('dismissed');
      }
      runPreloaderSequence();
    }, 600);
  }

  if (startBtn) {
    startBtn.addEventListener('click', startLaunchSequence);
  }

  isoCards.forEach(card => {
    card.addEventListener('click', startLaunchSequence);
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && isoOverlay && !isoOverlay.classList.contains('dismissed')) {
      e.preventDefault();
      startLaunchSequence();
    }
  });

  // ---------------------------------------------------------------------------
  // 4. SCENE 1: SYSTEM INITIALIZATION / PRELOADER (Frames 04-05)
  // ---------------------------------------------------------------------------
  const sceneInit = document.getElementById('scene-init');
  const initPctText = document.getElementById('init-pct-text');
  const initProgressFill = document.getElementById('init-progress-fill');
  const revealShape = document.getElementById('reveal-shape');

  function runPreloaderSequence() {
    let currentPct = 0;
    const targetSteps = [15, 38, 62, 85, 92, 100];
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < targetSteps.length) {
        currentPct = targetSteps[stepIndex];
        stepIndex++;
      } else {
        clearInterval(interval);
        currentPct = 100;
        triggerStarburstExpansion();
      }

      if (initPctText) initPctText.textContent = `( ${currentPct}% )`;
      if (initProgressFill) initProgressFill.style.width = `${currentPct}%`;

      if (currentPct === 100) {
        playSound('lock');
      }
    }, 180);
  }

  // ---------------------------------------------------------------------------
  // 5. TRANSITION MASK REVEAL (Frame 06)
  // ---------------------------------------------------------------------------
  function triggerStarburstExpansion() {
    setTimeout(() => {
      if (revealShape) {
        revealShape.classList.add('expanding');
      }
      playSound('reveal');

      setTimeout(() => {
        if (sceneInit) {
          sceneInit.classList.add('hidden');
        }
        triggerHeroEntrance();
      }, 700);

      setTimeout(() => {
        if (revealShape && revealShape.parentElement) {
          revealShape.parentElement.style.display = 'none';
        }
      }, 1400);
    }, 300);
  }

  // ---------------------------------------------------------------------------
  // 6. SCENE 2: CINEMATIC HERO ENTRANCE (Frames 07-11)
  // ---------------------------------------------------------------------------
  const heroTitle = document.getElementById('hero-title');
  const heroBarImg = document.getElementById('hero-bar-img');
  const barStage = document.getElementById('bar-stage');

  function triggerHeroEntrance() {
    // Unblur and focus editorial title
    if (heroTitle) {
      setTimeout(() => {
        heroTitle.classList.remove('blurred-entrance');
      }, 200);
    }

    // 3D product entrance translation and smooth float
    if (heroBarImg) {
      heroBarImg.style.transform = 'translateY(90px) rotate(-12deg) scale(0.85)';
      heroBarImg.style.opacity = '0';
      heroBarImg.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';

      setTimeout(() => {
        heroBarImg.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        heroBarImg.style.opacity = '1';
      }, 300);
    }
  }

  // 3D Parallax Tilt on Hero Stage
  if (barStage) {
    window.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;

      barStage.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
  }

  // Atmospheric Particles Canvas
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.3 ? '#ffffff' : '#e51d24'
    }));

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ---------------------------------------------------------------------------
  // 7. SCENE 4: INTERACTIVE FEATURE STUDIO & CALIBRATION HUD (Frames 20-25)
  // ---------------------------------------------------------------------------
  const timelineCards = document.querySelectorAll('.timeline-card');
  const studioActiveCode = document.getElementById('studio-active-code');
  const blackCardTitle = document.getElementById('black-card-title');
  const blackCardBody = document.getElementById('black-card-body');
  const calValLength = document.getElementById('cal-val-length');
  const calValLoad = document.getElementById('cal-val-load');
  const spiritBubble = document.getElementById('spirit-bubble');
  const levelAngleReadout = document.getElementById('level-angle-readout');

  const calBtnReset = document.getElementById('cal-btn-reset');
  const calBtnShorten = document.getElementById('cal-btn-shorten');
  const calBtnExtend = document.getElementById('cal-btn-extend');

  function updateCalibrationDisplay() {
    if (calValLength) calValLength.innerHTML = `${state.currentExtension} <span style="font-size: 16px; font-weight: normal;">cm</span>`;
    if (calValLoad) calValLoad.innerHTML = `${state.maxLoad} <span style="font-size: 16px; font-weight: normal;">kg</span>`;
    playSound('click');
  }

  if (calBtnExtend) {
    calBtnExtend.addEventListener('click', () => {
      if (state.currentExtension < 100) {
        state.currentExtension += 5;
        state.maxLoad = Math.max(280, 350 - (state.currentExtension - 65) * 1.5);
        updateCalibrationDisplay();
      }
    });
  }

  if (calBtnShorten) {
    calBtnShorten.addEventListener('click', () => {
      if (state.currentExtension > 65) {
        state.currentExtension -= 5;
        state.maxLoad = Math.min(360, 320 + (100 - state.currentExtension) * 0.8);
        updateCalibrationDisplay();
      }
    });
  }

  if (calBtnReset) {
    calBtnReset.addEventListener('click', () => {
      state.currentExtension = 78;
      state.maxLoad = 320;
      updateCalibrationDisplay();
    });
  }

  // Interactive Spirit Level Tilt Simulator: mouse movement over card tilts level bubble
  const calibrationCard = document.getElementById('calibration-card');
  if (calibrationCard && spiritBubble) {
    calibrationCard.addEventListener('mousemove', (e) => {
      const rect = calibrationCard.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const normalized = (mouseX / rect.width - 0.5) * 2; // -1 to 1

      const maxOffset = 60; // pixels from center
      const bubbleLeft = `calc(50% - 11px + ${normalized * maxOffset}px)`;
      spiritBubble.style.left = bubbleLeft;

      const angle = (normalized * 3.5).toFixed(1);
      if (Math.abs(angle) < 0.4) {
        if (levelAngleReadout) {
          levelAngleReadout.textContent = '0.0° LEVEL';
          levelAngleReadout.style.color = '#22c55e';
        }
      } else {
        if (levelAngleReadout) {
          levelAngleReadout.textContent = `${angle > 0 ? '+' : ''}${angle}° TILT`;
          levelAngleReadout.style.color = '#f59e0b';
        }
      }
    });

    calibrationCard.addEventListener('mouseleave', () => {
      spiritBubble.style.left = 'calc(50% - 11px)';
      if (levelAngleReadout) {
        levelAngleReadout.textContent = '0.0° LEVEL';
        levelAngleReadout.style.color = '#22c55e';
      }
    });
  }

  // Timeline Carousel Card Clicks
  timelineCards.forEach(card => {
    card.addEventListener('click', () => {
      timelineCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const code = card.getAttribute('data-code');
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');

      if (studioActiveCode) studioActiveCode.textContent = code;
      if (blackCardTitle) blackCardTitle.textContent = title;
      if (blackCardBody) blackCardBody.textContent = desc;

      playSound('click');
    });
  });

  // ---------------------------------------------------------------------------
  // 8. SCENE 5: SHOP & E-COMMERCE DETAIL (Frames 28-30)
  // ---------------------------------------------------------------------------
  const thumbItems = document.querySelectorAll('.shop-thumb-item');
  const shopMainImg = document.getElementById('shop-main-img');
  const galleryLabel = document.getElementById('gallery-label');

  thumbItems.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbItems.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const view = thumb.getAttribute('data-view');
      playSound('click');

      if (shopMainImg) {
        shopMainImg.classList.add('blurred');

        setTimeout(() => {
          if (view === 'level') {
            shopMainImg.style.transform = 'scale(1.7) translate(-80px, -20px)';
            if (galleryLabel) galleryLabel.querySelector('span').textContent = 'Macro Detail: Dual-Axis Green Spirit Level';
          } else if (view === 'lock') {
            shopMainImg.style.transform = 'scale(1.8) translate(60px, -50px)';
            if (galleryLabel) galleryLabel.querySelector('span').textContent = 'Macro Detail: 360° High-Torque Safety Clamp';
          } else if (view === 'mounted') {
            shopMainImg.style.transform = 'scale(1.4) translate(-100px, 60px)';
            if (galleryLabel) galleryLabel.querySelector('span').textContent = 'Doorway Mount Workout Action';
          } else {
            shopMainImg.style.transform = 'scale(1) translate(0, 0)';
            if (galleryLabel) galleryLabel.querySelector('span').textContent = 'Click to inspect • 360° High Definition';
          }
          shopMainImg.classList.remove('blurred');
        }, 180);
      }
    });
  });

  // Size Button Selectors
  const sizeBtns = document.querySelectorAll('.size-btn');
  const selectedLengthLabel = document.getElementById('selected-length-label');

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const length = btn.getAttribute('data-length');
      state.selectedSize = length;
      if (selectedLengthLabel) selectedLengthLabel.textContent = `${length} (Selecionado)`;
      playSound('click');
    });
  });

  // Color Swatches
  const colorSwatches = document.querySelectorAll('.color-swatch');
  const selectedColorLabel = document.getElementById('selected-color-label');

  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const color = swatch.getAttribute('data-color');
      state.selectedColor = color;
      if (selectedColorLabel) selectedColorLabel.textContent = color;
      playSound('click');
    });
  });

  // Favorites Toggle
  const favBadge = document.getElementById('fav-badge');
  const favBtn = document.getElementById('fav-btn');
  const shopFavTrigger = document.getElementById('shop-fav-trigger');

  function toggleFavorite() {
    state.isFavorited = !state.isFavorited;
    state.favoritesCount = state.isFavorited ? 1 : 0;
    if (favBadge) favBadge.textContent = state.favoritesCount;
    if (shopFavTrigger) {
      shopFavTrigger.classList.toggle('favorited', state.isFavorited);
      shopFavTrigger.innerHTML = state.isFavorited ? '♥' : '♡';
    }
    playSound('click');
  }

  if (shopFavTrigger) shopFavTrigger.addEventListener('click', toggleFavorite);
  if (favBtn) favBtn.addEventListener('click', toggleFavorite);

  // Accordion Dropdowns
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        accordionItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
        playSound('click');
      });
    }
  });

  // ---------------------------------------------------------------------------
  // 9. CHECKOUT MODAL LOGIC
  // ---------------------------------------------------------------------------
  const checkoutModal = document.getElementById('checkout-modal');
  const modalClose = document.getElementById('modal-close');
  const checkoutTriggerBtn = document.getElementById('checkout-trigger-btn');
  const heroOrderCta = document.getElementById('hero-order-cta');
  const cartBtn = document.getElementById('cart-btn');
  const cartBadge = document.getElementById('cart-badge');
  const confirmOrderBtn = document.getElementById('confirm-order-btn');
  const modalVariantText = document.getElementById('modal-variant-text');

  function openCheckout() {
    if (modalVariantText) {
      modalVariantText.textContent = `${state.selectedSize} • ${state.selectedColor}`;
    }
    if (checkoutModal) checkoutModal.classList.add('open');
    playSound('click');
  }

  function closeCheckout() {
    if (checkoutModal) checkoutModal.classList.remove('open');
    playSound('click');
  }

  if (checkoutTriggerBtn) checkoutTriggerBtn.addEventListener('click', openCheckout);
  if (heroOrderCta) heroOrderCta.addEventListener('click', openCheckout);
  if (cartBtn) cartBtn.addEventListener('click', openCheckout);
  if (modalClose) modalClose.addEventListener('click', closeCheckout);

  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) closeCheckout();
    });
  }

  if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', () => {
      confirmOrderBtn.textContent = '✓ Pedido Confirmado!';
      confirmOrderBtn.style.background = '#22c55e';
      playSound('lock');
      state.cartCount = 1;
      if (cartBadge) cartBadge.textContent = '1';

      setTimeout(() => {
        closeCheckout();
        confirmOrderBtn.textContent = 'Confirmar Pedido com Frete Grátis';
        confirmOrderBtn.style.background = '#e51d24';
      }, 1600);
    });
  }

  // ---------------------------------------------------------------------------
  // 10. SCROLL SYNC & FRAME-26 DIAGONAL CASCADE ANIMATION
  // ---------------------------------------------------------------------------
  const siteNav = document.getElementById('site-nav');
  const navDots = document.querySelectorAll('.nav-dot');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    // Adapt navbar theme depending on dark vs light section
    const studioSection = document.getElementById('studio');
    if (studioSection) {
      const studioTop = studioSection.offsetTop - 80;
      if (scrollY >= studioTop) {
        siteNav.classList.add('nav-light');
      } else {
        siteNav.classList.remove('nav-light');
      }
    }

    // Floating nav dots active update
    sections.forEach((sec, i) => {
      const top = sec.offsetTop - 200;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navDots.forEach(d => d.classList.remove('active'));
        if (navDots[i]) navDots[i].classList.add('active');
      }
    });

    // Frame 26 Diagonal Cascade Effect when entering shop section
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      const shopTop = shopSection.offsetTop;
      const distanceToShop = shopTop - scrollY;

      if (distanceToShop < windowH && distanceToShop > 0) {
        const progress = 1 - (distanceToShop / windowH);
        timelineCards.forEach((card, idx) => {
          card.classList.add('cascading');
          const delayMultiplier = idx * 18;
          card.style.transform = `translateY(-${progress * (60 + delayMultiplier)}px) rotate(${progress * 2}deg)`;
          card.style.opacity = `${1 - progress * 0.85}`;
        });
      } else if (distanceToShop <= 0) {
        timelineCards.forEach(card => {
          card.style.opacity = '0.15';
        });
      } else {
        timelineCards.forEach(card => {
          card.classList.remove('cascading');
          card.style.transform = '';
          card.style.opacity = '1';
        });
      }
    }
  });

  // Nav dots click scroll
  navDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-target');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        playSound('click');
      }
    });
  });

});

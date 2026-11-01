/**
 * ============================================================================
 * GOTA PATTI HERITAGE ARCHIVE — 240 FRAMES SCROLL ANIMATION ENGINE
 * Designed for High-DPI Canvas, Smooth Lerp Interpolation & Section Integration
 * ============================================================================
 */

(function () {
  'use strict';

  function initApp() {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const preloader = document.getElementById('preloader');
    if (prefersReducedMotion) {
      if (preloader) {
        preloader.style.display = 'none';
      }
      return; // Respect accessibility preference
    }

    const TOTAL_FRAMES = 240;
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    // DOM Elements
    const preloaderBar = document.getElementById('preloader-bar');
    const progressText = document.getElementById('progress-text');
    const skipBtn = document.getElementById('skip-preloader-btn');
    const frameBadge = document.getElementById('frame-badge');
    const scrollPercentText = document.getElementById('scroll-percent');
    const activeChapterName = document.getElementById('active-chapter-name');
    const scrollHint = document.getElementById('initial-scroll-hint');
    const autoplayBtn = document.getElementById('autoplay-btn');
    const autoplayIcon = document.getElementById('autoplay-icon');
    const autoplayText = document.getElementById('autoplay-text');
    const replayBtn = document.getElementById('replay-btn');
    const scrubberContainer = document.getElementById('scrubber-container');

    // Scrubber elements
    const scrubber = document.getElementById('timeline-scrubber');
    const scrubberFill = document.getElementById('scrubber-fill');
    const scrubberThumb = document.getElementById('scrubber-thumb');
    const chapterNavBtns = document.querySelectorAll('.chapter-nav-btn');

    // Story Cards
    const storyCards = [
      document.getElementById('story-1'),
      document.getElementById('story-2'),
      document.getElementById('story-3'),
      document.getElementById('story-4'),
    ];

    // State Variables
    const images = new Array(TOTAL_FRAMES);
    let loadedCount = 0;
    let targetFrame = 1;
    let smoothFrame = 1;
    let lastRenderedFrame = -1;
    let isAutoplaying = false;
    let autoplayRafId = null;
    let isScrubbing = false;
    let isPreloaderDismissed = false;

    // Set canvas dimensions with DPR
    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for optimal battery/performance
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      lastRenderedFrame = -1; // Force repaint
    }

    // High quality aspect-ratio cover drawing
    function renderFrame(frameNum) {
      const idx = Math.min(Math.max(1, frameNum), TOTAL_FRAMES) - 1;
      let img = images[idx];

      // Fallback: if targeted frame is still loading, find the closest available loaded frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < 35; offset++) {
          const prev = images[idx - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = images[idx + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1280;
      const ih = img.naturalHeight || 720;

      const ir = iw / ih;
      const cr = cw / ch;

      let dw, dh, ox, oy;
      if (cr > ir) {
        dw = cw;
        dh = cw / ir;
        ox = 0;
        oy = (ch - dh) / 2;
      } else {
        dw = ch * ir;
        dh = ch;
        ox = (cw - dw) / 2;
        oy = 0;
      }

      ctx.drawImage(img, ox, oy, dw, dh);

      // Update Frame HUD Badge
      if (frameBadge) {
        const padded = String(frameNum).padStart(3, '0');
        frameBadge.textContent = `${padded} / ${TOTAL_FRAMES}`;
      }
    }

    // Update Story Cards & Chapters based on current frame
    function updateStoryOverlays(frameNum) {
      let activeIndex = 0;
      let chapterName = 'Origins';

      if (frameNum <= 58) {
        activeIndex = 0;
        chapterName = 'Origins';
      } else if (frameNum <= 128) {
        activeIndex = 1;
        chapterName = 'The Zari Weave';
      } else if (frameNum <= 188) {
        activeIndex = 2;
        chapterName = 'Royal Drape';
      } else {
        activeIndex = 3;
        chapterName = 'Enduring Legacy';
      }

      storyCards.forEach((card, index) => {
        if (!card) return;
        if (index === activeIndex) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });

      if (activeChapterName) {
        activeChapterName.textContent = chapterName;
      }

      // Hide initial scroll prompt after user scrolls past frame 6
      if (scrollHint) {
        if (frameNum > 6) {
          scrollHint.style.opacity = '0';
          scrollHint.style.pointerEvents = 'none';
        } else {
          scrollHint.style.opacity = '1';
        }
      }

      // Update chapter nodes
      const n2 = document.getElementById('node-2');
      const n3 = document.getElementById('node-3');
      const n4 = document.getElementById('node-4');
      if (n2) n2.classList.toggle('passed', frameNum >= 65);
      if (n3) n3.classList.toggle('passed', frameNum >= 135);
      if (n4) n4.classList.toggle('passed', frameNum >= 210);
    }

    // Dismiss Preloader smoothly
    function dismissPreloader() {
      if (isPreloaderDismissed) return;
      isPreloaderDismissed = true;
      if (preloader) {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 750);
      }
      updateFrameFromScroll();
    }

    // Preload image frames with priority streaming
    function preloadFrames() {
      // Priority 1: Load Frame 1 immediately
      const frame1 = new Image();
      frame1.src = './ezgif-frame-001.jpg';
      frame1.onload = () => {
        images[0] = frame1;
        loadedCount++;
        renderFrame(1);
      };
      images[0] = frame1;

      // Priority 2: Preload remaining frames
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const numStr = String(i).padStart(3, '0');
        img.src = `./ezgif-frame-${numStr}.jpg`;

        const onComplete = () => {
          loadedCount++;
          const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);

          if (preloaderBar) preloaderBar.style.width = `${percent}%`;
          if (progressText) progressText.textContent = `${percent}%`;

          // Once first 20 frames are ready (~8%), experience is smoothly interactive
          if (loadedCount >= 20 && !isPreloaderDismissed) {
            dismissPreloader();
          }

          if (loadedCount === TOTAL_FRAMES && !isPreloaderDismissed) {
            dismissPreloader();
          }
        };

        img.onload = onComplete;
        img.onerror = onComplete; // Never hang on single image error
        images[i - 1] = img;
      }

      // Safety timeout: dismiss preloader after 3.5s regardless of slow network
      setTimeout(() => {
        dismissPreloader();
      }, 3500);
    }

    // Update Scrubber Track & percentage
    function updateScrubberUI(fraction) {
      const percentInt = Math.floor(fraction * 100);
      if (scrollPercentText) scrollPercentText.textContent = `${percentInt}%`;
      if (scrubberFill) scrubberFill.style.width = `${fraction * 100}%`;
      if (scrubberThumb) scrubberThumb.style.left = `${fraction * 100}%`;
    }

    // Calculate target frame from scroll position
    function updateFrameFromScroll() {
      if (isScrubbing) return;
      const scrollSection = document.getElementById('scroll-atelier');
      const scrollTopWindow = window.scrollY || document.documentElement.scrollTop || 0;

      if (!scrollSection) {
        // Fallback for standalone animation page
        const maxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
        if (maxScroll <= 0) return;
        const fraction = Math.min(Math.max(0, scrollTopWindow / maxScroll), 1.0);
        targetFrame = Math.round(fraction * (TOTAL_FRAMES - 1)) + 1;
        updateScrubberUI(fraction);
        return;
      }

      const sectionTop = scrollSection.offsetTop;
      const sectionHeight = scrollSection.offsetHeight;
      const scrollRange = sectionHeight - window.innerHeight;
      const relativeScroll = scrollTopWindow - sectionTop;

      let fraction = 0;
      if (relativeScroll <= 0) {
        fraction = 0;
        targetFrame = 1;
      } else if (relativeScroll >= scrollRange) {
        fraction = 1;
        targetFrame = TOTAL_FRAMES;
      } else {
        fraction = Math.min(Math.max(0, relativeScroll / scrollRange), 1.0);
        targetFrame = Math.round(fraction * (TOTAL_FRAMES - 1)) + 1;
      }

      updateScrubberUI(fraction);

      // Scrubber container visibility: only visible when in or near scroll-atelier
      if (scrubberContainer) {
        const inZone = scrollTopWindow <= sectionTop + scrollRange + 250;
        scrubberContainer.style.opacity = inZone ? '1' : '0';
        scrubberContainer.style.pointerEvents = inZone ? 'auto' : 'none';
      }
    }

    // Smooth Lerp Animation Loop (60/120fps)
    function animLoop() {
      // Ease smoothFrame towards targetFrame
      const diff = targetFrame - smoothFrame;
      if (Math.abs(diff) > 0.01) {
        smoothFrame += diff * 0.16; // Lerp smoothing factor
      } else {
        smoothFrame = targetFrame;
      }

      const currentIntFrame = Math.round(smoothFrame);
      if (currentIntFrame !== lastRenderedFrame) {
        renderFrame(currentIntFrame);
        updateStoryOverlays(currentIntFrame);
        lastRenderedFrame = currentIntFrame;
      }

      requestAnimationFrame(animLoop);
    }

    // Scroll to specific frame (1 to 240)
    function scrollToFrame(frameNum, behavior = 'smooth') {
      const scrollSection = document.getElementById('scroll-atelier');
      const fraction = (Math.min(Math.max(1, frameNum), TOTAL_FRAMES) - 1) / (TOTAL_FRAMES - 1);

      if (!scrollSection) {
        const maxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
        window.scrollTo({
          top: fraction * maxScroll,
          behavior: behavior,
        });
        return;
      }

      const sectionTop = scrollSection.offsetTop;
      const sectionHeight = scrollSection.offsetHeight;
      const scrollRange = sectionHeight - window.innerHeight;
      const targetScroll = sectionTop + fraction * scrollRange;

      window.scrollTo({
        top: targetScroll,
        behavior: behavior,
      });
    }

    // Auto-Play Engine
    function startAutoplay() {
      isAutoplaying = true;
      if (autoplayIcon) autoplayIcon.textContent = 'pause';
      if (autoplayText) autoplayText.textContent = 'Pause';
      if (autoplayBtn) autoplayBtn.classList.add('bg-[#d4af37]/20');

      let lastTime = performance.now();
      const framesPerSec = 24;
      const frameInterval = 1000 / framesPerSec;

      function playStep(now) {
        if (!isAutoplaying) return;

        if (now - lastTime >= frameInterval) {
          lastTime = now;
          if (targetFrame >= TOTAL_FRAMES) {
            stopAutoplay();
          } else {
            targetFrame++;
            scrollToFrame(targetFrame, 'auto');
          }
        }

        autoplayRafId = requestAnimationFrame(playStep);
      }

      autoplayRafId = requestAnimationFrame(playStep);
    }

    function stopAutoplay() {
      isAutoplaying = false;
      if (autoplayRafId) cancelAnimationFrame(autoplayRafId);
      if (autoplayIcon) autoplayIcon.textContent = 'play_arrow';
      if (autoplayText) autoplayText.textContent = 'Auto-Play';
      if (autoplayBtn) autoplayBtn.classList.remove('bg-[#d4af37]/20');
    }

    function toggleAutoplay() {
      if (isAutoplaying) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    }

    // Scrubber Drag & Click Handling
    if (scrubber) {
      function seekFromEvent(e) {
        const rect = scrubber.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clickX = Math.min(Math.max(0, clientX - rect.left), rect.width);
        const fraction = clickX / rect.width;
        const frame = Math.round(fraction * (TOTAL_FRAMES - 1)) + 1;

        if (isAutoplaying) stopAutoplay();
        targetFrame = frame;
        scrollToFrame(frame, 'auto');
        updateScrubberUI(fraction);
      }

      scrubber.addEventListener('mousedown', (e) => {
        isScrubbing = true;
        seekFromEvent(e);

        const onMouseMove = (moveEvt) => {
          if (isScrubbing) seekFromEvent(moveEvt);
        };

        const onMouseUp = () => {
          isScrubbing = false;
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      });

      scrubber.addEventListener('touchstart', (e) => {
        isScrubbing = true;
        seekFromEvent(e);
      }, { passive: true });

      scrubber.addEventListener('touchmove', (e) => {
        if (isScrubbing) seekFromEvent(e);
      }, { passive: true });

      scrubber.addEventListener('touchend', () => {
        isScrubbing = false;
      });
    }

    // Chapter Navigation Buttons
    chapterNavBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const frame = parseInt(btn.getAttribute('data-frame'), 10) || 1;
        if (isAutoplaying) stopAutoplay();
        scrollToFrame(frame, 'smooth');
      });
    });

    // Replay Button
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        if (isAutoplaying) stopAutoplay();
        scrollToFrame(1, 'smooth');
      });
    }

    // Auto-Play Button
    if (autoplayBtn) {
      autoplayBtn.addEventListener('click', toggleAutoplay);
    }

    // Skip preloader button
    if (skipBtn) {
      skipBtn.addEventListener('click', dismissPreloader);
    }

    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        const scrollSection = document.getElementById('scroll-atelier');
        const inZone = !scrollSection || window.scrollY <= scrollSection.offsetTop + scrollSection.offsetHeight;
        if (inZone) {
          e.preventDefault();
          toggleAutoplay();
        }
      } else if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
        const scrollSection = document.getElementById('scroll-atelier');
        if (scrollSection && window.scrollY <= scrollSection.offsetTop + scrollSection.offsetHeight) {
          if (isAutoplaying) stopAutoplay();
          targetFrame = Math.min(TOTAL_FRAMES, targetFrame + 4);
          scrollToFrame(targetFrame, 'auto');
        }
      } else if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
        const scrollSection = document.getElementById('scroll-atelier');
        if (scrollSection && window.scrollY <= scrollSection.offsetTop + scrollSection.offsetHeight) {
          if (isAutoplaying) stopAutoplay();
          targetFrame = Math.max(1, targetFrame - 4);
          scrollToFrame(targetFrame, 'auto');
        }
      }
    });

    // Event Listeners
    window.addEventListener('scroll', updateFrameFromScroll, { passive: true });
    window.addEventListener('resize', () => {
      resizeCanvas();
      renderFrame(Math.round(smoothFrame));
    });

    // Stop autoplay when user manually wheels or touches
    window.addEventListener('wheel', () => {
      if (isAutoplaying) stopAutoplay();
    }, { passive: true });

    window.addEventListener('touchmove', () => {
      if (isAutoplaying) stopAutoplay();
    }, { passive: true });

    // Initial Execution
    resizeCanvas();
    preloadFrames();
    requestAnimationFrame(animLoop);
  }

  // Ensure DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();

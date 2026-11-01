/**
 * Gota Patti — Scroll-Controlled Craft Transformation Engine (292 Frames)
 * Smoothly scrubs ./process-frames/ezgif-frame-001.jpg → ezgif-frame-292.jpg
 * as the user scrolls through the Process & Materials craft stages.
 * Zero loading screens, zero black screens, zero playback controls.
 */
(function () {
    const TOTAL_FRAMES = 292;
    const FRAME_PATH = './process-frames/ezgif-frame-';

    const STAGES = [
        {
            index: 0,
            step: 'STAGE 01 / 05',
            title: 'Design Planning & Khaka Tracing',
            subtitle: 'Stenciling the Geometry & Structural Blueprint',
            desc: 'Master draughtsmen trace symmetrical floral and geometric trellises onto butter-paper stencils (Khaka), perforating thousands of micro-pinholes before transferring the blueprint onto the base textile.',
            range: [1, 58]
        },
        {
            index: 1,
            step: 'STAGE 02 / 05',
            title: 'Material Preparation & Lappa Selection',
            subtitle: 'Calibrating Antique Gold & Silver Zari Ribbons',
            desc: 'Genuine metallic-coated Lappa and Seekhiya ribbons are selected by gauge and tensioned alongside raw silk and velvet backings so the weave reflects light at every angle.',
            range: [59, 116]
        },
        {
            index: 2,
            step: 'STAGE 03 / 05',
            title: 'Motif Creation & Ribbon Folding',
            subtitle: 'Origami-Precision Pattis, Bijia & Phool',
            desc: 'Artisans hand-fold narrow gold and silver Gota ribbons at sharp 45-degree angles into diamond leaves (Patti), buds (Bijia), and solar rosettes without cutting the continuous ribbon.',
            range: [117, 175]
        },
        {
            index: 3,
            step: 'STAGE 04 / 05',
            title: 'Tankaayi Stitching & Zardozi Bordering',
            subtitle: 'Micro-Hemming Every Folded Edge to the Base',
            desc: 'Across the wooden Adda frame, each folded metallic motif is anchored with invisible running Tanka stitches and framed with coiled Zardozi wire (Dabka) for architectural relief.',
            range: [176, 234]
        },
        {
            index: 4,
            step: 'STAGE 05 / 05',
            title: 'Final Burnishing & Heirloom Purse Assembly',
            subtitle: 'Transforming the Embroidered Belt into a Royal Clutch',
            desc: 'The finished Gota Patti band is gently burnished with agate stone, structured over raw silk lining, and crowned with a braided zari tassel and antique brass clasp.',
            range: [235, 292]
        }
    ];

    const frames = new Array(TOTAL_FRAMES + 1);
    let currentFrameFloat = 1;
    let targetFrameFloat = 1;
    let lastRenderedFrame = -1;
    let rafId = null;

    function pad3(n) {
        return String(n).padStart(3, '0');
    }

    function getNearestLoadedFrame(index) {
        const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(index)));
        if (frames[clamped] && frames[clamped].complete && frames[clamped].naturalWidth > 0) {
            return frames[clamped];
        }
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
            const prev = clamped - offset;
            if (prev >= 1 && frames[prev] && frames[prev].complete && frames[prev].naturalWidth > 0) {
                return frames[prev];
            }
            const next = clamped + offset;
            if (next <= TOTAL_FRAMES && frames[next] && frames[next].complete && frames[next].naturalWidth > 0) {
                return frames[next];
            }
        }
        return null;
    }

    function initScrollCraftAnimation() {
        const scrollSection = document.getElementById('craft-scroll-section');
        const canvas = document.getElementById('craft-scroll-canvas');
        if (!scrollSection || !canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        const stageStepEl = document.getElementById('craft-stage-step');
        const stageTitleEl = document.getElementById('craft-stage-title');
        const stageSubEl = document.getElementById('craft-stage-subtitle');
        const stageDescEl = document.getElementById('craft-stage-desc');
        const frameNumEl = document.getElementById('craft-frame-counter');
        const progressFillEl = document.getElementById('craft-scroll-progress');
        const stageCards = document.querySelectorAll('[data-craft-stage]');

        function resizeCanvas() {
            const rect = canvas.parentElement.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.max(320, Math.floor(rect.width * dpr));
            canvas.height = Math.max(240, Math.floor(rect.height * dpr));
            lastRenderedFrame = -1;
            drawFrame(Math.round(currentFrameFloat));
        }

        function drawFrame(frameIndex) {
            const img = getNearestLoadedFrame(frameIndex);
            const cw = canvas.width;
            const ch = canvas.height;

            // Warm archival cream background — never black
            ctx.fillStyle = '#faf3e8';
            ctx.fillRect(0, 0, cw, ch);

            if (!img) return;

            const iw = img.naturalWidth;
            const ih = img.naturalHeight;
            const scale = Math.max(cw / iw, ch / ih);
            const dw = iw * scale;
            const dh = ih * scale;
            const dx = (cw - dw) * 0.5;
            const dy = (ch - dh) * 0.5;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, dx, dy, dw, dh);
        }

        function updateStageUI(frameIdx) {
            const progressPct = ((frameIdx - 1) / (TOTAL_FRAMES - 1)) * 100;
            if (progressFillEl) {
                progressFillEl.style.width = `${progressPct.toFixed(1)}%`;
            }
            if (frameNumEl) {
                frameNumEl.textContent = `FRAME ${pad3(frameIdx)} / ${TOTAL_FRAMES}`;
            }

            let activeStage = STAGES[0];
            for (let i = 0; i < STAGES.length; i++) {
                if (frameIdx >= STAGES[i].range[0] && frameIdx <= STAGES[i].range[1]) {
                    activeStage = STAGES[i];
                    break;
                }
            }

            if (stageStepEl && stageStepEl.textContent !== activeStage.step) {
                stageStepEl.textContent = activeStage.step;
            }
            if (stageTitleEl && stageTitleEl.textContent !== activeStage.title) {
                stageTitleEl.textContent = activeStage.title;
            }
            if (stageSubEl && stageSubEl.textContent !== activeStage.subtitle) {
                stageSubEl.textContent = activeStage.subtitle;
            }
            if (stageDescEl && stageDescEl.textContent !== activeStage.desc) {
                stageDescEl.textContent = activeStage.desc;
            }

            stageCards.forEach((card) => {
                const cardIdx = parseInt(card.getAttribute('data-craft-stage'), 10);
                if (cardIdx === activeStage.index) {
                    card.classList.add('active-stage-card');
                } else {
                    card.classList.remove('active-stage-card');
                }
            });
        }

        function computeTargetFrameFromScroll() {
            const rect = scrollSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const scrollableDistance = Math.max(1, rect.height - viewportHeight * 0.85);
            const scrolled = -rect.top + viewportHeight * 0.15;
            const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
            targetFrameFloat = 1 + progress * (TOTAL_FRAMES - 1);
        }

        function tick() {
            const diff = targetFrameFloat - currentFrameFloat;
            if (Math.abs(diff) > 0.05) {
                currentFrameFloat += diff * 0.14;
            } else {
                currentFrameFloat = targetFrameFloat;
            }

            const rounded = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentFrameFloat)));
            if (rounded !== lastRenderedFrame) {
                drawFrame(rounded);
                updateStageUI(rounded);
                lastRenderedFrame = rounded;
            }

            rafId = requestAnimationFrame(tick);
        }

        // Load keyframe 1 immediately, then keyframe stride, then remaining frames
        function preloadFrames() {
            const priorityOrder = [];
            const seen = new Set();

            // 1. First frame immediately
            priorityOrder.push(1);
            seen.add(1);

            // 2. Every 8th frame for instant scrub responsiveness across the whole timeline
            for (let i = 1; i <= TOTAL_FRAMES; i += 8) {
                if (!seen.has(i)) {
                    priorityOrder.push(i);
                    seen.add(i);
                }
            }
            if (!seen.has(TOTAL_FRAMES)) {
                priorityOrder.push(TOTAL_FRAMES);
                seen.add(TOTAL_FRAMES);
            }

            // 3. All remaining frames in sequence
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                if (!seen.has(i)) {
                    priorityOrder.push(i);
                    seen.add(i);
                }
            }

            let cursor = 0;
            const CONCURRENCY = 8;

            function loadNext() {
                if (cursor >= priorityOrder.length) return;
                const frameNum = priorityOrder[cursor++];
                const img = new Image();
                img.decoding = 'async';
                img.onload = () => {
                    if (frameNum === 1 || Math.abs(frameNum - Math.round(currentFrameFloat)) <= 4) {
                        lastRenderedFrame = -1;
                    }
                    loadNext();
                };
                img.onerror = () => {
                    loadNext();
                };
                img.src = `${FRAME_PATH}${pad3(frameNum)}.jpg`;
                frames[frameNum] = img;
            }

            for (let c = 0; c < CONCURRENCY; c++) {
                loadNext();
            }
        }

        // Allow clicking a stage card to scroll smoothly to that stage's position
        stageCards.forEach((card) => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.getAttribute('data-craft-stage'), 10);
                const stage = STAGES[idx];
                if (!stage) return;
                const midFrame = (stage.range[0] + stage.range[1]) / 2;
                const ratio = (midFrame - 1) / (TOTAL_FRAMES - 1);
                const sectionTop = window.scrollY + scrollSection.getBoundingClientRect().top;
                const scrollableDistance = Math.max(1, scrollSection.offsetHeight - window.innerHeight * 0.85);
                const targetScrollY = sectionTop + ratio * scrollableDistance - window.innerHeight * 0.1;
                window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
            });
        });

        resizeCanvas();
        preloadFrames();
        computeTargetFrameFromScroll();
        updateStageUI(1);
        window.addEventListener('scroll', computeTargetFrameFromScroll, { passive: true });
        window.addEventListener('resize', () => {
            resizeCanvas();
            computeTargetFrameFromScroll();
        });
        rafId = requestAnimationFrame(tick);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollCraftAnimation);
    } else {
        initScrollCraftAnimation();
    }
})();

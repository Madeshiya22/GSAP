// =====================
// GSAP + LENIS SETUP
// =====================
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  smooth: true,
  smoothTouch: false,
  easing: (t) => 1 - Math.pow(2, -10 * t)
});

// RAF loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// sync GSAP
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// =====================
//  LOADER TIMELINE
// =====================
function loaderAnimation() {
  const count = document.querySelector(".count");
  const fill = document.querySelector(".length .fill");

  if (!count || !fill) return;

  return gsap.timeline()
    .to(count, {
      innerText: 100,
      duration: 3,
      snap: { innerText: 1 },
      ease: "power1.inOut",
      onUpdate: () => {
        count.innerText = Math.floor(count.innerText) + " %";
      }
    }, 0)
    .to(fill, {
      width: "100%",
      opacity: 1,
      duration: 3,
      ease: "power1.inOut"
    }, 0);
}

// =====================
//  HERO ANIMATIONS
// =====================
const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });

heroTl
  .from(".imgDiv img", { y: 100, opacity: 0, duration: 1 })
  .from(".imgDiv h1", { y: 100, opacity: 0, duration: 0.8 }, "-=0.5")
  .from(".title p", { x: 100, opacity: 0, duration: 0.8 }, "-=0.4")
  .from(".subtitle h3", { x: -100, opacity: 0, duration: 0.8 }, "-=0.6");

// =====================
//  MASTER TIMELINE
// =====================
const master = gsap.timeline();
const loaderTl = loaderAnimation();

if (loaderTl) {
  master
    .add(loaderTl)
    .to(".loader", { opacity: 0, duration: 0.5 }, "-=0.2")
    .set(".loader", { display: "none" })
    .add(heroTl, "-=0.3");
} else {
  master.add(heroTl);
}

// =====================
//  PAGE 2 ANIMATION
// =====================
gsap.from(".section_title, .section_desc, .spec_item", {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".page_2",
    start: "top 75%"
  }
});

gsap.from(".spec_fill", {
  scaleX: 0,
  duration: 1.5,
  stagger: 0.2,
  transformOrigin: "left",
  scrollTrigger: {
    trigger: ".tech_specs",
    start: "top 80%"
  }
});

// =====================
//  PAGE 3 SCROLL TEXT
// =====================
gsap.to(".pages_3 .wrapper h1", {
  xPercent: -73,
  ease: "none",
  scrollTrigger: {
    trigger: ".pages_3",
    start: "top top",
    end: "+=220%",
    scrub: 2,
    pin: true,
    anticipatePin: 1
  }
});

//=======================
// PAGE 3 IMAGE ANIMATION
//=======================

gsap.to(".page_3_title img", {
  scale: 2.35,
  ease: "power1.inOut",
  scrollTrigger: {
    trigger: ".pages_3",
    start: "top bottom",
    end: "bottom top",
    scrub: 5
  }
});

// =====================
//  IMAGE SCALE (PAGE 2)
// =====================
gsap.to(".page_2_img", {
  scale: 0.85,
  ease: "power1.inOut",
  scrollTrigger: {
    trigger: ".page_2",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5
  }
});

// =====================
//  LETTER HOVER EFFECT
// =====================
const batmanText = document.querySelector(".imgDiv h1");
const darkKnightText = document.querySelector(".title p");

if (batmanText && darkKnightText) {
  const letters = batmanText.textContent.split("");

  batmanText.innerHTML = letters.map(char =>
    char === " " ? " " : `<span class="letter">${char}</span>`
  ).join("");

  batmanText.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("letter")) {
      e.target.classList.add("hover");
      darkKnightText.classList.add("active");
    }
  });

  batmanText.addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("letter")) {
      e.target.classList.remove("hover");
      darkKnightText.classList.remove("active");
    }
  });
}

// =====================
//  BOX STACK SCROLL
// =====================
const stackWrapper =
  document.querySelector(".stack-wrapper");

if (stackWrapper) {
  const boxes = stackWrapper.querySelectorAll(".box");
  const sections = stackWrapper.querySelectorAll(".stack-section");

  if (boxes.length) {
    // z-index layering
    sections.forEach((sec, i) => {
      gsap.set(sec, { zIndex: i + 1 });
    });

    const stackTl = gsap.timeline({
      scrollTrigger: {
        trigger: stackWrapper,
        start: "top top",
        end: `+=${boxes.length * 400}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    boxes.forEach((box, i) => {
      // ══════════════════════════════════════
      //  BOX 1 — Unique "Vigilante Premiere" 
      //  Scroll-animated cinematic reveal
      // ══════════════════════════════════════
      if (i === 0) {
        stackTl.set(box, { y: 0, rotate: 0, scale: 1, opacity: 1 }, 0);

        const b1Elements = box.querySelectorAll("[data-b1-anim]");
        // Initially hide all b1 animated elements
        gsap.set(b1Elements, { opacity: 0 });

        // ── Phase 1: Metadata slides in from left ──
        const meta = box.querySelector(".b1-meta");
        if (meta) stackTl.fromTo(meta,
          { opacity: 0, x: -60, letterSpacing: "0.5em" },
          { opacity: 1, x: 0, letterSpacing: "0.25em", duration: 0.3, ease: "power3.out" }, 0.05);

        // ── Phase 2: Title words cascade up with skew ──
        const theWord = box.querySelector(".b1-the");
        const darkWord = box.querySelector(".b1-dark");
        const knightWord = box.querySelector(".b1-knight");

        if (theWord) stackTl.fromTo(theWord,
          { opacity: 0, y: 80, skewY: 6 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.25, ease: "power4.out" }, 0.12);

        if (darkWord) stackTl.fromTo(darkWord,
          { opacity: 0, y: 120, skewY: 8 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.35, ease: "power4.out" }, 0.18);

        if (knightWord) stackTl.fromTo(knightWord,
          { opacity: 0, y: 120, skewY: 8 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.35, ease: "power4.out" }, 0.25);

        // ── Phase 3: Subtitle ──
        const sub = box.querySelector(".b1-sub");
        if (sub) stackTl.fromTo(sub,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }, 0.35);

        // ── Phase 4: Description paragraph ──
        const desc = box.querySelector(".b1-desc");
        if (desc) stackTl.fromTo(desc,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }, 0.4);

        // ── Phase 5: CTA button glows in ──
        const cta = box.querySelector(".b1-cta");
        if (cta) stackTl.fromTo(cta,
          { opacity: 0, x: -20, boxShadow: "0 0 0px rgba(139,0,0,0)" },
          { opacity: 1, x: 0, boxShadow: "0 0 25px rgba(139,0,0,0.15)", duration: 0.25, ease: "power2.out" }, 0.48);

        // ── Phase 6: Batman image reveals ──
        const batman = box.querySelector(".b1-batman");
        if (batman) stackTl.fromTo(batman,
          { opacity: 0, scale: 0.7, y: 60 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.15);

        // ── Phase 7: Tech ring fades & rotates in ──
        const ring = box.querySelector(".b1-ring");
        if (ring) stackTl.fromTo(ring,
          { opacity: 0, scale: 0.6, rotation: -30 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: "power2.out" }, 0.1);

        // ── Phase 8: Index number ──
        const idx = box.querySelector(".b1-index");
        if (idx) stackTl.fromTo(idx,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.2);

        // ── Phase 9: Quote drifts in from right ──
        const quoteWrap = box.querySelector(".b1-quote-wrap");
        if (quoteWrap) stackTl.fromTo(quoteWrap,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, 0.45);

        // ── Phase 10: Slide indicator ──
        const slide = box.querySelector(".b1-slide");
        if (slide) stackTl.fromTo(slide,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }, 0.55);

      } else {
        // ══════════════════════════════════════
        //  BOXES 2, 3, 4 — Original stacking
        // ══════════════════════════════════════
        let enterTime = i * 0.7;

        // Disproportionately increase scroll time for box 3 by delaying box 4
        if (i === 3) {
            enterTime += 1.5;
        }

        // Slide in from bottom
        stackTl.fromTo(
          box,
          { y: 900, rotate: 30, scale: 0.9, opacity: 1 },
          { y: 0, rotate: 0, scale: 1, opacity: 1, ease: "none" },
          enterTime
        );

        // Dim previous box
        stackTl.to(
          boxes[i - 1],
          {
            scale: 0.92,
            opacity: 0.4,
            filter: "brightness(0.4)",
            ease: "none"
          },
          enterTime
        );

        // ── Generic content reveal for boxes 2-4 ──
        const revealTime = enterTime + 0.35;

        const label = box.querySelector(".box-label");
        const title = box.querySelector(".box-title");
        const line = box.querySelector(".box-line");
        const boxDesc = box.querySelector(".box-desc");
        const tags = box.querySelector(".box-tags");
        const emblem = box.querySelector(".bat-emblem");
        const b4quote = box.querySelector(".box4-quote");
        const beam = box.querySelector(".box4-beam");

        if (label) stackTl.fromTo(label,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }, revealTime);

        if (title && !title.classList.contains("box4-hero")) {
          stackTl.fromTo(title,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, revealTime + 0.05);
        }

        if (line) stackTl.fromTo(line,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.2, ease: "power2.out" }, revealTime + 0.1);

        if (boxDesc) stackTl.fromTo(boxDesc,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, revealTime + 0.12);

        if (tags) stackTl.fromTo(tags,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, revealTime + 0.25);

        // Bar fills (Box 2)
        const barFills = box.querySelectorAll(".bar-fill");
        barFills.forEach((fill, fi) => {
          const w = fill.dataset.w || 80;
          gsap.set(fill, { width: "0%" });
          stackTl.to(fill, {
            width: w + "%", duration: 0.3, ease: "power2.out"
          }, revealTime + 0.15 + fi * 0.06);
        });

        // Box 3 specials
        if (i === 2) {
          const letters = box.querySelectorAll(".vert-letter");
          if (letters.length) {
            stackTl.fromTo(letters,
              { opacity: 0, x: -60, scale: 0.7, color: "rgba(100,100,100,0.5)", textShadow: "0 0 50px rgba(255,255,255,0.5)" },
              { opacity: 1, x: 0, scale: 1, color: "rgba(255,255,255,0.95)", textShadow: "0 0 20px rgba(255,255,255,0.2)", duration: 0.5, stagger: 0.15, ease: "power4.out" },
              revealTime
            );
          }
        }

        // Box 4 specials
        if (i === 3) {
          const chars = box.querySelectorAll(".b4-char");
          if (chars.length) {
            stackTl.fromTo(chars,
              { opacity: 0, y: 120, rotationX: -90, z: -250, scale: 0.3, filter: "blur(10px)" },
              { opacity: 1, y: 0, rotationX: 0, z: 0, scale: 1, filter: "blur(0px)", duration: 0.8, stagger: { amount: 0.8, from: "random" }, ease: "back.out(2)" },
              revealTime
            );
          }
        }

        if (emblem) stackTl.fromTo(emblem,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.4)" }, revealTime + 0.05);

        if (b4quote) stackTl.fromTo(b4quote,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, revealTime + 0.2);

        if (beam) stackTl.fromTo(beam,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }, revealTime);
      }
    });
  }
}
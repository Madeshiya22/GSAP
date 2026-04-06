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
    end: "bottom+=300% top",
    scrub: 2,
    pin: true
  }
});

//=======================
// PAGE 3 IMAGE ANIMATION
//=======================

gsap.to(".page_3_title img", {
  scale: 2.35,
  ease: "power1.inOut",
  scrollTrigger: {
    trigger: ".page_3",
    markers: true,
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
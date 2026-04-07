gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ smooth: true });

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


const boxes = document.querySelectorAll(".box");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".wrapper",
    start: "top top",
    end: `+=${boxes.length *100}%`, // 🔥 extra space
    scrub: 5,
    pin: true,
    anticipatePin: 1
  }
});


boxes.forEach((box, i) => {

  tl.fromTo(box,
    {
      y: 900,
      rotate: 30,
      scale: 0.9
    },
    {
      y: 0,
      rotate: 0,
      scale: 1,
      ease: "none"
    },
    i * 1 // 🔥 spacing bada
  );

  if (i > 0) {
    tl.to(boxes[i - 1],
      {
        scale: 0.92,
        opacity: 0.6,
        ease: "none"
      },
      i * 1.5
    );
  }

});
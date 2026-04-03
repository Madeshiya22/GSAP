window.addEventListener("mousemove", (e) => {
  gsap.to(".cursorinner", {
    x: e.clientX,
    y: e.clientY,
    ease: "power2.inout",
    stagger: 0.05,
    duration: 0.5,
  });
});

const imgContainers = document.querySelectorAll(".imgContainer");

imgContainers.forEach((container) => {
  const text = container.querySelector(".text");

  container.addEventListener("mouseenter", () => {
    gsap.to(container, {
      flexGrow: 5,
      duration: 0.5,
      ease: "power2.inout",
    });

    gsap.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.inout",
    });
  });

  container.addEventListener("mouseleave", () => {
    gsap.to(container, {
      flexGrow: 1,
      duration: 0.5,
      ease: "power2.inout",
    });

    gsap.to(text, {
      opacity: 0,
      y: 100,
      duration: 0.5,
      ease: "power2.inout",
    });
  });
});

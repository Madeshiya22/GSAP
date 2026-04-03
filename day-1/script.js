
// gsap.to(".box", {
//     x: 1000,
//     duration: 2,
//     ease: "power1.inOut",
//     repeat: -1,
//     delay: 1,
//     yoyo: true,
//     rotation: 360,
//     scale: 1.5,
//     opacity: 0.8,
//     backgroundColor: "#ff6b6b",
//     borderRadius: "50%",
//     transformOrigin: "center center",
//     onRepeat: () => console.log("Animation repeated!")
// });

// gsap.from(".box", {
//     y: -200,
//     duration: 1,
//     ease: "bounce.out",
//     delay: 0.5,
//     stagger: 0.2
// });

// gsap.fromTo( ".box",
//   {
//      x: -200, 
//     opacity: 0 ,
//     repeat: -1,
// },
//   {
//     x: 1000,
//     opacity: 1,
//     duration: 2,
//     ease: "power2.out",
//     repeat:-1,
//     yoyo: true,
//     delay: 0.5,
//     stagger: 0.3,
//     backgroundColor: "#1e90ff",
//     borderRadius: "20px",
//     scale: 0.2,
//     rotation:360,

//   },
// );


// gsap.to(".box", {
//     x: 1000,
//     duration: 2,
//     ease: "power1.inOut",
//     repeat: -1,
// });

function applyHoverEffect(id) {
  const el = document.getElementById(id);
  const text = el.innerText;

  el.innerHTML = text
    .split("")
    .map(letter =>
      letter === " " ? " " : `<span>${letter}</span>`
    )
    .join("");
}

applyHoverEffect("heroText");
applyHoverEffect("devText");

gsap.fromTo('.navbar-container',{
    y: -100,
    opacity: 0,
},{
    y: 0,
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
})

gsap.fromTo('.hero',{
    y: 50,
    opacity: 0,
},{
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
    delay: 0.5,
})

gsap.fromTo('.hero_1 ',{
    y: 50,
    opacity: 0,
    stagger: 0.5,
},{
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
    delay: 1,
    stagger: 1,
})
gsap.fromTo('.hero_1 h2',{
    y: 50,
    opacity: 0,
},{
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power2.out",
    delay: 1.5,
    stagger: 0.5,
})
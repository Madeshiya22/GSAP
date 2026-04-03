// const tl = gsap.timeline();
// tl.to(".box-1", {
//   x: 200,
//   duration: 1,
// })
//   .to(".box-2", {
//     x: 200,
//     duration: 1,
//   })
//   .to(".box-3", {
//     x: 200,
//     duration: 1,
//   },'<')
//   .to(".box-4", {
//     x: 200,
//     duration: 1,
//   });

// tl.to(".box-1", {
//   x: 200,
//   duration: 1,
// })
//   .to(".box-2", {
//     x: 200,
//     duration: 1,
//   })
//   .to(".box-3", {
//     x: 200,
//     duration: 1,
//   },'<0.1')  // iska mtlb ye hai ki box-3 animation start hogi jab box-2 animation 0.1 second ke liye start hogi
//   .to(".box-4", {
//     x: 200,
//     duration: 1,
//   });

//   tl.to(".box-1", {
//   x: 200,
//   duration: 1,
// },"t")
//   .to(".box-2", {
//     x: 200,
//     duration: 1,
//   })
//   .to(".box-3", {
//     x: 200,
//     duration: 1,
//   })
//   .to(".box-4", {
//     x: 200,
//     duration: 1,
//   },"t");

//   tl.to(".box-1", {
//   x: 200,
//   duration: 1,
// })
//   .to(".box-2", {
//     x: 200,
//     duration: 1,
//   }, '-=0.5')
//   .to(".box-3", {
//     x: 200,
//     duration: 1,
//   })
//   .to(".box-4", {
//     x: 200,
//     duration: 1,
//   });

let play = document.querySelector(".play");
let pause = document.querySelector(".pause");
let reverse = document.querySelector(".reverse");
let restart = document.querySelector(".restart");
let seek = document.querySelector(".seek");
let speed = document.querySelector(".speed");
let progress = document.querySelector(".progress");

const tl = gsap.timeline({ paused: true });

tl.to(".box-1", {
  x: 500,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
})
.to(".box-2", {
    x: 500,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "bounce.inOut",
})
.to(".box-3", {
    x: 500,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "power92.inOut",
  })
  .to(
    ".box-4",
    {
      x: 500,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "elastic.inOut(1, 0.3)",
    },
    "a",
  );

play.addEventListener("click", () => {
  tl.play();
});

pause.addEventListener("click", () => {
  tl.pause();
});
reverse.addEventListener("click", () => {
  tl.reverse();
});
restart.addEventListener("click", () => {
  tl.restart();
});
seek.addEventListener("click", () => {
  tl.seek("a");
});
speed.addEventListener("click", () => {
  tl.timeScale(5);
});
progress.addEventListener("click", () => {
  tl.progress(1);
});

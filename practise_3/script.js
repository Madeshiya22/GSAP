
gsap.registerPlugin(ScrollTrigger);



function loaderAnimation() {
	const count = document.querySelector(".count");
	const fill = document.querySelector(".length .fill");

	if (!count || !fill) {
		return null;
	}

	return gsap.timeline()
		.to(".count", {
			innerText: 100,
			duration: 3,
			snap: { innerText: 1 },
			ease: "power1.inOut",
			onUpdate: function () {
				const currentVal = Number(count.innerText);
				const intensity = (currentVal / 100);

				count.innerText = currentVal + " %";
			}
		}, 0)
		.to(".length .fill", {
			width: "100%",
			opacity: 1,
			duration: 3,
			ease: "power1.inOut"
		}, 0);
}

function titleAnimation() {
	return gsap.timeline()
		.from(".imgDiv h1", {
			y: 100,
			opacity: 0,
			duration: 0.8,
			ease: "power2.out"
		})
		.from(".title p", {
			x: 100,
			opacity: 0,
			duration: 0.8,
			ease: "power2.out"
		}, "-=0.4")
		.from(".subtitle h3", {
			x: -100,
			opacity: 0,
			duration: 0.8,
			ease: "power2.out"
		}, "-=0.6");
}

function imageAnimation() {
	return gsap.timeline().from(".imgDiv img", {
		y: 100,
		opacity: 0,
		duration: 1,
		ease: "power2.out"
	});
}

const master = gsap.timeline({ defaults: { ease: "power2.out" } });
const loaderTl = loaderAnimation();

if (loaderTl) {
	master.add(loaderTl, 0)
		.to(".loader", {
			opacity: 0,
			duration: 0.5,
			ease: "power2.inOut"
		}, 2.8)
		.set(".loader", { display: "none" })
		.add(imageAnimation(), "-=0.5")
		.add(titleAnimation(), "-=0.5");
} else {
	master.add(imageAnimation(), 0)
		.add(titleAnimation(), "-=0.3");
}




//     gsap.to(".pages_2 .box_2", {
//         scaleY: 2.5,
//         opacity: 1,
//         y: -100,
//         // filter: "blur(10px)",
//         duration: 0.8,
//         scrollTrigger: {
//             trigger: ".pages_2",
//             start: "top 60%",
//             end: "top -50%",
//             markers: true,
//             scrub: 1.5,
//             ease: "power2.inOut",
//         }
//     });


gsap.to(".pages_3 .wrapper h1", {
	xPercent: -63,
	ease: "none",
	scrollTrigger: {
		trigger: ".pages_3",
		scroller: "body",
		markers: true,
		start: "top 0%",
		end: "top -300%",
		scrub: 5,
		pin: true,
	}
});

const batmanText = document.querySelector(".imgDiv h1");
const darkKnightText = document.querySelector(".title p");

if (batmanText && darkKnightText) {
	const text = batmanText.textContent;

	const fragment = document.createDocumentFragment();

	[...text].forEach(char => {
		if (char === " ") {
			fragment.append(" ");
		} else {
			const span = document.createElement("span");
			span.textContent = char;
			span.className = "letter";
			fragment.appendChild(span);
		}
	});

	batmanText.textContent = "";
	batmanText.appendChild(fragment);

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
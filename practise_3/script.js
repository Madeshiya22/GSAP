
gsap.registerPlugin(ScrollTrigger);

// Loader Animation


function loaderAnimation() {
    const count = document.querySelector(".count");
    const fill = document.querySelector(".length .fill");
    
    return gsap.timeline()
        .to(".count", {
            innerText: 100,
            duration: 3,
            snap: { innerText: 1 },
            ease: "power1.inOut",
            onUpdate: function() {
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
        .from(".title h1", {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        })
        .from(".subtitle h3", {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.3
        });
}

function imageAnimation() {
    return gsap.timeline().from(".imagediv img", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
}

const master = gsap.timeline({ defaults: { ease: "power2.out" } });

master.add(loaderAnimation(), 0)
    .to(".loader", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
    }, 2.8)
    .set(".loader", { display: "none" })
    .add(imageAnimation(), "-=0.5")
    .add(titleAnimation(), "-=0.5");




    gsap.to(".pages_2 .box_2", {
        scale: 0.15,
        // rotation: 360,
        opacity: 0.3,
        y: 100,
        filter: "blur(10px)",
        duration: 2,
        scrollTrigger: {
            trigger: ".pages_2",
            start: "top 40%",
            end: "top -50%",
            markers: true,
            scrub: 1.5,
            ease: "power2.inOut",
        }
    });
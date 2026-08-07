"use strict";

/* ==========================================================
   CIVICAI PLATFORM
   Version : 1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializePipeline();

    initializePlatformCards();

    initializePlatformReveal();

});

/* ==========================================================
   PIPELINE
========================================================== */

function initializePipeline(){

    const steps = document.querySelectorAll(

        ".pipeline-step"

    );

    if(!steps.length) return;

    steps.forEach((step,index)=>{

        step.style.transitionDelay =

        `${index * 80}ms`;

    });

}

/* ==========================================================
   CARD INTERACTION
========================================================== */

function initializePlatformCards(){

    const cards = document.querySelectorAll(

        ".platform-card"

    );

    cards.forEach(card=>{

        const glow = document.createElement("div");

        glow.className = "platform-glow";

        card.appendChild(glow);

        card.addEventListener(

            "mousemove",

            e=>{

                const rect =

                card.getBoundingClientRect();

                const x =

                e.clientX - rect.left;

                const y =

                e.clientY - rect.top;

                glow.style.left =

                x + "px";

                glow.style.top =

                y + "px";

                const rotateY =

                ((x / rect.width)-.5)*10;

                const rotateX =

                ((y / rect.height)-.5)*-10;

                card.style.transform =

                `perspective(1400px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;

            }

        );

        card.addEventListener(

            "mouseleave",

            ()=>{

                card.style.transform =

                "perspective(1400px) rotateX(0deg) rotateY(0deg)";

            }

        );

    });

}

/* ==========================================================
   REVEAL
========================================================== */

function initializePlatformReveal(){

    if(typeof gsap==="undefined") return;

    gsap.registerPlugin(

        ScrollTrigger

    );

    gsap.from(

        ".platform-card",

        {

            opacity:0,

            y:90,

            stagger:.18,

            duration:1,

            ease:"power4.out",

            scrollTrigger:{

                trigger:".platform",

                start:"top 70%"

            }

        }

    );

    gsap.from(

        ".pipeline-step",

        {

            opacity:0,

            y:50,

            stagger:.12,

            duration:.8,

            ease:"power3.out",

            scrollTrigger:{

                trigger:".pipeline",

                start:"top 75%"

            }

        }

    );

}

/* ==========================================================
   FUTURE DATA API
========================================================== */

/*
    Future implementation

    async function loadPlatform(){

        const response = await fetch("/api/platform");

        const data = await response.json();

        renderPlatform(data);

    }

*/
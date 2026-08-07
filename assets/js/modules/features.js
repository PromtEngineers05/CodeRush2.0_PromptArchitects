"use strict";

/* ==========================================================
   CIVICAI FEATURES
   Version : 1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeFeatureCards();

    initializeFeatureReveal();

});

/* ==========================================================
   FEATURE CARD INTERACTION
========================================================== */

function initializeFeatureCards(){

    const cards = document.querySelectorAll(".feature-card");

    if(!cards.length) return;

    cards.forEach(card=>{

        const glow = document.createElement("div");

        glow.className = "feature-glow";

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

                glow.style.left = x + "px";

                glow.style.top = y + "px";

                const rotateY =

                ((x/rect.width)-.5)*12;

                const rotateX =

                ((y/rect.height)-.5)*-12;

                card.style.transform =

                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;

            }

        );

        card.addEventListener(

            "mouseleave",

            ()=>{

                card.style.transform =

                "perspective(1200px) rotateX(0deg) rotateY(0deg)";

            }

        );

    });

}

/* ==========================================================
   GSAP REVEAL
========================================================== */

function initializeFeatureReveal(){

    if(typeof gsap==="undefined") return;

    gsap.registerPlugin(

        ScrollTrigger

    );

    gsap.from(

        ".feature-card",

        {

            opacity:0,

            y:80,

            stagger:.18,

            duration:1,

            ease:"power4.out",

            scrollTrigger:{

                trigger:".features",

                start:"top 70%"

            }

        }

    );

}
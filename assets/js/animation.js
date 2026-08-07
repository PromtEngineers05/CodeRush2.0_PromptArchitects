"use strict";

/* ==========================================================
   CIVICAI ANIMATION ENGINE
   Version : 1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeRevealAnimations();

    initializeMagneticButtons();

    initializeHoverCards();

    initializePageFade();

});

/* ==========================================================
   REVEAL ANIMATION
========================================================== */

function initializeRevealAnimations(){

    if(typeof gsap === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const elements = [

        ".section-title",

        ".section-subtitle",

        ".feature-card",

        ".dashboard-card",

        ".glass",

        ".card",

        ".hero-stat"

    ];

    elements.forEach(selector=>{

        gsap.utils.toArray(selector).forEach(item=>{

            gsap.from(

                item,

                {

                    opacity:0,

                    y:60,

                    duration:.9,

                    ease:"power3.out",

                    scrollTrigger:{

                        trigger:item,

                        start:"top 85%",

                        toggleActions:

                        "play none none reverse"

                    }

                }

            );

        });

    });

}

/* ==========================================================
   STAGGER GROUP
========================================================== */

gsap.utils.toArray(

    ".stagger-group"

).forEach(group=>{

    gsap.from(

        group.children,

        {

            opacity:0,

            y:50,

            stagger:.12,

            duration:.8,

            ease:"power3.out",

            scrollTrigger:{

                trigger:group,

                start:"top 80%"

            }

        }

    );

});

/* ==========================================================
   MAGNETIC BUTTONS
========================================================== */

function initializeMagneticButtons(){

    const buttons = document.querySelectorAll(

        ".primary-btn,.secondary-btn,.glass-btn"

    );

    buttons.forEach(button=>{

        button.addEventListener(

            "mousemove",

            e=>{

                const rect =

                button.getBoundingClientRect();

                const x =

                e.clientX -

                rect.left -

                rect.width/2;

                const y =

                e.clientY -

                rect.top -

                rect.height/2;

                gsap.to(

                    button,

                    {

                        x:x*.18,

                        y:y*.18,

                        duration:.3,

                        ease:"power2.out"

                    }

                );

            }

        );

        button.addEventListener(

            "mouseleave",

            ()=>{

                gsap.to(

                    button,

                    {

                        x:0,

                        y:0,

                        duration:.45,

                        ease:"elastic.out(1,.4)"

                    }

                );

            }

        );

    });

}

/* ==========================================================
   HOVER CARDS
========================================================== */

function initializeHoverCards(){

    const cards = document.querySelectorAll(

        ".dashboard-item,.feature-card,.glass"

    );

    cards.forEach(card=>{

        card.addEventListener(

            "mousemove",

            e=>{

                const rect =

                card.getBoundingClientRect();

                const x =

                e.clientX -

                rect.left;

                const y =

                e.clientY -

                rect.top;

                const rotateY =

                ((x/rect.width)-.5)*10;

                const rotateX =

                ((y/rect.height)-.5)*-10;

                gsap.to(

                    card,

                    {

                        rotateX,

                        rotateY,

                        transformPerspective:1000,

                        duration:.35,

                        ease:"power2.out"

                    }

                );

            }

        );

        card.addEventListener(

            "mouseleave",

            ()=>{

                gsap.to(

                    card,

                    {

                        rotateX:0,

                        rotateY:0,

                        duration:.5,

                        ease:"power3.out"

                    }

                );

            }

        );

    });

}

/* ==========================================================
   PAGE FADE
========================================================== */

function initializePageFade(){

    gsap.from(

        "body",

        {

            opacity:0,

            duration:.8,

            ease:"power2.out"

        }

    );

}

/* ==========================================================
   SMOOTH SECTION PARALLAX
========================================================== */

gsap.utils.toArray(

    ".parallax"

).forEach(item=>{

    gsap.to(

        item,

        {

            yPercent:20,

            ease:"none",

            scrollTrigger:{

                trigger:item,

                start:"top bottom",

                end:"bottom top",

                scrub:true

            }

        }

    );

});

/* ==========================================================
   ROTATING BLOBS
========================================================== */

gsap.utils.toArray(

    ".rotate-slow"

).forEach(item=>{

    gsap.to(

        item,

        {

            rotation:360,

            duration:40,

            repeat:-1,

            ease:"none"

        }

    );

});

/* ==========================================================
   FLOAT ELEMENTS
========================================================== */

gsap.utils.toArray(

    ".float"

).forEach(item=>{

    gsap.to(

        item,

        {

            y:-15,

            duration:3,

            repeat:-1,

            yoyo:true,

            ease:"sine.inOut"

        }

    );

});

/* ==========================================================
   TEXT SPLIT READY
========================================================== */

window.AnimationEngine = {

    reveal(element){

        gsap.from(

            element,

            {

                opacity:0,

                y:40,

                duration:.8,

                ease:"power3.out"

            }

        );

    },

    fade(element){

        gsap.from(

            element,

            {

                opacity:0,

                duration:.8

            }

        );

    }

};
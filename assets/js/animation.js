"use strict";

/* ==========================================================
   CIVICAI ANIMATION ENGINE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeReveal();

        initializeCounters();

        initializeHoverCards();

    }

);

/* ==========================================================
   REVEAL
========================================================== */

function initializeReveal(){

    const elements =

        document.querySelectorAll(

            ".reveal"

        );

    if(!elements.length) return;

    const observer =

        new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(entry.isIntersecting){

                        entry.target.classList.add(

                            "active"

                        );

                    }

                });

            },

            {

                threshold:.15

            }

        );

    elements.forEach(

        element=>observer.observe(element)

    );

}
/* ==========================================================
   COUNTER
========================================================== */

function initializeCounters(){

    const counters =

        document.querySelectorAll(

            "[data-counter]"

        );

    counters.forEach(counter=>{

        animateCounter(counter);

    });

}

function animateCounter(element){

    const target =

        Number(

            element.dataset.counter

        );

    let value = 0;

    const speed =

        Math.max(

            1,

            Math.floor(

                target/120

            )

        );

    const timer =

        setInterval(()=>{

            value += speed;

            if(value >= target){

                value = target;

                clearInterval(timer);

            }

            element.textContent =

                value.toLocaleString();

        },16);

}
/* ==========================================================
   HOVER
========================================================== */

function initializeHoverCards(){

    const cards =

        document.querySelectorAll(

            ".card"

        );

    cards.forEach(card=>{

        card.addEventListener(

            "mousemove",

            event=>{

                const rect =

                    card.getBoundingClientRect();

                const x =

                    event.clientX - rect.left;

                const y =

                    event.clientY - rect.top;

                card.style.setProperty(

                    "--mouse-x",

                    `${x}px`

                );

                card.style.setProperty(

                    "--mouse-y",

                    `${y}px`

                );

            }

        );

    });

}
/* ==========================================================
   PUBLIC API
========================================================== */

window.CivicAnimations={

    reveal:initializeReveal,

    counters:initializeCounters

};
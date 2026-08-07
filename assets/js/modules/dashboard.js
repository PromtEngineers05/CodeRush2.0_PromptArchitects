"use strict";

/* ==========================================================
   CIVICAI DASHBOARD
   Version : 1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});

/* ==========================================================
   INITIALIZE
========================================================== */

function initializeDashboard(){

    initializeDashboardCards();

    initializeModuleStatus();

    initializeDashboardReveal();

    initializeFutureChart();

    initializeFutureMap();

}

/* ==========================================================
   CARD INTERACTION
========================================================== */

function initializeDashboardCards(){

    const cards = document.querySelectorAll(

        ".dashboard-panel"

    );

    cards.forEach(card=>{

        const glow = document.createElement("div");

        glow.className = "dashboard-glow";

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

                ((x / rect.width)-.5)*8;

                const rotateX =

                ((y / rect.height)-.5)*-8;

                card.style.transform =

                `perspective(1400px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)`;

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
   MODULE STATUS
========================================================== */

function initializeModuleStatus(){

    const modules = document.querySelectorAll(

        ".module-status"

    );

    modules.forEach(module=>{

        gsap.to(

            module,

            {

                scale:1.2,

                repeat:-1,

                duration:1.2,

                yoyo:true,

                ease:"power1.inOut"

            }

        );

    });

}

/* ==========================================================
   GSAP
========================================================== */

function initializeDashboardReveal(){

    if(typeof gsap==="undefined") return;

    gsap.registerPlugin(

        ScrollTrigger

    );

    gsap.from(

        ".dashboard-panel",

        {

            opacity:0,

            y:90,

            stagger:.18,

            duration:1,

            ease:"power4.out",

            scrollTrigger:{

                trigger:".dashboard",

                start:"top 70%"

            }

        }

    );

}

/* ==========================================================
   FUTURE CHART
========================================================== */

function initializeFutureChart(){

    /*
        Future

        Chart.js

        fetch("/api/dashboard")

        Build charts dynamically

    */

}

/* ==========================================================
   FUTURE MAP
========================================================== */

function initializeFutureMap(){

    /*
        Future

        Leaflet

        or

        Mapbox GL

        Fetch GeoJSON

        Display complaints

        Display workers

        Display AI risk zones

    */

}
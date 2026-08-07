"use strict";

/* ==========================================================
   CIVICAI HERO
   Version : 1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeHero();

});

function initializeHero(){

    initializeParticles();

    initializeParallax();

    initializeCounters();

    initializeHeroAnimation();

}

/* ==========================================================
   PARTICLE NETWORK
========================================================== */

function initializeParticles(){

    const canvas = document.getElementById("hero-canvas");

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    let particles = [];

    let mouse = {

        x:null,

        y:null,

        radius:180

    };

    function resize(){

        canvas.width = canvas.offsetWidth;

        canvas.height = canvas.offsetHeight;

    }

    resize();

    window.addEventListener(

        "resize",

        resize

    );

    class Particle{

        constructor(){

            this.reset();

        }

        reset(){

            this.x = Math.random()*canvas.width;

            this.y = Math.random()*canvas.height;

            this.radius = Math.random()*2+1;

            this.speedX = (Math.random()-.5)*0.4;

            this.speedY = (Math.random()-.5)*0.4;

        }

        update(){

            this.x += this.speedX;

            this.y += this.speedY;

            if(this.x < 0 || this.x > canvas.width){

                this.speedX *= -1;

            }

            if(this.y < 0 || this.y > canvas.height){

                this.speedY *= -1;

            }

            if(mouse.x){

                const dx = this.x - mouse.x;

                const dy = this.y - mouse.y;

                const distance = Math.sqrt(dx*dx + dy*dy);

                if(distance < mouse.radius){

                    this.x += dx * .01;

                    this.y += dy * .01;

                }

            }

        }

        draw(){

            ctx.beginPath();

            ctx.arc(

                this.x,

                this.y,

                this.radius,

                0,

                Math.PI*2

            );

            ctx.fillStyle="rgba(79,124,255,.8)";

            ctx.fill();

        }

    }

    for(let i=0;i<120;i++){

        particles.push(

            new Particle()

        );

    }

    function connect(){

        for(let a=0;a<particles.length;a++){

            for(let b=a;b<particles.length;b++){

                const dx = particles[a].x-particles[b].x;

                const dy = particles[a].y-particles[b].y;

                const distance = Math.sqrt(dx*dx+dy*dy);

                if(distance < 130){

                    ctx.beginPath();

                    ctx.moveTo(

                        particles[a].x,

                        particles[a].y

                    );

                    ctx.lineTo(

                        particles[b].x,

                        particles[b].y

                    );

                    ctx.strokeStyle=

                    `rgba(79,124,255,${
                        1-distance/130
                    })`;

                    ctx.lineWidth=.6;

                    ctx.stroke();

                }

            }

        }

    }

    function animate(){

        ctx.clearRect(

            0,

            0,

            canvas.width,

            canvas.height

        );

        particles.forEach(p=>{

            p.update();

            p.draw();

        });

        connect();

        requestAnimationFrame(

            animate

        );

    }

    animate();

    window.addEventListener(

        "mousemove",

        e=>{

            const rect=

            canvas.getBoundingClientRect();

            mouse.x=e.clientX-rect.left;

            mouse.y=e.clientY-rect.top;

        }

    );

    window.addEventListener(

        "mouseleave",

        ()=>{

            mouse.x=null;

            mouse.y=null;

        }

    );

}

/* ==========================================================
   PARALLAX
========================================================== */

function initializeParallax(){

    const visual =

    document.querySelector(".hero-visual");

    if(!visual) return;

    window.addEventListener(

        "mousemove",

        e=>{

            const x=

            (window.innerWidth/2-e.clientX)/35;

            const y=

            (window.innerHeight/2-e.clientY)/35;

            visual.style.transform=

            `translate(${x}px,${y}px)`;

        }

    );

}
/* ==========================================================
   HERO GSAP ANIMATION
========================================================== */

function initializeHeroAnimation(){

    if(typeof gsap === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({

        defaults:{

            ease:"power4.out"

        }

    });

    tl.from(

        ".hero-badge",

        {

            opacity:0,

            y:40,

            duration:.8

        }

    )

    .from(

        ".hero-title",

        {

            opacity:0,

            y:60,

            duration:1

        },

        "-=.4"

    )

    .from(

        ".hero-description",

        {

            opacity:0,

            y:40,

            duration:.8

        },

        "-=.5"

    )

    .from(

        ".hero-buttons",

        {

            opacity:0,

            y:40,

            duration:.8

        },

        "-=.5"

    )

    .from(

        ".hero-stat",

        {

            opacity:0,

            y:30,

            stagger:.12,

            duration:.7

        },

        "-=.4"

    )

    .from(

        ".dashboard-card",

        {

            opacity:0,

            scale:.92,

            rotate:4,

            duration:1

        },

        "-=.9"

    )

    .from(

        ".floating-card",

        {

            opacity:0,

            y:25,

            stagger:.15,

            duration:.7

        },

        "-=.7"

    );

}

/* ==========================================================
   COUNTERS
========================================================== */

function initializeCounters(){

    const numbers =

    document.querySelectorAll(

        ".hero-stat h2"

    );

    if(!numbers.length) return;

    const observer =

    new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting)

                    return;

                animateCounter(

                    entry.target

                );

                observer.unobserve(

                    entry.target

                );

            });

        },

        {

            threshold:.5

        }

    );

    numbers.forEach(item=>{

        observer.observe(item);

    });

}

function animateCounter(element){

    const original =

    element.textContent.trim();

    const number =

    parseInt(original.replace(/\D/g,""));

    const suffix =

    original.replace(/[0-9]/g,"");

    if(isNaN(number)) return;

    let current = 0;

    const duration = 1800;

    const step = Math.max(

        1,

        Math.ceil(

            number /

            (duration/16)

        )

    );

    const timer = setInterval(()=>{

        current += step;

        if(current >= number){

            current = number;

            clearInterval(timer);

        }

        element.textContent =

        current + suffix;

    },16);

}

/* ==========================================================
   FLOATING DASHBOARD
========================================================== */

const dashboard =

document.querySelector(

    ".dashboard-card"

);

if(dashboard){

    gsap.to(

        dashboard,

        {

            y:-18,

            duration:3,

            repeat:-1,

            yoyo:true,

            ease:"sine.inOut"

        }

    );

}

gsap.utils.toArray(

    ".floating-card"

).forEach(

    (card,index)=>{

        gsap.to(

            card,

            {

                y:-

                (15 + index*8),

                duration:

                2.8 + index,

                repeat:-1,

                yoyo:true,

                ease:"sine.inOut"

            }

        );

    }

);

/* ==========================================================
   PARALLAX SCROLL
========================================================== */

gsap.to(

    ".hero-background",

    {

        yPercent:15,

        ease:"none",

        scrollTrigger:{

            trigger:".hero",

            start:"top top",

            end:"bottom top",

            scrub:true

        }

    }

);

/* ==========================================================
   HERO FADE
========================================================== */

gsap.to(

    ".hero-content",

    {

        opacity:0,

        y:-100,

        ease:"none",

        scrollTrigger:{

            trigger:".hero",

            start:"65% top",

            end:"bottom top",

            scrub:true

        }

    }

);

gsap.to(

    ".hero-visual",

    {

        opacity:0,

        y:100,

        ease:"none",

        scrollTrigger:{

            trigger:".hero",

            start:"65% top",

            end:"bottom top",

            scrub:true

        }

    }

);
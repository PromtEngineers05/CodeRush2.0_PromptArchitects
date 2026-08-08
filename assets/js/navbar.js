"use strict";

/* ==========================================================
   CIVICAI NAVBAR
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeNavbar();

        initializeSmoothScroll();

        initializeScrollSpy();

    }

);

/* ==========================================================
   ELEMENTS
========================================================== */

let navbar;
let navLinks;
let menuButton;
let mobileMenu;

/* ==========================================================
   NAVBAR
========================================================== */

function initializeNavbar(){

    navbar = document.querySelector(".navbar");
    navLinks = document.querySelectorAll(".nav-link");
    menuButton = document.querySelector(".menu-toggle");
    mobileMenu = document.querySelector(".nav-links");
    if (!navbar || navbar.dataset.initialized) return;
    navbar.dataset.initialized = "true";

    window.addEventListener(

        "scroll",

        ()=>{

            if(!navbar) return;

            if(window.scrollY>60){

                navbar.classList.add(

                    "navbar-scrolled"

                );

            }

            else{

                navbar.classList.remove(

                    "navbar-scrolled"

                );

            }

        }

    );

}
/* ==========================================================
   SMOOTH SCROLL
========================================================== */

function initializeSmoothScroll(){

    navLinks = document.querySelectorAll(".nav-link");

    if (!navLinks.length) return;

    navLinks.forEach(link=>{

        link.addEventListener(

            "click",

            event=>{

                const target=

                link.getAttribute(

                    "href"

                );

                if(

                    !target ||

                    !target.startsWith("#")

                ){

                    return;

                }

                event.preventDefault();

                document.querySelector(

                    target

                )?.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

                mobileMenu?.classList.remove(

                    "open"

                );

            }

        );

    });

}
/* ==========================================================
   SCROLL SPY
========================================================== */

function initializeScrollSpy(){

    navLinks = document.querySelectorAll(".nav-link");

    const sections=

    document.querySelectorAll(

        "section"

    );

    window.addEventListener(

        "scroll",

        ()=>{

            let current="";

            sections.forEach(section=>{

                const top=

                section.offsetTop-120;

                if(

                    scrollY>=top

                ){

                    current=

                    section.id;

                }

            });

            navLinks.forEach(link=>{

                link.classList.remove(

                    "active"

                );

                if(

                    link.getAttribute("href")

                    ===

                    "#"+current

                ){

                    link.classList.add(

                        "active"

                    );

                }

            });

        }

    );

}
/* ==========================================================
   MOBILE MENU
========================================================== */

function initializeMobileMenu(){
    menuButton = document.querySelector(".menu-toggle");
    mobileMenu = document.querySelector(".nav-links");
    if (!menuButton || !mobileMenu || menuButton.dataset.initialized) return;
    menuButton.dataset.initialized = "true";
    menuButton.addEventListener("click", () => mobileMenu.classList.toggle("open"));
}

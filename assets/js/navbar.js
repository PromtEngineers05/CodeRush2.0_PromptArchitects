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

const navbar =

document.querySelector(

    ".navbar"

);

const navLinks =

document.querySelectorAll(

    '.nav-link'

);

const menuButton =

document.querySelector(

    ".menu-toggle"

);

const mobileMenu =

document.querySelector(

    ".nav-menu"

);

/* ==========================================================
   NAVBAR
========================================================== */

function initializeNavbar(){

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

if(menuButton){

    menuButton.addEventListener(

        "click",

        ()=>{

            mobileMenu.classList.toggle(

                "open"

            );

        }

    );

}
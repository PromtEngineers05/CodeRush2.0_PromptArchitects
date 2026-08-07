"use strict";

/* ==========================================================
   NAVBAR
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");

    const menuToggle = document.getElementById("menu-toggle");

    const navLinks = document.querySelector(".nav-links");

    const links = document.querySelectorAll(".nav-link");

    /* ==========================================
       STICKY NAVBAR
    ========================================== */

    function navbarScroll(){

        if(window.scrollY > 80){

            navbar.classList.add("scrolled");

        }

        else{

            navbar.classList.remove("scrolled");

        }

    }

    navbarScroll();

    window.addEventListener(

        "scroll",

        navbarScroll

    );

    /* ==========================================
       MOBILE MENU
    ========================================== */

    menuToggle.addEventListener(

        "click",

        ()=>{

            menuToggle.classList.toggle("active");

            navLinks.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        }

    );

    /* ==========================================
       CLOSE MENU
    ========================================== */

    links.forEach(link=>{

        link.addEventListener(

            "click",

            ()=>{

                menuToggle.classList.remove("active");

                navLinks.classList.remove("active");

                document.body.classList.remove("menu-open");

            }

        );

    });

    /* ==========================================
       ACTIVE LINK
    ========================================== */

    const sections = document.querySelectorAll("section");

    function activeMenu(){

        let current = "";

        sections.forEach(section=>{

            const sectionTop =

                section.offsetTop - 140;

            const sectionHeight =

                section.offsetHeight;

            if(

                window.scrollY >= sectionTop &&

                window.scrollY <

                sectionTop + sectionHeight

            ){

                current = section.getAttribute("id");

            }

        });

        links.forEach(link=>{

            link.classList.remove("active");

            if(

                link.getAttribute("href") ===

                "#" + current

            ){

                link.classList.add("active");

            }

        });

    }

    activeMenu();

    window.addEventListener(

        "scroll",

        activeMenu

    );

    /* ==========================================
       GSAP INTRO
    ========================================== */

    if(typeof gsap !== "undefined"){

        gsap.from(

            ".navbar",

            {

                y:-100,

                opacity:0,

                duration:1,

                ease:"power4.out"

            }

        );

        gsap.from(

            ".nav-link",

            {

                y:-30,

                opacity:0,

                stagger:.08,

                delay:.25,

                duration:.7,

                ease:"power3.out"

            }

        );

        gsap.from(

            ".primary-btn",

            {

                scale:.8,

                opacity:0,

                delay:.45,

                duration:.7,

                ease:"back.out(1.7)"

            }

        );

    }

});
"use strict";

/* ==========================================================
   PERFORMANCE
========================================================== */

window.PerformanceMonitor={

    start(){

        console.time("CivicAI");

    },

    end(){

        console.timeEnd("CivicAI");

    }

};

PerformanceMonitor.start();

window.addEventListener(

    "load",

    ()=>{

        PerformanceMonitor.end();

    }

);
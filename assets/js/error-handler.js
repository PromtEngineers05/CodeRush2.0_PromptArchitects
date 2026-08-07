"use strict";

/* ==========================================================
   CIVICAI ERROR HANDLER
========================================================== */

window.addEventListener(

    "error",

    event=>{

        console.error(

            "Application Error",

            event.error

        );

    }

);

window.addEventListener(

    "unhandledrejection",

    event=>{

        console.error(

            "Promise Error",

            event.reason

        );

    }

);

/* ==========================================================
   SAFE EXECUTE
========================================================== */

window.safeExecute=function(

    callback

){

    try{

        callback();

    }

    catch(error){

        console.error(error);

    }

}
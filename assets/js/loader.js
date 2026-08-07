"use strict";

/* ==========================================================
   CIVICAI LOADER
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeLoader();

    }

);

/* ==========================================================
   LOADER
========================================================== */

function initializeLoader(){

    const loader=

        document.getElementById(

            "loader"

        );

    if(!loader) return;

    const progress=

        document.getElementById(

            "loader-progress"

        );

    const status=

        document.getElementById(

            "loader-status"

        );

    const messages=[

        "Initializing CivicAI...",

        "Loading Smart City Engine...",

        "Loading AI Vision...",

        "Preparing GIS System...",

        "Launching Platform..."

    ];

    let percent=0;

    let index=0;

    const timer=

    setInterval(()=>{

        percent++;

        if(progress){

            progress.style.width=

                percent+"%";

        }

        if(

            percent%20===0 &&

            status

        ){

            status.textContent=

            messages[index];

            index=Math.min(

                index+1,

                messages.length-1

            );

        }

        if(percent>=100){

            clearInterval(timer);

            loader.classList.add(

                "loader-hide"

            );

            setTimeout(()=>{

                loader.remove();

            },800);

        }

    },18);

}
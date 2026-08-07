"use strict";

/* ==========================================================
   CIVICAI UTILITIES
========================================================== */

window.CivicUtils = {

    qs,

    qsa,

    create,

    debounce,

    throttle,

    toast,

    formatNumber

};

/* ==========================================================
   QUERY
========================================================== */

function qs(selector,parent=document){

    return parent.querySelector(selector);

}

function qsa(selector,parent=document){

    return [...parent.querySelectorAll(selector)];

}

/* ==========================================================
   CREATE
========================================================== */

function create(tag,className=""){

    const element=document.createElement(tag);

    if(className){

        element.className=className;

    }

    return element;

}

/* ==========================================================
   FORMAT
========================================================== */

function formatNumber(value){

    return Number(value).toLocaleString();

}
/* ==========================================================
   DEBOUNCE
========================================================== */

function debounce(callback,delay=300){

    let timer;

    return(...args)=>{

        clearTimeout(timer);

        timer=setTimeout(

            ()=>callback(...args),

            delay

        );

    };

}

/* ==========================================================
   THROTTLE
========================================================== */

function throttle(callback,limit=100){

    let waiting=false;

    return(...args)=>{

        if(waiting) return;

        callback(...args);

        waiting=true;

        setTimeout(

            ()=>waiting=false,

            limit

        );

    };

}
/* ==========================================================
   TOAST
========================================================== */

function toast(

    message,

    type="success"

){

    let container=

    document.getElementById(

        "toast-container"

    );

    if(!container){

        container=create(

            "div",

            "toast-container"

        );

        container.id="toast-container";

        document.body.appendChild(

            container

        );

    }

    const toast=create(

        "div",

        `toast ${type}`

    );

    toast.textContent=message;

    container.appendChild(toast);

    requestAnimationFrame(

        ()=>toast.classList.add("show")

    );

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(

            ()=>toast.remove(),

            300

        );

    },3000);

}
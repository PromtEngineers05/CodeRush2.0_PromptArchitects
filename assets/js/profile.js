"use strict";

/* ==========================================================
   CIVICAI PROFILE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeProfile();

    }

);

/* ==========================================================
   DATA
   (Backend will replace this)
========================================================== */

const profileStats = [

    {

        title:"Complaints Submitted",

        value:"28"

    },

    {

        title:"Resolved",

        value:"24"

    },

    {

        title:"Civic Score",

        value:"945"

    },

    {

        title:"Achievements",

        value:"12"

    },

    {

        title:"City Rank",

        value:"#37"

    },

    {

        title:"Contribution",

        value:"Excellent"

    }

];

/* ==========================================================
   INIT
========================================================== */

function initializeProfile(){

    renderProfileStats();

}

/* ==========================================================
   RENDER
========================================================== */

function renderProfileStats(){

    const container =

        document.getElementById(

            "stats-grid"

        );

    if(!container) return;

    container.innerHTML="";

    profileStats.forEach(stat=>{

        container.innerHTML += `

            <div class="stat-card">

                <div class="stat-number">

                    ${stat.value}

                </div>

                <h3>

                    ${stat.title}

                </h3>

            </div>

        `;

    });

}
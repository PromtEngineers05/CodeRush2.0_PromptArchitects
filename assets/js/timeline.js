"use strict";

/* ==========================================================
   CIVICAI TIMELINE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeTimeline();

    }

);

/* ==========================================================
   TIMELINE DATA
========================================================== */

const complaintTimeline = [

    {

        time:"08:20 AM",

        title:"Complaint Registered",

        description:

        "Citizen successfully submitted a complaint with an image."

    },

    {

        time:"08:21 AM",

        title:"AI Analysis Completed",

        description:

        "CivicAI analyzed the uploaded image and identified the issue."

    },

    {

        time:"08:24 AM",

        title:"Department Assigned",

        description:

        "Road Department automatically selected."

    },

    {

        time:"08:31 AM",

        title:"Officer Accepted",

        description:

        "Complaint accepted by duty officer."

    },

    {

        time:"08:46 AM",

        title:"Worker Assigned",

        description:

        "Maintenance worker dispatched."

    },

    {

        time:"Pending",

        title:"Issue Resolved",

        description:

        "Waiting for repair completion."

    }

];

/* ==========================================================
   INIT
========================================================== */

function initializeTimeline(){

    renderTimeline();

}
/* ==========================================================
   RENDER
========================================================== */

function renderTimeline(){

    const container =

        document.getElementById(

            "timeline-container"

        );

    if(!container) return;

    container.innerHTML="";

    complaintTimeline.forEach(item=>{

        container.innerHTML += `

            <div class="timeline-card">

                <div class="timeline-dot"></div>

                <div class="timeline-time">

                    ${item.time}

                </div>

                <h3>

                    ${item.title}

                </h3>

                <p>

                    ${item.description}

                </p>

            </div>

        `;

    });

    animateTimeline();

}
/* ==========================================================
   ANIMATION
========================================================== */

function animateTimeline(){

    const cards =

        document.querySelectorAll(

            ".timeline-card"

        );

    cards.forEach(

        (

            card,

            index

        )=>{

            card.style.opacity="0";

            card.style.transform=

            "translateY(40px)";

            setTimeout(()=>{

                card.style.transition=

                ".6s";

                card.style.opacity="1";

                card.style.transform=

                "translateY(0)";

            },

            index*180);

        }

    );

}

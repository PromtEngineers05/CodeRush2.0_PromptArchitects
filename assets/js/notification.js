"use strict";

/* ==========================================================
   CIVICAI NOTIFICATIONS
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeNotifications();

    }

);

/* ==========================================================
   SAMPLE DATA
   (Backend will replace this later)
========================================================== */

const notifications = [

    {

        icon:"🤖",

        title:"AI Analysis Completed",

        message:"CivicAI successfully analyzed your complaint and assigned a priority.",

        time:"Just Now"

    },

    {

        icon:"🏢",

        title:"Department Assigned",

        message:"Road Department has been assigned to your complaint.",

        time:"5 Minutes Ago"

    },

    {

        icon:"👷",

        title:"Worker Assigned",

        message:"A maintenance worker has accepted the complaint.",

        time:"12 Minutes Ago"

    },

    {

        icon:"🚧",

        title:"Repair Started",

        message:"Repair work has started at the reported location.",

        time:"35 Minutes Ago"

    },

    {

        icon:"✅",

        title:"Complaint Resolved",

        message:"Your complaint has been successfully resolved.",

        time:"Yesterday"

    }

];

/* ==========================================================
   INIT
========================================================== */

function initializeNotifications(){

    renderNotifications();

}

/* ==========================================================
   RENDER
========================================================== */

function renderNotifications(){

    const list =

        document.getElementById(

            "notifications-list"

        );

    if(!list) return;

    list.innerHTML="";

    notifications.forEach(

        (

            item,

            index

        )=>{

            list.innerHTML += `

                <div

                    class="notification-card"

                    style="animation-delay:${index*120}ms;">

                    <div class="notification-icon">

                        ${item.icon}

                    </div>

                    <div class="notification-content">

                        <h3>

                            ${item.title}

                        </h3>

                        <p>

                            ${item.message}

                        </p>

                        <div class="notification-time">

                            ${item.time}

                        </div>

                    </div>

                </div>

            `;

        }

    );

    animateNotifications();

}
/* ==========================================================
   ANIMATION
========================================================== */

function animateNotifications(){

    const cards =

        document.querySelectorAll(

            ".notification-card"

        );

    cards.forEach(

        (

            card,

            index

        )=>{

            card.style.opacity="0";

            card.style.transform=

            "translateX(-40px)";

            setTimeout(()=>{

                card.style.transition=

                ".5s";

                card.style.opacity="1";

                card.style.transform=

                "translateX(0)";

            },

            index*150);

        }

    );

}

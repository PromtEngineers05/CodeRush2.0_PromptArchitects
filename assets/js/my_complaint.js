"use strict";

/* ==========================================================
   CIVICAI - MY COMPLAINTS
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeComplaints();

    }

);

/* ==========================================================
   SAMPLE DATA
   (Will come from backend later)
========================================================== */

const complaints = [

    {

        id:"CMP-2026-001",

        title:"Large Road Pothole",

        location:"MG Road",

        status:"pending",

        progress:15,

        date:"Today"

    },

    {

        id:"CMP-2026-002",

        title:"Broken Street Light",

        location:"Civil Lines",

        status:"assigned",

        progress:45,

        date:"Yesterday"

    },

    {

        id:"CMP-2026-003",

        title:"Garbage Overflow",

        location:"Market Area",

        status:"progress",

        progress:72,

        date:"2 Days Ago"

    },

    {

        id:"CMP-2026-004",

        title:"Water Leakage",

        location:"Sector 11",

        status:"resolved",

        progress:100,

        date:"5 Days Ago"

    }

];

/* ==========================================================
   INIT
========================================================== */

function initializeComplaints(){

    renderComplaints(

        complaints

    );

    initializeSearch();

    initializeFilter();

}
/* ==========================================================
   RENDER
========================================================== */

function renderComplaints(data){

    const grid =

        document.getElementById(

            "complaints-grid"

        );

    if(!grid) return;

    grid.innerHTML="";

    data.forEach(item=>{

        grid.innerHTML += `

        <div class="complaint-card">

            <div class="complaint-top">

                <span class="complaint-id">

                    ${item.id}

                </span>

                <span class="status ${item.status}">

                    ${formatStatus(item.status)}

                </span>

            </div>

            <h3>

                ${item.title}

            </h3>

            <p>

                📍 ${item.location}

            </p>

            <p>

                🕒 ${item.date}

            </p>

            <div class="progress">

                <div class="progress-bar">

                    <div

                        class="progress-fill"

                        style="width:${item.progress}%">

                    </div>

                </div>

            </div>

            <button

                class="primary-btn view-btn">

                View Details →

            </button>

        </div>

        `;

    });

}
/* ==========================================================
   SEARCH
========================================================== */

function initializeSearch(){

    const search =

        document.getElementById(

            "complaint-search"

        );

    if(!search) return;

    search.addEventListener(

        "input",

        ()=>{

            const keyword =

            search.value

            .toLowerCase();

            const filtered =

            complaints.filter(

                complaint=>

                complaint.title

                .toLowerCase()

                .includes(keyword)

            );

            renderComplaints(

                filtered

            );

        }

    );

}

/* ==========================================================
   FILTER
========================================================== */

function initializeFilter(){

    const filter =

        document.getElementById(

            "status-filter"

        );

    if(!filter) return;

    filter.addEventListener(

        "change",

        ()=>{

            if(

                filter.value==="all"

            ){

                renderComplaints(

                    complaints

                );

                return;

            }

            renderComplaints(

                complaints.filter(

                    complaint=>

                    complaint.status===

                    filter.value

                )

            );

        }

    );

}
/* ==========================================================
   HELPER
========================================================== */

function formatStatus(status){

    switch(status){

        case"pending":

            return"Pending";

        case"assigned":

            return"Assigned";

        case"progress":

            return"In Progress";

        case"resolved":

            return"Resolved";

        default:

            return status;

    }

}

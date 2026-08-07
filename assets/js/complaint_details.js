"use strict";

/* ==========================================================
   COMPLAINT DETAILS
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeComplaintDetails();

    }

);

/* ==========================================================
   INIT
========================================================== */

function initializeComplaintDetails(){

    initializeViewButtons();

    initializeCloseButton();

}

/* ==========================================================
   OPEN PANEL
========================================================== */

function initializeViewButtons(){

    document.addEventListener(

        "click",

        event=>{

            const button =

                event.target.closest(

                    ".view-btn"

                );

            if(!button) return;

            openComplaintDetails();

        }

    );

}

/* ==========================================================
   CLOSE PANEL
========================================================== */

function initializeCloseButton(){

    const close =

        document.getElementById(

            "close-details"

        );

    const overlay =

        document.getElementById(

            "details-overlay"

        );

    if(close){

        close.addEventListener(

            "click",

            closeComplaintDetails

        );

    }

    if(overlay){

        overlay.addEventListener(

            "click",

            closeComplaintDetails

        );

    }

}

/* ==========================================================
   OPEN
========================================================== */

function openComplaintDetails(){

    const wrapper =

        document.getElementById(

            "complaint-details"

        );

    const content =

        document.getElementById(

            "details-content"

        );

    wrapper.classList.add(

        "active"

    );

    content.innerHTML = `

        <div class="detail-card">

            <h3>

                📍 Complaint

            </h3>

            <p>

                Large Road Pothole

            </p>

        </div>

        <div class="detail-card">

            <h3>

                🤖 AI Analysis

            </h3>

            <p>

                Deep road damage detected.

                Confidence: 98%

            </p>

        </div>

        <div class="detail-card">

            <h3>

                🏢 Department

            </h3>

            <p>

                Road Department

            </p>

        </div>

        <div class="detail-card">

            <h3>

                📊 Progress

            </h3>

            <p>

                45% Completed

            </p>

        </div>

        <div class="detail-card">

            <h3>

                🕒 Timeline

            </h3>

            <div class="timeline-item">

                Complaint Registered

            </div>

            <div class="timeline-item">

                AI Analysis Completed

            </div>

            <div class="timeline-item">

                Officer Assigned

            </div>

            <div class="timeline-item">

                Repair In Progress

            </div>

        </div>

    `;

}

/* ==========================================================
   CLOSE
========================================================== */

function closeComplaintDetails(){

    document

        .getElementById(

            "complaint-details"

        )

        .classList

        .remove(

            "active"

        );

}
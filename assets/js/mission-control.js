"use strict";

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeMissionControl();

    }

);

function initializeMissionControl() {

    const stream =

        document.getElementById(

            "thinking-stream"

        );

    if (!stream) return;

    const thoughts = [

        "Receiving complaint...",

        "Validating uploaded image...",

        "Running computer vision model...",

        "Detecting infrastructure damage...",

        "Estimating confidence score...",

        "Matching nearby complaints...",

        "Finding responsible department...",

        "Calculating severity...",

        "Checking weather impact...",

        "Checking hospital proximity...",

        "Checking school proximity...",

        "Estimating public impact...",

        "Generating AI explanation...",

        "Preparing officer assignment...",

        "Dispatch recommendation ready."

    ];

    let index = 0;

    const timer = setInterval(() => {

        if (index >= thoughts.length) {

            clearInterval(timer);

            renderDecision();

            simulateComplaintArrival();

            return;

        }

        const line =

            document.createElement("div");

        line.className =

            "thinking-line";

        line.textContent =

            thoughts[index];

        stream.appendChild(line);

        stream.scrollTop =

            stream.scrollHeight;

        index++;

    }, 600);

}

function renderDecision() {

    document.getElementById(

        "decision-panel"

    ).innerHTML =

        `

    <div class="analysis-result-card">

        <div class="success-icon">

            ✓

        </div>

        <h3>

            Decision Complete

        </h3>

        <p>

            Backend will provide:

        </p>

        <ul>

            <li>Detected Issue</li>

            <li>Severity</li>

            <li>Priority</li>

            <li>Department</li>

            <li>Worker Assignment</li>

            <li>ETA</li>

        </ul>

    </div>

    `;

}
/* ==========================================================
   SIMULATION
========================================================== */

function simulateComplaintArrival(){

    if(

        !window.CivicAIMap

    ){

        return;

    }

    setTimeout(()=>{

        window.CivicAIMap.addComplaint({

            title:

            "Backend Data Pending",

            description:

            "Real complaint will come from API.",

            latitude:19.0760,

            longitude:72.8777

        });

    },1200);

}
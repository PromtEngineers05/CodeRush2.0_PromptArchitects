"use strict";

/* ==========================================================
   CIVICAI REPORT MODULE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeReport();

    }

);

/* ==========================================================
   ELEMENTS
========================================================== */

const uploadArea =
document.getElementById(
    "upload-area"
);

const imageInput =
document.getElementById(
    "complaint-image"
);

const previewContainer =
document.getElementById(
    "image-preview"
);

const analysisContainer =
document.getElementById(
    "analysis-container"
);

const reportForm =
document.getElementById(
    "report-form"
);

const locationInput =
document.getElementById(
    "location"
);

const locationButton =
document.getElementById(
    "detect-location"
);

const voiceButton =
document.getElementById(
    "voice-btn"
);

/* ==========================================================
   AI RESULT
========================================================== */

const AI_RESULT = {

    issue : "Pothole",

    confidence : 98,

    severity : "Critical",

    department : "Road Department",

    priority : "P1",

    estimatedTime : "24 Hours",

    explanation :

        "Deep pothole detected. AI recommends immediate maintenance because of high accident probability."

};

/* ==========================================================
   INITIALIZE
========================================================== */

function initializeReport(){

    initializeUpload();

    initializeDragDrop();

    initializeLocation();

    initializeVoice();

    initializeForm();

}

/* ==========================================================
   IMAGE UPLOAD
========================================================== */

function initializeUpload(){

    if(!uploadArea || !imageInput){

        return;

    }

    uploadArea.addEventListener(

        "click",

        ()=>{

            imageInput.click();

        }

    );

    imageInput.addEventListener(

        "change",

        event=>{

            const file =

                event.target.files[0];

            if(!file){

                return;

            }

            showPreview(file);

        }

    );

}

/* ==========================================================
   IMAGE PREVIEW
========================================================== */

function showPreview(file){

    const reader =

        new FileReader();

    reader.onload =

        event=>{

            previewContainer.classList.add(

                "active"

            );

            previewContainer.innerHTML =

            `

            <div
                class="preview-wrapper">

                <img
                    id="preview-image"
                    src="${event.target.result}"
                    alt="Complaint">

                <div
                    id="ai-overlay"
                    class="ai-overlay">

                </div>

                <div
                    id="scan-line"
                    class="scan-line">

                </div>

            </div>

            `;

            startAIScan();

        };

    reader.readAsDataURL(file);

}

/* ==========================================================
   DRAG DROP
========================================================== */

function initializeDragDrop(){

    if(!uploadArea){

        return;

    }

    [

        "dragenter",

        "dragover"

    ].forEach(

        eventName=>{

            uploadArea.addEventListener(

                eventName,

                event=>{

                    event.preventDefault();

                    uploadArea.classList.add(

                        "dragging"

                    );

                }

            );

        }

    );

    [

        "dragleave",

        "drop"

    ].forEach(

        eventName=>{

            uploadArea.addEventListener(

                eventName,

                event=>{

                    event.preventDefault();

                    uploadArea.classList.remove(

                        "dragging"

                    );

                }

            );

        }

    );

    uploadArea.addEventListener(

        "drop",

        event=>{

            const file =

                event.dataTransfer.files[0];

            if(!file){

                return;

            }

            showPreview(file);

        }

    );

}
/* ==========================================================
   AI SCAN
========================================================== */

function startAIScan(){

    const scanLine =

        document.getElementById(

            "scan-line"

        );

    if(scanLine){

        scanLine.classList.add(

            "active"

        );

    }

    const steps = [

        "Uploading Image...",

        "Enhancing Resolution...",

        "Running AI Vision...",

        "Detecting Infrastructure...",

        "Generating AI Result..."

    ];

    let current = 0;

    analysisContainer.innerHTML =

    `

    <div class="waiting-ai">

        <div class="ai-brain">

            🤖

        </div>

        <h3 id="ai-status">

            ${steps[0]}

        </h3>

        <p>

            CivicAI Vision Engine

        </p>

    </div>

    `;

    const interval =

        setInterval(

            ()=>{

                current++;

                if(

                    current >=

                    steps.length

                ){

                    clearInterval(

                        interval

                    );

                    renderDetection();

                    return;

                }

                document.getElementById(

                    "ai-status"

                ).textContent =

                    steps[current];

            },

            900

        );

}
/* ==========================================================
   DETECTION
========================================================== */

function renderDetection(){

    const overlay =

        document.getElementById(

            "ai-overlay"

        );

    if(overlay){

        overlay.innerHTML =

        `

        <div

            class="ai-box"

            style="left:22%;top:42%;width:42%;height:30%;">

            <span>

                ${AI_RESULT.issue}

            </span>

        </div>

        `;

    }

    renderAIResult();

}
/* ==========================================================
   AI RESULT
========================================================== */

function renderAIResult(){

    analysisContainer.innerHTML =

    `

    <div class="analysis-result-card">

        <div class="success-icon">

            ✓

        </div>

        <h2>

            AI Detection Complete

        </h2>

        <p class="analysis-subtitle">

            CivicAI Vision has successfully analysed the uploaded complaint.

        </p>

        <div class="analysis-grid">

            <div class="analysis-item">

                <span>

                    Issue

                </span>

                <strong>

                    ${AI_RESULT.issue}

                </strong>

            </div>

            <div class="analysis-item">

                <span>

                    Confidence

                </span>

                <strong id="confidence">

                    0%

                </strong>

            </div>

            <div class="analysis-item">

                <span>

                    Severity

                </span>

                <strong>

                    ${AI_RESULT.severity}

                </strong>

            </div>

            <div class="analysis-item">

                <span>

                    Department

                </span>

                <strong>

                    ${AI_RESULT.department}

                </strong>

            </div>

            <div class="analysis-item">

                <span>

                    Priority

                </span>

                <strong>

                    ${AI_RESULT.priority}

                </strong>

            </div>

            <div class="analysis-item">

                <span>

                    Resolution ETA

                </span>

                <strong>

                    ${AI_RESULT.estimatedTime}

                </strong>

            </div>

        </div>

        <div class="ai-explanation">

            <h3>

                🤖 AI Explanation

            </h3>

            <p>

                ${AI_RESULT.explanation}

            </p>

        </div>

        <button

            id="submit-complaint"

            class="primary-btn">

            Submit Complaint

        </button>

    </div>

    `;

    animateConfidence();

}
/* ==========================================================
   CONFIDENCE
========================================================== */

function animateConfidence(){

    const confidence =

        document.getElementById(

            "confidence"

        );

    if(!confidence){

        return;

    }

    let value = 0;

    const timer =

        setInterval(

            ()=>{

                value++;

                confidence.innerHTML =

                    value + "%";

                if(

                    value >=

                    AI_RESULT.confidence

                ){

                    clearInterval(

                        timer

                    );

                    enableSubmitButton();

                }

            },

            20

        );

}
/* ==========================================================
   SUBMIT BUTTON
========================================================== */

function enableSubmitButton(){

    const button =

        document.getElementById(

            "submit-complaint"

        );

    if(!button){

        return;

    }

    button.addEventListener(

        "click",

        submitComplaint

    );

}
/* ==========================================================
   SUBMIT
========================================================== */

function submitComplaint(){

    const button =

        document.getElementById(

            "submit-complaint"

        );

    button.disabled = true;

    button.innerHTML =

        "Submitting...";

    analysisContainer.insertAdjacentHTML(

        "beforeend",

        `

        <div class="submission-status">

            <h3>

                🚀 Sending Complaint

            </h3>

            <p id="submission-step">

                Preparing data...

            </p>

        </div>

        `

    );

    const steps = [

        "Preparing data...",

        "Uploading image...",

        "Saving complaint...",

        "Updating Smart City Map...",

        "Notifying Officer Dashboard...",

        "Complaint Submitted Successfully."

    ];

    let current = 0;

    const text =

        document.getElementById(

            "submission-step"

        );

    const timer =

        setInterval(

            ()=>{

                text.innerHTML =

                    steps[current];

                current++;

                if(

                    current >=

                    steps.length

                ){

                    clearInterval(

                        timer

                    );

                    complaintSuccess();

                }

            },

            900

        );

}
/* ==========================================================
   SUCCESS
========================================================== */

function complaintSuccess(){

    const button =

        document.getElementById(

            "submit-complaint"

        );

    button.innerHTML =

        "✅ Complaint Registered";

    button.style.opacity =

        ".75";

    button.disabled = true;

    /*
    =============================================

    NEXT MODULES

    CivicEvents.emit(

        "complaint_created",

        AI_RESULT

    );

    This will notify

    ✔ Live City Map

    ✔ Mission Control

    ✔ Officer Dashboard

    ✔ Admin Dashboard

    =============================================
    */

}
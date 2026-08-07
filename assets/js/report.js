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
   INIT
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

    if(!uploadArea) return;

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

            if(!file) return;

            showPreview(file);

        }

    );

}

function showPreview(file){

    const reader = new FileReader();

    reader.onload = event=>{

        previewContainer.classList.add("active");

        previewContainer.innerHTML = `

            <div class="preview-wrapper">

                <img

                    id="preview-image"

                    src="${event.target.result}"

                    alt="Complaint Preview">

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
   DRAG & DROP
========================================================== */

function initializeDragDrop(){

    [

        "dragenter",

        "dragover"

    ].forEach(name=>{

        uploadArea.addEventListener(

            name,

            event=>{

                event.preventDefault();

                uploadArea.classList.add(

                    "dragging"

                );

            }

        );

    });

    [

        "dragleave",

        "drop"

    ].forEach(name=>{

        uploadArea.addEventListener(

            name,

            event=>{

                event.preventDefault();

                uploadArea.classList.remove(

                    "dragging"

                );

            }

        );

    });

    uploadArea.addEventListener(

        "drop",

        event=>{

            const file=

            event.dataTransfer.files[0];

            if(!file) return;

            showPreview(file);

        }

    );

}
/* ==========================================================
   LOCATION
========================================================== */

function initializeLocation(){

    if(!locationButton) return;

    locationButton.addEventListener(

        "click",

        detectLocation

    );

}

function detectLocation(){

    if(

        !navigator.geolocation

    ){

        alert(

            "Geolocation not supported."

        );

        return;

    }

    locationInput.value =

    "Detecting...";

    navigator.geolocation.getCurrentPosition(

        position=>{

            const lat=

            position.coords.latitude;

            const lng=

            position.coords.longitude;

            locationInput.value=

            `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

        },

        ()=>{

            locationInput.value=

            "Location unavailable";

        }

    );

}
/* ==========================================================
   VOICE
========================================================== */

function initializeVoice(){

    if(!voiceButton) return;

    voiceButton.addEventListener(

        "click",

        ()=>{

            const Recognition=

            window.SpeechRecognition ||

            window.webkitSpeechRecognition;

            if(!Recognition){

                alert(

                    "Speech Recognition is unavailable."

                );

                return;

            }

            const recognition=

            new Recognition();

            recognition.lang="en-IN";

            recognition.start();

            voiceButton.textContent=

            "Listening...";

            recognition.onresult=

            event=>{

                document.getElementById(

                    "description"

                ).value=

                event.results[0][0].transcript;

            };

            recognition.onend=

            ()=>{

                voiceButton.innerHTML=

                "🎤 Voice";

            };

        }

    );

}
/* ==========================================================
   SUBMIT
========================================================== */

function initializeForm(){

    if(!reportForm) return;

    reportForm.addEventListener(

        "submit",

        event=>{

            event.preventDefault();

            simulateAI();

        }

    );

}

function simulateAI(){

    analysisContainer.innerHTML=

    `

    <div class="scanner">

    </div>

    <h2>

        AI Processing...

    </h2>

    <p>

        Understanding image...

    </p>

    `;

    setTimeout(

        showPipeline,

        1500

    );

}
/* ==========================================================
   PIPELINE
========================================================== */

function showPipeline(){

    analysisContainer.innerHTML=

    `

    <div class="analysis-result">

        <h2>

            AI Pipeline Started

        </h2>

        <ul>

            <li>

                ✔ Image received

            </li>

            <li>

                ✔ AI Vision started

            </li>

            <li>

                ✔ Understanding complaint

            </li>

            <li>

                ✔ Detecting severity

            </li>

            <li>

                ✔ Preparing Mission Control

            </li>

        </ul>

    </div>

    `;

}
/* ==========================================================
   AI RESULT (Backend Ready)
========================================================== */

const AI_RESULT = {

    issue: "Pothole",

    confidence: 98,

    severity: "High",

    department: "Road Department",

    priority: "Critical",

    estimatedTime: "24 Hours",

    explanation:

        "Deep pothole detected on the road surface. High priority because it can cause accidents and vehicle damage."

};
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

        "Uploading image...",

        "Enhancing image...",

        "Running AI Vision...",

        "Detecting civic issue...",

        "Generating result..."

    ];

    let current = 0;

    analysisContainer.innerHTML = `

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

    const interval = setInterval(()=>{

        current++;

        if(current >= steps.length){

            clearInterval(interval);

            renderDetection();

            return;

        }

        document.getElementById(

            "ai-status"

        ).textContent =

            steps[current];

    },900);

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

        overlay.innerHTML = `

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
   RESULT
========================================================== */

function renderAIResult(){

    analysisContainer.innerHTML = `

        <div class="analysis-result-card">

            <div class="success-icon">

                ✓

            </div>

            <h2>

                AI Detection Complete

            </h2>

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

                        Estimated Resolution

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

                class="primary-btn"

                id="submit-complaint">

                🚀 Submit Complaint

            </button>

        </div>

    `;

    animateConfidence();

}
/* ==========================================================
   CONFIDENCE
========================================================== */
function animateConfidence(){

    const element =

        document.getElementById(

            "confidence"

        );

    if(!element) return;

    let value = 0;

    const target =

        AI_RESULT.confidence;

    const timer = setInterval(()=>{

        value++;

        element.textContent =

            value + "%";

        if(value >= target){

            clearInterval(timer);

            enableSubmitButton();

        }

    },20);

}
/* ==========================================================
   SUBMIT COMPLAINT
========================================================== */

function enableSubmitButton(){

    const button =

        document.getElementById(

            "submit-complaint"

        );

    if(!button) return;

    button.addEventListener(

        "click",

        ()=>{

            button.innerHTML =

            "✅ Complaint Submitted";

            button.disabled = true;

            button.style.opacity = ".7";

            /*
                NEXT STEP

                This is where we'll:

                1. Send data to backend

                2. Add complaint to map

                3. Open Mission Control

                4. Update Officer Dashboard
            */

        }

    );

}
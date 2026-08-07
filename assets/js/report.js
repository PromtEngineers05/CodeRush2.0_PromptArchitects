"use strict";

/* ==========================================================
   CIVICAI REPORT ENGINE
   Version : 1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeReportModule();

});

/* ==========================================================
   INITIALIZE
========================================================== */

function initializeReportModule() {

    initializeImageUpload();

    initializeDragDrop();

    initializeVoiceButton();

    initializeForm();

    initializeAnimations();

}

/* ==========================================================
   ELEMENTS
========================================================== */

const form = document.getElementById(

    "report-form"

);

const imageInput = document.getElementById(

    "complaint-image"

);

const uploadArea = document.querySelector(

    ".upload-area"

);

const analysisContainer = document.getElementById(

    "analysis-container"

);

let selectedImage = null;

/* ==========================================================
   IMAGE
========================================================== */

function initializeImageUpload() {

    if (!imageInput) return;

    imageInput.addEventListener(

        "change",

        event => {

            const file =

                event.target.files[0];

            if (!file) return;

            loadPreview(file);

        }

    );

}

function loadPreview(file) {

    selectedImage = file;

    const reader = new FileReader();

    reader.onload = event => {

        uploadArea.innerHTML =

            `
        <div class="preview-container">

            <img
                src="${event.target.result}"
                class="upload-preview"
                id="preview-image">

            <div
                class="detection-layer"
                id="detection-layer">

            </div>

        </div>

        <h4>

            ${file.name}

        </h4>

        <p>

            Image Ready For AI Analysis

        </p>
    `;

    };

    reader.readAsDataURL(file);

}
/* ==========================================================
   DRAG & DROP
========================================================== */

function initializeDragDrop() {

    if (!uploadArea) return;

    [

        "dragenter",

        "dragover"

    ].forEach(eventName => {

        uploadArea.addEventListener(

            eventName,

            event => {

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

    ].forEach(eventName => {

        uploadArea.addEventListener(

            eventName,

            event => {

                event.preventDefault();

                uploadArea.classList.remove(

                    "dragging"

                );

            }

        );

    });

    uploadArea.addEventListener(

        "drop",

        event => {

            const file =

                event.dataTransfer.files[0];

            if (file) {

                imageInput.files =

                    event.dataTransfer.files;

                loadPreview(file);

            }

        }

    );

}
/* ==========================================================
   VOICE
========================================================== */

function initializeVoiceButton() {

    const button =

        document.getElementById(

            "voice-btn"

        );

    if (!button) return;

    button.addEventListener(

        "click",

        () => {

            if (

                !("webkitSpeechRecognition" in window) &&

                !("SpeechRecognition" in window)

            ) {

                alert(

                    "Speech Recognition is not supported."

                );

                return;

            }

            const Recognition =

                window.SpeechRecognition ||

                window.webkitSpeechRecognition;

            const recognition =

                new Recognition();

            recognition.lang = "en-IN";

            recognition.interimResults = false;

            recognition.start();

            button.textContent =

                "Listening...";

            recognition.onresult = event => {

                document.getElementById(

                    "complaint-description"

                ).value =

                    event.results[0][0].transcript;

            };

            recognition.onend = () => {

                button.innerHTML =

                    "🎤 Voice";

            };

        }

    );

}
/* ==========================================================
   FORM
========================================================== */

function initializeForm() {

    if (!form) return;

    form.addEventListener(

        "submit",

        event => {

            event.preventDefault();

            startAIAnalysis();

        }

    );

}

function startAIAnalysis() {

    analysisContainer.innerHTML =

        `
        <div class="analysis-loading">

            <div class="scanner"></div>

            <h3>

                AI is analyzing...

            </h3>

            <p>

                Detecting issue,
                understanding complaint,
                preparing structured request...

            </p>

        </div>
    `;

    setTimeout(

        simulateAIPipeline,

        1200

    );

}

function showFutureArchitecture() {

    analysisContainer.innerHTML =

        `
        <div class="analysis-result">

            <h3>

                ✔ Analysis Complete

            </h3>

            <p>

                Frontend is ready.

            </p>

            <p>

                Future backend will return:

            </p>

            <ul>

                <li>Detected Issue</li>

                <li>Confidence Score</li>

                <li>Severity</li>

                <li>Department</li>

                <li>Location</li>

                <li>Priority</li>

                <li>Estimated Resolution</li>

            </ul>

        </div>
    `;

}
/* ==========================================================
   GSAP
========================================================== */

function initializeAnimations() {

    if (typeof gsap === "undefined") return;

    gsap.registerPlugin(

        ScrollTrigger

    );

    gsap.from(

        ".report-card",

        {

            opacity: 0,

            x: -80,

            duration: 1,

            ease: "power4.out",

            scrollTrigger: {

                trigger: ".report",

                start: "top 70%"

            }

        }

    );

    gsap.from(

        ".analysis-card",

        {

            opacity: 0,

            x: 80,

            duration: 1,

            ease: "power4.out",

            scrollTrigger: {

                trigger: ".report",

                start: "top 70%"

            }

        }

    );

}

/* ==========================================================
   FUTURE BACKEND
========================================================== */

/*

POST

/api/complaints

multipart/form-data

↓

FastAPI

↓

YOLO

↓

OpenAI

↓

Geo Location

↓

Database

↓

Officer Dashboard

↓

Citizen Notification

*/
/* ==========================================================
   AI PIPELINE SIMULATION
========================================================== */

function simulateAIPipeline() {

    const steps = [

        {

            title: "Loading Image",

            description: "Preparing uploaded image..."

        },

        {

            title: "Computer Vision",

            description: "Detecting civic objects..."

        },

        {

            title: "AI Classification",

            description: "Understanding complaint type..."

        },

        {

            title: "Severity Analysis",

            description: "Calculating infrastructure impact..."

        },

        {

            title: "Department Routing",

            description: "Selecting responsible department..."

        },

        {

            title: "Priority Engine",

            description: "Generating priority score..."

        },

        {

            title: "Creating Complaint",

            description: "Building structured complaint..."

        }

    ];

    let index = 0;

    runPipelineStep();

    function runPipelineStep() {

        if (index >= steps.length) {

            createDetectionBoxes();

            renderAnalysisResult();

            return;

        }

        const step = steps[index];

        analysisContainer.innerHTML =

            `

        <div class="pipeline-processing">

            <div class="scanner-ring"></div>

            <div class="scanner-ring delay"></div>

            <div class="scanner-core"></div>

            <h3>

                ${step.title}

            </h3>

            <p>

                ${step.description}

            </p>

            <div class="progress">

                <div

                    class="progress-bar"

                    style="width:${((index + 1) / steps.length) * 100}%">

                </div>

            </div>

        </div>

        `;

        index++;

        setTimeout(

            runPipelineStep,

            900

        );

    }

}
/* ==========================================================
   RESULT
========================================================== */

function renderAnalysisResult() {

    analysisContainer.innerHTML =

        `

    <div class="analysis-result-card">

        <div class="success-icon">

            ✓

        </div>

        <h3>

            AI Analysis Complete

        </h3>

        <div class="analysis-grid">

            <div class="analysis-item">

                <span>

                    Issue

                </span>

                <strong id="issue-value">

                    --

                </strong>

            </div>

            <div class="analysis-item">

                <span>

                    Severity

                </span>

                <strong id="severity-value">

                    --

                </strong>

            </div>

            <div class="analysis-item">

                <span>

                    Department

                </span>

                <strong id="department-value">

                    --

                </strong>

            </div>

            <div class="analysis-item">

                <span>

                    Priority

                </span>

                <strong id="priority-value">

                    --

                </strong>

            </div>

        </div>

        <button

            class="primary-btn"

            id="continue-workflow">

            Continue Workflow →

        </button>

    </div>

    `;

    animateResult();

}
/* ==========================================================
   ANIMATION
========================================================== */

function animateResult() {

    const values = {

        issue: "Waiting Backend",

        severity: "Waiting Backend",

        department: "Waiting Backend",

        priority: "Waiting Backend"

    };

    Object.entries(values).forEach(

        ([key, value], index) => {

            setTimeout(() => {

                document.getElementById(

                    `${key}-value`

                ).textContent = value;

            }, index * 250);

        }

    );

}
/* ==========================================================
   AI DETECTION OVERLAY
========================================================== */

function createDetectionBoxes() {

    const layer = document.getElementById(

        "detection-layer"

    );

    if (!layer) return;

    layer.innerHTML = "";

    const detections = [

        {

            x: 18,

            y: 24,

            w: 48,

            h: 32,

            label: "Waiting Backend",

            confidence: "--"

        }

    ];

    detections.forEach(item => {

        const box =

            document.createElement("div");

        box.className =

            "detection-box";

        box.style.left =

            item.x + "%";

        box.style.top =

            item.y + "%";

        box.style.width =

            item.w + "%";

        box.style.height =

            item.h + "%";

        box.innerHTML =

            `
            <span>

                ${item.label}

                (${item.confidence})

            </span>
        `;

        layer.appendChild(box);

    });

}
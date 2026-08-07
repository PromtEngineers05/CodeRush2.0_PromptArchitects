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

    const reader =

    new FileReader();

    reader.onload =

    event=>{

        previewContainer.classList.add(

            "active"

        );

        previewContainer.innerHTML=

        `

        <img

            src="${event.target.result}"

            alt="Preview">

        `;

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
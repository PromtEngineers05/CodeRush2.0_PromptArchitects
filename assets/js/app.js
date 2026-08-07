"use strict";

document.addEventListener("DOMContentLoaded", async () => {

    try {

        await loadAllComponents();

        initializeApplication();

        if (window.CivicUtils) {

            CivicUtils.toast(
                "CivicAI Ready",
                "success"
            );

        }

        if (window.CivicAnimations) {

            CivicAnimations.reveal();

            CivicAnimations.counters();

        }

        if (window.CivicEvents) {

            CivicEvents.emit(
                "application_ready"
            );

        }

        if (window.CivicConstants) {

            console.log(
                `${CivicConstants.APP_NAME} v${CivicConstants.VERSION}`
            );

        }

    }

    catch (error) {

        console.error(
            "Application Initialization Failed:",
            error
        );

    }

    finally {

        const loader = document.getElementById("loader");

        if (loader) {

            loader.style.display = "none";

        }

    }

});

/* ==========================================================
   COMPONENTS
========================================================== */

async function loadAllComponents() {

    const components = [

        {
            id: "navbar",
            path: "./components/navbar.html"
        },

        {
            id: "hero",
            path: "./components/hero.html"
        },

        {
            id: "report",
            path: "./components/report.html"
        },

        {
            id:"my-complaints",
            path:"./components/my-complaints.html"
        },

        {
            id:"timeline",
            path:"./components/timeline.html"
        },

        {
            id:"notifications",
            path:"./components/notifications.html"
        },

        {
            id:"profile",
            path:"./components/profile.html"
        },
        
        {
            id:"complaint-details",
            path:"./components/complaint-details.html"
        },

        {
            id: "features",
            path: "./components/features.html"
        },

        {
            id: "platform",
            path: "./components/platform.html"
        },

        {
            id: "mission-control",
            path: "./components/mission-control.html"
        },

        {
            id: "dashboard",
            path: "./components/dashboard.html"
        },

        {
            id: "map",
            path: "./components/map.html"
        },

        {
            id: "officer-dashboard",
            path: "./components/officer-dashboard.html"
        },

        {
            id: "footer",
            path: "./components/footer.html"
        }

    ];

    for (const component of components) {

        await loadComponent(

            component.id,

            component.path

        );

    }

}

/* ==========================================================
   LOAD COMPONENT
========================================================== */

async function loadComponent(id, path) {

    try {

        const container = document.getElementById(id);

        if (!container) {

            console.warn(`Container #${id} not found.`);

            return;

        }

        const response = await fetch(path);

        if (!response.ok) {

            throw new Error(`Unable to load ${path}`);

        }

        container.innerHTML = await response.text();

    }

    catch (error) {

        console.error(error);

    }

}

/* ==========================================================
   APPLICATION
========================================================== */

function initializeApplication() {

    console.log("%cCivicAI Loaded Successfully",
        "color:#4F7CFF;font-size:16px;font-weight:bold;");

}
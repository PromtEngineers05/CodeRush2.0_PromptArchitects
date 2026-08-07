"use strict";

/* ==========================================
   COMPONENT LOADER
========================================== */

async function loadComponent(id, file) {

    try {

        const response = await fetch(file);

        if (!response.ok) {

            throw new Error(`Unable to load ${file}`);

        }

        const html = await response.text();

        document.getElementById(id).innerHTML = html;

    }

    catch (error) {

        console.error(error);

    }

}
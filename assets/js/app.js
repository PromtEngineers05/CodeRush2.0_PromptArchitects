"use strict";

document.addEventListener("DOMContentLoaded", async () => {

    await loadComponent("navbar", "./components/navbar.html");

    await loadComponent("hero", "./components/hero.html");

    await loadComponent("features", "./components/features.html");

    await loadComponent("platform", "./components/platform.html");

    await loadComponent("dashboard", "./components/dashboard.html");

    await loadComponent("footer", "./components/footer.html");

    document.getElementById("loader").style.display = "none";

});
async function loadComponent(id, path){

    const response = await fetch(path);

    if(!response.ok){

        throw new Error(`Cannot load ${path}`);

    }

    const html = await response.text();

    document.getElementById(id).innerHTML = html;

}
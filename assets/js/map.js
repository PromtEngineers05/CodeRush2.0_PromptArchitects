"use strict";

/* ==========================================================
   CIVICAI MAP ENGINE
   Version : 1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeMap();

});

/* ==========================================================
   GLOBAL
========================================================== */

let cityMap;

let mapLayers = {

    complaints:null,

    workers:null,

    prediction:null,

    risk:null,

    safety:null

};

/* ==========================================================
   INITIALIZE MAP
========================================================== */

function initializeMap(){

    if(typeof L === "undefined"){

        console.warn(

            "Leaflet not loaded."

        );

        return;

    }

    cityMap = L.map(

        "city-map",

        {

            zoomControl:false,

            attributionControl:false

        }

    ).setView(

        [

            19.0760,

            72.8777

        ],

        12

    );

    L.control.zoom({

        position:"bottomright"

    }).addTo(cityMap);

    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom:20

        }

    ).addTo(cityMap);

    createLayerGroups();

    initializeLayerControls();

    initializeMapReveal();

}

/* ==========================================================
   LAYER GROUPS
========================================================== */

function createLayerGroups(){

    mapLayers.complaints =

    L.layerGroup().addTo(cityMap);

    mapLayers.workers =

    L.layerGroup().addTo(cityMap);

    mapLayers.prediction =

    L.layerGroup().addTo(cityMap);

    mapLayers.risk =

    L.layerGroup().addTo(cityMap);

    mapLayers.safety =

    L.layerGroup().addTo(cityMap);

}

/* ==========================================================
   CONTROLS
========================================================== */

function initializeLayerControls(){

    const controls =

    document.querySelectorAll(

        ".layer-item input"

    );

    controls.forEach(control=>{

        control.addEventListener(

            "change",

            ()=>{

                const layer =

                control.dataset.layer;

                const group =

                mapLayers[layer];

                if(!group) return;

                if(control.checked){

                    cityMap.addLayer(group);

                }

                else{

                    cityMap.removeLayer(group);

                }

            }

        );

    });

}

/* ==========================================================
   GSAP
========================================================== */

function initializeMapReveal(){

    if(typeof gsap==="undefined") return;

    gsap.registerPlugin(

        ScrollTrigger

    );

    gsap.from(

        ".map-card",

        {

            opacity:0,

            y:80,

            duration:1,

            ease:"power4.out",

            scrollTrigger:{

                trigger:".smart-map",

                start:"top 70%"

            }

        }

    );

    gsap.from(

        ".map-widget",

        {

            opacity:0,

            x:80,

            stagger:.15,

            duration:.8,

            ease:"power3.out",

            scrollTrigger:{

                trigger:".smart-map",

                start:"top 70%"

            }

        }

    );

}

/* ==========================================================
   FUTURE DATA ARCHITECTURE
========================================================== */

/*

async function loadMapData(){

    const response = await fetch(

        "/api/map"

    );

    const data = await response.json();

    renderComplaints(

        data.complaints

    );

    renderWorkers(

        data.workers

    );

    renderPredictionZones(

        data.predictions

    );

    renderRiskZones(

        data.riskZones

    );

}

*/

/* ==========================================================
   FUTURE REALTIME
========================================================== */

/*

const socket = io("/");

socket.on(

    "map-update",

    data=>{

        updateMap(data);

    }

);

*/

/* ==========================================================
   FUTURE SERVICES
========================================================== */

/*

Mapbox

Leaflet

Heatmap.js

GeoJSON

MarkerCluster

Routing

Drawing Tools

Offline Tiles

*/
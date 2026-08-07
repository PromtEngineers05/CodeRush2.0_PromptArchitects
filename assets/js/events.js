"use strict";

/* ==========================================================
   CIVICAI EVENT BUS
========================================================== */

const CivicEvents = (() => {

    const events = {};

    function on(event, callback) {

        if (!events[event]) {

            events[event] = [];

        }

        events[event].push(callback);

    }

    function emit(event, data = {}) {

        if (!events[event]) return;

        events[event].forEach(callback => {

            callback(data);

        });

    }

    function off(event, callback) {

        if (!events[event]) return;

        events[event] = events[event].filter(

            listener => listener !== callback

        );

    }

    return {

        on,

        emit,

        off

    };

})();
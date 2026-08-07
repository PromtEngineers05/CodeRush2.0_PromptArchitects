"use strict";

/* ==========================================================
   LOCAL STORAGE
========================================================== */

const CivicStorage = {

    save,

    load,

    remove,

    clear

};

function save(key, value) {

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function load(key, defaultValue = null) {

    const value = localStorage.getItem(key);

    if (!value) {

        return defaultValue;

    }

    return JSON.parse(value);

}

function remove(key) {

    localStorage.removeItem(key);

}

function clear() {

    localStorage.clear();

}
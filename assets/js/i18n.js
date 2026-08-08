"use strict";

const CIVIC_TRANSLATIONS = {
    en: {
        home: "Home", features: "Features", platform: "AI Platform", dashboard: "Dashboard", contact: "Contact", signIn: "Sign In", getStarted: "Get Started",
        citizenWorkspace: "Citizen workspace", authorityOperations: "Authority operations", reportIssue: "Report an issue", createComplaint: "Create Complaint",
        location: "Location", complaintTitle: "Complaint Title", description: "Description", voice: "Voice", analyze: "Analyze with AI ->",
        aiAnalysis: "AI Analysis", ready: "Ready", email: "Email", password: "Password", fullName: "Full name", createAccount: "Create Account",
        citizenAccount: "Create a citizen account", welcomeBack: "Welcome back", newComplaint: "New complaint", accept: "Accept", workInProgress: "Work in progress", resolve: "Resolve",
        allDepartments: "All departments", incomingComplaints: "Incoming complaints", latestUpdates: "Latest updates"
    },
    hi: {
        home: "होम", features: "विशेषताएं", platform: "AI प्लेटफ़ॉर्म", dashboard: "डैशबोर्ड", contact: "संपर्क", signIn: "साइन इन", getStarted: "शुरू करें",
        citizenWorkspace: "नागरिक कार्यक्षेत्र", authorityOperations: "प्राधिकरण संचालन", reportIssue: "समस्या दर्ज करें", createComplaint: "शिकायत बनाएं",
        location: "स्थान", complaintTitle: "शिकायत शीर्षक", description: "विवरण", voice: "आवाज़", analyze: "AI से विश्लेषण करें ->",
        aiAnalysis: "AI विश्लेषण", ready: "तैयार", email: "ईमेल", password: "पासवर्ड", fullName: "पूरा नाम", createAccount: "खाता बनाएं",
        citizenAccount: "नागरिक खाता बनाएं", welcomeBack: "फिर से स्वागत है", newComplaint: "नई शिकायत", accept: "स्वीकार करें", workInProgress: "काम जारी है", resolve: "निस्तारण करें",
        allDepartments: "सभी विभाग", incomingComplaints: "आने वाली शिकायतें", latestUpdates: "नवीनतम अपडेट"
    }
};

let civicLanguage = localStorage.getItem("civic_language") || "en";
function t(key, fallback = key) { return CIVIC_TRANSLATIONS[civicLanguage]?.[key] || CIVIC_TRANSLATIONS.en[key] || fallback; }
function translatePage() {
    document.documentElement.lang = civicLanguage === "hi" ? "hi" : "en";
    document.querySelectorAll("[data-i18n]").forEach(node => { node.textContent = t(node.dataset.i18n, node.textContent); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(node => { node.placeholder = t(node.dataset.i18nPlaceholder, node.placeholder); });
    document.querySelectorAll("[data-language-select]").forEach(select => { select.value = civicLanguage; });
    window.CivicRoleDashboards?.refresh();
}
function setLanguage(language) { civicLanguage = CIVIC_TRANSLATIONS[language] ? language : "en"; localStorage.setItem("civic_language", civicLanguage); translatePage(); }
function initializeI18n() {
    document.querySelectorAll("[data-language-select]").forEach(select => select.addEventListener("change", event => setLanguage(event.target.value)));
    translatePage();
}
window.CivicI18n = { t, setLanguage, getLanguage: () => civicLanguage, initialize: initializeI18n };
window.initializeI18n = initializeI18n;

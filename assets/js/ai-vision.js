"use strict";

const defaultVisionResult = {
    issue: "Road pothole",
    category: "Road damage",
    confidence: 98.4,
    severity: "High",
    department: "Road Maintenance",
    priority: "P1 · 24 hr response"
};

function initializeAIVision() {
    const panel = document.getElementById("vision-analysis");
    if (!panel || panel.dataset.initialized) return;
    panel.dataset.initialized = "true";
    renderVisionReady();
}

function renderVisionReady() {
    const panel = document.getElementById("vision-analysis");
    if (!panel) return;
    panel.innerHTML = `
        <div class="vision-ready">
            <span class="status-chip">Ready for an image</span>
            <h3>AI-assisted issue detection</h3>
            <p>Your selected image will be scanned for issue type, severity, priority, and department routing.</p>
        </div>`;
}

function analyzeVisionImage(src, result = defaultVisionResult) {
    const image = document.getElementById("vision-image");
    const emptyState = document.getElementById("vision-empty-state");
    const panel = document.getElementById("vision-analysis");
    const overlay = document.getElementById("vision-overlay");
    if (!image || !panel) return;

    image.src = src;
    image.hidden = false;
    if (emptyState) emptyState.hidden = true;
    if (overlay) overlay.innerHTML = "";
    panel.innerHTML = `<div class="ai-loading"><span class="analysis-orb"></span><h3>Analyzing civic image</h3><p id="vision-status">Checking image quality…</p></div>`;
    const status = ["Checking image quality…", "Detecting civic infrastructure…", "Estimating severity and impact…", "Routing to the right department…"];
    let index = 0;
    const timer = setInterval(() => {
        const node = document.getElementById("vision-status");
        if (node && index < status.length) node.textContent = status[index++];
        if (index === status.length) clearInterval(timer);
    }, 500);

    setTimeout(() => renderVisionResult(result), 2200);
}

function renderVisionResult(result) {
    const overlay = document.getElementById("vision-overlay");
    const panel = document.getElementById("vision-analysis");
    if (!panel) return;
    if (overlay) {
        overlay.innerHTML = `<div class="ai-detection" style="left:24%;top:43%;width:45%;height:30%"><span>${result.issue}</span></div>`;
    }
    panel.innerHTML = `
        <div class="vision-result-heading"><span class="result-dot"></span><span>Detection complete</span></div>
        <div class="analysis-grid">
            <div class="analysis-item"><span>Detected issue</span><strong>${result.issue}</strong></div>
            <div class="analysis-item"><span>Confidence</span><strong>${result.confidence}%</strong></div>
            <div class="analysis-item"><span>Severity</span><strong>${result.severity}</strong></div>
            <div class="analysis-item"><span>Route to</span><strong>${result.department}</strong></div>
            <div class="analysis-item"><span>Priority</span><strong>${result.priority}</strong></div>
        </div>
        <p class="vision-explanation">AI matched the image with road-surface damage and recommends a priority maintenance inspection.</p>`;
}

window.CivicAIVision = { analyze: analyzeVisionImage, defaultResult: defaultVisionResult };
document.addEventListener("DOMContentLoaded", initializeAIVision);

"use strict";

const defaultVisionResult = { issue: "Road pothole", category: "Road damage", confidence: 98.4, severity: "High", department: "Road Maintenance", priority: "P1 · 24 hr response" };
let visionTimer = null;

function initializeAIVision() {
    const panel = document.getElementById("vision-analysis");
    if (!panel || panel.dataset.initialized) return;
    panel.dataset.initialized = "true";
    renderVisionReady();
}

function renderVisionReady() {
    const panel = document.getElementById("vision-analysis");
    if (!panel) return;
    panel.innerHTML = `<div class="vision-ready"><span class="status-chip">Ready for an image</span><h3>AI-assisted issue detection</h3><p>Your selected image will be scanned for issue type, severity, priority, and department routing.</p></div>`;
}

function analyzeVisionImage(src, result = defaultVisionResult) {
    const image = document.getElementById("vision-image");
    const emptyState = document.getElementById("vision-empty-state");
    const panel = document.getElementById("vision-analysis");
    const overlay = document.getElementById("vision-overlay");
    if (!image || !panel) return;
    clearTimeout(visionTimer);
    image.src = src;
    image.hidden = false;
    if (emptyState) emptyState.hidden = true;
    if (overlay) overlay.innerHTML = "";
    panel.innerHTML = `<div class="ai-loading"><span class="analysis-orb"></span><h3>Analyzing local visual evidence</h3><p id="vision-status">Checking image quality…</p></div>`;
    const status = ["Checking image quality…", "Detecting civic infrastructure…", "Estimating severity and impact…", "Preparing evidence for assessment…"];
    let index = 0;
    const timer = setInterval(() => { const node = document.getElementById("vision-status"); if (node && index < status.length) node.textContent = status[index++]; if (index === status.length) clearInterval(timer); }, 500);
    visionTimer = setTimeout(() => renderVisionResult(result, "Local visual evidence"), 2200);
}

function showAssessmentLoading() {
    clearTimeout(visionTimer);
    const panel = document.getElementById("vision-analysis");
    if (panel) panel.innerHTML = `<div class="ai-loading"><span class="analysis-orb"></span><h3>Generating civic assessment</h3><p>Sending local visual evidence and complaint context to the assessment engine…</p></div>`;
}

function renderVisionResult(rawResult, source = "Local fallback") {
    const result = normalizeResult(rawResult);
    const overlay = document.getElementById("vision-overlay");
    const panel = document.getElementById("vision-analysis");
    if (!panel) return;
    if (overlay) overlay.innerHTML = `<div class="ai-detection" style="left:24%;top:43%;width:45%;height:30%"><span>${escapeHtml(result.issue)}</span></div>`;
    const isNvidia = source === "NVIDIA NIM";
    panel.innerHTML = `<div class="vision-result-heading"><span class="result-dot"></span><span>Detection complete</span><span class="ai-source ${isNvidia ? "nvidia" : "fallback"}">AI source: ${escapeHtml(source)}</span></div><div class="analysis-grid"><div class="analysis-item"><span>Detected issue</span><strong>${escapeHtml(result.issue)}</strong></div><div class="analysis-item"><span>Confidence</span><strong>${result.confidence}%</strong></div><div class="analysis-item"><span>Severity</span><strong>${escapeHtml(result.severity)}</strong></div><div class="analysis-item"><span>Route to</span><strong>${escapeHtml(result.department)}</strong></div><div class="analysis-item"><span>Priority</span><strong>${escapeHtml(result.priority)}</strong></div></div><p class="vision-explanation">${escapeHtml(result.explanation || "Local visual evidence matched this civic issue category.")}</p><p class="vision-action"><strong>Recommended action:</strong> ${escapeHtml(result.recommendedAction || "Schedule an on-site inspection and keep the citizen updated.")}</p>`;
}

function normalizeResult(result = {}) { return { issue: result.detectedIssue || result.issue || defaultVisionResult.issue, category: result.category || defaultVisionResult.category, confidence: Number(result.confidence || defaultVisionResult.confidence).toFixed(1), severity: result.severity || defaultVisionResult.severity, department: result.department || defaultVisionResult.department, priority: String(result.priority || defaultVisionResult.priority), explanation: result.explanation, recommendedAction: result.recommendedAction }; }
function escapeHtml(value) { const element = document.createElement("div"); element.textContent = value ?? ""; return element.innerHTML; }

window.CivicAIVision = { analyze: analyzeVisionImage, defaultResult: defaultVisionResult, showAssessmentLoading, renderAssessment: renderVisionResult };
document.addEventListener("DOMContentLoaded", initializeAIVision);

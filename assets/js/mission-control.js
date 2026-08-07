"use strict";

function initializeMissionControl() {
    const stream = document.getElementById("thinking-stream");
    const panel = document.getElementById("decision-panel");
    if (!stream || !panel || stream.dataset.initialized) return;
    stream.dataset.initialized = "true";
    panel.innerHTML = `<div class="analysis-result-card"><div class="success-icon">⌁</div><h3>Standing by</h3><p>Submit a complaint above to watch the AI route it to the responsible department.</p></div>`;
}

function runComplaintWorkflow({ title, complaintId, result }) {
    const stream = document.getElementById("thinking-stream");
    const panel = document.getElementById("decision-panel");
    if (!stream || !panel) return;
    const steps = [
        `Received ${complaintId}: ${title}`,
        `Vision identified ${result.issue} at ${result.confidence}% confidence`,
        `Severity assessed as ${result.severity}`,
        `Priority ${result.priority} assigned`,
        `Routing to ${result.department}`,
        "Officer assignment queue created"
    ];
    stream.innerHTML = "";
    panel.innerHTML = `<div class="analysis-result-card"><div class="success-icon">⌁</div><h3>AI processing</h3><p>Building an explainable response plan.</p></div>`;
    steps.forEach((step, index) => setTimeout(() => {
        const line = document.createElement("div");
        line.className = "thinking-line";
        line.textContent = step;
        stream.appendChild(line);
        stream.scrollTop = stream.scrollHeight;
        if (index === steps.length - 1) {
            panel.innerHTML = `<div class="analysis-result-card"><div class="success-icon">✓</div><h3>Response plan ready</h3><p><strong>${result.department}</strong> has received ${complaintId}.</p><ul><li>Issue: ${result.issue}</li><li>Priority: ${result.priority}</li><li>Status: Officer assignment in progress</li><li>Citizen update: within 24 hours</li></ul></div>`;
        }
    }, index * 480));
}

window.CivicAIMissionControl = { runComplaintWorkflow };
document.addEventListener("DOMContentLoaded", initializeMissionControl);

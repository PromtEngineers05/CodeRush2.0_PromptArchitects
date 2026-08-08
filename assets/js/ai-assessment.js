"use strict";

async function assessCivicIssue({ visualEvidence, complaint }) {
    const fallback = { assessment: localAssessment(visualEvidence), source: "Local fallback" };
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8500);
        const response = await fetch("/api/assess", { method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal, body: JSON.stringify({ visualEvidence, complaint }) });
        clearTimeout(timeout);
        if (!response.ok) throw new Error("Assessment proxy unavailable");
        const data = await response.json();
        if (!isValidAssessment(data?.assessment)) throw new Error("Assessment response invalid");
        return { assessment: data.assessment, source: "NVIDIA NIM" };
    } catch (error) {
        console.warn("Using local civic assessment fallback:", error.message);
        return fallback;
    }
}

function localAssessment(evidence = {}) {
    return { detectedIssue: evidence.issue || "Civic issue", category: evidence.category || evidence.issue || "General civic issue", confidence: Number(evidence.confidence || 0), severity: evidence.severity || "Medium", priority: String(evidence.priority || "P2").split(" ")[0], department: evidence.department || "Civic Operations", explanation: "Local visual-analysis evidence matched this civic issue category.", recommendedAction: "Schedule an on-site inspection and keep the citizen updated." };
}

function isValidAssessment(value) { return value && ["P1", "P2", "P3"].includes(value.priority) && Number.isFinite(Number(value.confidence)) && ["detectedIssue", "category", "severity", "department", "explanation", "recommendedAction"].every(key => typeof value[key] === "string" && value[key].trim()); }

window.CivicAIAssessment = { assess: assessCivicIssue, localAssessment };

"use strict";

function initializeReport() {
    const form = document.getElementById("report-form");
    const uploadArea = document.getElementById("upload-area");
    const input = document.getElementById("complaint-image");
    const preview = document.getElementById("image-preview");
    const analysis = document.getElementById("analysis-container");
    const location = document.getElementById("location");
    const locationButton = document.getElementById("detect-location");
    const voiceButton = document.getElementById("voice-btn");
    if (!form || form.dataset.initialized) return;
    form.dataset.initialized = "true";

    let selectedImage = "";
    const demoResult = window.CivicAIVision?.defaultResult || {
        issue: "Road pothole", category: "Road damage", confidence: 98.4,
        severity: "High", department: "Road Maintenance", priority: "P1 · 24 hr response"
    };

    const setImage = file => {
        if (!file || !file.type.startsWith("image/")) {
            CivicUtils?.toast?.("Please choose an image file.", "error");
            return;
        }
        const reader = new FileReader();
        reader.onload = event => {
            selectedImage = event.target.result;
            preview.classList.add("active");
            preview.innerHTML = `<div class="preview-wrapper"><img src="${selectedImage}" alt="Selected civic issue"><div id="ai-overlay" class="ai-overlay"></div><div id="scan-line" class="scan-line active"></div></div>`;
            analysis.innerHTML = `<div class="waiting-ai"><div class="ai-brain">⌁</div><h3>Image ready</h3><p>Press “Analyze with AI” to detect the civic issue and prepare your complaint.</p></div>`;
            window.CivicAIVision?.analyze(selectedImage, demoResult);
            setTimeout(() => document.getElementById("scan-line")?.classList.remove("active"), 2300);
        };
        reader.readAsDataURL(file);
    };

    uploadArea.addEventListener("click", () => input.click());
    input.addEventListener("change", event => setImage(event.target.files[0]));
    ["dragenter", "dragover"].forEach(name => uploadArea.addEventListener(name, event => {
        event.preventDefault(); uploadArea.classList.add("dragging");
    }));
    ["dragleave", "drop"].forEach(name => uploadArea.addEventListener(name, event => {
        event.preventDefault(); uploadArea.classList.remove("dragging");
    }));
    uploadArea.addEventListener("drop", event => setImage(event.dataTransfer.files[0]));

    locationButton.addEventListener("click", () => {
        location.value = "Locating…";
        if (!navigator.geolocation) { location.value = "Near your current location"; return; }
        navigator.geolocation.getCurrentPosition(
            pos => location.value = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`,
            () => location.value = "Near your current location"
        );
    });

    voiceButton.addEventListener("click", () => {
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Recognition) { CivicUtils?.toast?.("Voice input is not available in this browser.", "error"); return; }
        const recognition = new Recognition();
        recognition.lang = "en-IN";
        voiceButton.textContent = "Listening…";
        recognition.onresult = event => document.getElementById("description").value = event.results[0][0].transcript;
        recognition.onend = () => voiceButton.textContent = "🎤 Voice";
        recognition.start();
    });

    form.addEventListener("submit", async event => {
        event.preventDefault();
        const session = CivicComplaintStore.getSession();
        if (!session || session.role !== "citizen") {
            CivicUtils?.toast?.("Choose the Citizen demo role before submitting a report.", "error");
            window.CivicDemoAuth?.open();
            return;
        }
        const title = document.getElementById("title").value.trim() || "Road pothole reported";
        const description = document.getElementById("description").value.trim() || "AI Vision identified a road-surface hazard requiring inspection.";
        const complaintId = `CIV-${String(Date.now()).slice(-6)}`;
        const submitButton = form.querySelector('[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Submitting complaint…";
        analysis.innerHTML = `<div class="submission-progress"><span class="analysis-orb"></span><h3>Creating your complaint</h3><p>AI is attaching the detection, severity and department route.</p></div>`;
        window.CivicAIVision?.showAssessmentLoading();
        const outcome = await window.CivicAIAssessment?.assess({
            visualEvidence: demoResult,
            complaint: { title, description, location: location.value || "Location pending" }
        }) || { assessment: { detectedIssue: demoResult.issue, category: demoResult.category, confidence: demoResult.confidence, severity: demoResult.severity, priority: demoResult.priority.split(" ")[0], department: demoResult.department, explanation: "Local visual-analysis evidence matched this civic issue category.", recommendedAction: "Schedule an on-site inspection and keep the citizen updated." }, source: "Local fallback" };
        const assessment = outcome.assessment;
        const resolvedResult = {
            issue: assessment.detectedIssue,
            category: assessment.category,
            confidence: assessment.confidence,
            severity: assessment.severity,
            department: assessment.department,
            priority: assessment.priority,
            explanation: assessment.explanation,
            recommendedAction: assessment.recommendedAction
        };
        window.CivicAIVision?.renderAssessment(assessment, outcome.source);
        try {
            const complaint = CivicComplaintStore.create({
                id: complaintId,
                citizenId: session.userId,
                citizenName: session.name,
                title,
                description,
                category: resolvedResult.category,
                issue: resolvedResult.issue,
                confidence: resolvedResult.confidence,
                severity: resolvedResult.severity,
                department: resolvedResult.department,
                priority: resolvedResult.priority,
                aiSource: outcome.source,
                aiAnalysis: { explanation: resolvedResult.explanation, recommendedAction: resolvedResult.recommendedAction },
                status: "AI verified · awaiting assignment",
                location: location.value || "Location pending",
                eta: "Within 24 hours",
                timeline: ["Reported", "AI verified", "Officer assignment", "Resolution update"]
            });
            submitButton.disabled = false;
            submitButton.textContent = "Analyze with AI →";
            showTracking(analysis, { complaintId, title, description, location: complaint.location, result: resolvedResult });
            CivicUtils?.toast?.(`Complaint ${complaintId} submitted successfully`, "success");
            window.CivicAIMap?.addComplaint({ title, description, latitude: 19.076, longitude: 72.8777 });
            window.CivicAIMissionControl?.runComplaintWorkflow({ title, complaintId, result: resolvedResult });
            window.CivicRoleDashboards?.refresh();
        } catch (error) {
            submitButton.disabled = false;
            submitButton.textContent = "Analyze with AI →";
            CivicUtils?.toast?.("Unable to save complaint. Please try again.", "error");
        }
    });
}

function showTracking(container, complaint) {
    container.innerHTML = `
        <div class="tracking-card">
            <div class="tracking-success"><span>✓</span><div><p>Complaint submitted</p><h3>${complaint.complaintId}</h3></div></div>
            <div class="tracking-route"><span>AI route</span><strong>${complaint.result.department}</strong></div>
            <div class="tracking-timeline">
                <div class="done"><i>✓</i><span>Received</span><small>Just now</small></div>
                <div class="done"><i>✓</i><span>AI verified</span><small>${complaint.result.confidence}% confidence</small></div>
                <div class="current"><i>3</i><span>Officer assignment</span><small>In progress</small></div>
                <div><i>4</i><span>Resolution update</span><small>Expected within 24 hours</small></div>
            </div>
            <p class="tracking-note">Priority ${complaint.result.priority} · ${complaint.location}</p>
        </div>`;
}

document.addEventListener("DOMContentLoaded", initializeReport);

"use strict";

let selectedCitizenComplaintId = null;

function initializeRoleDashboards() {
    if (!document.getElementById("citizen-dashboard-content")) return;
    refreshRoleDashboards();
}

function refreshRoleDashboards() {
    renderCitizenDashboard();
    renderAuthorityDashboard();
}

function complaintsNewestFirst() {
    return CivicComplaintStore.getAll().slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function renderCitizenDashboard() {
    const root = document.getElementById("citizen-dashboard-content");
    if (!root) return;
    const session = CivicComplaintStore.getSession();
    if (!session || session.role !== "citizen") {
        root.innerHTML = dashboardAccessMessage("Citizen", "Sign in as a citizen to view your reports and live status updates.");
        bindOpenLogin(root);
        return;
    }
    const complaints = complaintsNewestFirst().filter(item => item.citizenId === session.userId);
    const active = complaints.find(item => item.id === selectedCitizenComplaintId) || complaints[0];
    if (!active) {
        root.innerHTML = dashboardAccessMessage("Citizen", "You have no reports yet. Start with an AI-assisted civic issue report.", "#report", "Report an issue");
        return;
    }
    root.innerHTML = `
        <div class="citizen-metrics">
            <div><span>Submitted</span><strong>${complaints.length}</strong><small>All your reports</small></div>
            <div><span>In progress</span><strong>${complaints.filter(item => !item.status.toLowerCase().includes("resolved")).length}</strong><small>Receiving updates</small></div>
            <div><span>AI verified</span><strong>${complaints.filter(item => item.confidence >= 90).length}</strong><small>High-confidence analysis</small></div>
        </div>
        <div class="citizen-workspace">
            <article class="role-card citizen-focus-card">
                <div class="role-card-top"><div><span class="role-kicker">Selected report · ${active.id}</span><h3>${escapeHtml(active.title)}</h3></div><span class="status-pill status-${statusClass(active.status)}">${escapeHtml(active.status)}</span></div>
                <p class="role-location">⌖ ${escapeHtml(active.location)} <span>•</span> ${formatTimestamp(active.createdAt)}</p>
                <div class="citizen-case-meta"><span>${escapeHtml(active.category || active.issue)}</span><span>${escapeHtml(active.priority)} · ${escapeHtml(active.severity || "Standard")}</span></div>
                ${renderCitizenUpdate(active)}
                ${renderTimeline(active)}
                <div class="citizen-card-footer"><span>Expected update: <strong>${escapeHtml(active.eta || "Within 24 hours")}</strong></span><a class="dashboard-link" href="#report">Report another issue →</a></div>
            </article>
            <aside class="role-card citizen-help-card"><span class="role-kicker">AI-assisted reporting</span><h3>Every report has a clear next step.</h3><p>CivicAI attaches the detected category, priority, and responsible department before your report reaches the city team.</p><a href="#report" class="secondary-btn">Start a new report</a></aside>
        </div>
        <div class="role-list-heading"><h3>All your complaints</h3><span>${complaints.length} reports</span></div>
        <div class="citizen-complaint-list">${complaints.map(item => `<button class="citizen-complaint-row" data-citizen-detail="${item.id}"><span class="complaint-icon">${issueSymbol(item.category)}</span><span class="complaint-copy"><strong>${escapeHtml(item.title)}</strong><small>${item.id} · ${escapeHtml(item.category || item.issue)} · ${formatTimestamp(item.createdAt)}</small></span><span class="status-pill status-${statusClass(item.status)}">${escapeHtml(item.status)}</span><span class="row-arrow">→</span></button>`).join("")}</div>`;
    root.querySelectorAll("[data-citizen-detail]").forEach(button => button.addEventListener("click", () => {
        selectedCitizenComplaintId = button.dataset.citizenDetail;
        renderCitizenDashboard();
    }));
}

function renderAuthorityDashboard() {
    const root = document.getElementById("authority-dashboard-content");
    if (!root) return;
    const session = CivicComplaintStore.getSession();
    if (!session || session.role !== "authority") {
        root.innerHTML = dashboardAccessMessage("Authority", "Sign in as Authority / Admin to manage the live complaint queue.");
        bindOpenLogin(root);
        return;
    }
    const complaints = complaintsNewestFirst();
    const selectedId = root.dataset.selectedId || complaints[0]?.id;
    const selected = complaints.find(item => item.id === selectedId) || complaints[0];
    root.innerHTML = `
        <div class="authority-metrics"><div><span>Incoming reports</span><strong>${complaints.length}</strong><small>Persisted demo queue</small></div><div><span>Priority response</span><strong>${complaints.filter(item => item.priority === "P1").length}</strong><small>P1 cases need attention</small></div><div><span>AI verification</span><strong>${averageConfidence(complaints)}%</strong><small>Average detection confidence</small></div><div><span>Resolved</span><strong>${complaints.filter(item => item.status.toLowerCase().includes("resolved")).length}</strong><small>Across all reports</small></div></div>
        <div class="authority-layout">
            <section class="role-card authority-queue"><div class="role-card-top"><div><span class="role-kicker">Newest first · AI prioritized</span><h3>Incoming complaints</h3></div><span class="queue-count">${complaints.length} total</span></div><div class="authority-complaint-list">${complaints.map(item => `<button class="authority-complaint-row ${item.priority === "P1" ? "is-priority" : ""}" data-authority-detail="${item.id}"><span class="priority-dot ${item.priority.toLowerCase()}">${escapeHtml(item.priority)}</span><span class="authority-row-copy"><strong>${escapeHtml(item.title)}</strong><small>${item.id} · ${escapeHtml(item.category || item.issue)} · ${formatTimestamp(item.createdAt)}</small></span><span class="status-pill status-${statusClass(item.status)}">${escapeHtml(item.status)}</span></button>`).join("")}</div></section>
            <aside class="role-card authority-detail" id="authority-detail">${selected ? authorityDetail(selected) : ""}</aside>
        </div>`;
    root.dataset.selectedId = selected?.id || "";
    root.querySelectorAll("[data-authority-detail]").forEach(button => button.addEventListener("click", () => {
        root.dataset.selectedId = button.dataset.authorityDetail;
        renderAuthorityDashboard();
    }));
    bindAuthorityActions(root, selected);
}

function dashboardAccessMessage(role, message, link = "", label = "Open demo login") {
    const action = link ? `<a class="primary-btn" href="${link}">${label}</a>` : `<button class="primary-btn" type="button" data-open-login>${label}</button>`;
    return `<div class="role-access-card role-card"><span class="role-kicker">${role} workspace</span><h3>Demo access required</h3><p>${message}</p>${action}</div>`;
}

function bindOpenLogin(root) { root.querySelector("[data-open-login]")?.addEventListener("click", () => window.CivicDemoAuth?.open()); }

function authorityDetail(item) {
    const latestTimelineEvent = Array.isArray(item.timeline) ? item.timeline[item.timeline.length - 1] : item.status;
    return `<span class="role-kicker">AI case detail · ${item.id}</span><div class="authority-detail-title"><h3>${escapeHtml(item.title)}</h3><span class="priority-tag ${item.priority.toLowerCase()}">${escapeHtml(item.priority)} priority</span></div><div class="ai-detection-summary"><span>AI Vision</span><strong>${escapeHtml(item.category || item.issue)}</strong><small>${item.confidence}% confidence</small></div><div class="authority-meta"><div><span>Reported by</span><strong>${escapeHtml(item.citizenName || "Citizen")}</strong></div><div><span>Severity & route</span><strong>${escapeHtml(item.severity || "Standard")} · ${escapeHtml(item.department)}</strong></div><div><span>Location</span><strong>⌖ ${escapeHtml(item.location)}</strong></div><div><span>Submitted</span><strong>${formatTimestamp(item.createdAt)}</strong></div></div>${renderAuthorityJourney(item, latestTimelineEvent)}<div class="authority-mini-map"><span class="map-pin">⌖</span><span>Ward-level location verified</span></div><label class="authority-status-label">Complaint status<select data-status-select>${statusOptions(item.status)}</select></label><div class="authority-actions"><button class="secondary-btn" type="button" data-locate>View on map</button><button class="primary-btn" type="button" data-save-status>Save status</button></div>`;
}

function renderAuthorityJourney(item, latestTimelineEvent) {
    const journey = [
        ["Citizen report", `${item.citizenName || "Citizen"} · ${formatTimestamp(item.createdAt)}`],
        ["AI verified", `${item.category || item.issue} · ${item.confidence}% confidence`],
        ["Routed", `${item.department} · ${item.priority} priority`],
        ["Resolution status", latestTimelineEvent]
    ];
    return `<section class="authority-journey" aria-label="Citizen to resolution journey"><div class="authority-journey-heading"><span>Live case journey</span><small>Citizen → AI → Authority → Resolution</small></div><ol>${journey.map(([label, detail], index) => `<li class="${index === 3 ? "current" : ""}"><i>${index < 3 ? "✓" : "4"}</i><span><strong>${escapeHtml(label)}</strong><small>${escapeHtml(detail)}</small></span></li>`).join("")}</ol></section>`;
}

function bindAuthorityActions(root, item) {
    if (!item) return;
    root.querySelector("[data-locate]")?.addEventListener("click", () => document.getElementById("map")?.scrollIntoView({ behavior: "smooth" }));
    root.querySelector("[data-save-status]")?.addEventListener("click", () => {
        const status = root.querySelector("[data-status-select]")?.value;
        if (!status) return;
        CivicComplaintStore.updateStatus(item.id, status);
        CivicUtils?.toast?.(`${item.id} updated to “${status}”`, "success");
        refreshRoleDashboards();
    });
}

function statusOptions(current) { return ["AI verified · awaiting assignment", "Inspection scheduled", "Assigned to field team", "Work in progress", "Resolved"].map(status => `<option ${status === current ? "selected" : ""}>${status}</option>`).join(""); }
function renderCitizenUpdate(item) { const hasAuthorityUpdate = Boolean(item.updatedAt); const message = hasAuthorityUpdate ? `${item.department} updated your case to “${item.status}”.` : `AI verified your report and routed it to ${item.department}.`; const time = hasAuthorityUpdate ? formatTimestamp(item.updatedAt) : "Just now"; return `<div class="citizen-update ${hasAuthorityUpdate ? "authority-update" : "ai-update"}"><span class="citizen-update-icon">${hasAuthorityUpdate ? "✓" : "⌁"}</span><span><strong>${hasAuthorityUpdate ? "Latest authority update" : "AI routing update"}</strong><small>${escapeHtml(message)} · ${time}</small></span></div>`; }
function renderTimeline(item) { const steps = ["Reported", "AI verified", "Officer assignment", "Resolution update"]; const status = item.status.toLowerCase(); const completed = status.includes("resolved") ? 4 : status.includes("progress") ? 3 : status.includes("assigned") || status.includes("inspection") ? 3 : 2; return `<div class="citizen-timeline">${steps.map((step, index) => `<div class="${index < completed ? "complete" : ""}"><i>${index < completed ? "✓" : index + 1}</i><span>${step}</span><small>${index === 0 ? formatTimestamp(item.createdAt) : index === 1 ? item.confidence + "% confidence" : index === 2 ? item.status : "Next update"}</small></div>`).join("")}</div>`; }
function statusClass(status) { const value = status.toLowerCase(); return value.includes("resolved") ? "resolved" : value.includes("assigned") ? "assigned" : "progress"; }
function averageConfidence(items) { return items.length ? (items.reduce((total, item) => total + Number(item.confidence || 0), 0) / items.length).toFixed(0) : 0; }
function formatTimestamp(value) { const date = new Date(value); return Number.isNaN(date.getTime()) ? "Recently" : date.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }); }
function issueSymbol(category = "") { return category.includes("Water") ? "≈" : category.includes("Street") ? "☼" : "◇"; }
function escapeHtml(value) { const element = document.createElement("div"); element.textContent = value ?? ""; return element.innerHTML; }

window.CivicRoleDashboards = { refresh: refreshRoleDashboards };
document.addEventListener("DOMContentLoaded", initializeRoleDashboards);

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

const CivicComplaintStore = {
    getAll,
    create,
    updateStatus,
    getSession,
    setSession,
    clearSession
};

const CivicAuthStore = {
    signUp,
    signIn,
    getSession,
    signOut,
    getAuthorityCredentials
};

const CIVIC_COMPLAINTS_KEY = "civic_complaints";
const CIVIC_SESSION_KEY = "civic_demo_session";
const CIVIC_USERS_KEY = "civic_users";
const CIVIC_AUTHORITY_ACCOUNT = {
    id: "authority-civicai",
    name: "CivicAI Authority",
    email: "authority@civicai.local",
    password: "CivicAI2026!",
    role: "authority"
};
const CIVIC_SEED_COMPLAINTS = [
    { id: "CIV-48291", citizenId: "sample-citizen", citizenName: "Sample Citizen", title: "Water leakage near Market Road", description: "Persistent water leakage reported near the market entrance.", category: "Water infrastructure", issue: "Water leakage", priority: "P2", severity: "Medium", status: "Inspection scheduled", location: "Market Road, Ward 12", createdAt: "2026-08-08T04:54:00.000Z", confidence: 96.8, department: "Water Works", eta: "Today, 4:00 PM", timeline: ["Reported", "AI verified", "Inspection scheduled", "Resolution update"] },
    { id: "CIV-48264", citizenId: "sample-citizen", citizenName: "Sample Citizen", title: "Broken streetlight at bus stop", description: "Streetlight has been out for two nights.", category: "Streetlight outage", issue: "Broken streetlight", priority: "P3", severity: "Low", status: "Assigned to field team", location: "Central Bus Stop, Ward 8", createdAt: "2026-08-07T13:15:00.000Z", confidence: 94.2, department: "Electrical Maintenance", eta: "Tomorrow", timeline: ["Reported", "AI verified", "Assigned to field team", "Resolution update"] },
    { id: "CIV-48193", citizenId: "sample-citizen", citizenName: "Sample Citizen", title: "Road surface damage near school", description: "A large road hazard is affecting the school approach road.", category: "Road damage", issue: "Road pothole", priority: "P1", severity: "High", status: "Work in progress", location: "Lake View School, Ward 4", createdAt: "2026-08-06T09:20:00.000Z", confidence: 98.4, department: "Road Maintenance", eta: "Within 24 hours", timeline: ["Reported", "AI verified", "Team dispatched", "Work in progress"] }
];

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

function getAll() {
    const complaints = load(CIVIC_COMPLAINTS_KEY, null);
    if (Array.isArray(complaints)) {
        const migrated = complaints.map(complaint => ({
            ...complaint,
            citizenId: complaint.citizenId === "demo-citizen" ? "sample-citizen" : complaint.citizenId,
            citizenName: complaint.citizenName || "Sample Citizen"
        }));
        if (JSON.stringify(migrated) !== JSON.stringify(complaints)) save(CIVIC_COMPLAINTS_KEY, migrated);
        return migrated;
    }
    save(CIVIC_COMPLAINTS_KEY, CIVIC_SEED_COMPLAINTS);
    return CIVIC_SEED_COMPLAINTS;
}

function create(complaint) {
    const complaints = getAll();
    const record = { ...complaint, createdAt: complaint.createdAt || new Date().toISOString() };
    save(CIVIC_COMPLAINTS_KEY, [record, ...complaints]);
    return record;
}

function updateStatus(id, status) {
    const updatedAt = new Date().toISOString();
    const complaints = getAll().map(complaint => {
        if (complaint.id !== id) return complaint;
        const timeline = Array.isArray(complaint.timeline) ? complaint.timeline.slice() : [];
        if (timeline[timeline.length - 1] !== status) timeline.push(status);
        return { ...complaint, status, timeline, updatedAt };
    });
    save(CIVIC_COMPLAINTS_KEY, complaints);
    return complaints.find(complaint => complaint.id === id);
}

function getSession() {
    const session = load(CIVIC_SESSION_KEY, null);
    if (!session) return null;
    const user = getUsers().find(entry => entry.id === session.userId && entry.role === session.role);
    if (!user) {
        clearSession();
        return null;
    }
    return { userId: user.id, name: user.name, email: user.email, role: user.role };
}

function setSession(session) {
    save(CIVIC_SESSION_KEY, session);
    return session;
}

function clearSession() {
    remove(CIVIC_SESSION_KEY);
}

function getUsers() {
    const users = load(CIVIC_USERS_KEY, null);
    if (Array.isArray(users)) return users;
    save(CIVIC_USERS_KEY, [CIVIC_AUTHORITY_ACCOUNT]);
    return [CIVIC_AUTHORITY_ACCOUNT];
}

function signUp({ name, email, password }) {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedName = String(name || "").trim();
    if (!normalizedName || !normalizedEmail || !password) throw new Error("Name, email, and password are required.");
    if (password.length < 6) throw new Error("Use a password with at least 6 characters.");
    const users = getUsers();
    if (users.some(user => user.email === normalizedEmail)) throw new Error("An account already exists for this email.");
    const user = { id: `citizen-${Date.now()}`, name: normalizedName, email: normalizedEmail, password, role: "citizen", createdAt: new Date().toISOString() };
    save(CIVIC_USERS_KEY, [...users, user]);
    return createSession(user);
}

function signIn({ email, password }) {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const user = getUsers().find(entry => entry.email === normalizedEmail && entry.password === password);
    if (!user) throw new Error("Email or password is incorrect.");
    return createSession(user);
}

function createSession(user) {
    const session = { userId: user.id, name: user.name, email: user.email, role: user.role };
    setSession(session);
    return session;
}

function signOut() { clearSession(); }

function getAuthorityCredentials() {
    return { email: CIVIC_AUTHORITY_ACCOUNT.email, password: CIVIC_AUTHORITY_ACCOUNT.password };
}

window.CivicStorage = CivicStorage;
window.CivicComplaintStore = CivicComplaintStore;
window.CivicAuthStore = CivicAuthStore;

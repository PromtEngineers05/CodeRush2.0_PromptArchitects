"use strict";

function initializeAuth() {
    const modal = document.getElementById("auth-modal");
    if (!modal || modal.dataset.initialized) return;
    modal.dataset.initialized = "true";
    modal.querySelectorAll("[data-auth-close]").forEach(button => button.addEventListener("click", closeAuth));
    modal.querySelector("[data-show-signup]")?.addEventListener("click", () => showAuthForm("signup"));
    modal.querySelector("[data-show-signin]")?.addEventListener("click", () => showAuthForm("signin"));
    modal.querySelector("#sign-in-form")?.addEventListener("submit", handleSignIn);
    modal.querySelector("#sign-up-form")?.addEventListener("submit", handleSignUp);
    applySession(CivicAuthStore.getSession());
}

function openAuth(mode = "signin") { showAuthForm(mode); const modal = document.getElementById("auth-modal"); if (modal) modal.hidden = false; }
function closeAuth() { const modal = document.getElementById("auth-modal"); if (modal) modal.hidden = true; clearAuthError(); }

function showAuthForm(mode) {
    const signIn = document.getElementById("sign-in-form");
    const signUp = document.getElementById("sign-up-form");
    const title = document.getElementById("auth-title");
    const copy = document.getElementById("auth-copy");
    if (!signIn || !signUp) return;
    const isSignUp = mode === "signup";
    signIn.hidden = isSignUp;
    signUp.hidden = !isSignUp;
    title.textContent = isSignUp ? "Create your citizen account" : "Welcome back";
    copy.textContent = isSignUp ? "Create a local citizen account to submit and track your civic reports." : "Sign in to continue to your civic workspace.";
    clearAuthError();
}

function handleSignIn(event) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
        const session = CivicAuthStore.signIn({ email: form.email.value, password: form.password.value });
        finishAuthentication(session);
    } catch (error) { showAuthError(error.message); }
}

function handleSignUp(event) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
        const session = CivicAuthStore.signUp({ name: form.name.value, email: form.email.value, password: form.password.value });
        finishAuthentication(session);
    } catch (error) { showAuthError(error.message); }
}

function finishAuthentication(session) {
    closeAuth();
    applySession(session);
    CivicUtils?.toast?.(`Signed in as ${session.name}`, "success");
    document.getElementById(session.role === "authority" ? "authority-dashboard" : "citizen-dashboard")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function logout() {
    CivicAuthStore.signOut();
    applySession(null);
    CivicUtils?.toast?.("You have been signed out", "success");
    openAuth();
}

function applySession(session) {
    document.body.dataset.demoRole = session?.role || "guest";
    const action = document.querySelector(".login-btn");
    if (action) {
        action.textContent = session ? `Logout (${session.role === "authority" ? "Admin" : session.name})` : "Sign In";
        action.onclick = event => { event.preventDefault(); session ? logout() : openAuth(); };
    }
    window.CivicRoleDashboards?.refresh();
}

function showAuthError(message) { const error = document.getElementById("auth-error"); if (error) error.textContent = message; }
function clearAuthError() { const error = document.getElementById("auth-error"); if (error) error.textContent = ""; }

window.CivicDemoAuth = { open: openAuth, logout, session: () => CivicAuthStore.getSession() };
document.addEventListener("DOMContentLoaded", initializeAuth);

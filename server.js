"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const NIM_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const NIM_MODEL = "nvidia/llama-3.3-nemotron-super-49b-v1.5";
const MIME_TYPES = { ".css": "text/css", ".html": "text/html", ".ico": "image/x-icon", ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".js": "application/javascript", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml" };

const server = http.createServer(async (request, response) => {
    if (request.method === "POST" && request.url === "/api/assess") return handleAssessment(request, response);
    if (request.method !== "GET" && request.method !== "HEAD") return sendJson(response, 405, { error: "Method not allowed" });
    serveStatic(request, response);
});

async function handleAssessment(request, response) {
    if (!process.env.NVIDIA_API_KEY) return sendJson(response, 503, { error: "NVIDIA assessment is not configured" });
    try {
        const payload = await readJson(request);
        const completion = await callNim(payload);
        const content = completion?.choices?.[0]?.message?.content;
        const assessment = normalizeAssessment(parseJsonContent(content));
        sendJson(response, 200, { assessment, source: "NVIDIA NIM" });
    } catch (error) {
        console.error("NVIDIA assessment failed:", error.message);
        sendJson(response, 502, { error: "NVIDIA assessment is temporarily unavailable" });
    }
}

async function callNim({ visualEvidence = {}, complaint = {} }) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
        const response = await fetch(NIM_URL, {
            method: "POST",
            headers: { "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`, "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
                model: NIM_MODEL,
                temperature: 0,
                max_tokens: 450,
                stream: false,
                messages: [
                    { role: "system", content: "You are CivicAI, a Smart City civic issue assessment assistant. /no_think Analyze only the provided structured civic issue evidence. Do not claim to have viewed an image and do not invent facts. Return JSON only with detectedIssue, category, confidence, severity, priority, department, explanation, recommendedAction. confidence must be a number from 0 to 100. priority must be P1, P2, or P3." },
                    { role: "user", content: JSON.stringify({ note: "The following is evidence from a local visual-analysis pipeline, not raw image input.", visualEvidence, complaintContext: complaint }) }
                ]
            })
        });
        if (!response.ok) throw new Error(`NIM returned ${response.status}`);
        return response.json();
    } finally { clearTimeout(timeout); }
}

function normalizeAssessment(value) {
    if (!value || typeof value !== "object") throw new Error("NIM returned invalid JSON");
    const text = field => String(value[field] || "").trim();
    const confidence = Number(value.confidence);
    const priority = text("priority").toUpperCase();
    if (!text("detectedIssue") || !text("category") || !text("severity") || !text("department") || !text("explanation") || !text("recommendedAction") || !["P1", "P2", "P3"].includes(priority) || !Number.isFinite(confidence)) throw new Error("NIM assessment is incomplete");
    return { detectedIssue: text("detectedIssue"), category: text("category"), confidence: Math.max(0, Math.min(100, confidence)), severity: text("severity"), priority, department: text("department"), explanation: text("explanation"), recommendedAction: text("recommendedAction") };
}

function parseJsonContent(content) {
    const raw = String(content || "").trim().replace(/^```json\s*|^```\s*|\s*```$/g, "");
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start < 0 || end < start) throw new Error("NIM did not return JSON");
    return JSON.parse(raw.slice(start, end + 1));
}

function readJson(request) {
    return new Promise((resolve, reject) => {
        let body = "";
        request.on("data", chunk => { body += chunk; if (body.length > 50000) request.destroy(); });
        request.on("end", () => { try { resolve(JSON.parse(body || "{}")); } catch { reject(new Error("Invalid request JSON")); } });
        request.on("error", reject);
    });
}

function serveStatic(request, response) {
    const requestPath = decodeURIComponent(request.url.split("?")[0]);
    const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
    const filePath = path.resolve(ROOT, relativePath);
    if (!filePath.startsWith(ROOT + path.sep) && filePath !== path.join(ROOT, "index.html")) return sendJson(response, 403, { error: "Forbidden" });
    fs.readFile(filePath, (error, data) => {
        if (error) return sendJson(response, error.code === "ENOENT" ? 404 : 500, { error: "Not found" });
        response.writeHead(200, { "Content-Type": `${MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream"}; charset=utf-8`, "Cache-Control": "no-store" });
        response.end(request.method === "HEAD" ? undefined : data);
    });
}

function sendJson(response, status, body) { response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" }); response.end(JSON.stringify(body)); }

server.listen(PORT, () => console.log(`CivicAI local server running at http://localhost:${PORT}`));

import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const required = [
  "web/index.html", "web/styles.css", "web/js/app.js", "web/js/retrieval.js", "web/js/knowledge.js",
  "firebase.json", "README.md", "docs/ARCHITECTURE.md", "docs/TEST_PLAN.md", "docs/TRACEABILITY.md"
];

const failures = [];
for (const relative of required) {
  try { await stat(path.join(root, relative)); }
  catch { failures.push(`Missing required file: ${relative}`); }
}

const html = await readFile(path.join(root, "web/index.html"), "utf8");
const firebase = await readFile(path.join(root, "firebase.json"), "utf8");
const allSources = await Promise.all(["web/index.html", "web/js/app.js", "web/js/retrieval.js", "web/js/knowledge.js"].map(file => readFile(path.join(root, file), "utf8")));
const combined = allSources.join("\n");

const htmlChecks = [
  [/<html lang="en">/, "HTML language declaration"],
  [/name="viewport"/, "responsive viewport"],
  [/<form class="chat-form"/, "semantic chat form"],
  [/aria-live="polite"/, "ARIA live updates"],
  [/<label class="sr-only" for="message-input">/, "accessible input label"],
  [/prefers-reduced-motion/, "reduced-motion CSS hook in HTML/CSS is checked separately"]
];
for (const [pattern, label] of htmlChecks.slice(0, -1)) if (!pattern.test(html)) failures.push(`Missing ${label}`);

const css = await readFile(path.join(root, "web/styles.css"), "utf8");
if (!/prefers-reduced-motion/.test(css)) failures.push("Missing reduced-motion support");

const prohibited = [
  /sk-[A-Za-z0-9]{20,}/, /AIza[0-9A-Za-z\-_]{20,}/, /OPENAI_API_KEY/, /GEMINI_API_KEY/,
  /api\.openai\.com/, /generativelanguage\.googleapis\.com/, /api\.anthropic\.com/
];
for (const pattern of prohibited) if (pattern.test(combined)) failures.push(`Prohibited paid/API secret pattern found: ${pattern}`);

let parsed;
try { parsed = JSON.parse(firebase); } catch { failures.push("firebase.json is not valid JSON"); }
if (parsed?.hosting?.public !== "dist") failures.push("firebase.json should deploy dist");

if (failures.length) {
  console.error("Static checks failed:\n- " + failures.join("\n- "));
  process.exit(1);
}
console.log("Static checks passed: required files, accessibility hooks, Firebase config, and no paid-AI API/secret patterns detected.");

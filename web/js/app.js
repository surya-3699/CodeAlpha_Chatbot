import { retrieve } from "./retrieval.js";

const panel = document.querySelector("#chat-panel");
const launcher = document.querySelector(".chat-launcher");
const openButtons = document.querySelectorAll("[data-open-chat]");
const closeButton = document.querySelector("#close-chat");
const clearButton = document.querySelector("#clear-chat");
const form = document.querySelector("#chat-form");
const input = document.querySelector("#message-input");
const log = document.querySelector("#chat-log");
const typing = document.querySelector("#typing-row");
const quickActions = document.querySelector("#quick-actions");
const STORAGE_KEY = "codealpha-nova-chat-v1";
const MAX_HISTORY = 60;
let messages = [];
let previousFocus = null;

function nowLabel(date = new Date()) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function createMessageElement(message) {
  const article = document.createElement("article");
  article.className = `message ${message.role}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = message.text;

  const meta = document.createElement("div");
  meta.className = "message-meta";
  meta.textContent = `${message.role === "assistant" ? "Nova" : "You"} · ${message.time}`;

  article.append(bubble, meta);
  if (message.role === "assistant" && message.intent && message.intent !== "Welcome") {
    const matchMeta = document.createElement("div");
    matchMeta.className = "match-meta";
    matchMeta.textContent = message.intent === "Fallback"
      ? "No high-confidence knowledge match"
      : `Matched topic: ${message.intent}`;
    article.append(matchMeta);
  }
  return article;
}

function renderMessages() {
  log.textContent = "";
  for (const message of messages) log.append(createMessageElement(message));
  log.scrollTop = log.scrollHeight;
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)));
  } catch {
    // The chatbot remains fully functional if local storage is unavailable.
  }
}

function restore() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (Array.isArray(parsed)) messages = parsed.filter(item => item && ["user", "assistant"].includes(item.role) && typeof item.text === "string").slice(-MAX_HISTORY);
  } catch {
    messages = [];
  }
  if (!messages.length) {
    messages = [{
      role: "assistant",
      text: "Hi! I’m Nova. Ask me about pricing, trials, integrations, security, account help, billing, cancellations, refunds, support hours, or onboarding.",
      time: nowLabel(),
      intent: "Welcome"
    }];
  }
  renderMessages();
}

function openChat() {
  previousFocus = document.activeElement;
  panel.hidden = false;
  launcher.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => input.focus());
}

function closeChat() {
  panel.hidden = true;
  launcher.setAttribute("aria-expanded", "false");
  if (previousFocus instanceof HTMLElement) previousFocus.focus();
  else launcher.focus();
}

function resizeInput() {
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 112)}px`;
}

function addMessage(message) {
  messages.push(message);
  if (messages.length > MAX_HISTORY) messages = messages.slice(-MAX_HISTORY);
  log.append(createMessageElement(message));
  log.scrollTop = log.scrollHeight;
  persist();
}

async function sendMessage(rawText) {
  const text = String(rawText).trim().slice(0, 500);
  if (!text) return;

  addMessage({ role: "user", text, time: nowLabel() });
  input.value = "";
  resizeInput();
  input.disabled = true;
  form.querySelector("button[type='submit']").disabled = true;
  typing.hidden = false;
  log.scrollTop = log.scrollHeight;

  const started = performance.now();
  const result = retrieve(text);
  const elapsed = performance.now() - started;
  const delay = Math.max(120, Math.min(420, 220 - elapsed));
  await new Promise(resolve => setTimeout(resolve, delay));

  typing.hidden = true;
  addMessage({ role: "assistant", text: result.response, time: nowLabel(), intent: result.label });
  input.disabled = false;
  form.querySelector("button[type='submit']").disabled = false;
  input.focus();
}

for (const button of openButtons) button.addEventListener("click", openChat);
closeButton.addEventListener("click", closeChat);

clearButton.addEventListener("click", () => {
  const ok = window.confirm("Clear the conversation stored in this browser?");
  if (!ok) return;
  messages = [{ role: "assistant", text: "Conversation cleared. What can I help you with?", time: nowLabel(), intent: "Welcome" }];
  persist();
  renderMessages();
  input.focus();
});

form.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage(input.value);
});

input.addEventListener("keydown", event => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});
input.addEventListener("input", resizeInput);

quickActions.addEventListener("click", event => {
  const target = event.target.closest("button[data-prompt]");
  if (!target) return;
  openChat();
  sendMessage(target.dataset.prompt);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !panel.hidden) closeChat();
});

restore();

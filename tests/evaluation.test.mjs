import test from "node:test";
import assert from "node:assert/strict";
import { retrieve } from "../web/js/retrieval.js";

const evaluation = [
  ["hey nova", "greeting"],
  ["I need help please", "greeting"],
  ["tell me what the platform offers", "product_overview"],
  ["what are the core product features", "product_overview"],
  ["what is the monthly price", "pricing"],
  ["do you have a free plan", "pricing"],
  ["is there a fourteen day demo", "trial"],
  ["can I test the team version first", "trial"],
  ["can it connect with github", "integrations"],
  ["which external apps work with it", "integrations"],
  ["how do you handle privacy", "security"],
  ["does this chatbot send data to an api", "security"],
  ["cant access my account", "account_access"],
  ["need to reset my password", "account_access"],
  ["I need a payment receipt", "billing_invoice"],
  ["where are billing details", "billing_invoice"],
  ["turn off renewal", "cancel_subscription"],
  ["end the paid plan", "cancel_subscription"],
  ["need reimbursement for a mistaken charge", "refund"],
  ["what is your money back policy", "refund"],
  ["when can I speak with support", "support_hours"],
  ["what time is the support team available", "support_hours"],
  ["I found a bug in the app", "technical_support"],
  ["something is broken on the page", "technical_support"],
  ["new user setup guide", "onboarding"],
  ["help me start my first project", "onboarding"],
  ["goodbye nova", "thanks_goodbye"],
  ["great thank you", "thanks_goodbye"]
];

for (const [query, expected] of evaluation) {
  test(`evaluation: ${expected} ← ${query}`, () => {
    const result = retrieve(query);
    assert.equal(result.matched, true, JSON.stringify(result));
    assert.equal(result.intentId, expected, JSON.stringify(result));
  });
}

const unrelated = [
  "write a poem about a mountain",
  "what is the capital of japan",
  "solve 12 times 14",
  "who won the football match yesterday",
  "explain photosynthesis"
];

for (const query of unrelated) {
  test(`evaluation fallback ← ${query}`, () => {
    const result = retrieve(query);
    assert.equal(result.matched, false, JSON.stringify(result));
    assert.equal(result.intentId, "fallback");
  });
}

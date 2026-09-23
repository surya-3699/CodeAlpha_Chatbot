import test from "node:test";
import assert from "node:assert/strict";
import { retrieve, tokenize } from "../web/js/retrieval.js";

const cases = [
  ["Hello there", "greeting"],
  ["What does NovaDesk do?", "product_overview"],
  ["how much is the team subscription", "pricing"],
  ["can I try the product before paying", "trial"],
  ["does this connect to Slack or Google Drive", "integrations"],
  ["are my messages uploaded anywhere", "security"],
  ["I forgot my password and cannot sign in", "account_access"],
  ["where do I download my invoice", "billing_invoice"],
  ["please stop renewal of my subscription", "cancel_subscription"],
  ["I was charged by mistake and want my money back", "refund"],
  ["are you open on weekends", "support_hours"],
  ["the app shows an error and will not load", "technical_support"],
  ["how do I create my first workspace", "onboarding"],
  ["thanks that helped", "thanks_goodbye"]
];

for (const [query, expected] of cases) {
  test(`matches ${expected}: ${query}`, () => {
    const result = retrieve(query);
    assert.equal(result.matched, true, JSON.stringify(result));
    assert.equal(result.intentId, expected, JSON.stringify(result));
    assert.ok(result.confidence >= 0.32, JSON.stringify(result));
  });
}

test("handles common typo using character similarity", () => {
  const result = retrieve("whats the refnd polcy");
  assert.equal(result.matched, true, JSON.stringify(result));
  assert.equal(result.intentId, "refund", JSON.stringify(result));
});

test("handles pricing synonym normalization", () => {
  const result = retrieve("is this expensive and what does it cost");
  assert.equal(result.intentId, "pricing", JSON.stringify(result));
});

test("falls back for unrelated knowledge", () => {
  const result = retrieve("Explain the orbital period of Neptune in detail");
  assert.equal(result.matched, false, JSON.stringify(result));
  assert.equal(result.intentId, "fallback");
});

test("falls back for empty input", () => {
  const result = retrieve("   ");
  assert.equal(result.matched, false);
  assert.equal(result.confidence, 0);
});

test("tokenizer removes common stop words and normalizes synonyms", () => {
  const tokens = tokenize("What are the pricing plans for subscriptions?");
  assert.ok(tokens.includes("price"), tokens);
  assert.ok(tokens.includes("plan"), tokens);
  assert.ok(tokens.includes("subscription"), tokens);
  assert.ok(!tokens.includes("the"), tokens);
});

test("all matched responses are deterministic for the same query", () => {
  const first = retrieve("what are your prices");
  const second = retrieve("what are your prices");
  assert.equal(first.response, second.response);
});

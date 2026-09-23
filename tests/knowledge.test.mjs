import test from "node:test";
import assert from "node:assert/strict";
import { knowledgeBase } from "../web/js/knowledge.js";

const ids = knowledgeBase.map(item => item.id);

test("knowledge base contains at least 10 commercial support intents", () => {
  assert.ok(knowledgeBase.length >= 10);
});

test("intent ids are unique", () => {
  assert.equal(new Set(ids).size, ids.length);
});

test("every intent has enough training patterns, keywords and responses", () => {
  for (const intent of knowledgeBase) {
    assert.ok(intent.patterns.length >= 5, `${intent.id}: patterns`);
    assert.ok(intent.keywords.length >= 3, `${intent.id}: keywords`);
    assert.ok(intent.responses.length >= 1, `${intent.id}: responses`);
    assert.ok(intent.patterns.every(item => typeof item === "string" && item.trim().length > 0));
    assert.ok(intent.responses.every(item => typeof item === "string" && item.trim().length > 0));
  }
});

test("knowledge base does not include live secret placeholders", () => {
  const text = JSON.stringify(knowledgeBase);
  assert.doesNotMatch(text, /sk-[A-Za-z0-9]{20,}/);
  assert.doesNotMatch(text, /AIza[0-9A-Za-z\-_]{20,}/);
});

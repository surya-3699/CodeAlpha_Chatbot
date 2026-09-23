# Test Report — CodeAlpha Task 4 Chatbot

**Project:** CodeAlpha_Chatbot / Nova Support Assistant  
**Validation date:** 2026-09-23  
**Runtime:** Node.js 22.16.0 during package validation

## Result summary

| Area | Result |
|---|---|
| Automated Node test suite | **57 / 57 passed** |
| Commercial intent coverage | **14 topics implemented** |
| Additional paraphrase evaluation | Passed |
| Unrelated-query fallback evaluation | Passed |
| Typo-tolerance case | Passed |
| Synonym normalization | Passed |
| Deterministic-response test | Passed |
| Knowledge-base structure tests | Passed |
| Static accessibility/config/security checks | Passed |
| Production static build | Passed |
| Paid AI API dependency | **None** |
| API keys/secrets required | **None** |

## Automated coverage

The test suite includes:

- greeting;
- product information;
- pricing;
- free trial;
- integrations;
- security/privacy;
- account access;
- billing/invoices;
- cancellation;
- refunds;
- support hours;
- technical support;
- onboarding;
- thanks/goodbye;
- typo-heavy refund query;
- pricing synonym normalization;
- empty input;
- unrelated questions that must fall back;
- deterministic repeated-query response;
- knowledge-base minimum training coverage and unique intent IDs;
- common AI-key pattern checks.

## Expanded evaluation

A second group of paraphrased commercial-support questions was added after the first test pass. Two borderline but legitimate questions exposed a confidence-gating issue. The matcher was adjusted so high-confidence candidates can pass without requiring an unnecessarily large margin over the second candidate. The entire suite was then rerun and passed 57/57.

This is preferable to weakening tests: the failing cases were retained and are now permanent regression tests.

## Performance check

A local benchmark executed 500 retrievals across common support and fallback queries:

- total: ~17.9 seconds;
- average retrieval computation: **~35.8 ms/query**;
- external inference/network requests: **0**.

The visible UI intentionally adds a very short typing delay for natural interaction, but the retrieval itself is local.

## Static checks

`npm run static-check` verifies:

- required project/runtime files exist;
- language and viewport metadata are present;
- semantic chat form exists;
- chatbot input has an accessible label;
- ARIA live updates are present;
- reduced-motion CSS exists;
- `firebase.json` is valid and deploys `dist`;
- runtime sources do not contain common OpenAI/Gemini key formats;
- runtime sources do not call common paid generative-AI API endpoints.

## Build verification

`npm run build` successfully produces:

- `dist/index.html`
- `dist/404.html`
- `dist/styles.css`
- `dist/manifest.webmanifest`
- `dist/js/app.js`
- `dist/js/knowledge.js`
- `dist/js/retrieval.js`

## Remaining live checks

The automated environment cannot substitute for final human browser and cloud checks. Before CodeAlpha submission, execute the manual cases in `docs/TEST_PLAN.md` on:

1. Firebase preview URL;
2. production Firebase URL;
3. desktop browser;
4. phone or responsive device mode.

Capture those results in the `evidence/` folder.


## CloudDedup visual-system regression pass

Before live Task 4 testing, the site styling was migrated to the same visual system used by the completed CloudDedup Task 1 project: deep black radial background, subtle dotted ambient texture, liquid-glass cards, blue/violet gradient actions, soft borders/shadows, and matching focus/reduced-motion behavior.

After the CSS migration:

- the full retrieval/knowledge suite passed **57/57** again;
- static accessibility/security/configuration checks passed;
- a fresh production build passed;
- `dist/styles.css` was verified to match the updated source stylesheet;
- no chatbot JavaScript/retrieval logic was changed.

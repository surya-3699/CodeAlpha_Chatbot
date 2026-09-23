# Architecture — CodeAlpha Task 4: Making a Chatbot

## Goal

This project implements a **retrieval-based commercial support chatbot** with no paid AI API, no API key, and no backend dependency. It is designed to satisfy CodeAlpha Cloud Computing **Task 4: Making a Chatbot** while remaining simple to deploy on static cloud hosting.

## Runtime architecture

```text
Visitor
  │
  ▼
Integrated website chat widget
  │
  ├─ normalize + tokenize
  ├─ synonym normalization
  ├─ TF-IDF term weighting
  ├─ cosine similarity
  ├─ character-trigram Dice similarity (typo tolerance)
  └─ keyword/phrase signals
  │
  ▼
Rank predefined commercial-support patterns
  │
  ├─ confidence >= threshold ──► reviewed response
  └─ confidence < threshold  ──► safe fallback
  │
  ▼
Browser UI + optional localStorage history
```

## Why retrieval-based

The CodeAlpha task permits either retrieval-based or generative models. A retrieval design is appropriate here because it:

- uses predefined commercial support patterns as explicitly requested by the task;
- provides deterministic, testable answers;
- avoids hallucinating unsupported policies;
- requires no paid inference API or secret key;
- runs quickly on static hosting and low-resource devices.

## Retrieval scoring

For each knowledge-base intent, the engine evaluates the best matching pattern and combines:

1. **TF-IDF + cosine similarity** for semantic term overlap;
2. **character trigram Dice similarity** for mild typo tolerance;
3. **keyword coverage** for high-value commercial support terms;
4. **exact phrase bonus** when a known pattern is explicitly present.

A minimum confidence threshold and separation rule reduce weak matches. Low-confidence questions produce a bounded fallback rather than an invented answer.

## Data and privacy

No chatbot message is sent to an external AI API. Conversation history is stored only in the browser's `localStorage`, capped to a small number of messages, and can be cleared using the chat UI. The project contains no authentication secret, cloud credential, database password, or model API key.

## Deployment

The generated `dist/` directory is static HTML/CSS/JavaScript and can be hosted on Firebase Hosting, GitHub Pages, Cloudflare Pages, Netlify, or any static web server. The included configuration targets Firebase Hosting because it provides SSL and a CDN for static apps.

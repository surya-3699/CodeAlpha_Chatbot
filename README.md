
---

## 2. `CodeAlpha_Chatbot` → `README.md`

```markdown
# NovaDesk Support Chatbot

Nova is a retrieval-based customer support chatbot developed as part of the CodeAlpha Cloud Computing Internship.

The chatbot provides instant responses to common commercial support questions using predefined knowledge patterns and local text-matching techniques. It runs entirely in the browser and does not require a paid AI API or API key.

## Live Demo

https://codealpha-chatbot-20260923.web.app

## Overview

Nova is designed as a lightweight customer-support assistant that can be embedded into a website.

Instead of sending messages to an external AI service, the chatbot processes queries locally and retrieves the most relevant response from a predefined commercial support knowledge base.

The project demonstrates retrieval-based conversational AI while remaining free to run and simple to deploy.

## Features

- Retrieval-based customer support chatbot
- Instant browser-based responses
- No paid AI API
- No API keys
- TF-IDF text matching
- Cosine similarity
- Fuzzy matching for minor spelling mistakes
- Confidence-based response selection
- Safe fallback for unsupported questions
- Predefined commercial support knowledge
- Quick suggestion buttons
- Conversation history
- Clear chat option
- Keyboard-friendly interaction
- Responsive desktop and mobile interface
- Firebase Hosting deployment

## Supported Topics

Nova can answer questions related to:

- Pricing
- Free trials
- Product information
- Integrations
- Security and privacy
- Account access
- Billing
- Cancellation
- Refunds
- Support hours
- Technical support
- Onboarding
- Greetings
- General support

## Tech Stack

- HTML5
- CSS3
- JavaScript
- TF-IDF
- Cosine Similarity
- Fuzzy String Matching
- Node.js for development scripts and testing
- Firebase Hosting

## How It Works

```text
User enters a question
        ↓
Text is normalized
        ↓
Query features are generated
        ↓
TF-IDF + similarity matching
        ↓
Knowledge patterns are compared
        ↓
Confidence score is calculated
        ↓
 ┌──────────────────┬───────────────────┐
 │ Strong Match     │ Low Confidence    │
 └──────────────────┴───────────────────┘
          ↓                   ↓
 Return matched answer     Safe fallback
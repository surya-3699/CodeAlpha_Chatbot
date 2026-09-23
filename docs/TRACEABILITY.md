# CodeAlpha Task 4 Traceability

| CodeAlpha requirement | Implementation | Verification |
|---|---|---|
| Design an AI-powered chatbot using retrieval-based or generative models | Retrieval engine in `web/js/retrieval.js` using TF-IDF, cosine similarity, typo-tolerant character similarity and keyword signals | `tests/retrieval.test.mjs` |
| Enable instant responses to user queries on websites | Integrated floating chat widget in `web/index.html`; matching executes locally in the browser | Manual browser test + performance is local/no network inference |
| Train the chatbot with predefined input patterns for commercial use | 14 commercial-support intents and many predefined patterns in `web/js/knowledge.js` | `tests/knowledge.test.mjs` |
| Integrate chatbot seamlessly with target website interface | NovaDesk commercial demo website plus responsive chat panel, quick actions, mobile layout | Manual desktop/mobile test |
| Optimize and test for accuracy and user engagement | confidence threshold, fallback, typo handling, suggestions, chat history, keyboard support, automated intent tests | `npm run check` and `docs/TEST_PLAN.md` |

## Evidence to capture before submission

1. Desktop homepage with integrated chat launcher.
2. Chatbot correctly answering a pricing question.
3. Chatbot correctly answering a refund or cancellation question.
4. Typo/noise query still matching the correct intent.
5. Unrelated question triggering the safe fallback.
6. Mobile/responsive chatbot screenshot.
7. Terminal showing `npm run check` passing.
8. Firebase preview deployment output.
9. Firebase production deployment output and live URL.

# Test Plan

## Automated tests

Run:

```bash
npm run check
```

The suite verifies:

- all 14 intended support topics;
- typo tolerance;
- synonym normalization;
- fallback behavior for unrelated input;
- empty-query fallback;
- deterministic responses;
- intent ID uniqueness;
- minimum pattern/keyword coverage;
- absence of common AI-key formats;
- expected HTML accessibility hooks;
- valid Firebase configuration;
- absence of paid-AI API endpoints in runtime sources.

## Manual functional acceptance

Open the built site and test these prompts:

| Prompt | Expected topic |
|---|---|
| `Hello` | Greeting |
| `How much does the Team plan cost?` | Pricing |
| `Can I try it for free?` | Free trial |
| `Does it connect to Slack?` | Integrations |
| `Are my messages uploaded?` | Security/privacy |
| `I forgot my password` | Account access |
| `Where is my invoice?` | Billing |
| `Stop my subscription renewal` | Cancellation |
| `I was charged by mistake` | Refund |
| `Are you open on weekends?` | Support hours |
| `The app will not load` | Technical support |
| `How do I get started?` | Onboarding |
| `Explain Neptune's orbit` | Fallback |

## UI/accessibility checks

- Tab through all interactive controls.
- Verify visible keyboard focus.
- Press Enter to send a message and Shift+Enter for a newline.
- Press Escape to close the chatbot.
- Confirm chat updates are exposed through a polite live region.
- Confirm mobile layout at 320–430 px widths.
- Confirm no horizontal page overflow.
- Enable reduced motion at OS/browser level and confirm animations are minimized.
- Clear conversation and verify browser-local chat history is removed.

## Deployment acceptance

1. `npm run check`
2. `npm run build`
3. Confirm `dist/index.html` exists.
4. Firebase preview deploy.
5. Repeat functional tests on preview URL.
6. Deploy to live Hosting.
7. Repeat greeting, pricing, fallback, and mobile smoke tests on production URL.

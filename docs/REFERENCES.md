# Research and Public Repository References

These sources were reviewed for architecture, interaction, accessibility, NLP concepts, and deployment practices. The project code in this submission was written specifically for this task and does not copy source code from these repositories.

## Public GitHub repositories

- **RasaHQ/rasa** — open-source conversational AI framework; useful as a reference for intent/conversation architecture.  
  https://github.com/RasaHQ/rasa

- **NaturalNode/natural** — JavaScript NLP project with TF-IDF and string-distance facilities; useful as a reference that TF-IDF, n-grams, and similarity metrics are established NLP techniques in the JS ecosystem.  
  https://github.com/NaturalNode/natural

- **microsoft/BotFramework-WebChat** / Bot Framework ecosystem — reference for production chat UI concepts, message activities, testing, and embeddable web chat patterns.  
  https://github.com/microsoft/BotFramework-WebChat  
  https://github.com/microsoft/botframework-sdk

- **muhammadhassan-web/ai-support-chatbot** — public customer-support widget example with a knowledge-base concept and a zero-key fallback mode. This project was reviewed only for high-level product/widget ideas; its LLM API integrations are deliberately not used here.  
  https://github.com/muhammadhassan-web/ai-support-chatbot

- **realtuku/ai-customer-support** — public self-hosted support project emphasizing privacy and local processing. Reviewed for high-level self-hosted/privacy ideas only.  
  https://github.com/realtuku/ai-customer-support

## Official web references

- Firebase Hosting documentation: https://firebase.google.com/docs/hosting/
- Firebase Hosting preview/deploy workflow: https://firebase.google.com/docs/hosting/test-preview-deploy
- MDN ARIA live regions: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions
- MDN semantic form guidance: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/form_role

## Design decision

Some public chatbot repositories rely on external LLM services. This submission intentionally does **not** use those integrations because the project goal is a no-cost, no-key deployment. The retrieval engine is local and deterministic.

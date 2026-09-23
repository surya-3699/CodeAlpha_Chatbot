export const knowledgeBase = [
  {
    id: "greeting",
    label: "Greeting",
    patterns: [
      "hello", "hi", "hey", "good morning", "good afternoon", "good evening",
      "is anyone there", "can you help me", "i need some help"
    ],
    keywords: ["hello", "hi", "hey", "help"],
    responses: [
      "Hi! I’m Nova, the NovaDesk support assistant. I can help with pricing, trials, features, integrations, security, accounts, billing, cancellations, refunds, and support hours.",
      "Hello! Ask me anything about the NovaDesk demo—pricing, trial access, integrations, account help, refunds, or technical support."
    ]
  },
  {
    id: "product_overview",
    label: "Product information",
    patterns: [
      "what is novadesk", "tell me about your product", "what does your software do", "what can novadesk do",
      "product information", "what are the main features", "describe the service", "what do you offer"
    ],
    keywords: ["product", "software", "feature", "offer", "service", "novadesk"],
    responses: [
      "NovaDesk is a fictional team-productivity service used for this chatbot demo. It represents a commercial SaaS product with project organization, collaboration, integrations, and support workflows.",
      "This demo models NovaDesk as a collaboration platform for organizing projects, coordinating teams, and connecting common workplace tools."
    ]
  },
  {
    id: "pricing",
    label: "Pricing",
    patterns: [
      "how much does it cost", "what are your prices", "pricing plans", "show me the plans", "how much is the team plan",
      "cost per user", "is there a free plan", "which subscription plans are available", "price of business plan"
    ],
    keywords: ["price", "pricing", "cost", "plan", "subscription", "free", "team", "business"],
    responses: [
      "For this demo, NovaDesk has three example plans: Starter is free, Team is $12 per user/month, and Business uses custom pricing. These prices are fictional project content, not a real commercial offer.",
      "The demo pricing is Starter: Free, Team: $12/user/month, and Business: Custom. The values are illustrative so the chatbot can answer commercial pricing questions."
    ]
  },
  {
    id: "trial",
    label: "Free trial",
    patterns: [
      "do you offer a free trial", "can i try it for free", "is there a trial", "how long is the trial",
      "free demo access", "can i test the team plan", "try before buying"
    ],
    keywords: ["trial", "try", "free", "demo", "test"],
    responses: [
      "Yes. In this demo knowledge base, the Team plan includes a 14-day free trial and does not require a payment method to start.",
      "You can try the fictional Team plan for 14 days at no cost. No payment details are required in this project scenario."
    ]
  },
  {
    id: "integrations",
    label: "Integrations",
    patterns: [
      "what integrations do you support", "does it connect with google drive", "can i connect slack", "integration options",
      "connect external apps", "github integration", "calendar integration", "what apps can i connect"
    ],
    keywords: ["integration", "connect", "slack", "github", "drive", "calendar", "apps"],
    responses: [
      "The demo knowledge base lists Google Drive, Google Calendar, Slack, GitHub, and email as example integrations. Integration availability can vary by plan in a real product.",
      "Example NovaDesk integrations include Google Drive, Calendar, Slack, GitHub, and email. This is fictional content used to demonstrate support retrieval."
    ]
  },
  {
    id: "security",
    label: "Security and privacy",
    patterns: [
      "is my data secure", "how do you protect customer data", "privacy and security", "do you encrypt data", "is the service secure",
      "what about privacy", "where are messages sent", "does the chatbot upload my messages"
    ],
    keywords: ["security", "secure", "privacy", "encrypt", "data", "messages", "upload"],
    responses: [
      "For this CodeAlpha chatbot, your messages are processed locally in the browser and are not sent to an AI API. The demo stores optional chat history only in your browser's local storage until you clear it.",
      "This chatbot is privacy-first: retrieval runs locally with no paid AI service or API key. Conversation history remains on this device unless you clear it."
    ]
  },
  {
    id: "account_access",
    label: "Account access",
    patterns: [
      "i cannot log in", "forgot my password", "reset password", "account is locked", "login problem", "sign in issue",
      "how do i change my password", "cant access my account"
    ],
    keywords: ["login", "password", "account", "locked", "access", "sign", "reset"],
    responses: [
      "For an account-access issue in this demo, use the fictional ‘Forgot password’ flow on the sign-in page. If access still fails, contact support@novadesk.example with the account email and a short description of the issue.",
      "Try the password-reset option first. If the account is still inaccessible, the demo support contact is support@novadesk.example."
    ]
  },
  {
    id: "billing_invoice",
    label: "Billing and invoices",
    patterns: [
      "where can i find my invoice", "billing question", "download invoice", "payment receipt", "change billing details",
      "update payment information", "invoice for my subscription", "charged on my card"
    ],
    keywords: ["billing", "invoice", "payment", "receipt", "charged", "card", "subscription"],
    responses: [
      "In this fictional product flow, invoices and billing details are available under Workspace Settings → Billing. The demo does not process real payments.",
      "For the NovaDesk scenario, open Workspace Settings → Billing to view invoices or update billing information. No real payment system is connected to this project."
    ]
  },
  {
    id: "cancel_subscription",
    label: "Cancellation",
    patterns: [
      "how do i cancel my subscription", "cancel my plan", "stop subscription", "close paid plan", "turn off renewal",
      "do not renew my plan", "end my subscription"
    ],
    keywords: ["cancel", "subscription", "stop", "renewal", "plan", "end"],
    responses: [
      "In the demo workflow, go to Workspace Settings → Billing → Manage plan → Cancel subscription. Access continues until the end of the current billing period.",
      "To cancel in this fictional scenario, open Billing settings and choose Cancel subscription. The plan remains active until the current billing period ends."
    ]
  },
  {
    id: "refund",
    label: "Refund policy",
    patterns: [
      "can i get a refund", "refund policy", "i want my money back", "request a refund", "charged by mistake",
      "refund my payment", "am i eligible for a refund"
    ],
    keywords: ["refund", "money", "charged", "payment", "mistake"],
    responses: [
      "For this fictional commercial-support scenario, billing mistakes can be reviewed within 14 days of the charge. Contact billing@novadesk.example with the invoice reference. No real transactions occur in this project.",
      "The demo policy allows billing-error reviews within 14 days. Send the fictional invoice reference to billing@novadesk.example for review."
    ]
  },
  {
    id: "support_hours",
    label: "Support hours",
    patterns: [
      "when is support available", "support hours", "what time are you open", "business hours", "when can i contact support",
      "are you open on weekends", "support availability"
    ],
    keywords: ["support", "hours", "open", "weekend", "available", "time"],
    responses: [
      "The fictional support team is available Monday–Friday, 9:00 AM–6:00 PM IST. Nova, this local demo assistant, can answer its predefined topics any time.",
      "Demo human-support hours are Monday to Friday, 9:00 AM–6:00 PM IST. This retrieval chatbot itself is available whenever the webpage is open."
    ]
  },
  {
    id: "technical_support",
    label: "Technical support",
    patterns: [
      "the app is not working", "i found a bug", "technical issue", "page will not load", "something is broken",
      "feature is not working", "need technical support", "error in the app"
    ],
    keywords: ["bug", "error", "broken", "technical", "working", "issue", "load"],
    responses: [
      "For the demo support workflow, first refresh the page and retry. If the issue remains, note the browser, the action that caused the problem, and any visible error message, then contact support@novadesk.example.",
      "I can help triage that. Refresh once, reproduce the issue, and record the browser plus the exact action and error text. The fictional escalation contact is support@novadesk.example."
    ]
  },
  {
    id: "onboarding",
    label: "Onboarding",
    patterns: [
      "how do i get started", "onboarding help", "set up a workspace", "create my first project", "new user guide",
      "getting started with novadesk", "how to start using the product"
    ],
    keywords: ["start", "onboarding", "setup", "workspace", "project", "guide", "new"],
    responses: [
      "A simple demo onboarding path is: create a workspace, invite teammates, create the first project, then connect any needed integrations. The Starter plan can be used to explore the basic flow.",
      "To get started in the NovaDesk scenario: create a workspace → create a project → invite teammates → connect integrations."
    ]
  },
  {
    id: "thanks_goodbye",
    label: "Thanks and goodbye",
    patterns: [
      "thank you", "thanks", "that helped", "great thanks", "bye", "goodbye", "see you later", "thats all"
    ],
    keywords: ["thanks", "thank", "bye", "goodbye", "helped"],
    responses: [
      "You’re welcome! If you need anything else, ask me another NovaDesk support question.",
      "Glad I could help. Nova will be here if you have another question."
    ]
  }
];

export const fallbackResponse = "I’m not confident I have a verified answer for that. Try asking about pricing, free trials, product features, integrations, security, account access, billing, cancellations, refunds, support hours, onboarding, or technical help.";

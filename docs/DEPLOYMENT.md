# Deployment Guide — Firebase Hosting

The chatbot is a static site and does not require Firebase Authentication, Firestore, Cloud Functions, or any paid AI API.

## Prerequisites

- Node.js 20 or newer
- npm
- Firebase CLI
- A Firebase project created for this Task 4 project

## Validate and build

From the project root:

```powershell
npm ci
npm run check
npm run build
```

The build script copies the deployable site to `dist/`.

## Connect a Firebase project

Install/update the CLI if needed:

```powershell
npm install -g firebase-tools
firebase login
```

Create a Firebase project in the Firebase Console, then run:

```powershell
firebase use codealpha-chatbot-20260923
```

Choose the Task 4 Firebase project and set it as the `default` alias. Do not reuse the Task 1 CloudDedup project unless you intentionally want both submissions under the same Firebase project.

## Preview deployment

```powershell
firebase hosting:channel:deploy predeploy-test
```

Open the temporary preview URL and execute every manual acceptance case in `TEST_PLAN.md`.

## Production deployment

When preview testing passes:

```powershell
firebase deploy --only hosting
```

Save the production `.web.app` URL for the README, LinkedIn video, GitHub repository, and CodeAlpha submission evidence.

## Re-deployment after edits

```powershell
npm run check
npm run build
firebase hosting:channel:deploy predeploy-test
# test the preview
firebase deploy --only hosting
```

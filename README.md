# Reverie

Reverie is a private-first sensory journal for cannabis sessions. The current MVP focuses on logging sessions, visualizing effects, and generating personal insight summaries without turning the product into a marketplace or sourcing app.

## Stack

- React 19 + TypeScript
- Vite 6
- Gemini-backed optional insight generation
- Local-first session data

## Local workflow

1. Install dependencies:
   `npm install`
2. Optional: add `GEMINI_API_KEY` to `.env.local`
3. Start the app:
   `npm run dev`

## Verification

- Typecheck: `npm run typecheck`
- Production build: `npm run build`
- Full repo smoke: `npm run smoke`

## Main workflow

1. Open the dashboard and review the latest session card.
2. Add or inspect session entries through the journal flow.
3. Generate insight summaries from recent sessions when Gemini is configured.

## Deployment posture

Current posture is local-only static hosting. The repo is suitable for a lightweight preview deploy once key handling is finalized.

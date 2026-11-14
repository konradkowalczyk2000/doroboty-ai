# Allow PostHog in the Content-Security-Policy

## Intent

The PostHog integration (PR #1) loads, but the production CSP in `public/_headers`
(`script-src 'self'`, `connect-src 'self'`) blocks every PostHog request, so no events reach the project.

## Change

- `script-src` adds `https://eu-assets.i.posthog.com` (remote config and lazy extensions).
- `connect-src` adds `https://eu.i.posthog.com` and `https://eu-assets.i.posthog.com` (events, flags, config).
- FEATURES.md SYS-03 now describes the current PostHog behavior instead of "Removed".

## Acceptance

- `dist/_headers` contains the new origins after `npm run build`.
- After deploy, the browser console shows no CSP errors for PostHog and events appear in PostHog (EU).

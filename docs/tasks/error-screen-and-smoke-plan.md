# Error screen and release smoke plan

Intent: close two production-readiness gaps that do not depend on the hosting choice.

- A render failure currently leaves a blank page. Add a top-level error boundary (src/features/prototype/error-boundary.tsx) and a presentational recovery screen (error-screen.tsx) using the existing Button recipes and `prototype-section`: reload, back to offers, and download of the raw local save when one exists. It receives no error details and logs nothing.
- Add docs/release-smoke-plan.md: a short manual check after publication, with a rollback condition and a per-release record table.

Acceptance criteria:

- Unit tests (error-screen.test.ts) pass; the forced-failure browser test passes with the whole suite.
- `./scripts/verify` passes, including format check.
- FEATURES.md has SYS-12 describing the behavior.
- No change to product data, routes or storage format.

Not verified by this task: visual acceptance of the recovery screen at desktop and mobile widths with a real human review, and any run of the smoke plan on a real deployment.

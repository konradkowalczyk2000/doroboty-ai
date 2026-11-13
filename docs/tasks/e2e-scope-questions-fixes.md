# E2E fixes after scope questions

Intent: align three browser tests with the scope-questions work (scope-questions.ts, model.ts) without changing product behavior.

- Published-job journey: the offer form now has four checkboxes, so the approval checkbox is selected by its name "Zatwierdzam treść oferty".
- Legacy draft compatibility (375px and 1440px): a resumed legacy draft is accepted with an empty `scopeAnswers: []` default; notes and generated text stay preserved.

Acceptance: `npm run build` then `npm run test:e2e` passes all 34 tests; `./scripts/verify` passes. Evidence from the 2026-11-13 run before the fix: 31 passed, 3 failed (the tests above).

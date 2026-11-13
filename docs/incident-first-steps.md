# Incident owner and first steps

Owner: Konrad, maintainer of this repository. He can fix and republish the application and the hosting account. The contact e-mail is kept with the release record and is given to participants together with the published address; it is deliberately not stored in this repository.

This file records who reacts and what the first steps are. It is not a record of any incident. Hosting is Netlify; the publish and rollback steps are in [release-procedure.md](release-procedure.md).

## First steps when the application misbehaves

1. Reproduce: open the published address and walk through the steps in [release-smoke-plan.md](release-smoke-plan.md). Note the first step that fails and the time.
2. Check the basics: is the address reachable over HTTPS, and does the failure also happen in another browser or in a private window?
3. Decide: if the failure started with the latest publication, return to the previous known-good deployment (Netlify: Deploys page, choose the previous deploy, Publish deploy; see the Roll back section of [release-procedure.md](release-procedure.md)) and repeat steps 1-3 of the smoke plan.
4. Tell participants in one short message what is wrong, whether their local data is safe (it is stored only in each browser) and when to expect a fix. Participants can download their data from the error screen or settings.
5. Record the incident in docs/tasks (time, symptom, cause, fix) and add a test that would have caught it.

## Recovery

- Nothing on the server needs restoring: the app has no database and no accounts. Each participant's data lives only in their own browser (export and import are in settings).
- If the site is down or broken, roll back as described in [release-procedure.md](release-procedure.md). If Netlify itself is unavailable, the same `dist/` can be served locally with `npm run preview` (http://127.0.0.1:3001) for a session.
- After recovery, repeat the smoke plan and record the result.

## Message to participants (template)

> Aplikacja DoRoboty.ai chwilowo nie działa poprawnie: <objaw, np. strona się nie ładuje>. Twoje dane są bezpieczne, bo zapisują się tylko w Twojej przeglądarce. Wrócimy do poprzedniej wersji / poprawka będzie około <godzina>. Jeśli chcesz mieć kopię, pobierz dane w Ustawieniach.

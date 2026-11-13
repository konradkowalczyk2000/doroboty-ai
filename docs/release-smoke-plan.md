# Release smoke plan

Purpose: a short manual check right after a build of this static prototype is published, so a broken release is caught before participants use it. Pass/fail results are recorded per release in the table at the end; this file is the plan, not a record of any run.

`DEPLOYED_URL` is https://konrad-doroboty-ai.netlify.app. Rollback target for the first release: the Netlify deploy `6af6fec7ee29bf1994c74bbb`, which is live before the first manual publication; afterwards use the last deploy that passed this plan. Publish and rollback steps are in [release-procedure.md](release-procedure.md).

## When

After every publication of `dist/`, and again after a rollback. Takes about ten minutes. Use only the prepared synthetic personas; never real data.

## Steps

1. Open `DEPLOYED_URL`. The Polish homepage loads over HTTPS, without a browser warning or blank page.
2. Open `DEPLOYED_URL/#/oferty`. Job cards and the search field are visible; choose a category and check that results and the address change.
3. Open one offer from the list, then reload the page (F5). The same offer is still shown: hash deep links survive reload.
4. Choose a candidate (for example Anna Kowalska) at `/#/auth/sign-in`, open an offer, write an application answer, approve and submit it. The confirmation appears.
5. Choose an employer persona (for example Karolina or Tomasz). The submitted application is visible under candidates and a decision can be recorded.
6. Reload. The application and the decision are still there (browser-local save works).
7. Open `/#/app/settings`: export downloads a JSON file; reset asks for confirmation (do not confirm on a shared demo unless intended).
8. Open an example CV from a job application: the PDF preview shows inside the page (the security headers allow same-site frames and objects; if it is blank, check the console for a Content-Security-Policy message and roll back).
9. Open the browser developer tools, Network tab, and reload the homepage: all requests go to the published address only; no failed (red) requests and no requests to other sites.
10. Confirm which version is published: the commit or build identifier you released matches the one you intended to publish.

## Rollback condition

If any of steps 1-9 fails and cannot be explained within a few minutes, return to the previous known-good deployment (Netlify: see the Roll back section of [release-procedure.md](release-procedure.md)), repeat steps 1-3 on it and tell participants what happened.

## Record per release

| Date | Published commit or build | DEPLOYED_URL | Checked by | Steps 1-10 result | Notes |
| ---- | ------------------------- | ------------ | ---------- | ----------------- | ----- |
|      |                           |              |            |                   |       |

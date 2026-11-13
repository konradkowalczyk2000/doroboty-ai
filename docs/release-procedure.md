# Release and rollback procedure (Netlify, manual)

Hosting: Netlify project `konrad-doroboty-ai`, published at https://konrad-doroboty-ai.netlify.app. The app is a static build (`dist/`) with no server, database or environment variables. Expected use: up to 10 participants at the same time, which only means serving static files.

Publication is **manual**: pushing to GitHub does not publish anything. Only the maintainer (Konrad) publishes.

## Publish

1. Work from a clean `main`: `git status` shows nothing to commit. Note the commit with `git log -1 --oneline`.
2. `npm ci`, then `npm run check` (or `./scripts/verify` in a bash shell). Do not publish if it fails.
3. `npm run build`. Confirm that `dist/_headers` exists (it is copied from `public/`).
4. Publish `dist/` in one of two ways:
   - Netlify app: open the project's Deploys page and drag the `dist` folder onto the drop area.
   - Command line from the repository root: `npx netlify-cli deploy --dir=dist` creates a draft deploy with its own address; open it and check, then run `npx netlify-cli deploy --prod --dir=dist`. The folder is linked through the git-ignored `.netlify/state.json`; on another computer run `npx netlify-cli link --name konrad-doroboty-ai` first.
5. Run [release-smoke-plan.md](release-smoke-plan.md) against the published address and add a row to its record table (date, commit, address, result).

## Roll back

Use this when a smoke-plan step fails after a publication and cannot be explained within a few minutes.

1. In the Netlify app open the project's Deploys page and pick the last deploy that passed the smoke plan (the one published before the failing release).
2. Choose **Publish deploy**. No rebuild is needed and the previous version is live within seconds.
3. Run smoke-plan steps 1-3 again and record the rollback in the record table.
4. Participants lose no data: progress is stored only in each browser and is not touched by a new or older deploy.

Fallback if the old deploy is gone: `git checkout <known-good-commit>`, then repeat the Publish steps and return to `main` afterwards.

Practise the rollback once after the first release: publish the previous deploy, check the address, publish the new one again.

## Settings that matter

- Visitor access: Netlify team login (SSO) is turned off, so the address is public. The page is marked `noindex` and holds only synthetic data.
- Forms, functions and environment variables are not used.

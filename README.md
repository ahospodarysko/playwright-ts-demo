# ts-demo

A small demo project showing basic Playwright + TypeScript test automation
against a tiny website built for this repo: a login page and a simple
welcome home page.

## What's here

- `site/` — the app under test. Static HTML/CSS/JS, no framework:
  - `login.html` — sign-in form
  - `index.html` — welcome home page ("Hello, its Playwright TS demo
    project"), shown only after logging in
  - `app.js` — client-side auth (checked against hardcoded demo credentials,
    session tracked via `sessionStorage`)
  - `styles.css` — styling for both pages
- `server.js` — a minimal Node static file server that serves `site/`.
  Playwright starts it automatically before the tests run.
- `pages/` — page objects (`LoginPage`, `HomePage`) wrapping locators and
  actions for each page.
- `fixtures/authFixture.ts` — a custom Playwright `test` that provides the
  `loginPage` / `homePage` page objects and a `login()` step, so specs don't
  repeat the sign-in flow.
- `tests/` — the actual specs:
  - `login.spec.ts` — valid/invalid credentials
  - `home.spec.ts` — content on the authenticated home page
- `helpers/` — small utilities:
  - `envHelper.ts` — loads `.env.<env>` and exposes `BASE_URL`/`BROWSER`
  - `loggerHelper.ts` — timestamped step logging used by the page objects

## Demo login

Username: `qa_name`
Password: `qa_pass`

## Running the tests

```bash
npm install
npm test          # dev (default)
npm run test:dev   # explicit dev  -> http://localhost:3000
npm run test:stage # stage         -> http://localhost:3001
```

Each run spins up the local static server on the target env's port and runs
the suite against it (Chromium by default, non-headless with slow motion, so
you can watch the flow). Playwright's `webServer` starts `server.js` on the
port taken from that env's `BASE_URL` and reuses it if it's already running.

## Environments

- `.env.dev` — `BASE_URL=http://localhost:3000` (default, used when `env` isn't set)
- `.env.stage` — `BASE_URL=http://localhost:3001`

`helpers/envHelper.ts` picks the file via the `env` environment variable
(`env=dev` or `env=stage`) and loads `.env.<env>`. Add another environment by
adding a new `.env.<name>` file and an `env=<name>` script.

## Config

- `playwright.config.ts` — test project setup and the `webServer` that boots
  `server.js` on the active env's port

## CI & the Allure report

`.github/workflows/playwright.yml` runs the suite on every push/PR to `main`
(and on demand via `workflow_dispatch`), then generates the Allure report and
publishes it to GitHub Pages — replacing the `docs/` resume site that used to
be served there. The report publishes even when tests fail (that's the point
of a report), but the job itself is still marked failed so PR checks reflect
the real test result.

One-time setup: in the repo's **Settings → Pages**, change **Source** to
**"GitHub Actions"** (it currently deploys from the `docs/` folder). After
that, the latest report is available at the repo's Pages URL after each run
on `main`.

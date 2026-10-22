# SauceDemo Playwright Automation (TypeScript)

A beginner-friendly test automation framework for [saucedemo.com](https://www.saucedemo.com), built with **Playwright + TypeScript** using the **Page Object Model (POM)**. Made for the **RK TechLab** YouTube tutorial.

## What it tests
- **Login**: valid login, locked-out user, empty username/password
- **Inventory**: sorting, add/remove items, cart badge count, cart contents
- **Checkout**: full end-to-end purchase with subtotal + 8% tax + total check, missing info error

## Prerequisites
- [Node.js](https://nodejs.org) 18 or newer (LTS recommended) – check with `node -v`
- [VS Code](https://code.visualstudio.com) + the "Playwright Test for VSCode" extension (optional but nice)
- [Git](https://git-scm.com) – check with `git --version`

## Setup
```bash
git clone <your-repo-url>
cd saucedemo-playwright
npm install                          # install packages
npx playwright install chromium      # download the browser
cp .env.example .env                 # create your local env file
```
The demo usernames/password are public on the saucedemo login page.

## How to run
| Command | What it does |
|---|---|
| `npm test` | Run all tests headless |
| `npm run test:headed` | Run tests with the browser visible |
| `npx playwright test tests/login.spec.ts` | Run one file |
| `npx playwright test --ui` | Open Playwright UI mode |
| `npm run codegen` | Record actions and generate code |
| `npm run test:video` | Record a slow-motion video of the checkout test |

## Open the report
```bash
npm run report
```
The HTML report opens in your browser. Failed tests include a screenshot, video and (on retry) a trace.

## Folder structure
```
saucedemo-playwright/
├── .github/workflows/playwright.yml  # CI pipeline (GitHub Actions)
├── fixtures/pages.fixture.ts         # custom fixture: gives tests ready page objects
├── pages/                            # Page Objects (locators + actions per page)
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── test-data/users.json              # test data: products, messages, checkout info
├── tests/                            # test specs
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   └── checkout.spec.ts
├── .env.example                      # sample env vars (copy to .env)
├── playwright.config.ts              # main Playwright config
├── playwright.video.config.ts        # config for recording demo videos
└── package.json                      # scripts and dependencies
```
- **Pages** hold *how* to interact with a screen. **Tests** hold *what* to check.
- Locators use `getByRole` and `getByTestId` (`testIdAttribute: 'data-test'` in config).

## How CI works
`.github/workflows/playwright.yml` runs on every **push**, every **pull request**, and **nightly at 2:00 AM IST** (cron `30 20 * * *` in UTC). It installs Node, packages and Chromium, runs the tests (with 1 retry on CI) and uploads the **playwright-report** as an artifact kept for **14 days**. Download it from the run page under *Artifacts*.

Optional: add `STANDARD_USER`, `LOCKED_USER`, `PROBLEM_USER`, `PASSWORD` as repo secrets (Settings → Secrets and variables → Actions). If not set, the public demo values are used.

## Push to GitHub
```bash
git init
git add .
git commit -m "Initial Playwright framework"
git branch -M main
git remote add origin https://github.com/<your-username>/saucedemo-playwright.git
git push -u origin main
```
Then open the **Actions** tab to watch the tests run.

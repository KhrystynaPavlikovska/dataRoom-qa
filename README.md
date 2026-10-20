# Virtual Data Room 
QA Automation

## Project Overview

This project contains automated end-to-end tests for the Virtual Data Room web application.

The goal is to verify key user workflows, validate application behavior, and provide a maintainable test automation framework using Playwright and TypeScript.

The project follows the Page Object Model (POM) to separate page-specific logic from test scenarios and improve code reusability.

## Tech Stack

- **Playwright** — browser automation and end-to-end testing
- **TypeScript** — type-safe test implementation
- **Node.js and npm** — project environment and dependency management
- **GitHub Actions** — CI workflow for automated test execution

## Project Structure

```text
dataRoom-qa/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── pages/
│   ├── DataRoomPage.ts
│   ├── LoginPage.ts
│   └── SharedWithMePage.ts
├── playwright/
│   └── .auth/
├── test-data/
│   ├── Lorem ipsum.pdf
│   └── text.pdf
├── tests/
│   ├── auth.setup.ts
│   ├── auth.spec.ts
│   ├── example.spec.ts
│   ├── files.spec.ts
│   ├── folders.spec.ts
│   └── sharedWithMe.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

### Folder and File Description

- **`pages/`** — Page Object classes containing page locators and reusable actions.
  - `LoginPage.ts` — login page interactions.
  - `DataRoomPage.ts` — data room and folder operations, with file-related actions.
  - `SharedWithMePage.ts` — interactions with the Shared with Me section.
- **`tests/`** — automated test scenarios grouped by functionality.
  - `auth.setup.ts` — prepares an authenticated browser session.
  - `auth.spec.ts` — authentication tests.
  - `files.spec.ts` — file-related scenarios, such as uploading and renaming files.
  - `folders.spec.ts` — folder creation and validation scenarios.
  - `sharedWithMe.spec.ts` — scenarios for the Shared with Me section.
- **`test-data/`** — sample files used during testing.
- **`playwright/.auth/`** — locally stored authentication state; should not be committed to the repository.
- **`.github/workflows/`** — GitHub Actions workflow configuration.
- **`playwright.config.ts`** — Playwright test configuration.
- **`tsconfig.json`** — TypeScript compiler configuration.

## Automated Test Coverage

The current test suite focuses on the following areas:

| Area | Coverage |
|---|---|
| Authentication | Login and authenticated session setup |
| Folders | Folder creation and empty-name validation |
| Files | File upload and rename workflows |
| Shared with Me | Basic functionality of the shared items section |

Coverage is evolving as additional scenarios are automated and validated.




## Test Execution Overview

<img width="850" height="332" alt="Screenshot 2026-10-20 at 14 41 00" src="https://github.com/user-attachments/assets/af0a05ad-0697-4a71-8039-7e638a87e8ad" />
<img width="856" height="775" alt="Screenshot 2026-10-20 at 14 41 35" src="https://github.com/user-attachments/assets/d951da37-b242-465b-b66f-ea77289ce0cb" />



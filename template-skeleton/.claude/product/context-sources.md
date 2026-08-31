# Context sources

Owned by the **QA Product Lead**. Where an agent finds the *real* application — source, docs, and
requirements — so it grounds locators and endpoints in fact rather than inferring them from a ticket.

**Grounding is a core mandate.** A locator or endpoint that cannot be traced to real source is not
allowed to ship. This file is where "the real source" is defined for `<PRODUCT_NAME>`.

## Application source

Read-only, always. The machine-local checkout paths live in the gitignored
`support/qa-automation/repo-map.local.json`; what each repo *is* lives here.

| Repo | Holds | Notes |
|---|---|---|
| `<APP_UI_REPO>` | The front end | `<UI_STACK>` |
| `<APP_API_REPO>` | The API | `<API_STACK>` |

## Requirements and design

| Source | Where | Read for |
|---|---|---|
| Issue tracker | `<TRACKER_NAME>` | Acceptance criteria, the change under test |
| Docs / specs | `<DOCS_LOCATION>` | Intended behaviour, domain rules |
| Design | `<DESIGN_LOCATION>` | Expected UI states |

## The locator source of truth

| Question | Answer |
|---|---|
| Does the app expose stable test ids? | `<TESTID_CONVENTION>` |
| Naming convention for them | `<TESTID_NAMING>` |
| Who adds one when it is missing | Propose it to `<APP_TEAM>` — never fall back to a brittle locator |

**Never invent a test id.** If one is missing, say so and propose adding it to the app. A brittle
text or positional locator dressed as done is a defect, not a workaround.

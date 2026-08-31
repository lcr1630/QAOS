# QA OS Lite — One Pager

**Release confidence for AI startups — without a QA team.**

---

## The problem

You ship fast with AI. Your investors and customers ask: *"Was this tested?"* The honest answer today
is a Slack thread, not a record.

Acceptance criteria hide five invisible guesses — which user, which state, which data, which
environment, what must not happen. Tests built directly from ACs pass on dev and fail in staging
for reasons nobody documented.

---

## What you get

QA OS Lite installs a **proven operating system** into your app repo as a `qa/` folder:

| Deliverable | Outcome |
|---|---|
| **Testability readiness gate** | GO / CONDITIONAL / NO-GO before we waste time on the wrong harness |
| **`@core` on every PR** | Fast smoke gate in CI — one test per core function |
| **AI-assisted QA pipeline** | Structured phases with human gates — requirement → cases → manual → automate → report |
| **Linear integration** | Issues, comments, and traceability without a heavy TMS on day one |
| **AI eval scaffold** | Golden sets and rubrics for prompt-critical flows |
| **Release Gate Lite report** | HTML artifact: readiness score + test results for stakeholders |

---

## How it works (30 seconds)

```
readiness gate  →  qa-0-init  →  qa-start  →  phases 1–5  →  @core on PR  →  release gate report
     ▲                                    │
     └── scores staging, auth, APIs ──────┘
```

**One prompt to start:** `qa-start` shows your QA queue and hands off.

**Gates are real stops.** Nothing proceeds without explicit approval — no inferred yes from silence.

---

## Editions

| | **Lite** (this offer) | **Standard** (when you scale) |
|---|---|---|
| **Fit** | Single-product AI startup | Multi-product or compliance-heavy |
| **Layout** | `qa/` in your app repo | Dedicated automation repo |
| **Cases** | Markdown + Linear | Testmo |
| **CI** | `@core` on PR | Full suite + Testmo submit |
| **Timeline** | 3-week onboarding | 4–6 week onboarding |

Same standards. Same skills. Lite grows into Standard — see evolution guide.

---

## 3-week onboarding

| Week | Milestone |
|---|---|
| **1** | Readiness gate, harness install, first requirement analyzed |
| **2** | Cases, manual pass, first `@core` test in CI |
| **3** | Full issue trace + Release Gate Lite report + handoff |

**You provide:** staging access, Linear, one eng contact, product context.

**We provide:** install PR, pipeline execution, CI wiring, report, training on `qa-start`.

---

## Testability gate (why we start here)

Not every startup can automate on PRs yet. We score eight dimensions — staging, auth, APIs,
isolation, test IDs — and produce a clear band:

- **GO** — full automation path
- **CONDITIONAL** — scoped plan with eng prerequisites (common at seed stage)
- **NO-GO** — checklist first; re-engage when staging/auth land

No shame in CONDITIONAL. It's cheaper than a harness that can't log in.

---

## What we don't do

- Rewrite your app or approve our own PRs
- Promise 500 Testmo cases in week one
- Skip human gates because you're "moving fast"

Automation has **read-only access** to your application code. It opens PRs in `qa/tests/` only.

---

## Ideal fit

- Seed to Series A AI startup, single product
- Linear for issue tracking
- Staging environment (or landing within 30 days)
- Claude Code or equivalent on at least one machine
- Engineering lead willing to spend 45 minutes on readiness interview

---

## Next step

**45-minute discovery call:** walk one recent feature, run lightweight readiness questions, quote
Lite onboarding.

---

*Built on a production QA operating system — four-tier ownership, identity spine, vendored standards
that update without forking.*

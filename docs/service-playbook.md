# QA OS Lite — Service Playbook

How to deliver the QA Operating System as a **productized service** for small AI startups.
This is the operator's guide — not client-facing copy.

---

## What you sell

Clients do not buy "four tiers" or "vendored skills." They buy:

| Outcome | What they get |
|---|---|
| **Release confidence** | `@core` tests on every PR; a recorded answer to "was this tested?" |
| **Investor / customer credibility** | Release Gate Lite HTML report with readiness score + test results |
| **Speed without chaos** | AI-assisted pipeline with human gates — fast enough for AI-native shipping |
| **Right-sized coverage** | Prompt evals, API regressions, and UI smoke — not a 500-case Testmo project on day one |

The **mechanism** is the same operating system you run in production. The **packaging** is Lite:
integrated `qa/` folder, Linear, no Testmo, readiness gate first.

---

## Three-repo layout

| Repository | Role | Who touches it |
|---|---|---|
| **qa-framework-base** | Director tier — standards, skills, agents, rubrics | You (maintainer). Clients never clone this directly. |
| **qa-automation-template** | Standard edition + Lite scaffold (`lite/`) | You install from here into client repos. |
| **qa-operating-system** | Narrative, GTM, this playbook | Internal only. |

Distribution is **vendored**: flat committed copies under `.claude/` in the client's repo. No
submodules. Updates arrive as PRs from you.

---

## Engagement types

### Design partner (first 1–2 clients)

- Discounted or free in exchange for case study rights and weekly feedback
- Goal: prove MVP exit criteria (see below)
- You do more hands-on; they tolerate rough edges

### Lite service (default offer)

- Fixed-scope onboarding (3 weeks)
- Integrated `qa/` install, readiness gate, one issue through phases 1–5
- Monthly retainer optional for ongoing `@core` maintenance and eval updates

### Standard upgrade

- Separate automation repo, Testmo, full release gate
- Sold when client outgrows Lite — see [evolution-lite-to-standard.md](evolution-lite-to-standard.md)

---

## Pre-sales checklist

Before proposing Lite, confirm:

- [ ] Single product, single repo (or monorepo with clear app root)
- [ ] Linear (or willing to adopt it for QA queue)
- [ ] Staging URL exists or is planned within 30 days
- [ ] Engineering lead available for readiness interview (~45 min)
- [ ] Claude Code (or equivalent) available to at least one person on the team

**Red flags that mean defer or NO-GO:**

- Production-only testing with no staging plan
- SSO-only auth + complex multi-role state with no API path
- Shared demo DB with no isolation plan and no eng bandwidth to fix it

Run a lightweight version of the readiness interview on the sales call. Do not promise automation
before you know the band.

---

## Delivery workflow

### Phase 0 — Contract + access

1. Signed SOW referencing Lite scope (see [onboarding-week1-3.md](onboarding-week1-3.md))
2. GitHub access (write to client app repo or a fork you PR from)
3. Linear access + MCP connector configured on your side
4. Staging credentials (service account preferred)
5. `URL`, `TEST_ADMIN_USER`, `TEST_ADMIN_PASSWORD` as GH Actions vars/secrets

### Phase 1 — Install (Day 1)

From your template checkout:

```bash
git clone <qa-automation-template>
cd qa-automation-template && npm install

node scripts/install.mjs \
  --into /path/to/client-app \
  --prefix qa \
  --edition lite
```

This copies the full Lite scaffold into `client-app/qa/`:

- Vendored skills, agents, base docs
- Playwright harness, `@core` / `@smoke` tags
- `evals/` scaffold for AI-specific checks
- `.github/workflows/qa-core.yml` at repo root (PR gate)

Open a PR: **"Add QA OS Lite harness"**. Do not merge until readiness gate passes or client
accepts a CONDITIONAL scope plan.

### Phase 2 — Readiness gate (Day 1–2)

In Claude Code, from `qa/`:

1. Run **`readiness-gate`** skill
2. Interview eng lead on staging, auth, APIs, isolation, test IDs
3. Produce `readiness-report.md` (+ `readiness-scope.md` if CONDITIONAL)

| Band | Your action |
|---|---|
| **GO** | Proceed to `qa-0-init` |
| **CONDITIONAL** | Get written sign-off on scoped plan; file eng prerequisite issues from skill output |
| **NO-GO** | Stop init. Deliver eng checklist only. Re-engage when prerequisites land. |

See [testability-readiness.md](testability-readiness.md) for scoring detail.

### Phase 3 — Init (Day 2–3)

Run **`qa-0-init`** in Claude Code. It fills tokens, creates `.env` from example, verifies harness.

Client must complete (never ask for secrets in chat):

- Paste credentials into `qa/.env`
- Authenticate Linear MCP connector
- Finish `.claude/product/product-context.md` (highest-value file — coach them)

### Phase 4 — First issue through the chain (Week 1–2)

Pick one real Linear issue — a recent feature, not a rewrite of the whole product.

```
qa-start → phase-1 → phase-2 → phase-3 → phase-4 → phase-5
```

Deliverables per phase:

| Phase | Client-visible output |
|---|---|
| 1 | Reviewed requirement artifact on the issue |
| 2 | `cases/{KEY}.md` + Linear comment |
| 3 | Manual pass evidence |
| 4 | Spec in `qa/tests/` + PR |
| 5 | Results on issue + gate inputs |

### Phase 5 — CI + Release Gate Lite (Week 2–3)

1. Merge `qa-core.yml`; confirm `@core` green on a PR
2. Run eval smoke: `npm run eval:smoke` from `qa/`
3. Generate report: `npm run gate:report -- --release "0.1.0"`
4. Deliver `outputs/release-gate-{date}.html` in final readout

---

## MVP exit criteria

A design-partner engagement is **done** when:

1. Client repo has merged `qa/` PR
2. Readiness gate completed (GO or signed CONDITIONAL)
3. `qa-0-init` completed — zero `<TOKEN>` placeholders remain
4. One issue executed through phases 1–5 with recorded gates
5. `@core` runs on PR in CI
6. Release Gate Lite HTML delivered

---

## Ongoing retainer (optional)

| Cadence | Work |
|---|---|
| Weekly | Review `@core` failures, update cases for shipped features |
| Bi-weekly | Refresh eval golden sets for prompt changes |
| Monthly | `base:refresh` from qa-framework-base → PR to client |
| Per release | Run `@smoke`, generate gate report, sign-off comment on release issue |

---

## What you do not do

- Edit application source code (automation opens PRs in `qa/tests/` only)
- Approve client PRs or mark issues done without human gate keywords
- Promise full regression coverage in week one
- Skip readiness gate because the client is "in a hurry"

---

## Internal commands reference

```bash
# Install Lite into client app
node scripts/install.mjs --into ../client-app --prefix qa --edition lite

# Refresh vendored base (@lcr1630/qa-framework-base via npm run base:refresh)
npm run base:refresh

# Client-side (from qa/)
npm run test:core
npm run eval:smoke
npm run gate:report -- --release "1.2.0"
```

---

## Escalation paths

| Situation | Escalation |
|---|---|
| NO-GO readiness, client wants to proceed anyway | Written waiver + manual-only scope in `readiness-scope.md` |
| Eng won't add test IDs | CONDITIONAL plan: manual locators + tech debt issue |
| Client wants Testmo mid-engagement | Pause Lite; sell Standard migration |
| Flaky `@core` blocking merges | Healer skill + quarantine `@flaky`; never weaken assertions |

---

## Related docs

- [onboarding-week1-3.md](onboarding-week1-3.md) — week-by-week client schedule
- [testability-readiness.md](testability-readiness.md) — rubric and bands
- [evolution-lite-to-standard.md](evolution-lite-to-standard.md) — upgrade path
- [sales/one-pager.md](sales/one-pager.md) — client-facing summary
- [sales/pitch-script.md](sales/pitch-script.md) — discovery call script

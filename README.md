# QAOS — QA Operating System

**QAOS** *(pronounced like "chaos")* — a vendor-neutral framework for making quality standards
actually reach the work, instead of sitting in a document nobody opens.

This repository is the **narrative and go-to-market layer** for the production QA operating system.
The runnable product lives in two sibling repositories; this repo explains the architecture, sells
**QA OS Lite** to small AI startups, and documents how to deliver it as a service.

> **Visual overview:** open [overview.html](overview.html) in a browser.

---

## Product layout (three repos)

| Repository | Edition | What it is |
|---|---|---|
| **qa-framework-base** | Director | Standards, skills, agents, readiness rubric, startup preset — vendored into client repos |
| **qa-automation-template** | Standard + Lite | Full Playwright harness; `lite/` scaffold for integrated `qa/` install |
| **qa-operating-system** | GTM (this repo) | Framework narrative, service playbook, sales collateral |

**Lite** installs into the client's app repo:

```bash
node scripts/install.mjs --into ../client-app --prefix qa --edition lite
```

**Standard** bootstraps a dedicated automation repository with Testmo. Both editions use **vendored**
base copies — no git submodules.

---

## QA OS Lite (commercial offer)

For seed–Series A AI startups: release confidence without hiring a QA team.

| Component | Purpose |
|---|---|
| **Testability readiness gate** | GO / CONDITIONAL / NO-GO before init — hard block on critical gaps |
| **Integrated `qa/` folder** | Playwright + skills + Linear — one repo, `@core` on PR |
| **Five-phase pipeline** | `qa-start` → analyse → cases → manual → automate → report |
| **AI evals** | Golden sets and rubrics under `qa/evals/` |
| **Release Gate Lite** | HTML report for stakeholders — readiness + test results |

### GTM docs

| Doc | Audience |
|---|---|
| [docs/service-playbook.md](docs/service-playbook.md) | You — how to deliver the engagement |
| [docs/onboarding-week1-3.md](docs/onboarding-week1-3.md) | Client schedule — week by week |
| [docs/testability-readiness.md](docs/testability-readiness.md) | Operators + technical buyers — rubric |
| [docs/evolution-lite-to-standard.md](docs/evolution-lite-to-standard.md) | When and how to upgrade |
| [docs/sales/one-pager.md](docs/sales/one-pager.md) | Client-facing summary |
| [docs/sales/pitch-script.md](docs/sales/pitch-script.md) | Discovery call structure |

---

## The framework (vendor-neutral)

> **The one-sentence version.** Standards cascade *down* four ownership tiers; execution evidence
> flows *back up*; an AI skill/agent layer reads the standards from those tiers and carries them into
> every test, so a policy written once lands everywhere and "was this tested?" has an auditable
> answer.

---

## Why this exists

An acceptance criterion says what must be true. It does not say which user does it, from which
state, with what data, on which environment, or what must *not* happen. A test written straight from
an AC encodes the author's guess about all five — and the guess is invisible in the resulting code.

Three failure modes follow, and this framework is built to dissolve each one:

| Failure mode | What it looks like | How the framework answers it |
|---|---|---|
| **Invisible guesses** | Tests that pass on dev and fail on staging because an unstated assumption was baked in | A structured **interview** makes every guess explicit *before* it becomes an assertion |
| **Standards drift** | A style guide everyone agreed to and nobody follows six months later | Standards live in **tier modules**; an AI layer reads them at runtime, so the rule and the work never diverge |
| **"Was this tested?" is unanswerable** | The honest answer is an anecdote, not a record | A single **identity spine** joins issue → case → test → result; the answer is a query |

The framework is deliberately opinionated. It sets a **floor** no adopting team can drop below, and
lets each team raise its own **ceiling**.

---

## The four tiers

Ownership is segmented by **responsibility, not headcount**. One person can hold several tiers; the
framework guarantees every responsibility has an owner, not that every tier has a dedicated hire.

```
   ceiling ─ each tier may ADD stricter requirements, never relax the floor
        ▲
        │   Tier 4 · ENGINEER        execution, automation upkeep, reporting
        │   Tier 3 · PRODUCT LEAD    product context, suites, case structure
        │   Tier 2 · MANAGER         portfolio quality, the release gate, process
        │   Tier 1 · CORE / DIRECTOR company-wide standards, tooling, the AI layer
        ▼
   floor ─ the minimum every tier inherits and cannot opt out of

   Standards cascade DOWN.        Evidence and sign-off flow UP.
```

| Tier | Owner role | Owns | The one rule that defines it |
|---|---|---|---|
| **1 · Core** | Director of QA | Company-wide standards, the tool stack, the shared AI skills/agents | *A change here changes every product line. The Director approves it; products never fork it.* |
| **2 · Manager** | QA Manager | Portfolio quality across ~3 products, the release gate, process definition | *Nothing ships without a recorded sign-off — auditable six months later, not a chat thumbs-up.* |
| **3 · Product Lead** | QA Product Lead | One product's real context, its suites, its case structure | *Produce suites an engineer can run without having to guess.* |
| **4 · Engineer** | QA Engineer | Running cases, maintaining specs, reporting evidence | *Report what actually happened. Nobody is hurt by an accurate red; everybody is eventually hurt by an inaccurate green.* |

### The inheritance rule

When a lower tier and the core tier conflict, **core wins on the floor, the product wins on the
ceiling**:

- Core sets a **minimum** — every test tagged, every skip explained, every created record cleaned
  up. A product cannot opt out.
- A product may **add** requirements core does not impose — a second reviewer, a mandatory visual
  baseline, a stricter flake threshold.

If you find yourself wanting to *relax* a core rule to ship something, that is the signal to stop and
raise it with the tier owner — not to write an exception into a spec file. **A rule that no product
can satisfy is a broken rule, not a product problem. Fix it at the core.**

---

## Distribution — how the base tier reaches every repository

The base tier is **vendored** into each product repository — flat committed copies under `.claude/`,
not hand-maintained forks and not git submodules by default.

```
qa-framework-base  ──(vendor-base.mjs)──►  <product-repo>/
                                            ├── .claude/base/         reference docs
                                            ├── .claude/skills/       discoverable copies
                                            ├── .claude/agents/
                                            └── .claude/base-version.json
```

Four properties make this safe:

1. **The vendored copies are committed.** A fresh clone works with no build step, and the diff after
   a refresh shows a reviewer exactly what changed.
2. **Updates are opt-in per repository.** `.claude/base-version.json` pins a version. Tracking the
   tip would let the release gate change underneath a team *during a release*.
3. **Lite clients receive updates via PR** from their QA provider refreshing the `qa/` folder.
4. **Never hand-edit a vendored skill or agent.** Move the change into qa-framework-base, refresh,
   and commit the result.

> **Legacy path:** Teams may still mount qa-framework-base as a submodule and use `sync.mjs`. New
> Standard and Lite installs use vendored copies.

---

## Readiness gate (Lite front door)

Before `qa-0-init`, Lite editions run the **readiness-gate** skill against
`testability-rubric.md`:

| Band | Threshold | Action |
|---|---|---|
| **GO** | ≥80% | Full automation including `@core` on PR |
| **CONDITIONAL** | 50–79% | Init with scoped manual areas + eng prerequisites |
| **NO-GO** | <50% or hard block | Init stops; eng checklist only |

Hard blocks: no dedicated staging; SSO-only + state-heavy; shared mutable env with no isolation plan.

See [docs/testability-readiness.md](docs/testability-readiness.md).

---

## The AI process layer

The skills and agents are the mechanism by which the standards **reach the work**, instead of
sitting in a document nobody opens.

The load-bearing split:

- **Tier modules own the substance** — the standards, the release process, the product context. This
  is the material each role is accountable for, and the ownership boundary is the directory.
- **Skills and agents own the mechanism** — they are thin. Each one *reads from* the tier modules
  rather than restating them.

> **A skill states process, not policy.** If a skill contains a rule, that rule belongs in a tier
> module and the skill should point at it. Duplicated policy drifts, and the copy in the skill is the
> one that gets stale. The cost of this split is one level of indirection; the benefit is that a
> policy change lands in exactly one file and every skill picks it up on its next run.

### One entry point, five phases, a few standalone skills

```
issue → phase 1 → phase 2 → phase 3 → phase 4 → phase 5 → sign-off
        analyse   cases     manual    automate  report
                              │                    │
                              └──── bug found ──────┴──→ bug-documentation → new issue
```

| Skill | Owns |
|---|---|
| **start** | The front door. Shows the QA queue, hands off to phase 1. Does no analysis itself |
| **phase 1 · requirement analysis** | Issue → independently reviewed requirement → synced source → confirmed plan (runs the interview) |
| **phase 2 · case authoring** | Draft → reviewed cases → staged test data |
| **phase 3 · manual execution** | Manual pass, with captured evidence |
| **phase 4 · automation** | Specs → PR → cases stamped *Automated* |
| **phase 5 · reporting** | Results into the test-management system, status onto the issue |
| **bug documentation** | A verified failure → a filed bug. Called from phase 3 or 5 |
| **milestone regression** | Every case in a milestone. The Manager's regression pipeline |
| **shift-left evaluation** | Evaluate cases for a lower pyramid level; route A / B / keep. Batch, not per-ticket |
| **init** | One-time template initialisation — interviews the adopter, fills every token |

### The subagents, and the two rules that run through all of them

Each phase delegates its heavy or judgment-bearing work to a subagent rather than doing it inline.
Two design rules make that structural rather than cosmetic:

- **The agent that produced the work never vouches for it.** The requirement reviewer checks an
  artifact it did not write; the case reviewer reviews cases it did not draft; the bug reviewer
  re-runs a failure somebody else reported. *A review by the author is not a review.*
- **Context-heavy work is contained.** Browser-driving, result parsing, and data generation happen in
  a subagent's own context, so the orchestrating conversation does not carry that history forward and
  re-pay for it on every later turn.

---

## Gates — the pipeline stops until a human says proceed

A gate is a full stop. **Never skip one, and never infer approval from silence** — an unanswered
question is not a yes. Each gate has an explicit keyword that proceeds it, so approval is a
deliberate act and leaves a record.

```
checkout ─► deploy ─► interview ─► cases ─► data ─► manual ─► bug ─► evaluation ─► routing ─► deprecation ─► tracker-write
confirmed   ready     complete     ok       staged  pass      ok     reviewed      approved   confirmed       confirmed
```

The interview at phase 1 is the cheapest place in the whole process to discover that a requirement
is ambiguous — before a case, a spec, and a run are built on it. It asks a fixed set of questions
(which flows, which identity, what starting state, the happy path, the negative cases, the
environment specifics, what is explicitly out of scope, and how each AC bullet maps to a case) and
**refuses to infer an answer to make progress**.

Steps are then written in a **fixed keyword vocabulary**, not prose:

```
Navigate · Click · Fill · Select · Press · Upload · Verify        (Target holds a real selector)
```

Prose has to be re-interpreted by whoever automates it, which reintroduces the guessing the interview
just removed. Keywords map one-to-one onto the automation runner, so automation is mechanical rather
than interpretive.

---

## The identity spine

Everything joins on **one key: the issue key**. That single join is what makes "was this tested?" a
query instead of an anecdote.

```
   ISSUE KEY  ─────────────────────────────────────────────────
      │              │                │                 │
      ▼              ▼                ▼                 ▼
   requirement   test case  ◄──►  automated test   source PR
                  (in the TMS)     (@Case-id + @ISSUE-KEY
                                    in the test title)
```

| Link | Mechanism |
|---|---|
| Issue → test case | The test-management system's native issue link — **never** a custom text field that queries can't see |
| Test case → automated test | A `@Case-id` tag in the **test title** — reporting matches on test name, so results map with no custom plumbing |
| Automated test → issue | The issue key in the title, plus an annotation the reporter emits |
| Test case → spec file | The TMS's native automation-link field (numeric ids, populated only after a run is submitted) |
| Test → area/folder | A feature tag, mapped through one catalog file |

The rule that pays for itself: **a link written the wrong way appears to succeed and is invisible to
every query.** Pick the mechanism your tools actually support, verify it once, and record which one
applies. Getting this wrong is expensive in a silent way.

---

## Shift-left evaluation

E2E tests are the slowest, flakiest, most expensive coverage there is. This is a batch process that
finds cases which could be caught **lower on the test pyramid** and routes them there — grounded in
real source, never in an optimistic guess.

**Classify a case by the lowest level that can still catch what it protects against:**

| Verdict | The case… | Grounding required |
|---|---|---|
| `UNIT` | Validates an isolated function; no external dependencies; runs in milliseconds | Name the function **and its file** in real source, or it is not a UNIT |
| `INTEGRATION` | Validates data flow between internal components; no full UI | Name the components **and the seam** between them |
| `KEEP-E2E` | Inherently needs a deployed environment or a real user journey | The default whenever the evidence to shift is absent |

**Then route it:**

- **Path A — QA authors** the lower-level test (only when the logic is straightforward *and* the
  target repo is on a cleared list). Produces a test + PR body as an artifact for a human to commit.
- **Path B — developer handoff.** Produces a backlog spec with evaluation, evidence, and acceptance
  criteria.
- **Keep.** Nothing changes; the case stays E2E, stated explicitly.

Two safety rails are absolute:

- **Automation never writes to application source.** Path A vs Path B is about *who authors* — QA or
  a developer — never about whether the automation may push to app code. It never may.
- **Deprecation is conditional, never automatic.** A shifted case is retired **only after** its
  replacement is green in CI. Until then, the E2E case is the only coverage there is — so it is
  retired by marking state, never by hard-deleting.

---

## The standards floor

These are the rules an agent — or a person — must not relax to make something pass. This is the QA
implementation's floor; your team sets its own, but the *shape* generalizes.

1. **API-first state.** Never drive the UI to set up data or log in when an endpoint exists. UI setup
   is slow and fails for reasons that have nothing to do with what is under test.
2. **Injection over instantiation.** Page objects and API managers reach a test through fixtures,
   never constructed inline — a directly-constructed object skips teardown, which is how orphaned
   test data accumulates.
3. **Zero-trust locators.** Role / label / test-id / text. A CSS `nth-child` chain is a defect — it
   encodes layout, and layout changes.
4. **Defensive waiting.** Explicit visibility or a response wait. Never a fixed sleep.
5. **Mandatory tagging.** Every test carries a suite tag, a feature tag, and a case-id tag. An
   untagged test still runs, attaches to no case, and counts toward no coverage number — and the run
   looks complete.
6. **No silent skips.** Every skip carries a reason; every deferred test carries an issue key. An
   unexplained skip is lost coverage nobody can attribute.
7. **Clean up what you create.** Teardown via API in `afterEach` / `afterAll`.
8. **Never weaken a test to make it pass.** A test that cannot pass honestly has found something —
   stop and ask. *That conversation is the point.*

And one standing rule above all of them:

> **Automation has read-only access to the application's source control.** It can open a PR in the
> *test* repository but never create, approve, or complete one against app code, a work item, or a
> pipeline run. Automation that can approve its own PR is not a QA tool.

---

## The swap layer — bring your own stack

Nothing above is tied to a specific vendor. The reference implementation made concrete choices; each
is a slot you fill with your own:

| Slot | What it does | Reference choice | Swap in anything that… |
|---|---|---|---|
| **Test-management system** | Source of truth for a test case; holds runs and coverage | Testmo | has a REST API for cases, runs, and results |
| **Issue tracker** | Holds the issue key everything joins on | Linear / Jira | exposes issues by a stable key |
| **Automation runner + language** | Executes the specs | Playwright + TypeScript | produces a machine-readable result format (e.g. JUnit XML) |
| **AI process layer** | Carries standards into the work | Claude Code skills / agents | discovers skills & agents from fixed paths |
| **Distribution** | Ships the base to every repo | Vendored copies via vendor-base.mjs | pins a version in `.claude/base-version.json` |
| **CI** | Runs the suite, consumes results | Azure Pipelines / GitHub Actions | can run the runner and ingest its output |

The framework's value is in the parts that *don't* change when you swap these: the tier ownership, the
inheritance rule, the gates, the identity spine, the review-by-non-author rule, and the read-only
boundary.

---

## Adopting it — how a team takes this and runs

**Lite (startups):**

1. Run **`readiness-gate`** — score testability; get GO / CONDITIONAL / NO-GO.
2. **Install** — `node scripts/install.mjs --into ../app --prefix qa --edition lite`.
3. Run **`qa-0-init`** once — fills tokens, verifies harness.
4. **Fill in product context** — the file only the team can write.
5. **Run an issue through the chain** — `qa-start` → phases 1–5; enable `@core` on PR.

**Standard (scale):**

1. Clone **qa-automation-template**; `npm run qa:install`.
2. Run **`qa-0-init`** with Testmo tokens.
3. Same phases 4–5; full release gate with Testmo submit.

See [docs/service-playbook.md](docs/service-playbook.md) for service delivery detail.

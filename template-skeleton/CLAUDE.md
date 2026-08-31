# `<PRODUCT_NAME>` Automation Repository

Automation for **`<PRODUCT_NAME>`**, structured to the four-tier QA operating system. Read this file
first, then the tier module that matches what you are being asked to do.

> **This repository is a token-only template.** Every `<TOKEN>` in angle brackets is a slot the
> adopting team fills in. Run the `init` skill once and it will interview you and replace them. Until
> that happens, tokens are load-bearing — do not guess values for them.

## The four tiers

Ownership is segmented by responsibility, not by headcount. One person may hold several tiers; the
framework guarantees every responsibility has an owner, not that every tier has a dedicated hire.

| Module | Owner | Owns | Read it when |
|---|---|---|---|
| [`.claude/core/`](.claude/core/README.md) | Director of QA | Company-wide strategy, tooling, standards | You are about to break, bend, or extend a rule |
| [`.claude/manager/`](.claude/manager/README.md) | QA Manager | Portfolio quality, release gate, process | You are approving a release or defining process |
| [`.claude/product/`](.claude/product/README.md) | QA Product Lead | This product's context, suites, generation | You are planning or structuring coverage |
| [`.claude/engineer/`](.claude/engineer/README.md) | QA Engineer | Execution, automation upkeep, reporting | You are running, fixing, or reporting tests |

Standards cascade **down** the tiers. Execution data and sign-offs flow **back up**.

A tier module is documentation and policy — the *substance* each role owns. The executable pieces
(`.claude/skills/`, `.claude/agents/`) stay in the paths the AI harness actually discovers, and they
read from the tier modules.

**`.claude/core/` is a git submodule** — the shared core repository, updated centrally by the
Director of QA. `.claude/skills/` and `.claude/agents/` are **synced copies** of what core ships:
never hand-edit them, and never edit inside `.claude/core/` unless you mean to change the shared
source for every product. `npm run base:update` pulls and re-syncs; `npm run base:check` verifies
nothing has drifted.

## The workflow this repo automates

**One prompt starts it all: `start`.** It shows what is queued for QA and hands off. Every phase ends
by naming the next one, so nobody has to memorise the chain.

```
issue → phase-1 → phase-2 → phase-3 → phase-4 → phase-5 → sign-off
        analyse   cases     manual    automate  report
                              │                    │
                              └──── bugs found ────┴──→ bug-documentation ──→ new issue
```

| Skill | Does | Gate before it finishes |
|---|---|---|
| `start` | Shows the QA queue, hands off to phase 1. No analysis of its own | — |
| `phase-1-requirement-analysis` | Ingests the issue, hard-gates on an independent business-logic review, syncs source, watches the deploy, runs the QA interview | `confirm checkout`, `deploy ready`, `interview complete` |
| `phase-2-test-case-authoring` | Draft → reviewed cases → staged test data → issue comment | `confirm cases`, `confirm issue comment` |
| `phase-3-manual-test-execution` | Drives the cases in a real browser, captures evidence, produces `manual pass` | `confirm issue comment` |
| `phase-4-test-automation` | Specs → PR → cases stamped Automated | `confirm issue comment` |
| `phase-5-test-reporting` | Submits the run, links coverage, posts status | `confirm issue comment` |
| `bug-documentation` | Verified failure → filed bug. Called from phase 3 or 5 | `confirm bug report` |
| `milestone-regression-run` | Every case in a milestone. The QA Manager's regression pipeline | `confirm issue comment` |
| `shift-left-evaluation` | Evaluate cases for a lower pyramid level; route A/B/keep. Batch, not per-ticket | `confirm evaluation`, `confirm routing`, `confirm deprecation` |
| `init` | One-time: bootstraps the repo, then fills every `<TOKEN>` | `confirm init` |

**Any number of trackers, one chain.** Routing is by issue-key shape inside every skill — there is no
separate path per tracker to keep in sync.

### The review rule

Three points in the chain are reviewed by an agent that did not produce the work:
`requirement-reviewer` checks an artifact it did not write, `case-reviewer` reviews cases it did not
draft, and `bug-reviewer` re-runs a failure somebody else reported. **A review by the author is not a
review** — that is why these are structural rather than advisory.

## Non-negotiables

The rules an agent must not relax to make something pass. Full text in `.claude/core/`.

1. **API-first state.** Never drive the UI to set up data or log in when an endpoint exists.
2. **Injection over instantiation.** Page Objects and API Managers are injected, never `new`-ed in a test body.
3. **Zero-trust locators.** Role / label / test-id / text. Never a CSS `nth-child` chain.
4. **Defensive waiting.** Explicit visibility or a response wait. Never a fixed sleep.
5. **Mandatory tagging.** Every test carries a suite tag, a feature tag, and a case-id tag.
6. **No silent skips.** Every skip carries a reason; every deferred test carries an issue key.
7. **Clean up what you create.** API teardown in `afterEach` / `afterAll`.
8. **Never weaken a test to make it pass.** A test that cannot pass honestly has found something.

And one standing rule above all: **automation has read-only access to the application's source
control.** It can open a PR in the *test* repository but never against app code.

## Layout

```
.claude/core/                       SUBMODULE: shared Director-tier standards, skills, agents
.claude/manager|product|engineer/   this repo's own tier modules
.claude/skills/                     the workflow — synced from core, do not hand-edit
.claude/agents/                     reviewers/generators/healers — synced from core
config/environments.ts              THE file you edit per product — envs, auth, credentials
support/qa-automation/              swap-layer bindings: TMS, tracker, source-control ids
support/                            harness: fixtures, pages, api-managers, tags, catalog (from core)
scripts/                            resolve ids, create cases, submit runs (from core)
tests/e2e|api/                      your specs (empty in the skeleton)
pipelines/                          CI definitions
```

## Before you write code

Read the standards in `.claude/core/` and
[`.claude/product/product-context.md`](.claude/product/product-context.md). The second is where this
product's actual surface area, auth model, and known quirks live — it is the file that makes a
generic agent useful on *this* product, and it starts almost empty on purpose.

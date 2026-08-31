# `<PRODUCT_NAME>` Automation Repository

Automation for **`<PRODUCT_NAME>`**, structured to the four-tier QA operating system:
issue tracker → test-management system → automation runner, with every quality responsibility owned
by a named tier.

> **Fresh copy?** This is a **token-only skeleton**. Every `<TOKEN>` in angle brackets is a slot you
> fill in. Run the **`init`** skill in your AI harness — it interviews you and replaces every token —
> or follow [SETUP.md](SETUP.md) for the manual path. Until then, tokens are load-bearing: do not
> guess values for them.

For how the repository is organised and what an agent should read first, see [CLAUDE.md](CLAUDE.md).

## Quick start

```bash
git clone --recurse-submodules <THIS_REPO_URL>
cd <REPO_NAME>
npm install
npm run qa:install
```

`qa:install` is the whole bootstrap and is idempotent — run it as often as you like. It initialises
the `.claude/core` submodule, syncs the skills and agents into place, creates `.env`, `.mcp.json`,
and `repo-map.local.json` from their examples (never overwriting one that exists), installs the
runner, and reports how many `<TOKEN>` slots remain.

Then open the repo in your AI harness and run the **`init`** skill. After that, any new session in
this repo can take an issue key and run.

## The four tiers

Ownership is segmented by **responsibility, not headcount**. One person can hold several tiers.

| Module | Owner | Owns |
|---|---|---|
| [`.claude/core/`](.claude/core/README.md) | Director of QA | Company-wide standards, tooling, the skills & agents |
| [`.claude/manager/`](.claude/manager/README.md) | QA Manager | Portfolio quality, the release gate, process definition |
| [`.claude/product/`](.claude/product/README.md) | QA Product Lead | This product's context, suites, case structure |
| [`.claude/engineer/`](.claude/engineer/README.md) | QA Engineer | Execution, automation upkeep, reporting |

Standards cascade **down**. Execution data and sign-offs flow **back up**.

`.claude/core/` is a **git submodule** — the shared core repository. A Director change reaches every
product line through it. `.claude/skills/` and `.claude/agents/` are **synced copies** of what core
ships: never hand-edit them.

```bash
npm run base:update    # pull the latest core, sync skills/agents, review the diff
npm run base:check     # CI: fail if this repo has drifted from core
```

## The swap layer — bring your own stack

This skeleton names abstract tool **slots**; you bind each to a real product. The bindings live in
[`support/qa-automation/`](support/qa-automation/) and are filled by `init`.

| Slot | Token | Bound in |
|---|---|---|
| Test-management system | `<TMS_NAME>` | `support/qa-automation/tms.json` |
| Issue tracker | `<TRACKER_NAME>` | `support/qa-automation/tracker-policy.md` |
| Automation runner + language | `<RUNNER_NAME>` | `runner.config.*`, `config/environments.ts` |
| AI process layer | `<AI_HARNESS_NAME>` | `.claude/` |
| Source control | `<SOURCE_CONTROL_PROVIDER>` | `support/qa-automation/repo-map.json` |
| CI | `<CI_PROVIDER>` | `pipelines/` |

Nothing about the framework's value — the tier ownership, the gates, the identity spine, the
review-by-non-author rule, the read-only boundary — changes when you swap these.

## What is committed vs. generated vs. secret

| Kind | Examples | Rule |
|---|---|---|
| **Committed** | tier docs, `tms.json` (ids only), `repo-map.json`, synced skills/agents | In git. Safe to share |
| **Generated** | `.claude/skills/`, `.claude/agents/` | Synced from core — never hand-edit |
| **Secret / per-machine** | `.env`, `.mcp.json`, `repo-map.local.json` | Gitignored. Never commit |

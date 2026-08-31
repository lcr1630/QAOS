# `.claude/core/` — Director of QA (shared core)

**This directory is a git submodule mount point.** In a real checkout it holds the shared **core
repository** — the company-wide standards, tooling decisions, the interview, and the skills & agents
that every product line inherits. In this skeleton it is empty on purpose.

> Point `.gitmodules` at your organisation's core repo (`<CORE_REPO_URL>`), then:
>
> ```bash
> npm run base:update    # pull the latest core and sync skills/agents into place
> npm run base:check     # CI: fail if this repo has drifted from core
> ```

## What the core tier owns

| Responsibility | Lives in the core repo as |
|---|---|
| Company-wide standards and the minimum bar for a test | `standards-and-rules.md` |
| Tooling selection — the shared stack | `tooling.md` |
| The global interview that turns an issue into cases | `interview-process.md` |
| The AI process layer — skills, agents, the shared reference | `ai-infrastructure.md`, `skills/`, `agents/` |
| Distribution — how a change here reaches every product repo | `DISTRIBUTION.md`, `bin/sync.mjs` |

## The inheritance rule

Core sets the **floor**; a product sets the **ceiling**. When a product-level document and a core
document conflict:

- Core sets a **minimum** every product inherits — every test tagged, every skip explained, every
  created record cleaned up. A product cannot opt out.
- A product may **add** requirements core does not impose — a second reviewer, a mandatory visual
  baseline, a stricter flake threshold.

Wanting to *relax* a core rule to ship something is the signal to stop and raise it with the
Director — not to write an exception into a spec file. **A rule that no product can satisfy is a
broken rule, not a product problem. Fix it here.**

## Do not hand-edit synced files

`.claude/skills/` and `.claude/agents/` are **outputs** synced from this core. The fix for any
core-owned behaviour is to change it in the core repo, so every product gets it — never to edit the
synced copy, and never to fork a skill.

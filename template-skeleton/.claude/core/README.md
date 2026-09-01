# `.claude/base/` — Director tier (vendored)

**Historical skeleton path.** Production QAOS uses `@lcr1630/qa-framework-base`, vendored into
`.claude/base/` via `qa-base-vendor` — not a git submodule.

In a real checkout this directory holds **committed reference docs**; skills and agents live in
`.claude/skills/` and `.claude/agents/`.

See [QAOS packages docs](https://github.com/lcr1630/QAOS/blob/main/docs/packages.md).

## What the Director tier owns

| Responsibility | Lives in `@lcr1630/qa-framework-base` as |
|---|---|
| Company-wide standards and the minimum bar for a test | `standards-and-rules.md` |
| Tooling selection — the shared stack | `tooling.md` |
| The global interview that turns an issue into cases | `interview-process.md` |
| The AI process layer — skills, agents, the shared reference | `ai-infrastructure.md`, `skills/`, `agents/` |
| Distribution — how a change here reaches every product repo | `PACKAGES.md`, `bin/vendor.mjs` |

## The inheritance rule

When a product-level document and a base document conflict, base wins on the *floor* and product
wins on the *ceiling*.

Products do not fork base-owned files — refresh with `npm run base:refresh` or receive a PR from
your QA provider.

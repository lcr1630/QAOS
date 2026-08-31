# Automation upkeep

Owned by the **QA Engineer**. Keeping the suite green, current, and trustworthy — with the agents
doing the heavy lifting rather than hand-patching.

## Keeping checkouts current

Ground truth is the real app source. Before healing a locator or an endpoint, make sure the local
checkout is current — a stale checkout heals a test to match code that no longer ships.

| Task | Command |
|---|---|
| Pull the latest core standards, skills, agents | `npm run base:update` |
| Verify nothing has drifted from core | `npm run base:check` |
| Confirm env resolution | `npm run env:dump` |

## Use the agents, don't hand-patch

| Situation | Agent | Not |
|---|---|---|
| A failing or flaky **existing** test | `test-healer` | Writing new coverage |
| A **new** spec from cases or an AC | `test-generator` | Fixing a failing test |
| A pre-commit check of a diff against the standards | `test-reviewer` | Applying fixes — it is read-only |

**The author never vouches for its own work.** `test-reviewer` checks a diff it did not write. A
review by the author is not a review.

## Flakiness is debt, not a state of nature

1. **Local stress before the PR.** Any new test, or any test modified to fix a race, runs
   `npm run test:flake -- <target>` (10 reps) before review. Scope it.
2. **`@flaky` is technical debt, not a fix.** A test known flaky on the main branch carries the tag
   and a tracking issue key.
3. **CI excludes `@flaky` by default.** Do not delete a flaky test to green CI — tag it, exclude it,
   then fix it or quarantine it with a `fixme` naming the issue.

## Never

- Never hand-edit a synced file under `.claude/skills/` or `.claude/agents/`. Change it in core.
- Never comment out a test. It is invisible to every coverage number and every reviewer.
- Never weaken a test to make it pass.

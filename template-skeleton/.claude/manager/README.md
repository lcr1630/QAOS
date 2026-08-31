# `.claude/manager/` — QA Manager

**Portfolio quality and release management.** The gate every release passes through.

A QA Manager manages the quality of a group of products — typically around three — rather than a
group of people. The ultimate gatekeeper for product readiness.

## What this tier owns

| Responsibility | Where it lives |
|---|---|
| Product portfolio oversight — quality outcomes across ~3 products | this directory |
| Release management — approving runs, verifying metrics, enforcing sign-off | [`release-gate.md`](release-gate.md) |
| Process definition — bug allotments, baseline vs. delta run categorisation | [`process-definition.md`](process-definition.md) |
| Traceability — every metric and sign-off logged in the tracker and the TMS | [`traceability.md`](traceability.md) |

## Portfolio

Fill this in during `init`. One row per product in the portfolio.

| Product | Repository | TMS project | Product Lead | Release cadence |
|---|---|---|---|---|
| `<PRODUCT_NAME>` | this repo | `<TMS_PROJECT_NAME>` | `<PRODUCT_LEAD>` | `<RELEASE_CADENCE>` |

## The one rule that defines this tier

**Nothing ships without sign-off.** The QA Manager formally approves the test run and verifies the
metrics before a release is deemed ready. Not a chat thumbs-up — a recorded approval, in the TMS and
the tracker, that someone can find six months later.

The question this tier exists to answer is "was this tested?", and the answer has to be an auditable
record rather than an anecdote.

# `<PRODUCT_NAME>` — tracker routing and team policy

**Product-owned. This file stays in this repository and is filled in by `init`.**

Everything generic — TMS API facts, the identity spine, step vocabulary, gates, write scope — lives
in the core (`.claude/core/`), which is core-owned and updates with `npm run base:update`. What is
here is the part that differs per product and therefore cannot live in a shared submodule.

## Ticket system routing

Which tracker an issue belongs to is decided by **the shape of its key**, per run, per key. There is
no separate chain per tracker — every skill routes internally.

| Key shape | Tracker | Fetch with |
|---|---|---|
| `<ISSUE_PREFIX>-###` | `<TRACKER_NAME>` | its MCP tools |
| `<LEGACY_PREFIX>-###` | `<LEGACY_TRACKER>` | its MCP tools |

Mixed batches are fine — run each key through its own branch and keep the outputs separate. **Never
merge two trackers' issues into one draft.**

If the tool for a key's tracker is unavailable, **stop and say so.** Do not fall back to the other
tracker, and do not guess at issue content.

## Team policy

| Question | Answer |
|---|---|
| Which tracker gets **new bugs**? | `<BUG_TRACKER>` — always, regardless of where the source case traces from |
| Which trackers can be **commented on programmatically**? | `<WRITABLE_TRACKERS>` |
| Which are **read-only** from here? | `<READONLY_TRACKERS>` |

**A tracker with no write path is a supported configuration, not a broken one.** Every skill that
would comment handles it identically: write the composed text into the run's output file under a
`## Issue comment (not posted — no write path)` heading, and tell the user to relay it.

**Never silently skip a comment** because the write path is missing. An unposted comment nobody was
told about is indistinguishable from one that was never composed.

## QA queue

Which teams `start` lists, and the status names that mean "ready for us" on each. **Status
vocabularies are team-specific** — a guessed name returns an empty queue that reads as "nothing to
test" rather than as a misconfiguration.

| Team | Statuses that mean ready |
|---|---|
| `<TRACKER_TEAM>` | `<READY_STATUS>`, `<IN_PROGRESS_STATUS>` |

## Shift-left policy

Read by `shift-left-evaluation`. The **criteria** for classifying a case (unit / integration /
keep-E2E) are core-owned. What is here is the part that differs per product: whether QA authors the
lower test directly, and where a developer handoff goes.

### Path A — QA authors the lower test

**Path A moves the QA engineer into the application's source tree.** It is off until this team
decides otherwise. Even when enabled, the **agent never pushes to app source** — it generates the
test and PR body as an artifact and a human commits it. This flag only controls whether that route
is *offered*.

| Setting | Value |
|---|---|
| `pathAEnabled` | `false` |

Flip it to `true` only after the team agrees QA will open PRs against product code, and fill in the
cleared list below — Path A is offered **only** for a repo that appears here.

| Application repo QA may open a PR against | Where lower tests co-locate |
|---|---|
| `<APP_REPO>` | `<UNIT_TEST_CONVENTION>` |

A repo not on this list is never a Path A target, regardless of `pathAEnabled`.

### Path B — developer handoff

| Question | Answer |
|---|---|
| Which tracker/project receives a Path B spec? | `<HANDOFF_TRACKER>` |
| Which team/queue owns implementing shifted tests? | `<HANDOFF_TEAM>` |
| Issue type for the spec | `<HANDOFF_ISSUE_TYPE>` |

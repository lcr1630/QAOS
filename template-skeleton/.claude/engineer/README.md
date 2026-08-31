# `.claude/engineer/` — QA Engineer / Test Executor

**Test execution and automation maintenance.** Where quality is actually verified, and where evidence
begins its journey back up the chain.

The tier that produces the data every tier above it depends on.

## What this tier owns

| Responsibility | Where it lives |
|---|---|
| Test execution — running the manual and automated cases the Product Lead defined | [`execution.md`](execution.md) |
| Automation upkeep — committing test code, maintaining specs, keeping checkouts current | [`automation-upkeep.md`](automation-upkeep.md) |
| AI-assisted maintenance — using the agents to heal and sync rather than hand-patching | [`automation-upkeep.md`](automation-upkeep.md) |
| Reporting — feeding execution data and bug reports back up so the Manager can review | [`reporting.md`](reporting.md) |

## The daily loop

```
pick up cases  →  run them  →  triage failures  →  fix tests / file bugs  →  report
```

## The one thing that matters most

**Report what actually happened.**

A run described as green when it was flaky, a partial run described as complete, a skip nobody
mentions — each of those makes every number above this tier wrong, and the people reading those
numbers have no way to tell. The gate is only as good as the evidence, and this tier is the evidence.

Nobody is annoyed by an accurate red. Everybody is eventually hurt by an inaccurate green.

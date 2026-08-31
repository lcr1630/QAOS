# Reporting

Owned by the **QA Engineer**. Feeding execution data and bugs back up the chain so the Manager can
read a run. This tier is the evidence the gate depends on.

## The one rule

**Report what actually happened.** A run described as green when it was flaky, a partial run
described as complete, a skip nobody mentions — each makes every number above this tier wrong, and
the people reading those numbers have no way to tell.

Nobody is annoyed by an accurate red. Everybody is eventually hurt by an inaccurate green.

## What a report carries

| Field | Rule |
|---|---|
| Passed / failed / **flaky** / skipped | Reported **separately**. Flaky is never folded into passed |
| Environment and build | Named. The build tested, not "latest" |
| Unmapped tests | Ran but carry no `@C<id>` — listed, not dropped |
| Skips | Each with an attributed reason |
| Coverage gaps | Cases expected for this release that no test exercised |
| Bugs filed | Each linked to its TMS case, with a severity |

## The flow up

```
run → submit results to the TMS → post status on the issue → Manager reads at the gate
                                          │
                         verified failure ┴──→ bug-documentation → filed, linked bug
```

- Submit results: `npm run tms:submit -- --report <RESULTS_PATH> --name "<release> — <env> — <date>"`.
- A verified failure becomes a bug through `bug-documentation` — which routes to `<BUG_TRACKER>` and
  is independently confirmed by `bug-reviewer` before it is called new.
- If a tracker has no write path, the composed comment goes into the run's output file under a
  "not posted" heading and you relay it. **Never silently skip it.**

## Do not

- Do not describe a test as passing without having run it.
- Do not round a partial run into a complete one.
- Do not report a flaky pass as a pass.

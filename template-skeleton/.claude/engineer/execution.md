# Test execution

Owned by the **QA Engineer**. How to run things, and what to do with what comes back.

## Before a run

1. Confirm the environment is the one the case expects, and that it holds the build you mean to test.
   Testing yesterday's deploy and reporting it as today's is a silent, expensive mistake.
2. Confirm credentials resolve — `npm run env:dump` prints what the profile resolved, without
   printing secrets.
3. For a delta run, confirm the scope: which feature tags, derived from the release's cases.

## Commands

```bash
npm run test:core            # PR gate — one test per core function
npm run test:smoke           # fast confidence
npm run test:regression      # full functional
npm run test:api             # API only, skips browser auth setup
npm test -- --grep @<tag>    # anything narrower
```

Add `--project=e2e-<profile>` to target a specific environment. Profiles come from
`config/environments.ts`.

Flake stress, required for any new test or any race-condition fix:

```bash
npm run test:flake -- tests/e2e/your.spec.ts
```

Always scope it. Repeating the whole suite ten times is not a flake check, it is an outage.

## Triage — classify before you touch anything

Every failure is one of four things. Deciding which one *first* is what keeps you from fixing the
wrong layer.

| Class | Signal | Action |
|---|---|---|
| **Product bug** | The app genuinely does the wrong thing | File it. Link the TMS case. Do **not** change the test |
| **Test bug** | The test's expectation or locator is wrong | `test-healer`, then re-verify |
| **Environmental** | Env down, data missing, deploy stale | Fix the environment and re-run. Do not weaken the test |
| **Flake** | Passes on retry, fails intermittently | Real race condition. `test-healer`, then flake-stress |

**The rule that matters:** if the fix would loosen an assertion, add a retry, widen a timeout, or
swallow an error — stop. You have probably found a product bug wearing a test bug's clothes. A test
made to pass by lowering its standards is worse than a failing test, because it now reports green
about something it no longer checks.

## Manual execution

Some cases stay manual by design — see [`../product/test-strategy.md`](../product/test-strategy.md).

- Execute against the case in the TMS, and record the result there. A manual run recorded only in
  chat is not a run.
- A case must pass manually **before** it is automated. Automating an unverified expectation bakes in
  a guess and dresses it as confirmation.
- Reply `manual pass` to the phase-4 gate only when it genuinely did.

## Skips

A skip is invisible by design: the run stays green, the count sits in a corner, and nothing says
which coverage went missing.

- Every skip carries a reason, ideally via a helper in `support/guards/`.
- The summary reporter prints skips grouped by reason at the end of every run. **Read that section.**
- An unexplained skip is unattributable lost coverage, and it blocks the release gate.

## After a run

1. Read the summary — including flaky and skipped, not just passed and failed.
2. Submit to the TMS: `npm run tms:submit -- --report <RESULTS_PATH> --name "..."`.
3. Report up — see [`reporting.md`](reporting.md).

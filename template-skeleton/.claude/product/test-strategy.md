# Test strategy

Owned by the **QA Product Lead**. How Manager process becomes runnable suites for `<PRODUCT_NAME>`,
and the case structure the Engineer executes against. A product may **add** questions to the core
interview here; it may not drop one.

## Suites

| Suite tag | Means | Runs |
|---|---|---|
| `@core` | Exactly one test per core function — the PR gate | Every PR |
| `@smoke` | Fast confidence across the main flows | Pre-deploy |
| `@regression` | Full functional coverage | Baseline runs |

`@core` membership is defined by the Core functions table in
[`product-context.md`](product-context.md). Keep them in sync.

## Case structure

Cases follow the core standard. Naming: **`[Component] - Scenario - Condition`**. Folders mirror the
**product component tree**, which is stable across releases — never a sprint, never a ticket.
Volatile information (issue reference, test type, automation candidacy, platform) lives in **tags**.

| Decision | Value |
|---|---|
| Which cases stay **manual by design** | `<MANUAL_ONLY_AREAS>` |
| Which are **automation-ready** now | `<AUTOMATION_READY_AREAS>` |
| Component tree root folder | `<TMS_ROOT_FOLDER>` (see `tms.json`) |

## Product-specific interview additions

Questions the core interview does not ask but `<PRODUCT_NAME>` needs. Leave empty to inherit the core
set unchanged.

| Added question | Why it exists here |
|---|---|
| `<EXTRA_QUESTION>` | `<WHY>` |

## Generation & healing

| Setting | Value |
|---|---|
| Which agent authors new specs | `test-generator` |
| Which agent fixes failing/flaky specs | `test-healer` |
| Product conventions a generated spec must follow | `<GENERATION_CONVENTIONS>` |

# Process definition

Owned by the **QA Manager**. The categories and allotments that make a run interpretable. Fill the
`<TOKEN>` values during `init`.

## Release categories

Every run is one of two kinds. The category decides scope, environment, and how much coverage is
expected — so it is declared *before* the run, not inferred after.

| Category | What it covers | Environment | When |
|---|---|---|---|
| **Baseline** | The full milestone suite — every case in the milestone | `<BASELINE_ENV>` | `<BASELINE_CADENCE>` |
| **Delta** | Only the cases touched by this release's issues | `<DELTA_ENV>` | Per release |

A delta run that quietly grows into a baseline (or vice versa) makes its numbers meaningless. If the
scope changes mid-flight, restate the category.

## Bug allotment

The expected-defect budget the Manager uses to read a run. A run far under or over its allotment is a
signal to investigate the *testing*, not just the product.

| Severity | Definition | Blocks release? |
|---|---|---|
| `<SEV_1>` | `<SEV_1_DEF>` | Yes |
| `<SEV_2>` | `<SEV_2_DEF>` | Case-by-case |
| `<SEV_3>` | `<SEV_3_DEF>` | No |

## Regression policy

| Question | Answer |
|---|---|
| How often does a full baseline run? | `<BASELINE_CADENCE>` |
| Who triggers `milestone-regression-run`? | `<REGRESSION_OWNER>` |
| What milestone naming does the TMS use? | `<MILESTONE_CONVENTION>` |

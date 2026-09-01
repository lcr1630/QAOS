# Testability Readiness

The **readiness gate** is the front door for QA OS Lite. It scores whether a product can support
the framework's automation model **before** `qa-0-init` spends time on a harness that cannot run.

This doc explains the rubric for operators and technical buyers. The authoritative policy lives in
`qa-framework-base/testability-rubric.md`; the **`readiness-gate`** skill executes it.

---

## Why it exists

Small AI startups often want "tests on every PR" on day one. Many cannot support that yet:

- Demo environments shared with sales
- SSO-only auth with no service account path
- UI-only setup for complex entity state
- No `data-testid` convention

The readiness gate makes gaps **explicit and scored** instead of discovered when the first `@core`
run fails at login.

---

## Score bands

| Band | Threshold | Meaning |
|---|---|---|
| **GO** | ≥80% weighted score | Full Lite path: `@core` on PR, automation through phase 4 |
| **CONDITIONAL** | 50–79% | Init may proceed with scoped manual-only areas and eng prerequisites |
| **NO-GO** | <50% or hard-block trigger | Init stops; deliver eng checklist only |

Max weighted score: **34 points**. GO ≥ 27.2. CONDITIONAL ≥ 17.

---

## Dimensions

Each dimension scores **0** (absent), **1** (partial), or **2** (met).

| Dimension | Weight | Critical? |
|---|---|---|
| Dedicated staging env | 3 | **Yes** |
| Programmatic auth | 3 | **Yes** if state-heavy |
| Setup/teardown APIs | 3 | **Yes** if >3 state preconditions |
| Env isolation | 2 | **Yes** if shared DB |
| Test IDs | 2 | No |
| Secondary identities | 1 | No |
| Feature flag control | 1 | No |
| Data reset | 2 | **Yes** for regression |

**State-heavy** = more than three distinct starting states (roles, lifecycle stages, cross-user
flows) needed to test meaningfully.

---

## Hard blocks (automatic NO-GO)

Regardless of percentage:

1. **No dedicated staging** — production or shared demo URL only
2. **SSO-only + state-heavy** — no programmatic auth path and complex state requirements
3. **Shared mutable env + no isolation plan** — multiple testers on one DB with no documented fix

These are not negotiable for `@core` on PR. Fix the prerequisite or accept manual-only scope with
written sign-off.

---

## Artifacts

Written to install root (`qa/` for Lite integrated mode):

| File | When |
|---|---|
| `readiness-report.md` | Always — scores, band, summary |
| `readiness-scope.md` | CONDITIONAL — manual-by-design areas, deferred automation, eng prerequisites |

CONDITIONAL and NO-GO outputs include **Linear-ready issue bodies** for:

- Setup/teardown API for entity `{name}`
- Test ID convention adoption
- Staging env isolation (reset script or ephemeral preview)
- Programmatic auth endpoint for automation account

---

## Interview flow

The skill asks **one dimension group at a time** and stops for `confirm readiness interview`.

1. Environment — staging URL, deploy cadence
2. Authentication — token, password grant, SSO, UI-only
3. State and data — APIs, isolation, reset
4. Testability hooks — test IDs, roles, flags

**Never infer answers to keep moving.** Ambiguity here becomes flakiness later.

---

## Operator decisions by band

### GO

- Proceed to `qa-0-init` immediately
- Target full phase 1–5 on pilot issue including phase 4 automation
- Set client expectation: `@core` is a merge gate within 2 weeks

### CONDITIONAL

- Review `readiness-scope.md` with eng lead
- Get **written sign-off** on manual-only areas (email or Linear comment)
- File eng prerequisite issues; link from readiness report
- Phase 4 automation only for in-scope flows
- Re-run readiness gate when prerequisites land

### NO-GO

- Do **not** run `qa-0-init`
- Deliver eng checklist from skill output
- Offer re-assessment in 4–6 weeks or manual QA-only advisory
- Optional: sell eng-only "testability sprint" to unblock GO

---

## Client-facing framing

**Do say:**

- "This tells us what we can automate safely on PRs vs what needs eng work first."
- "CONDITIONAL is normal for seed-stage startups — it means a scoped plan, not failure."
- "The checklist saves you from building a harness that can't log in."

**Do not say:**

- "You failed QA" (use band language: GO / CONDITIONAL / NO-GO)
- "We'll automate everything anyway" (violates hard blocks)
- "Test IDs are optional" (they're not critical, but missing IDs increase cost and flake)

---

## Re-assessment

Re-run **`readiness-gate`** when:

- Staging environment lands
- Auth API ships
- Reset script or ephemeral preview env is available
- Client upgrades toward Standard edition

Append new reports; do not delete prior ones — the trajectory matters for release gate history.

---

## Related docs

- [evolution-lite-to-standard.md](evolution-lite-to-standard.md) — when readiness gaps close at scale
- [sales/one-pager.md](sales/one-pager.md) — what Lite delivers
- [README.md](../README.md) — readiness gate in the Lite offer

# Onboarding — Weeks 1–3

Client-facing schedule for a **QA OS Lite** engagement. Adjust dates to your SOW; the sequence is
fixed.

---

## Before week 1

**Client provides:**

- GitHub repo access
- Linear workspace access
- Staging URL and test credentials (or commitment to deliver by Day 3)
- One engineering contact for readiness interview (45 min)
- One product contact for `product-context.md` review

**You deliver:**

- Signed SOW with MVP exit criteria (see [service-playbook.md](service-playbook.md))
- Calendar holds for Week 1 kickoff and Week 3 readout

---

## Week 1 — Foundation

### Day 1 — Kickoff (60 min)

| Time | Topic |
|---|---|
| 0:00 | What QA OS Lite is (outcomes, not architecture) — use [one-pager](sales/one-pager.md) |
| 0:15 | Walk through the five-phase pipeline (`qa-start` → report) |
| 0:30 | Access checklist: GitHub, Linear, staging, CI secrets |
| 0:45 | Pick the **pilot issue** — one shipped or in-progress feature |
| 0:55 | Schedule readiness interview (Day 1–2) |

**Your homework:** Open install PR (`qa/` folder).

### Day 2 — Readiness gate (45–60 min)

Run **`readiness-gate`** with the engineering contact.

Cover four groups:

1. **Environment** — staging URL, deploy cadence, data reset
2. **Authentication** — API token vs UI-only vs SSO
3. **State and data** — setup/teardown APIs, isolation, parallel runs
4. **Testability hooks** — test IDs, secondary roles, feature flags

**Deliverables same day:**

- `qa/readiness-report.md` shared in Slack/email
- If CONDITIONAL: `qa/readiness-scope.md` + eng prerequisite issues in Linear
- If NO-GO: eng checklist only; agree re-engagement trigger

**Client decision required:** Proceed / proceed with conditions / pause

### Day 3 — Init

Run **`qa-0-init`** (Claude Code, from `qa/`).

**Client actions:**

- [ ] Paste secrets into `qa/.env` (never in chat)
- [ ] Connect Linear MCP
- [ ] Review filled `product-policy.md` and `edition.json`

**Verify:**

```bash
cd qa && npm run qa:install -- --check
npm run env:dump
npm run typecheck
```

### Day 4–5 — Product context + Phase 1

**Client owns** `.claude/product/product-context.md`:

- What the product does (one paragraph a stranger would understand)
- Auth model and tenancy rules
- Surfaces that look broken but are intentional
- Core user journeys for the pilot issue

**You run Phase 1** on the pilot issue:

- Requirement artifact
- Independent review (requirement-reviewer subagent)
- Interview complete gate on the issue

**Week 1 exit:** Phase 1 complete on pilot issue; `product-context.md` draft exists.

---

## Week 2 — Cases, manual, first automation

### Day 6–7 — Phase 2 (cases)

- Draft cases in `qa/cases/{ISSUE-KEY}.md`
- Case review gate
- Staged test data where APIs exist; document gaps where they don't

**Client review:** 30 min walkthrough of cases — do they match intent?

### Day 8 — Phase 3 (manual)

- Manual pass with evidence
- File bugs via `bug-documentation` if failures are real

### Day 9–10 — Phase 4 (automation)

- First `@core` spec from template
- PR in client repo under `qa/tests/`
- `@Case-id` and issue key in test title

**Enable CI:**

- Merge `qa-core.yml` if not already
- Set `URL`, `TEST_ADMIN_USER`, `TEST_ADMIN_PASSWORD` in GitHub
- Confirm green `@core` on a PR

**Week 2 exit:** At least one automated `@core` test; CI running.

---

## Week 3 — Reporting, evals, handoff

### Day 11 — Phase 5 (report)

- Results on Linear issue
- Status comment with links to cases and spec

### Day 12 — AI evals

- Review `qa/evals/` scaffold
- Add one golden set for a prompt-critical flow (or document deferral)
- Run `npm run eval:smoke`

### Day 13 — Release Gate Lite

```bash
cd qa
npm run test:core
npm run gate:report -- --release "0.1.0"
```

Deliver `outputs/release-gate-{date}.html`.

### Day 14 — Readout (60 min)

| Time | Topic |
|---|---|
| 0:00 | Readiness band recap |
| 0:10 | Pilot issue trace: issue → cases → test → CI |
| 0:25 | Live `@core` on a PR |
| 0:35 | Release Gate Lite report walkthrough |
| 0:45 | What client runs themselves: `qa-start`, weekly `@core` |
| 0:55 | Retainer options / Standard upgrade path |

**Handoff package:**

- [ ] Merged `qa/` with docs
- [ ] `readiness-report.md`
- [ ] Release Gate Lite HTML
- [ ] `product-context.md` (client-maintained)
- [ ] One-page "how to run QA" cheat sheet (see below)

---

## Client cheat sheet (include in handoff)

```text
Start work:     qa-start          (shows QA queue)
On an issue:    phase-1 … phase-5 (each names the next)
Live progress:  npm run qa:dashboard   (browser at http://127.0.0.1:3847)
PR gate:        @core tests in CI (qa-core.yml)
Before release: npm run test:smoke && npm run gate:report
Evals:          npm run eval:smoke
```

**Rules they inherit:**

- Gates are not advisory — wait for explicit keywords
- Never skip readiness on the next product surface
- `product-context.md` is living documentation — update when the product changes

---

## Success metrics (30 days post-handoff)

| Metric | Target |
|---|---|
| `@core` pass rate on PRs | ≥95% (excluding known `@flaky`) |
| Pilot issue traceable | Issue → case file → test title → CI run |
| Time to first `@core` on new feature | <2 days with `qa-start` chain |
| Client-initiated `qa-start` runs | ≥2 without your prompting |

---

## Related docs

- [service-playbook.md](service-playbook.md)
- [testability-readiness.md](testability-readiness.md)
- [evolution-lite-to-standard.md](evolution-lite-to-standard.md)

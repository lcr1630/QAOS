# Evolution: Lite → Standard

When a client outgrows **QA OS Lite**, they upgrade to **Standard** — a dedicated automation
repository with Testmo, full release gate, and portfolio-scale process. The operating system is the
same; the edition changes.

---

## When to upgrade

| Signal | Lite limit | Standard answer |
|---|---|---|
| Multiple products or repos | Single integrated `qa/` folder | Separate automation repo per product line |
| Test case count > ~50 | Markdown cases in `cases/` | Testmo as source of truth |
| Compliance / audit asks for TMS history | Linear comments + artifacts | Testmo runs, folders, automation links |
| QA team hire | One person runs `qa-start` | Manager tier + milestone regression |
| Cross-repo app (mobile + web + API) | Integrated repo-map is awkward | `repo-map.json` with read-only app mounts |

**Do not upgrade because:**

- Client wants Testmo "for credibility" but has 8 cases (stay Lite)
- Client is pre-PMF and still moving staging weekly (fix readiness first)

---

## What stays the same

These do **not** change at upgrade:

- Four-tier ownership model
- Phase 1–5 pipeline and gate keywords
- Identity spine (issue key joins everything)
- Skills and agents (same vendored base)
- Standards floor (API-first state, tagging, no silent skips)
- Read-only boundary on application source

---

## What changes

| Aspect | Lite | Standard |
|---|---|---|
| Layout | `qa/` in app repo | Dedicated `<product>-automation` repo |
| TMS | None — `cases/{KEY}.md` | Testmo project + folders |
| Tracker | Linear (startup preset) | Linear or Jira (multi-key routing) |
| CI | `qa-core.yml` on app repo | `playwright.yml` on automation repo |
| Release gate | Release Gate Lite HTML | Full manager-tier release gate + Testmo submit |
| Edition flag | `"edition": "lite", "tms": "none"` | `"edition": "standard", "tms": "testmo"` |

---

## Migration path

### Step 1 — Freeze Lite baseline

1. Tag client app repo: `qa-lite-baseline`
2. Export `readiness-report.md`, `cases/`, and `qa/tests/` inventory
3. Document open `readiness-scope.md` prerequisites — carry forward or close

### Step 2 — Stand up Standard repo

```bash
git clone <qa-automation-template> client-product-automation
cd client-product-automation
npm install && npm run qa:install
```

Run **`qa-0-init`** with `"tms": "testmo"`. Fill Testmo tokens and folder ids.

### Step 3 — Migrate assets

| Lite asset | Standard destination |
|---|---|
| `cases/{KEY}.md` | Testmo cases via `testmo:cases` or manual import |
| `qa/tests/*.spec.ts` | Copy to Standard `tests/`; update imports if paths differ |
| `product-context.md` | Copy to `.claude/product/product-context.md` |
| `product-policy.md` | Merge into Standard `support/qa-automation/product-policy.md` |
| Eval golden sets | Copy `evals/` directory |
| Vendored base version | Refresh both to same `base:version` |

### Step 4 — Rewire CI

- Remove or archive `qa-core.yml` from app repo (or keep `@smoke` only)
- Enable Standard `playwright.yml` + Testmo submit on automation repo
- Update `repo-map.json` with app repo paths (read-only)

### Step 5 — Re-run one issue through Standard chain

Prove traceability: issue → Testmo case → spec → run → result on issue.

---

## Client communication

**Frame as growth, not replacement:**

> "Lite got you `@core` on PRs and a recorded release answer. Standard adds a test management
> system and a dedicated automation repo because you now have enough cases and repos that markdown
> files in the app repo are slowing you down."

**Timeline:** 1–2 weeks for migration; can overlap with Lite retainer.

**Pricing:** One-time migration fee + Standard retainer tier.

---

## Downgrade (rare)

If a client collapses back to one repo and <20 cases, Lite is viable again:

```bash
node scripts/install.mjs --into ../client-app --prefix qa --edition lite
```

Re-run readiness gate — do not assume prior GO still holds if staging/auth regressed.

---

## Related docs

- [sales/one-pager.md](sales/one-pager.md) — edition comparison for buyers
- [testability-readiness.md](testability-readiness.md) — readiness gate before init
- [README.md](../README.md) — full framework narrative

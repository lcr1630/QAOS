# `support/` — the test harness

The reusable machinery specs are built from. Most of this is **shipped by the core** (or scaffolded
by `init`) and is generic — it reads `config/environments.ts` and the swap-layer bindings in
[`qa-automation/`](qa-automation/) rather than hardcoding anything product-specific.

Expected layout once populated:

```
support/
├── qa-automation/        SWAP LAYER — tms.json, tracker-policy.md, repo-map.json (present in this skeleton)
├── fixtures/             the fixtures every spec imports `test` from — Page Objects & API Managers injected here
├── pages/                Page Objects — locators and UI actions, one class per screen or panel
├── api-managers/         API setup/teardown classes, one per resource
├── guards/               reusable conditional-skip helpers
├── env/                  environment resolution machinery (reads config/environments.ts)
├── tags.*                the tag vocabulary and the title() helper
├── catalog.*             feature tag → TMS section, and the case annotations
└── tms/                  the TMS REST client, area map, coverage tooling
```

## The one directory you fill in this skeleton

[`qa-automation/`](qa-automation/) holds the swap-layer bindings — the only product-specific config
in `support/`. Everything else arrives with the core or is generated. The rule that keeps it that
way: **product-specific values live in `qa-automation/` and `config/environments.ts`, never
scattered into the harness.**

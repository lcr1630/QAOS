# `scripts/` — operational tooling

Command-line tooling the npm scripts call. Most of this is **shipped by the core** or scaffolded by
`init`; it is listed here so the skeleton documents what `package.json` expects to exist.

| Script | Backs | Does |
|---|---|---|
| `install.mjs` | `qa:install`, `postinstall` | The idempotent bootstrap — submodule init, sync, seed examples |
| `dump-env-config.ts` | `env:dump` | Print how each profile resolved. Never prints secrets |
| `qa-watch.ts` | `qa:watch`, `qa:status` | Live progress outside the AI conversation |
| `tms-resolve.ts` | `tms:resolve` | Resolve TMS ids by **name** and write `tms.json`. Refuses to guess |
| `tms-map-areas.ts` | `tms:map-areas` | Map TMS folders → canonical areas |
| `tms-cases.ts` | `tms:cases` | List / create / link cases |
| `tms-submit.ts` | `tms:submit` | Submit a run's results |
| `tms-untagged.ts` | `tms:untagged` | Find tests missing a `@C<id>` tag |

The `tms-*` scripts are the **swap point for the test-management system**. If your TMS ships an
official MCP server, prefer it and retire these; until then they are the integration.

`base:*` scripts are provided by the core submodule at `.claude/core/bin/sync.mjs` — not here.

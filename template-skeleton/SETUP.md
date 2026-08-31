# Manual setup

The `init` skill does all of this by interview. This is the manual path, and a checklist of every
`<TOKEN>` slot so you can see what "filled in" means.

## 1. Bootstrap

```bash
git clone --recurse-submodules <THIS_REPO_URL>
cd <REPO_NAME>
npm install
npm run qa:install          # idempotent: inits the submodule, syncs skills/agents, seeds examples
```

If you cloned without `--recurse-submodules`:

```bash
git submodule update --init --recursive
```

## 2. Point the core submodule at your shared core repo

`.gitmodules` declares the core submodule URL. Set it to your organisation's shared core repository
(the `qa-framework-base` equivalent):

```
[submodule ".claude/core"]
    path = .claude/core
    url = <CORE_REPO_URL>
    branch = main
```

## 3. Fill the swap layer

| File | Bind |
|---|---|
| `support/qa-automation/tms.json` | Your test-management system: instance URL, project name, case fields, link mechanism |
| `support/qa-automation/tracker-policy.md` | Which issue tracker(s), how keys route, which are writable, the QA queue statuses |
| `support/qa-automation/repo-map.json` | Where the application source lives (read-only), and how deploys are discovered |
| `config/environments.ts` | Environments, the auth strategy, credential env-var names |

## 4. Create the gitignored, per-machine files

```bash
cp .env.example .env                                   # credentials + tokens
cp .mcp.json.example .mcp.json                          # AI-harness connectors (if used)
cp support/qa-automation/repo-map.json \
   support/qa-automation/repo-map.local.json            # then add absolute checkout paths
```

Fill `.env` with real values. Confirm they resolve — this prints resolution, never secrets:

```bash
npm run env:dump
```

## 5. Resolve the TMS ids

The tokens in `tms.json` that are `null` are resolved from your live instance:

```bash
npm run tms:resolve
```

## 6. Verify

```bash
npm run typecheck
npm run test:core           # once you have at least one @core spec
```

## The token checklist

Every `<TOKEN>` this skeleton ships with, grouped by where it lives. `init` fills all of them.

**Identity**

- `<PRODUCT_NAME>`, `<REPO_NAME>`, `<PRODUCT_DESCRIPTION>`

**Swap layer — tools**

- `<TMS_NAME>`, `<TMS_INSTANCE>`, `<TMS_PROJECT_NAME>`, `<TMS_TEMPLATE_NAME>`
- `<TRACKER_NAME>`, `<ISSUE_PREFIX>`, `<LEGACY_PREFIX>`, `<LEGACY_TRACKER>`
- `<RUNNER_NAME>`, `<AI_HARNESS_NAME>`, `<CI_PROVIDER>`
- `<SOURCE_CONTROL_PROVIDER>`, `<SOURCE_CONTROL_ORG>`, `<SOURCE_CONTROL_PROJECT>`
- `<CORE_REPO_URL>`

**Environments & auth**

- `<DEV_BASE_URL>`, `<STAGING_BASE_URL>`, `<TOKEN_ENDPOINT>`, `<AUTH_MECHANISM>`, `<SESSION_STORAGE>`

**Team policy**

- `<TRACKER_TEAM>`, `<TRACKER_TEAM_NAME>`, `<READY_STATUS>`, `<BUG_TRACKER>`
- `<WRITABLE_TRACKERS>`, `<READONLY_TRACKERS>`

**App source**

- `<APP_UI_REPO>`, `<APP_API_REPO>`, `<PIPELINE_YAML_PATH>`

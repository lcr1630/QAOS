# QAOS packages

Runnable QAOS ships as two npm packages on **GitHub Packages** under the `@lcr1630` scope.

| Package | CLI | Purpose |
|---|---|---|
| `@lcr1630/qa-framework-base` | `qa-base-vendor` | Director tier source — skills, agents, standards |
| `@lcr1630/qa-automation-template` | `qaos-install` | Standard + Lite harness and install into client repos |

## `.npmrc` (all consumers)

```
@lcr1630:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## Publish order

1. Push `qa-framework-base` → `npm publish` (bump version in `package.json`)
2. Bump base semver in `qa-automation-template/package.json`
3. Push `qa-automation-template` → `npm publish`

## Local development (sibling checkouts)

```bash
cd qa-automation-template
npm run link:base    # installs ../qa-framework-base before GitHub Packages publish
npm install
npm run base:refresh
```

After publish, use `.npmrc` + `npm install @lcr1630/qa-framework-base` instead.

## This repo

[QAOS](https://github.com/lcr1630/QAOS) is GTM only — narrative, playbooks, and `overview.html`.
It does not publish an npm package.

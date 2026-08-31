# `<PRODUCT_NAME>` — product context

Owned by the **QA Product Lead**. This is the file that turns a generic QA agent into one that is
useful on this product.

**Fill it in before writing tests.** An agent without this will infer the product's behaviour from
the ticket text and produce tests that are plausible and wrong. Every heading below exists because
its absence has cost somebody a debugging session.

---

## What the product is

`<PRODUCT_DESCRIPTION>`

| User type | What they do | Permissions they hold |
|---|---|---|
| `<USER_TYPE>` | | |

## Core functions

The flows that define whether the product works at all. `@core` has exactly one test per row — this
table is the definition of the PR gate.

| # | Core function | Feature tag | `@core` test |
|---|---|---|---|
| 1 | `<CORE_FUNCTION_1>` | `@<TAG>` | |
| 2 | | | |

## Surface map

Where things live, so an agent does not have to search for them.

| Area | Route / entry point | Owning API | Feature tag |
|---|---|---|---|
| | | | |

## Authentication

| Question | Answer |
|---|---|
| Auth mechanism | `<AUTH_MECHANISM>` — e.g. JWT password grant, OIDC, SSO |
| Token endpoint | `<TOKEN_ENDPOINT>` |
| Where the session is stored | `<SESSION_STORAGE>` — localStorage keys, cookie names |
| Does the app support more than one auth build? | `<AUTH_VARIANTS>` |
| Service-account requirements | `<SERVICE_ACCOUNT_NOTES>` — logged in once by hand, EULAs accepted, password never expires |

**Session sharing.** If the global setup mints one session and shares it across the run, a test that
logs *out* revokes it for every test that follows. Note whether that applies: `<SESSION_SHARING_NOTE>`

## Tenancy and data isolation

| Question | Answer |
|---|---|
| Is the product multi-tenant? | `<MULTI_TENANT>` |
| What isolates one test run from another? | `<ISOLATION_MECHANISM>` |
| Is test data shared between people? | `<SHARED_DATA>` |
| Can a test destroy state another test depends on? | `<DESTRUCTIVE_RISK>` |

**Shared test data drifts.** Prefer staging your own data over depending on a record you did not
create.

## Identities

The default suite identity is usually an admin holding every role — which **cannot reproduce a "user
lacks privilege X" bug**. List any secondary identities here.

| Identity | Holds | Must NOT hold | Env vars | Used by |
|---|---|---|---|---|
| default | `<DEFAULT_ROLES>` | — | `TEST_ADMIN_USER` / `TEST_ADMIN_PASSWORD` | everything |

Secondary identities are **opt-in**. A spec that needs one skips when it is absent rather than
failing, so `@core` and `@smoke` stay single-identity.

## Opaque surfaces

Anything locators cannot read — canvas, WebGL, embedded viewers, third-party iframes, PDF renderers.

| Surface | Where | How to assert against it |
|---|---|---|
| | | `page.evaluate()` / mocked response / container-only visual |

## Known quirks

Behaviour that looks like a bug and is not. This section prevents the same investigation being
repeated by every new person and every fresh agent context.

| Quirk | Why it happens | What not to do about it |
|---|---|---|
| | | |

## Retired features

Features that no longer exist. **Never author a case or a test for one.**

| Feature | Retired | Note |
|---|---|---|
| | | |

## Glossary

Domain vocabulary, so naming in tests matches naming in the product.

| Term | Means |
|---|---|
| | |

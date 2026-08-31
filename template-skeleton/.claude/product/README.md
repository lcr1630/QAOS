# `.claude/product/` — QA Product Lead

**Pod-level strategy and context integration.** Where process becomes runnable tests.

Embedded directly in the pod as the centralised quality authority for `<PRODUCT_NAME>` — turning
manager-level process into structured, runnable suites.

## What this tier owns

| Responsibility | Where it lives |
|---|---|
| Dedicated product ownership — the quality authority for one product line | this directory |
| Context ingestion — making sure agents ingest real product docs, requirements, and logic | [`context-sources.md`](context-sources.md) |
| Test generation — the generator/healer setup, and the structure of TMS cases | [`test-strategy.md`](test-strategy.md) |
| Delegation & structuring — turning Manager process into suites, handing execution to Engineers | [`test-strategy.md`](test-strategy.md) |

## Start here

[`product-context.md`](product-context.md) is the highest-value file in this repository and it starts
nearly empty. It is what makes a generic agent useful on *this* product: the surface area, the auth
model, the tenancy rules, the parts that look broken and are not.

An agent working without it will produce plausible tests that are wrong in ways nobody catches until
they fail on a real environment. Filling it in is not documentation work — it is the work.

## The Product Lead's actual job, in one line

Take the process the Manager defined and the standards the Director set, and produce **suites an
Engineer can execute without having to guess.** If a case needs a conversation before it can be run,
it is not finished.

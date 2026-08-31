# `tests/` — the specs

Empty in the skeleton. Your specs go here, split by kind:

```
tests/
├── e2e/     end-to-end user journeys, UI-driven
└── api/     pure API validations, no browser
```

A file in the wrong directory is a real defect: `tests/api` runs without browser auth setup, and an
e2e spec placed there fails in a way that looks like a product bug.

See [`TEMPLATE.spec.ts.txt`](TEMPLATE.spec.ts.txt) for the shape of a fully-tagged spec.

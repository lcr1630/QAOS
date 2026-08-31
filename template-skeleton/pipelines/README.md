# `pipelines/` — CI definitions

Empty in the skeleton. Add the CI definition for your provider (`<CI_PROVIDER>`).

What the suite needs from CI, whatever the provider:

- **Run the runner** and produce a **machine-readable result** (e.g. JUnit XML) — that file is what
  both the pipeline and the TMS consume. Enable the machine-readable reporter in CI even if local
  runs default to a human-readable one.
- **Exclude `@flaky` by default** (`--grep-invert @flaky`). Flaky tests are tracked as debt, not run
  in the gate.
- **Provide credentials as secrets**, matching the key names in `config/environments.ts` /
  `.env.example`. Set the profile explicitly (e.g. `AUTH_PROFILES=dev`) so nothing depends on how
  `--project` was spelled.
- **Submit results to the TMS** on completion: `npm run tms:submit -- --report <RESULTS_PATH> ...`.

The reference framework ships definitions for common providers; drop yours here and wire the four
points above.

# Traceability

Owned by the **QA Manager**. The record that makes "was this tested?" answerable months later. It is
the manager-tier statement of the **identity spine** the whole framework joins on.

## Everything joins on the issue key

| Link | Mechanism | Verify |
|---|---|---|
| Issue → test case | The TMS's native issue link (see `issueLink` in `tms.json`) | The case's issue panel shows the key |
| Test case → automated test | `@C<caseId>` in the **test title** | The run maps results to the case |
| Automated test → issue | The issue key in the test title | A query by key finds the test |
| Test case → spec file | The TMS's native automation-link field | Coverage reads "automated" |
| Run → release | Run name `<release> — <environment> — <date>`, linked on the release issue | The release issue links the run |

**A link written the wrong way appears to succeed and is invisible to every query.** The Manager's
job at the gate is to confirm the links resolve, not to assume they do.

## What must be recorded, and where

| Fact | Recorded in |
|---|---|
| The test run and its numbers | The TMS |
| Sign-off (named) | The TMS run **and** the release issue |
| Every filed bug, linked to its case | The tracker |
| Coverage gaps accepted for this release | The sign-off comment |

An unrecorded fact does not exist at the gate. See [`release-gate.md`](release-gate.md).

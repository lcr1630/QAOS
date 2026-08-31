# The release gate

Owned by the **QA Manager**. The checklist a release passes before it is deemed ready, and the record
it leaves behind.

## How quality flows

**Standards cascade down.** Director sets the core module and the tooling → Manager defines process
and release categories → Product Lead structures the suites → Engineers execute.

**Evidence flows up.** Execution data and bug reports from Engineers → structured review by the
Product Lead → metric verification by the QA Manager → sign-off.

Neither direction works without the other. Standards with no evidence flowing back is a document
nobody follows; evidence with no standards is a number nobody can interpret.

## Gate checklist

Every item must be **true and recorded**. An item that is true but unrecorded fails the gate — the
whole point is that the record outlives the conversation.

### 1. Scope is declared
- [ ] Release category chosen and stated: **baseline** or **delta** (see [`process-definition.md`](process-definition.md))
- [ ] Every issue in the release is listed, with its TMS cases
- [ ] Anything deliberately not tested this release is named, with the reason

### 2. The run happened
- [ ] The suite ran against the **release-candidate build**, not a branch or a stale deploy
- [ ] Environment is named, and it is the one the category requires
- [ ] The TMS run exists and is linked. A local run with no TMS record does not count
- [ ] Run name identifies it: `<release> — <environment> — <date>`

### 3. The numbers are real
- [ ] Passed / failed / **flaky** / skipped, reported separately
- [ ] **Flaky is not folded into passed.** A test that passed on retry did not pass
- [ ] Every skip has an attributed reason. Unexplained skips are unattributable lost coverage
- [ ] Unmapped tests — ran, no `@C<id>` tag, invisible to the TMS — are listed
- [ ] Coverage gaps named: cases expected for this release that no test exercised

### 4. Failures are adjudicated
Every failure is classified, by a human, as one of:

| Class | Then |
|---|---|
| **Product bug** | An issue exists, is linked to the case, and has a severity |
| **Test bug** | Hand it to `test-healer`. Does not block the release, but blocks trusting that case |
| **Environmental** | Named, with what made it environmental. Re-run before accepting |

- [ ] No unclassified failures
- [ ] No blocking-severity product bug is open against release scope

### 5. Sign-off
- [ ] QA Manager records approval **in the TMS** against the run
- [ ] QA Manager records approval **in the tracker**, on the release issue, with the run link and numbers
- [ ] Approval names the person. "QA approved" with no name is not a sign-off

## What blocks a release

| Condition | Blocks? |
|---|---|
| An open blocking-severity product bug in scope | **Yes** |
| A failed test that has not been classified | **Yes** |
| No TMS run for the release candidate | **Yes** |
| Sign-off not recorded | **Yes** |
| Flaky tests present | No — reported and tracked as debt |
| Skipped tests with attributed reasons | No — the lost coverage is stated in the sign-off |
| Skipped tests with no reason | **Yes** — you cannot sign off on coverage you cannot describe |

## Standing rule

A release gate that always passes is not a gate. If this checklist has never blocked anything, it is
being applied as a formality — a process failure to raise with the Director, not a sign of unusually
high quality.

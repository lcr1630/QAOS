# `.claude/agents/` — synced from core, do not hand-edit

This directory is **generated**. Its contents are synced from the core repository
(`.claude/core/agents/`) into the path the AI harness actually discovers.

In a real checkout, after `npm run base:update`, it holds the subagents each phase delegates to:

| Agent | Use it for |
|---|---|
| `requirement-reviewer` | Business-logic review of a requirement artifact |
| `case-reviewer` | Reviewing drafted cases before they are created |
| `test-data-generator` | Making a case's precondition data actually exist |
| `manual-test-runner` | Driving a batch of cases in a real browser |
| `test-generator` | Writing a new spec from cases or an AC |
| `test-healer` | Fixing a failing or flaky existing test |
| `test-reviewer` | Pre-commit check of a diff against the standards (read-only) |
| `bug-reviewer` | Independently verifying a failure is real |
| `test-reporter` | Submitting results, drafting the status comment |
| `shift-left-classifier` | Classifying a case unit / integration / keep-E2E, grounded in source |

Two design rules run through all of them:

- **The agent that produced the work never vouches for it.** A review by the author is not a review.
- **Context-heavy work is contained** in a subagent's own context, so the orchestrating conversation
  does not re-pay for that history on every later turn.

**Never hand-edit a file here.** Change it in the core repository.

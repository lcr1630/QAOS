# `.claude/skills/` — synced from core, do not hand-edit

This directory is **generated**. Its contents are synced from the core repository
(`.claude/core/skills/`) into the path the AI harness actually discovers.

In a real checkout, after `npm run base:update`, it holds the workflow skills:

```
start
phase-1-requirement-analysis
phase-2-test-case-authoring
phase-3-manual-test-execution
phase-4-test-automation
phase-5-test-reporting
bug-documentation
milestone-regression-run
shift-left-evaluation
init
```

**Never hand-edit a file here.** The sync script detects a local edit and refuses to overwrite it,
but the fix is always the same: move the change into the core repository so every product gets it. A
skill states *process*; any *policy* it needs lives in a tier module and the skill reads it.

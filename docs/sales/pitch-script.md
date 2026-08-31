# Discovery Call — Pitch Script

45-minute structure for selling **QA OS Lite**. Adapt to your voice; keep the outcome framing.

---

## Pre-call prep (10 min)

- Scan their repo: monorepo vs single app, existing tests, CI
- Check for staging URL in README or docs
- Note AI-specific surfaces (chat, RAG, agents) for eval hook
- Have [one-pager](one-pager.md) ready to send after call

---

## Opening (5 min)

> "Thanks for making time. I'll keep this practical — I want to understand how you ship today and
> whether QA OS Lite is actually a fit, not sell you something that won't run in your environment.
>
> Quick context on us: we install a QA operating system that's already running in production — not
> a generic Playwright starter. It gives you a recorded answer to 'was this tested?' starting with
> `@core` tests on PRs and a release report your investors can see.
>
> Does that match what you're looking for, or is there a specific pain — CI, manual QA, audit — that's
> driving this call?"

**Listen.** Note their words for the close.

---

## Discovery questions (15 min)

### Shipping cadence

- "How often do you merge to main? What's on PRs today — unit tests, nothing, manual QA?"
- "When something breaks in staging, how do you find out?"

### The "was this tested?" question

- "If an investor or design partner asked whether last week's release was tested, what would you
  show them today?"
- "Is that answer good enough for the next fundraise or enterprise pilot?"

### Environment and auth (light readiness)

- "Do you have a staging URL that's not the same as the sales demo?"
- "How does automation log in — API token, test account, SSO only?"
- "Can you create and delete test data via API, or is it UI-only?"

**Score mentally.** SSO-only + complex roles + no staging = likely NO-GO or CONDITIONAL. Say so gently.

### AI-specific (if applicable)

- "Which flows are prompt-dependent vs deterministic?"
- "Do you have golden inputs/outputs for regression, or is it eyeball every time?"

### Team

- "Who owns quality today — founder, eng, nobody?"
- "Do you use Linear? Claude Code or Cursor with agents?"

---

## Teach — the framework in 3 minutes (only if engaged)

> "The system has one entry point — `qa-start` — and five phases: analyze the requirement, write
> cases, manual pass, automate, report. Each phase stops at a gate until a human says proceed.
>
> Before any of that, we run a **readiness gate** — eight dimensions scored GO, CONDITIONAL, or
> NO-GO. That tells us honestly whether `@core` on PR is viable or whether we need eng prerequisites
> first. Seed-stage companies often land CONDITIONAL — that's a scoped plan, not a failure.
>
> Lite installs as a `qa/` folder in your repo. No second repo, no Testmo on day one. When you
> outgrow it, the same system upgrades to Standard with Testmo and a dedicated automation repo."

**Do not** dive into tier modules unless they ask.

---

## Handle objections

### "We already have Playwright tests"

> "Good — we don't replace them. Lite adds the process layer: structured requirements, case review,
> identity spine so every test links to an issue, and `@core` as a PR gate. We install add-only."

### "We're too early for QA"

> "That's exactly when the readiness gate helps. If you're NO-GO, you get an eng checklist instead
> of a harness that flakes on login. If you're GO, `@core` is usually one week after install — one
> test per core function, not a hundred-case backlog."

### "We can't add test IDs"

> "CONDITIONAL scope. We automate what we can with role/label locators; we file a tracked issue for
> test ID convention. Missing IDs cost more in maintenance — we'll quantify that in the readiness
> report."

### "SSO-only auth"

> "Can automation obtain a session without driving the login UI? If not and you have complex
> role/state requirements, we're likely NO-GO for PR automation until eng exposes a token endpoint
> or service account path. We can still do manual phases and cases."

### "What's the price?"

> "Lite onboarding is a fixed [X]-week engagement at [$Y]. Optional retainer for `@core` maintenance
> and eval updates. I'll send a one-pager and proposal after this call if we're a fit."

*(Fill in your pricing.)*

---

## Qualify / disqualify (5 min)

**Green flags:**

- Staging exists or committed within 30 days
- Linear in use
- Eng lead on call, engaged on auth/API questions
- Pain is credibility or release confidence, not "hire us as QA staff"

**Red flags — defer:**

- Production-only testing, no plan
- Won't give repo access
- Wants you to ship features, not QA infrastructure

> "Based on what you've shared, I'd say you're [GO / CONDITIONAL / likely need prerequisites first].
> Here's what I'd recommend…"

---

## Close (5 min)

**If fit:**

> "Next steps: I'll send the one-pager and a short SOW for 3-week Lite onboarding. If you approve,
> we open an install PR on Day 1 and schedule the readiness interview for Day 2. Pilot issue picked
> today: [ISSUE they mentioned]."

**If CONDITIONAL:**

> "I'll draft what the scoped plan looks like — manual-only areas and eng issues — so you can decide
> before we install."

**If not fit:**

> "I'd rather not sell you something that won't run. When [staging / auth API] lands, re-run readiness
> — the install path is the same."

---

## Post-call (same day)

- [ ] Send [one-pager](one-pager.md)
- [ ] Send calendar hold for kickoff if qualified
- [ ] Log band estimate and pilot issue in CRM
- [ ] If CONDITIONAL: draft 2–3 eng prerequisite bullets from call notes

---

## Related docs

- [one-pager.md](one-pager.md)
- [testability-readiness.md](../testability-readiness.md)
- [service-playbook.md](../service-playbook.md)

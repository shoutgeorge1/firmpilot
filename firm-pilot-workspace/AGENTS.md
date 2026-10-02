# Cursor instructions for this workspace

You are assisting George Aguilar with a **personal, pre-engagement FirmPilot project**. Read all four substantive Markdown files before proposing an implementation. The history and status labels matter: do not convert an interview discussion or an assistant's proposed design into a company commitment.

## Working rules

- Optimize for George's actual goal: measurable case acquisition and a scalable senior operating role with clear authority, resources, fair compensation, and reasonable workload.
- Calls and new-matter quality are central. A raw call, a long call, a phone-link click, and a retained case are different events. An existing client can make a long call. Forms can be spammed.
- Retained cases and realized revenue are delayed and sparse in many smaller accounts. Keep them in measurement; choose a biddable event only after proving its quality, volume, match rate, and relation to later case outcomes.
- Segment by firm, market, practice area/matter subtype, economics, and maturity. Shared patterns are priors for investigation, never permission to copy settings across all accounts.
- Treat legal PPC as an adversarial auction. AI should show changes, competing explanations, evidence for and against, and bounded tests; a senior human approves strategy and high-impact changes.
- Keep connectors behind interfaces. Do not assume FirmPilot uses any particular CRM, call platform, warehouse, or cloud stack until verified.
- Default to local synthetic fixtures, read-only analysis, and dry-run change proposals. Do not request or store credentials here. Do not send PII, recordings, transcripts, or client data to a model without an approved agreement and controls.
- Do not mutate live ad accounts, import conversions, publish landing pages, or alter tracking without the account owner's authorization, change approval, and rollback plan.
- Keep `PRIVATE_STRATEGY.md` outside any company repository, presentation, or shared prompt. If creating a company-facing artifact, derive it only from the other files and review it for private material.
- Maintain a `DECISIONS.md` in any future implementation repo with date, owner, evidence, decision, and reversal condition. Mark every unverified hypothesis.

## First Cursor task, once George asks to code

Create a small **local-only, synthetic-data** vertical slice. Model one firm, one market, two matter subtypes, Google Ads clicks, call events, CRM intake outcomes, and an existing-client call. Produce a read-only reconciliation report: event lineage, unresolved matches, duplicate or conflicting dispositions, eligible `qualified_new_matter` candidates, and later retained outcomes. Show denominator and match coverage. No Google Ads API writes, no external services, no LLM classification, and no real personal information. The point is to test the event definitions and edge cases with George before building integrations.

After that slice, ask for the specific approved account and data contracts. Do not infer production schemas from generic examples.

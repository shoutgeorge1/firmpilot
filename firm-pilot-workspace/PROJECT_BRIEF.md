# FirmPilot project brief

**Owner:** George Aguilar  
**Prepared:** 28 September 2026, Pacific  
**Status:** private synthesis from prior chats and the interview correspondence referenced in those chats. This is a working record, not a verbatim export of every conversation. Dates and claims requiring FirmPilot confirmation are called out.

## 1. The opportunity and George's objective

FirmPilot approached George for a senior paid media leadership role, described as Director of Paid Media/PPC Director, to grow acquisition for law firms and tie spend to signed cases. Jake Soffer is the CEO. George met with Jake, discussed the technical vision with CTO John Fly, and advanced to a final conversation with Aaron, described in the prior discussion as likely leading performance. Aaron's exact title and reporting line need confirmation. The Aaron meeting was described as Wednesday at three Eastern; verify the calendar invitation before relying on it.

FirmPilot appears to have a stronger website/organic foundation and wants a much larger paid media operation. George relayed approximately one hundred accounts with uneven spend, from inactive to roughly one hundred thousand dollars per month, and discussion of a path toward one thousand clients. Those are **discussion figures**, not an audited portfolio inventory. A seven to eight times return aspiration was discussed, but the numerator, time horizon, attribution, fees, and case mix were not defined. Never present it as a validated paid media KPI.

George wants a role in which he can build and lead the acquisition system, prove results on a couple of accounts, and then negotiate compensation and possible equity in proportion to the value. He wants a durable strategic mandate and team, rather than teaching the organization a one-time offline-conversion setup and becoming replaceable. He also wants to use Cursor and automation to reduce repetitive work while preserving expert decisions.

The reported public role range was one hundred twenty-five to one hundred thirty-five thousand dollars base plus commission, with Miami/in-office language. George discussed roughly one hundred fifty thousand dollars W-2 as a working compensation target and prefers remote/flexible work to five days onsite. These are **not offer terms**. Location, travel, incentive design, equity, and authority remain open. George told the team about a preplanned family trip starting October fourth and said he should be reachable while away for a couple of weeks; an actual start date and working hours need agreement.

## 2. Conversation chronology and status

| Date | What happened | Status |
| --- | --- | --- |
| Sep 21–23 | Jake's Director of Paid Media opportunity and first meeting were arranged. George prepared questions about portfolio size, team, API/MCC access, case attribution, CRM, compensation, and location. | Interview record and preparation; no implementation approval. |
| Sep 25 | Jake conversation and advancement to CTO John Fly. George's expertise in legal paid search, measurement, and case economics was the focus. | Interview progression. |
| Sep 28 | George described heterogeneous accounts and challenged generic scaling and a single ROI number. He argued for case-category economics, clean accounts, sufficient learning budget, senior bidding judgment, and richer offline signals. | George's operating principles. |
| Sep 28 | George sent John a strategic follow-up with Jake copied. It addressed taxonomy, attribution, call/intake quality, offline conversion hierarchy, case value, blended acquisition cost, and the October fourth trip. | Sent correspondence as recalled in prior chat. |
| Sep 28 | George sent Aaron a concise note about centralized data, API access, AI/shared learnings, actual case quality, and hearing Aaron's department vision. | Sent correspondence as recalled in prior chat. |
| Sep 28 | George refined the calls-first design: existing clients make long calls; forms are noisy; retained cases are too sparse in many accounts to steer bids. He rejected static PPC recipes and favored hypothesis-driven human decisions. | George's technical correction. |
| Sep 28 | An earlier assistant proposed a campaign compiler, event spine, CallOutcome state machine, and guarded API execution. | **Proposal only.** No company architecture or technical decision was approved. |
| Sep 28 | George discussed proving results on two accounts before approaching equity; salary, IP, role durability, and workload remain unsettled. | Personal strategy, not a company agreement. |

Do not mix in the separate SympleTax contract proposal or Virtual Coworker terms. Those projects provide lessons about attribution and ownership but are not FirmPilot facts.

## 3. Operating beliefs to preserve

### Case economics determine campaign design

The useful unit is a firm × geography × practice area × matter subtype × economics × maturity cell. Motor vehicle accidents, trucking, premises liability, nursing home neglect, and other categories can differ in competition, acceptance rules, acquisition costs, expected fees, and time to resolution. Even two firms in the same category may value or reject matters differently. Attorneys may change their appetite; a low-budget test may never generate a stable conclusion. An account-wide average can hide these differences.

The system needs a consistent vocabulary and measurement contract, but strategy is conditional. It should not stamp out identical campaigns, target CPA, negatives, bid strategy, or landing pages across accounts. George's competitive edge includes structure, query analysis, copy, pages, phone-first conversion design, bid strategy, and judgments about when to let an algorithm learn versus intervening.

### Optimize the signal ladder with evidence

The measurement ladder is spend → attributed inquiry → legitimate new matter → qualified intake → retained case → expected economic value → realized revenue. These are distinct facts with different delays, false-positive rates, and volumes. For many lower-spend accounts, particularly below roughly fifty thousand dollars a month in George's experience, retained cases can be too sparse to serve as the sole bidding signal. **Fifty thousand dollars is an experience-based discussion point, not a universal threshold.** Evaluate event counts, quality, lag, and stability by acquisition cell.

Calls are often the primary legal inquiry. A call's duration is insufficient: an existing client can stay on the line for twenty to thirty minutes. A short call might still matter. A click-to-call is not proof of a connected call. Forms can include spam or irrelevant requests. The proposed middle signal is a **verified qualified new matter**, possibly a qualified new-matter call, with explicit human-reviewed rules and a traceable source. Retained outcomes stay in reporting and calibration even when they are too sparse for bidding. Promote an event to a primary goal only after data quality and bid behavior have been observed; avoid counting several stages of the same journey as independent acquisition wins.

### Automate intelligence and controlled execution

Google Ads manager access and APIs can make portfolio inspection and changes possible, but scale is bounded by permissions, data quality, quotas, job orchestration, QA, and account-specific reasoning. Model tokens are not the fundamental capacity plan. Learnings across firms should become priors and comparative evidence, with sample sizes and transfer limits, not automatic setting propagation.

The auction is dynamic and adversarial. The assistant should detect what changed, generate competing explanations, show supporting and contradicting evidence, quantify downside, and propose bounded experiments. A senior strategist decides. Repetitive data collection, reconciliation, anomaly detection, report assembly, and approved low-risk changes are candidates for automation. A junior analyst should learn to articulate mechanism and evidence, not simply execute a recipe.

### Cross-channel learning can compound

FirmPilot may control websites, SEO, social, Google Business Profile, paid media, and intake touchpoints. Search queries can inform content and pages; organic and call language can inform paid intent and negatives; intake results can correct all channel reports. Map first-party events to a shared journey with source uncertainty. Do not claim that a paid ad caused all later branded, organic, or referral demand. Report channel-attributed and blended acquisition costs separately.

## 4. Outcomes and scorecard

**Business outcomes:** accepted new matters, retained cases, expected contribution or fee value where responsibly estimated, realized revenue when available, cost per qualified new matter, cost per retained case, and blended acquisition cost. Define case value and return with finance/client stakeholders; do not flatten all matters into a single PI value.

**Signal health:** percentage of calls with a usable disposition; new versus existing-client classification coverage; attributable click/session share; click-to-call-to-CRM match rate; duplicate rate; time to disposition; false-positive/false-negative review; imported-conversion diagnostics; lag and volume by cell.

**Operating health:** account QA exceptions, spend pacing, search-term waste, impression/auction changes, landing-page issues, approved tests, rollback rate, analyst time per account, and time from anomaly to decision. Count accounts by maturity and spend, not just gross account total.

**Pilot success:** compare two selected accounts against their own pre-period and a documented counterfactual where feasible; avoid a promise of guaranteed case volume in a short window. Success initially means a trustworthy lineage and material improvement in qualified matter economics, followed by retained-case evidence as it matures.

## 5. Open questions, ranked

1. **Actual role:** decision rights, headcount, engineering support, reporting line, expected account load, profit responsibility, commission/equity, and remote/travel agreement.
2. **Portfolio:** active accounts, spend distribution, practice areas, geographies, current conversion goals and bid strategies, account ownership, and who can grant access.
3. **Intake truth:** current call platform(s), recordings/transcripts and consent, CRM/case-management systems, disposition taxonomy, signed-case linkage, time lags, and percentage of missing data.
4. **Google integration:** manager hierarchy, ownership of conversion actions, Cloud project/API access, existing imports and diagnostics, campaign goal mapping, change approval, quotas, and service account policy.
5. **Business math:** definition of seven to eight times return, case-fee economics, referral/co-counsel distinctions, client willingness to share outcomes, and how blended acquisition is calculated.
6. **Platform:** whether there is a first-party data warehouse, event bus, analytics system, internal UI, and engineering roadmap. Earlier chat mentioned Next.js/React, .NET, Python, GraphQL, AWS/Terraform, and WordPress; this is **unverified background**, not a design constraint.
7. **Legal/contractual:** ownership of client data, employee-created code, reusable pre-existing tools, confidentiality, recording consent, data retention, vendor terms, and whether any invention assignment or restrictive covenants apply.

## 6. Source and confidence note

This synthesis uses the prior FirmPilot conversation context and its summary of sent correspondence. It is **not** an exhaustive export of the underlying chats or a technical audit of FirmPilot. George's statements and corrections are treated as requirements for this private brief; assistant-origin concepts are explicitly proposals. No FirmPilot client data, account export, contract, or production architecture was available while preparing it. Validate company and portfolio claims with Aaron and John before turning the blueprint into a delivery commitment.

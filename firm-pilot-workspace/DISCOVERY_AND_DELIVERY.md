# Discovery, pilot, and decision record

## Aaron conversation: let him describe the target first

Open with: “I understand the ambition is to make paid media work across a much larger law-firm portfolio and connect spend to actual matters. I’d like to hear how you see the department and platform working before I prescribe a build.”

Then obtain concrete answers, in this order:

1. **Mandate:** What does Aaron own? What would George own? Who decides budgets, conversion goals, bid strategy, team priorities, client exceptions, and engineering roadmap?
2. **Portfolio:** How many accounts are active, what is the spend distribution, which practice areas and markets matter, and what does a successful first quarter mean? What is the real denominator behind the one-thousand-client aspiration?
3. **Signal:** Who labels a new qualified matter today? What proportion of calls have a reliable disposition and can be linked to ads and a later case? What are the most common false positives? What are the existing goals and offline imports?
4. **Platform:** What data and API infrastructure already exists? Who owns the Google Ads manager hierarchy, call platform, CRM, website events, analytics, and conversion actions? What are current bottlenecks and team capacity?
5. **Economics:** What does “seven to eight times return” mean: gross fee, net contribution, signed-case expected value, realized revenue, which time horizon, and paid-only or blended spend? How do practice and referral differences enter the calculation?
6. **Pilot:** Which two accounts are representative but tractable? What read-only access and intake collaboration can be granted? What would Aaron need to see to sponsor a broader operating role?
7. **Role and timing:** Reporting line, remote arrangement, staff/engineering support, first-ninety-day expectations, compensation structure, and practical arrangements around the October fourth family trip.

Do not open by pitching a thousand-account autonomous agent system. Respond to the bottlenecks Aaron actually names. George can explain the middle-signal insight through a concrete example: a thirty-minute existing-client call versus a shorter legitimate new matter.

## Discovery request for a two-account pilot

Request an authorized, read-only data room or access path containing:

- Google Ads account IDs and manager relationship; last six to twelve months of spend, campaign/keyword/search-term aggregates where permitted, conversion actions, campaign goals, change history, and call reporting.
- Landing-page paths, site analytics and tracking setup, GTM/GA4 ownership, click-ID/UTM capture and persistence documentation.
- Call platform event export with caller/contact pseudonym, source, connected status, dispositions, timestamps and available CRM link. Recordings/transcripts only if policy and consent permit.
- Intake/case lifecycle export with new/existing, practice, jurisdiction, acceptance/rejection reason, retainer date, referral/co-counsel status, and de-identified value fields if approved.
- Existing dashboards, definitions, client reporting requirements, data agreements, access controls, and engineering contacts.

For each dataset: schema, owner, refresh cadence, time zone, historical completeness, consent/retention rule, join keys, and expected missingness. Start with de-identified aggregates or synthetic records where access is uncertain. George should not ask for personal logins or move client data into his private Cursor workspace.

## Phases and reviewable gates

| Phase | Deliverable | Decision gate |
| --- | --- | --- |
| 0. Role and scope | Written mandate, sponsor, approved access, work arrangement, initial compensation terms, IP/data boundaries | Do not build or transfer proprietary work without a clear agreement. |
| 1. Diagnose | Two-account audit: spend/cell map, goal integrity, call/intake linkage, quality baseline, waste and auction hypotheses | Aaron/John confirm facts and choose one priority. |
| 2. Signal pilot | Versioned qualified-new-matter definition, reviewer sample, lineage report, shadow conversion diagnostics | Promote only if quality, coverage, volume, and campaign-goal configuration are acceptable. |
| 3. Controlled performance test | One or two bounded account interventions with baseline, owner, risk cap, holdout/comparison where feasible, and rollback | Expand only on credible qualified-matter improvement and no intake harm. |
| 4. Portfolio system | Read-only multi-account health and comparable cohort reports, then approved change tooling | Support model, staffing, data rights, and sustained unit economics are clear. |

**Pilot exit memo:** what was done, counts and denominator, data gaps, qualified-matter economics, retained-case leading evidence, limits of causal attribution, required staffing, and the next investment decision. Avoid a vanity claim based on raw lead count or short-window ROI.

## Decision log to establish with FirmPilot

Record date, decision maker, alternatives, evidence, tenant/campaign scope, KPI, reason for override, rollback trigger, and review date. First decisions: event definitions, owner of intake truth, Google conversion goal mapping, value policy, source of account taxonomy, pilot accounts, change approval, and the boundary between George's strategy and engineering's implementation.

## Source notes and technical checks

- Google's API can enumerate manager hierarchies, but actual access depends on the account hierarchy and authentication. See [account hierarchy example](https://developers.google.com/google-ads/api/samples/get-account-hierarchy).
- Google Ads distinguishes primary and secondary conversion actions; a campaign's selected goal also determines bidding use, and custom goals require care. See [conversion goals](https://support.google.com/google-ads/answer/10995103).
- Offline imports require current route and account-level validation. Google's [conversion overview](https://developers.google.com/google-ads/api/docs/conversions/overview), [offline import guide](https://developers.google.com/google-ads/api/docs/conversions/upload-offline), and [quotas](https://developers.google.com/google-ads/api/docs/best-practices/quotas) should be checked again at implementation time.

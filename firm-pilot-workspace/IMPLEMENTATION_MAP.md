# FirmPilot Director OS — Implementation Map

**Date:** 2 October 2026  
**Scope:** Private Director cockpit only. Not FirmPilot product. Not a company commitment.  
**Source:** Mega Cursor Prompt (email) + existing `firm-pilot-workspace`.

---

## What exists today

| Path | Role | Notes |
| --- | --- | --- |
| `index.html` | Thin 2-link landing | Not a Command Center yet |
| `paid-media-os/index.html` | Main OS (~1.6k lines) | Thesis, walk-in, First 10 board, signal audits, access checklist, 30/60/90, structure/match/negatives/DKI/geo, bidding, AI, roles, exceptions, impact, unknowns, localStorage notes |
| `meeting-guide/index.html` | Interview companion | Audience tabs, red-flag chips → OS anchors, notes |
| `PROJECT_BRIEF.md` | History / principles | Preserve; not deploy-critical |
| `TECHNICAL_BLUEPRINT.md` | Proposed architecture | Proposal only |
| `DISCOVERY_AND_DELIVERY.md` | Interview / pilot | Preserve |
| `PRIVATE_STRATEGY.md` | Personal compensation | **gitignored / vercelignored — never publish** |
| `AGENTS.md` | Cursor rules | Preserve |
| `README.md` | Workspace intro | Update lightly after OS expand |
| `vercel.json` + `.vercelignore` | Static deploy | Live: https://firmpilot-ivory.vercel.app/ |
| Scripts / `data/` / shared CSS-JS | **None** | CSS/JS inlined per page |

**Design system:** Dark cockpit, IBM Plex Sans/Mono, ~21px body, sticky side/top nav, `details.panel` progressive disclosure, cards, checklists + HEALTHY/WARNING/BROKEN badges, localStorage.

**People/process notes (docs only):** Jake (CEO), John Fly (CTO), Aaron (performance — title TBD). Org roles in OS/meeting guide are George's model, not confirmed FirmPilot chart.

**Duplicates / unfinished:** Walk-in + thesis appear in both OS and Meeting Guide (intentional companion overlap). Access checklist exists but no Oct 19 readiness or status taxonomy (Confirmed / Requested / Unknown…). No Portfolio Radar, Dossier, formal Audit Engine, Turnaround board, Coaching templates, or Productization registry. No `#s-audit` (prompt referenced it; signal “look for” is closest). No shared assets; no JSON adapters.

---

## Map to mega-prompt modules 5–26

| # | Module | Status | Action |
| --- | --- | --- | --- |
| 5 | Access & Infrastructure Map | Partial (`#s-access`) | **Expand** → dedicated page + Oct 19 readiness + status enum |
| 6 | Portfolio Radar | Missing | **New** schema/UI + empty + labeled demo |
| 7 | Account Dossier | Partial (findings notes) | **New** skeleton page |
| 8 | Audit Engine | Partial (signal panels + look-for) | **Expand** structured categories; keep signal panels in Playbook |
| 9 | Clean-room rebuild | Missing | **Stub** inside Audit / Turnaround (decision levels) |
| 10 | Tracking & Conversion CC | Partial (`#s-signal`) | **Expand** dedicated Tracking page; link Playbook depth |
| 11 | Call quality & CRM truth | Partial (CallRail/CRM panels) | **Consolidate** under Tracking + Playbook; no fake taxonomy claims |
| 12 | Landing page / CRO | Partial (`#s-lp`, geo/creative) | **Preserve** in Playbook; light stub link |
| 13 | Campaign build system | Partial (structure/match) | **Preserve** in Playbook |
| 14 | Bidding & learning | Present (`#s-bidding`) | **Preserve** in Playbook |
| 15 | Intervention / Turnaround | Missing | **New** board + workflow |
| 16 | Account owner coaching | Missing | **New** handoff + coaching questions |
| 17 | Meeting cadence | Partial (Meeting Guide) | **Expand** Meeting Guide links into OS modules |
| 18 | Email briefs | Missing | Light templates inside Coaching |
| 19 | Productization registry | Missing | **New** |
| 20 | Cursor experiment lab | Missing | Stub card on Command Center only |
| 21 | People / capability map | Partial (roles panel) | Preserve; blank owners until confirmed |
| 22 | Client economics / budget | Partial (low-budget) | Preserve in Playbook |
| 23 | Multi-channel — future | Missing | Stub note only |
| 24 | Security / data guardrails | Partial (AGENTS + footers) | Preserve banners; no credentials |
| 25 | Pre-start / day-one | Missing | **New** (Oct 19) — merge with Access |
| 26 | First 30 days | Partial (30/60/90) | **Expand** dedicated Pre-Start / 30-Day page |

---

## Preserve / expand / consolidate

**Preserve:** Signal thesis; First 10 board; conversion/CallRail/CRM/GTM/GA4/LP panels; structure/match/negatives/DKI/geo; bidding phases; low-budget; AI skills; team roles; exceptions; impact; unknowns; Meeting Guide audiences + red flags; markdown docs; localStorage patterns.

**Expand:** Landing → Command Center; Access → status + Oct 19; Signal → Tracking Control Center surface; Roadmap → Pre-Start / 30-Day; Meeting Guide cross-links.

**Consolidate:** Dual walk-in/thesis OK as companions; Access checklist lives once on Access page with Playbook linking in; avoid a second unrelated app.

**Proposed new files:**
- `IMPLEMENTATION_MAP.md` (this file)
- `assets/os.css`, `assets/os.js`
- `data/*.json` (access, triage, empty portfolio, demo portfolio, productization empty)
- `paid-media-os/{access,radar,dossier,audit,turnaround,tracking,coaching,productization,prestart}.html`
- Root `index.html` → Command Center

---

## Cleanest sequence (executed)

1. Inventory → this map  
2. Shared CSS/JS + JSON adapters  
3. Command Center (hub)  
4. Access + Pre-Start / 30-Day  
5. Radar → Dossier → Audit → Turnaround → Tracking → Coaching → Productization  
6. Retarget Paid Media OS nav + Meeting Guide links  
7. Commit/push (no `PRIVATE_STRATEGY`) → Vercel → Chrome smoke  

**Deferred after Oct 19 access:** Live MCC/API ingest, real portfolio rows, FirmPilot CRM/CallRail schemas, production experiment lab, multi-channel modules, invented people/org chart.

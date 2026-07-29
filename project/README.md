# Obsidian Ledger Capital — Agentic Claims Intake & Triage

> IAS Build 001, presented as a client engagement. Obsidian Ledger Capital is a **fictional** firm; all data is synthetic and labeled as such.

## The narrative (2026)

Obsidian Ledger Capital is a global quantitative fintech firm — high-speed capital movement, predictive risk modeling, crisis-focused wealth protection. Its Capital Protection line writes business-interruption cover for trading operations.

**The problem.** Every incoming loss notice was read by an adjuster before it could be routed. Intake sat at roughly two days, and clean claims waited in the same queue as the ones that actually needed judgment.

**The engagement.** This feature was built *into their existing Next.js platform* — not a rebuild. It intercepts a claim at the moment of intake, extracts it, checks it against the policy library (RAG), screens for fraud signals, and then either auto-resolves or escalates to a human. Every step is logged.

**The moment this demo captures.** When you launch it, you are standing at the exact instant an adjuster submits a claim and watches the agent work. The surrounding platform chrome (capital movement, risk models, geo forecasting) is real to Obsidian Ledger but **out of scope** here — those controls render but do nothing. Only the claims feature is live.

## What's real vs. dead

| Live (the feature)                          | Dead (host chrome, non-interactive)         |
| ------------------------------------------- | ------------------------------------------- |
| Claims Triage nav item                      | All other nav items                         |
| Business-interruption claim type            | Auto / Property claim types                 |
| Upload → process → reasoning → determination| ⌘K, region selector, avatar                 |
| Reasoning step expand/collapse              |                                             |
| Adjuster Approve / Decline gate             |                                             |

Dead controls carry a hover tooltip ("Not part of this demo") — honest by design.

## The hero flow

1. **Intake** (`/claims`) — submit a claim, watch the five-step status advance live.
2. **Reasoning & determination** (`/claims/OLC-CLM-2026-04812`) — the agent's four-step trace (extraction → coverage → fraud → confidence gate), each step expandable to its input/output. The claim deliberately lands as **Needs review**: a reporting-window inconsistency and an above-average amount drop confidence below threshold, so the agent escalates instead of deciding.
3. **Human gate** — Approve or Decline resumes or halts the workflow.

The most important point the demo makes: *the agent knows what it doesn't know, and escalates.*

## Design system

- **Host chrome (Obsidian Ledger):** graphite/obsidian shell (`#0B0F14`–`#26303C`) with a slate-blue institutional accent (`#4F86C6`).
- **Feature engine (IAS):** Deep Slate Teal `#0A2E36`, Muted Seafoam `#3F7266`, Kinetic Emerald `#00E5A3`. Per brand Article VI, Kinetic Emerald appears **only** on genuinely live agent activity.
- **Type:** Space Grotesk (display), Space Mono (data/terminal).

## Stack

Next.js 14 (App Router, static export) · TypeScript · TailwindCSS v3.4. The agent engine (n8n, RAG, vector store) is represented; in production it runs behind webhooks per the Build 001 architecture.

## Run

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /claims
npm run build    # static export to ./out
```

## Data honesty (brand Article IX)

No fabricated client outcomes, no invented ROI. Every record in `lib/mock-data.ts` is synthetic and labeled. Scores and thresholds illustrate the *mechanism*, not a real performance claim.

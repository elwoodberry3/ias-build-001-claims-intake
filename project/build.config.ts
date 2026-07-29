/**
 * build.config.ts — BUILD 001 · Agentic Claims Intake & Triage
 * ─────────────────────────────────────────────────────────────
 * Repo: ias-build-001-claims-intake
 * URL:  claims.elwoodberry.com
 * Sector: Banking, Finance, FinTech & Insurance
 *
 * THE ONLY FILE EDITED FOR THIS BUILD.
 *
 * Governance (Article IX): no fabricated data. Every unknown
 * value stays as an explicit "TODO:" string — the page renders
 * TODO values in a visible warning style so they cannot ship
 * silently.
 * ─────────────────────────────────────────────────────────────
 */

import type { BuildConfig } from "./lib/types";

export const buildConfig: BuildConfig = {
  // ── Identity ─────────────────────────────────────────────
  buildNumber: "001",
  name: "Agentic Claims Intake & Triage",
  sector: "Banking, Finance, FinTech & Insurance",

  // Verbatim from projects.csv (primary_description) —
  // site + CSV + repo never drift.
  tagline:
    "Upload a claim, watch the agent extract entities, run RAG-grounded coverage lookup, cross-check for fraud, and escalate to a human when confidence drops.",

  // ── Status (honest, always) ──────────────────────────────
  // Upgrade path: "planned" → "preview" → "prototype" → "live"
  // as the deep-build ships. One word, push to main, auto-deploys.
  status: "preview",

  // ── What it does ─────────────────────────────────────────
  // One string per paragraph — the page renders each as its
  // own <p>. Problem / pipeline / traceability.
  whatItDoes: [
    "Insurance claims arrive as unstructured PDFs and emails, and every one gets read, coded, and routed by hand — coverage questions included.",
    "This system runs the full agentic loop: n8n parses the document, runs RAG-grounded coverage lookup against embedded policy documents, cross-checks fraud signals across dedicated sub-agents, and scores its own confidence on every output.",
    "When confidence drops below threshold or a fraud flag fires, the workflow pauses at a human-in-the-loop approval gate — with every reasoning step written to a timestamped audit log.",
  ],

  // ── Stack ────────────────────────────────────────────────
  stack: ["n8n", "OpenAI API", "Wix Studio + Velo", "AWS S3/Lambda"],

  // ── Architecture ─────────────────────────────────────────
  architecture: {
    // Real diagrams only. Stays null until one is drawn —
    // the page renders the system-map table alone.
    diagramSrc: null,
    diagramAlt: "TODO: describe the diagram for screen readers",

    layers: [
      {
        layer: "Presentation",
        technology: "Wix Studio + Velo",
        responsibility:
          "Upload UI, live agent reasoning timeline, results dashboard, audit log viewer, human-in-the-loop approval UI",
      },
      {
        layer: "Orchestration",
        // Demos run on n8n Cloud. The identical workflows deploy
        // self-hosted or in a client's VPC for regulated
        // production — the /workflows export is the portable
        // artifact. Never state "self-hosted" as current fact.
        technology: "n8n (cloud-hosted)",
        responsibility:
          "Document parsing, RAG retrieval, planning/reflection loop, multi-agent fraud cross-check, schema validation, confidence gating",
      },
      {
        layer: "Data",
        // Storage + queue selection pending deep-build.
        // Stated uncertainty beats invented detail.
        technology: "Wix Data Collections + vector store (TODO: Pinecone vs Supabase pgvector pending)",
        responsibility:
          "Claim records, audit logs, policy document embeddings, escalation queue state",
      },
      {
        layer: "AI",
        technology: "OpenAI API (schema-validated calls)",
        responsibility:
          "Entity extraction, RAG-grounded coverage reasoning, fraud classification, summarization",
      },
    ],

    // One string per step — numbered on render because order
    // carries meaning: this is the sequence a record travels.
    flow: [
      "Claim uploaded via dashboard",
      "Velo stores file and writes claim record",
      "n8n webhook triggered",
      "extraction",
      "RAG policy lookup",
      "fraud cross-check",
      "schema validation",
      "confidence scored",
      "below-threshold claims pause at human approval gate",
      "adjuster approves/rejects",
      "structured result posted back",
      "dashboard updates live",
    ],
  },

  // ── Sample payload ───────────────────────────────────────
  // Real production schema, mock values, labeled as mock.
  payload: {
    caption: "// mock data — representative of production schema",
    input: {
      event: "claim.intake.received",
      submitted_at: "2026-07-05T13:47:00Z",
      source: "claims.elwoodberry.com",
      fields: {
        filename: "claim-fnol-0212.pdf", pages: 14, claim_ref: "MOCK-2026-0088", policy_no: "MOCK-POL-44381"
      },
    },
    output: {
      status: "pending_review",
      confidence: 0.61,
      routed_to: "queue:human-review",
      audit_id: "ias-demo-001-0001",
    },
  },

  // ── Live demo slot ───────────────────────────────────────
  // Renders only when a real demo exists. Demo Mode (cached
  // representative responses) is the default for public
  // traffic — protects demo reliability and n8n Cloud
  // execution quota.
  demo: {
    embedUrl: null,
    videoUrl: null,
    note: "Demo Mode serves cached representative responses to public traffic; live mode is enabled per session.",
  },

  // ── Links ────────────────────────────────────────────────
  links: {
    github: "https://github.com/elwoodberry3/ias-build-001-claims-intake",
    // Decision pending: master CSV stores the build's own deploy
    // URL here; the page needs a route BACK to the portfolio
    // index. Root used until the portfolio index URL is final.
    portfolio: "https://elwoodberry.com", // TODO: confirm portfolio index URL
    // TODO: confirm /contact is the persona-routed booking page,
    // not a generic contact form, before deep-build ships.
    booking: "https://elwoodberry.com/contact",
  },
};

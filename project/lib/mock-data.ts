/**
 * MOCK DATA — every record here is synthetic and labeled as such.
 * No real claimant, policy, or Obsidian Ledger client data exists in this build.
 * Per IAS brand Article IX (AI Governance): fabricated metrics and outcomes are
 * prohibited; this file exists purely to drive the demonstration of the feature.
 */

export const DATASET_LABEL = "MOCK DATASET · synthetic claims · no PII";

export type ClaimStatus = "processing" | "pending_review" | "auto_resolved";
export type Determination = "Covered" | "Not covered" | "Needs review";

export interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
}

export interface ReasoningStep {
  id: number;
  agent: "extraction" | "coverage" | "fraud" | "gate";
  title: string;
  detail: string;
  /** what the model actually saw / produced, shown when a step is expanded */
  trace: { input: string; output: string };
  confidence: number;
  durationMs: number;
  flag?: "info" | "warn" | "risk";
}

export interface Claim {
  id: string;
  claimant: string;
  policyNumber: string;
  productLine: string;
  claimType: "Auto" | "Property" | "Business interruption";
  incidentDate: string;
  reportedDate: string;
  claimedAmount: number;
  currency: string;
  narrative: string;
  status: ClaimStatus;
  overallConfidence: number;
  fraudScore: number;
  determination: Determination;
  policyCitation: { section: string; text: string };
  recommendedAction: string;
  extracted: ExtractedField[];
  reasoning: ReasoningStep[];
}

/**
 * The hero claim. It is deliberately a "Needs review" case: the agent finds a
 * date inconsistency and an above-average amount, drops below the confidence
 * threshold, and escalates to a human. This is the most compelling single
 * moment to demonstrate — the agent knows what it doesn't know.
 */
export const HERO_CLAIM: Claim = {
  id: "OLC-CLM-2026-04812",
  claimant: "Marcus Holloway (synthetic)",
  policyNumber: "OLC-BI-77413-2026",
  productLine: "Capital Protection · Business Interruption",
  claimType: "Business interruption",
  incidentDate: "2026-05-02",
  reportedDate: "2026-05-19",
  claimedAmount: 486000,
  currency: "USD",
  narrative:
    "Insured reports a 9-day operational halt at a Rotterdam trading desk following a power-grid disruption. Requests indemnity for lost throughput and standby liquidity costs.",
  status: "pending_review",
  overallConfidence: 0.74,
  fraudScore: 0.61,
  determination: "Needs review",
  policyCitation: {
    section: "Section 6.3 — Utility Interruption Sub-Limits",
    text: "Business interruption arising from third-party utility failure is indemnified up to the sub-limit, provided the interruption exceeds 72 hours and is reported within 10 business days of onset.",
  },
  recommendedAction:
    "Escalate to adjuster. Reporting window (10 business days) appears exceeded; confirm onset date before determination.",
  extracted: [
    { label: "Claimant", value: "Marcus Holloway (synthetic)", confidence: 0.98 },
    { label: "Policy number", value: "OLC-BI-77413-2026", confidence: 0.99 },
    { label: "Incident date", value: "2026-05-02", confidence: 0.71 },
    { label: "Reported date", value: "2026-05-19", confidence: 0.99 },
    { label: "Claimed amount", value: "$486,000", confidence: 0.93 },
    { label: "Claim type", value: "Business interruption", confidence: 0.96 },
  ],
  reasoning: [
    {
      id: 1,
      agent: "extraction",
      title: "Extracted claim entities",
      detail:
        "Parsed the intake document into a typed record. Six fields captured; incident date extracted with lower confidence (handwritten annotation).",
      trace: {
        input: "intake_document.pdf · 4 pages · scanned + typed hybrid",
        output:
          '{ "claimant": "Marcus Holloway", "policy": "OLC-BI-77413-2026", "incident_date": "2026-05-02", "reported_date": "2026-05-19", "amount": 486000, "type": "business_interruption" }',
      },
      confidence: 0.9,
      durationMs: 1400,
      flag: "info",
    },
    {
      id: 2,
      agent: "coverage",
      title: "Retrieved policy coverage",
      detail:
        "Searched the policy vector store. Top clause: Section 6.3 (Utility Interruption Sub-Limits). Interruption of 9 days exceeds the 72-hour threshold — coverage trigger met on duration.",
      trace: {
        input: "query: business interruption · utility failure · reporting window",
        output:
          "match: §6.3 Utility Interruption Sub-Limits (score 0.88) · duration trigger: PASS (9d > 72h)",
      },
      confidence: 0.86,
      durationMs: 2100,
      flag: "info",
    },
    {
      id: 3,
      agent: "fraud",
      title: "Cross-checked fraud signals",
      detail:
        "Reporting date is 17 calendar days after onset; §6.3 requires reporting within 10 business days. Claimed amount is 2.4× the product-line average for comparable interruptions. Two signals raised.",
      trace: {
        input:
          "date delta: 17d · policy window: 10 business days · amount vs. line avg: 2.4×",
        output:
          "signals: [reporting_window_exceeded, amount_above_expected] · fraud_score: 0.61",
      },
      confidence: 0.79,
      durationMs: 1800,
      flag: "warn",
    },
    {
      id: 4,
      agent: "gate",
      title: "Confidence gate — escalating",
      detail:
        "Aggregate confidence 0.74 is below the 0.85 auto-resolve threshold and the fraud score exceeds 0.40. The agent does not issue a determination; it routes the claim to a human adjuster.",
      trace: {
        input: "overall_confidence: 0.74 · fraud_score: 0.61 · thresholds: {conf: 0.85, fraud: 0.40}",
        output: "decision: ESCALATE → human-in-the-loop review queue",
      },
      confidence: 0.74,
      durationMs: 600,
      flag: "risk",
    },
  ],
};

/** The intake status steps, shown live on the intake screen. */
export const INTAKE_STEPS = [
  "Uploading document",
  "Extracting claim details",
  "Checking policy coverage",
  "Running fraud cross-check",
  "Finalizing determination",
];

/** Supporting queue rows (non-interactive) so the console feels populated. */
export const QUEUE_PREVIEW = [
  {
    id: "OLC-CLM-2026-04809",
    claimant: "Synthetic Holdings NV",
    line: "Auto · Fleet",
    flag: "Auto-resolved",
    tone: "ok" as const,
  },
  {
    id: "OLC-CLM-2026-04811",
    claimant: "Delta Freight (synthetic)",
    line: "Property · Marine",
    flag: "Auto-resolved",
    tone: "ok" as const,
  },
  {
    id: HERO_CLAIM.id,
    claimant: HERO_CLAIM.claimant,
    line: "Business interruption",
    flag: "Needs review",
    tone: "warn" as const,
  },
];

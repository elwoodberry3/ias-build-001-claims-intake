"use client";

import { useState } from "react";
import Link from "next/link";
import type { Claim, ReasoningStep } from "@/lib/mock-data";
import { StatusChip, Eyebrow, MetaField } from "./ui";

const AGENT_LABEL: Record<ReasoningStep["agent"], string> = {
  extraction: "Extraction agent",
  coverage: "Coverage agent",
  fraud: "Fraud agent",
  gate: "Confidence gate",
};

const FLAG_TONE: Record<NonNullable<ReasoningStep["flag"]>, "ok" | "warn" | "risk" | "neutral"> = {
  info: "neutral",
  warn: "warn",
  risk: "risk",
};

export function ClaimDetail({ claim }: { claim: Claim }) {
  const [open, setOpen] = useState<number | null>(claim.reasoning.length);
  const [decision, setDecision] = useState<"none" | "approved" | "rejected">("none");

  const confPct = Math.round(claim.overallConfidence * 100);
  const fraudPct = Math.round(claim.fraudScore * 100);

  return (
    <div className="px-5 py-6">
      {/* Feature header row */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Eyebrow>// triage result</Eyebrow>
          <h1 className="mt-2.5 font-display text-[22px] font-bold tracking-tight text-ias-primary">
            {claim.id}
          </h1>
          <p className="mt-0.5 text-[13px] text-ias-muted">
            {claim.productLine}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusChip tone="warn">Escalated · needs review</StatusChip>
          <Link
            href="/claims/"
            className="rounded-md border border-ias-mid bg-white px-3 py-2 font-display text-[12px] font-semibold text-ias-primary transition hover:bg-ias-light"
          >
            ← Intake
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left column: reasoning timeline */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-[15px] font-bold text-ias-primary">
              Agent reasoning
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ias-muted">
              4 steps · {claim.reasoning.reduce((a, s) => a + s.durationMs, 0) / 1000}s
            </span>
          </div>

          <ol className="relative flex flex-col gap-3 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-ias-mid">
            {claim.reasoning.map((step) => {
              const isOpen = open === step.id;
              return (
                <li key={step.id} className="relative pl-10">
                  <span
                    className={`absolute left-[7px] top-3 flex h-4 w-4 items-center justify-center rounded-full ring-2 ring-white ${
                      step.flag === "risk"
                        ? "bg-state-riskFg"
                        : step.flag === "warn"
                          ? "bg-state-warnFg"
                          : "bg-ias-secondary"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>

                  <button
                    onClick={() => setOpen(isOpen ? null : step.id)}
                    className="w-full rounded-md border border-ias-mid bg-white text-left transition hover:border-ias-secondary"
                  >
                    <div className="flex items-start justify-between gap-3 px-4 py-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-ias-muted">
                            {AGENT_LABEL[step.agent]}
                          </span>
                          {step.flag && (
                            <StatusChip tone={FLAG_TONE[step.flag]}>
                              {step.flag === "info" ? "logged" : step.flag}
                            </StatusChip>
                          )}
                        </div>
                        <p className="mt-1 text-[13px] font-bold text-ias-primary">
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-[12px] leading-relaxed text-ias-body">
                          {step.detail}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-mono text-[11px] font-bold text-ias-primary">
                          {Math.round(step.confidence * 100)}%
                        </p>
                        <p className="font-mono text-[9px] text-ias-disabled">
                          conf
                        </p>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="border-t border-ias-mid bg-ias-light px-4 py-3">
                        <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ias-muted">
                          input
                        </p>
                        <pre className="mb-3 whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-ias-body">
                          {step.trace.input}
                        </pre>
                        <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ias-muted">
                          output
                        </p>
                        <pre className="whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-ias-primary">
                          {step.trace.output}
                        </pre>
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Right column: structured result + human gate */}
        <aside className="flex flex-col gap-4">
          {/* Determination card */}
          <div className="overflow-hidden rounded-lg border border-ias-mid bg-white">
            <div className="border-b border-ias-mid bg-ias-primary px-4 py-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-obsidian-400">
                Structured determination
              </p>
              <p className="mt-1 font-display text-[16px] font-bold text-white">
                {claim.determination}
              </p>
            </div>

            <div className="px-4 py-4">
              {/* Scores */}
              <div className="grid grid-cols-2 gap-3">
                <ScoreBar label="Overall confidence" pct={confPct} tone="warn" note="threshold 85%" />
                <ScoreBar label="Fraud score" pct={fraudPct} tone="risk" note="flag > 40%" />
              </div>

              {/* Extracted */}
              <p className="mt-4 mb-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ias-muted">
                Extracted claim
              </p>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {claim.extracted.map((f) => (
                  <MetaField key={f.label} label={f.label} value={f.value} />
                ))}
              </dl>

              {/* Citation — RAG grounding */}
              <p className="mt-4 mb-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ias-muted">
                Grounded in policy
              </p>
              <div className="rounded-md border border-ias-mid bg-ias-light px-3 py-2.5">
                <p className="font-mono text-[10px] font-bold text-ias-secondary">
                  {claim.policyCitation.section}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-ias-body">
                  {claim.policyCitation.text}
                </p>
              </div>

              {/* Recommended action */}
              <div className="mt-4 flex gap-2.5 rounded-md bg-state-warnBg px-3 py-2.5">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                  <path d="M10 3 2.5 16.5h15L10 3Z" stroke="#854F0B" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M10 8v4M10 14v.5" stroke="#854F0B" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <p className="text-[12px] leading-relaxed text-state-warnFg">
                  {claim.recommendedAction}
                </p>
              </div>
            </div>
          </div>

          {/* Human-in-the-loop gate */}
          <div className="rounded-lg border border-ias-mid bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-display text-[13px] font-bold text-ias-primary">
                Adjuster review
              </p>
              <StatusChip tone={decision === "none" ? "warn" : "ok"}>
                {decision === "none" ? "Awaiting decision" : decision}
              </StatusChip>
            </div>
            <p className="text-[12px] leading-relaxed text-ias-muted">
              The agent escalated rather than decide. Your call resumes or halts
              the workflow — and is written to the audit log.
            </p>
            {decision === "none" ? (
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setDecision("approved")}
                  className="rounded-md bg-ias-accent px-3 py-2.5 font-display text-[12px] font-bold text-ias-primary transition hover:bg-ias-accentPressed"
                >
                  Approve coverage
                </button>
                <button
                  onClick={() => setDecision("rejected")}
                  className="rounded-md border border-ias-mid px-3 py-2.5 font-display text-[12px] font-bold text-ias-primary transition hover:bg-ias-light"
                >
                  Decline claim
                </button>
              </div>
            ) : (
              <div className="mt-3 rounded-md bg-ias-light px-3 py-2.5 font-mono text-[11px] text-ias-body">
                Decision recorded · workflow{" "}
                {decision === "approved" ? "resumed → settlement" : "halted → closed"}{" "}
                · logged to audit trail
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function ScoreBar({
  label,
  pct,
  tone,
  note,
}: {
  label: string;
  pct: number;
  tone: "warn" | "risk" | "ok";
  note: string;
}) {
  const color =
    tone === "risk" ? "#9B1C1C" : tone === "warn" ? "#854F0B" : "#00B882";
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-ias-muted">
        {label}
      </p>
      <p className="mt-0.5 font-display text-[18px] font-bold text-ias-primary">
        {pct}%
      </p>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-ias-mid">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <p className="mt-1 font-mono text-[9px] text-ias-disabled">{note}</p>
    </div>
  );
}

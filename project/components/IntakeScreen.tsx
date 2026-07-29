"use client";

import { useState } from "react";
import Link from "next/link";
import { INTAKE_STEPS, HERO_CLAIM, QUEUE_PREVIEW } from "@/lib/mock-data";
import { StatusChip, Eyebrow, MetaField } from "./ui";

type Phase = "idle" | "running" | "done";

export function IntakeScreen() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [activeStep, setActiveStep] = useState(-1);
  const [fileReady, setFileReady] = useState(false);

  function loadFile() {
    setFileReady(true);
  }

  function submit() {
    if (phase === "running") return;
    if (!fileReady) setFileReady(true);
    setPhase("running");
    setActiveStep(0);

    let i = 0;
    const tick = () => {
      i += 1;
      if (i < INTAKE_STEPS.length) {
        setActiveStep(i);
        setTimeout(tick, 780);
      } else {
        setActiveStep(INTAKE_STEPS.length);
        setPhase("done");
      }
    };
    setTimeout(tick, 620);
  }

  return (
    <div className="px-5 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        {/* Left: the working feature */}
        <section className="rounded-lg border border-ias-mid bg-white">
          {/* Feature header — dark IAS bar inside the light surface */}
          <div className="flex items-center justify-between rounded-t-lg bg-ias-primary px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md ring-1 ring-inset ring-ias-accent/30">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="14" height="11" rx="2" stroke="#00E5A3" strokeWidth="1.5" />
                  <rect x="6.5" y="8" width="3" height="2.5" rx="0.75" fill="#00E5A3" />
                  <rect x="10.5" y="8" width="3" height="2.5" rx="0.75" fill="#00E5A3" />
                  <rect x="6.5" y="12" width="7" height="1.5" rx="0.5" fill="#3F7266" />
                </svg>
              </div>
              <div className="font-display text-[13px] font-bold text-white">
                Claims Agent <span className="text-ias-accent">v1</span>
              </div>
            </div>
            {phase === "running" ? (
              <StatusChip tone="live">Agent running</StatusChip>
            ) : (
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-obsidian-400">
                Intake
              </span>
            )}
          </div>

          {/* Step rail */}
          <div className="flex h-1 bg-ias-mid">
            <div className="flex-1 bg-ias-accent" />
            <div className="flex-1" />
            <div className="flex-1" />
            <div className="flex-1" />
            <div className="flex-1" />
          </div>
          <div className="flex justify-between px-5 pt-2 font-mono text-[9px] uppercase tracking-[0.06em]">
            <span className="font-bold text-ias-primary">1 Intake</span>
            <span className="text-ias-disabled">2 Reasoning</span>
            <span className="text-ias-disabled">3 Results</span>
            <span className="text-ias-disabled">4 Review</span>
            <span className="text-ias-disabled">5 Audit</span>
          </div>

          <div className="px-5 pb-6 pt-5">
            <Eyebrow>// new claim</Eyebrow>
            <h1 className="mt-3 font-display text-[22px] font-bold tracking-tight text-ias-primary">
              Submit a claim for triage
            </h1>
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-ias-muted">
              Upload the loss document. The agent extracts the claim, checks it
              against Obsidian Ledger&rsquo;s policy library, screens for fraud
              signals, and either resolves or escalates — with every step logged.
            </p>

            {/* Claim type */}
            <p className="mt-5 text-[12px] font-bold text-ias-primary">Claim type</p>
            <div className="mt-2.5 grid grid-cols-3 gap-2.5">
              {[
                { label: "Auto · Fleet", live: false },
                { label: "Property · Marine", live: false },
                { label: "Business interruption", live: true },
              ].map((t) => (
                <div
                  key={t.label}
                  className={`rounded-md border px-3 py-3 text-center ${
                    t.live
                      ? "border-ias-accent bg-ias-accent/[0.04]"
                      : "dead-control relative border-ias-mid"
                  }`}
                >
                  <div
                    className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-md border ${
                      t.live
                        ? "border-ias-accent bg-ias-primary"
                        : "border-ias-mid bg-ias-light"
                    }`}
                  >
                    <TypeIcon live={t.live} />
                  </div>
                  <div className="text-[11px] font-bold leading-tight text-ias-primary">
                    {t.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Dropzone */}
            <p className="mt-5 text-[12px] font-bold text-ias-primary">
              Loss document
            </p>
            <button
              onClick={loadFile}
              className="mt-2.5 w-full rounded-md border border-dashed border-ias-mid px-5 py-7 text-center transition hover:border-ias-accent hover:bg-ias-accent/[0.04]"
            >
              {fileReady ? (
                <div className="flex items-center gap-3 text-left">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ias-primary">
                    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M5 2.5h6l4 4v11H5V2.5Z" stroke="#00E5A3" strokeWidth="1.4" strokeLinejoin="round" />
                      <path d="M11 2.5v4h4" stroke="#00E5A3" strokeWidth="1.4" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-bold text-ias-primary">
                      loss_notice_OLC-04812.pdf
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-ias-disabled">
                      1.8 MB · uploaded
                    </p>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 10.5l3 3 7-7.5" stroke="#00E5A3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : (
                <>
                  <svg width="26" height="26" viewBox="0 0 20 20" fill="none" className="mx-auto mb-2" aria-hidden="true">
                    <path d="M10 13V4M6.5 7.5 10 4l3.5 3.5M4 14v2.5h12V14" stroke="#3F7266" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-[13px] font-bold text-ias-primary">
                    Drop loss document or click to browse
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-ias-disabled">
                    PDF, DOCX, or EML · max 25 MB
                  </p>
                </>
              )}
            </button>

            {/* Info strip */}
            <div className="mt-4 flex gap-2.5 rounded-md bg-ias-light px-3.5 py-3">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                <circle cx="10" cy="10" r="8" stroke="#3F7266" strokeWidth="1.4" />
                <path d="M10 9v4.5M10 6.5v.5" stroke="#3F7266" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <p className="text-[12px] leading-relaxed text-ias-body">
                The agent runs extraction, coverage RAG against the policy
                library, and a fraud cross-check. Low-confidence or flagged
                claims are escalated to a human — never auto-decided.
              </p>
            </div>

            {/* Submit */}
            <button
              onClick={submit}
              disabled={phase === "running"}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-ias-accent px-4 py-3.5 font-display text-[14px] font-bold text-ias-primary transition hover:bg-ias-accentPressed disabled:cursor-not-allowed disabled:bg-ias-mid disabled:text-ias-disabled"
            >
              {phase === "running" ? (
                <>Processing…</>
              ) : phase === "done" ? (
                <>Submit another claim</>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 3.5v13l11-6.5L5 3.5Z" fill="currentColor" />
                  </svg>
                  Submit claim for triage
                </>
              )}
            </button>

            {/* Live status */}
            {phase !== "idle" && (
              <div className="mt-5 rounded-md border border-ias-mid p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[12px] font-bold text-ias-primary">
                    Claim {HERO_CLAIM.id}
                  </span>
                  {phase === "done" ? (
                    <StatusChip tone="warn">Needs review</StatusChip>
                  ) : (
                    <StatusChip tone="live">Processing</StatusChip>
                  )}
                </div>
                <ol className="flex flex-col gap-2">
                  {INTAKE_STEPS.map((label, idx) => {
                    const complete = idx < activeStep;
                    const current = idx === activeStep && phase === "running";
                    return (
                      <li
                        key={label}
                        className={`flex items-center gap-2.5 text-[12px] ${
                          complete || current
                            ? "font-semibold text-ias-primary"
                            : "text-ias-disabled"
                        }`}
                      >
                        <StepDot complete={complete} current={current} />
                        {label}
                      </li>
                    );
                  })}
                </ol>

                {phase === "done" && (
                  <Link
                    href={`/claims/${HERO_CLAIM.id}/`}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-ias-primary px-4 py-3 font-display text-[13px] font-bold text-white transition hover:bg-[#062028]"
                  >
                    View reasoning &amp; determination
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M4 10h11M11 6l4 4-4 4" stroke="#00E5A3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Right: platform context sidebar (belongs to Obsidian Ledger) */}
        <aside className="flex flex-col gap-4">
          <div className="rounded-lg border border-ias-mid bg-white p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ias-muted">
              This engagement
            </p>
            <p className="mt-1.5 font-display text-[13px] font-bold leading-snug text-ias-primary">
              The problem we solved
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-ias-body">
              Obsidian Ledger&rsquo;s adjusters were manually reading every
              business-interruption loss notice before routing. Intake sat at
              roughly two days. This feature triages incoming claims on arrival,
              auto-resolving the clean ones and escalating only what genuinely
              needs a human.
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              <MetaField label="Surface" value="Existing Next.js app" />
              <MetaField label="Engine" value="n8n · agentic" />
              <MetaField label="Scope" value="Intake → triage" />
              <MetaField label="Human gate" value="Always on" />
            </dl>
          </div>

          <div className="rounded-lg border border-ias-mid bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ias-muted">
                Recent triage
              </p>
              <span className="font-mono text-[9px] text-ias-disabled">
                today
              </span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {QUEUE_PREVIEW.map((row) => (
                <li
                  key={row.id}
                  className="flex items-center justify-between gap-2 border-b border-ias-mid pb-2.5 last:border-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate font-mono text-[10px] text-ias-primary">
                      {row.id}
                    </p>
                    <p className="truncate text-[11px] text-ias-muted">
                      {row.line}
                    </p>
                  </div>
                  <StatusChip tone={row.tone}>{row.flag}</StatusChip>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function TypeIcon({ live }: { live: boolean }) {
  const c = live ? "#00E5A3" : "#3F7266";
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="14" height="8" rx="1.5" stroke={c} strokeWidth="1.4" />
      <path d="M6 7V5.5A1.5 1.5 0 0 1 7.5 4h5A1.5 1.5 0 0 1 14 5.5V7M3 11h14" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function StepDot({ complete, current }: { complete: boolean; current: boolean }) {
  if (complete) {
    return (
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" fill="#E1F5EE" />
        <path d="M6.5 10l2.2 2.2L13.5 7.5" stroke="#00B882" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (current) {
    return (
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className="animate-spin" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="#E5E7EB" strokeWidth="2" />
        <path d="M10 2.5a7.5 7.5 0 0 1 7.5 7.5" stroke="#3F7266" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

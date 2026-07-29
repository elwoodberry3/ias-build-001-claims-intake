import type { ReactNode } from "react";

type Tone = "ok" | "warn" | "risk" | "neutral" | "live";

const TONE_MAP: Record<Tone, string> = {
  ok: "bg-state-okBg text-state-okFg",
  warn: "bg-state-warnBg text-state-warnFg",
  risk: "bg-state-riskBg text-state-riskFg",
  neutral: "bg-ias-mid text-ias-body",
  live: "bg-ias-primary text-ias-accent",
};

export function StatusChip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.06em] ${TONE_MAP[tone]}`}
    >
      {tone === "live" && (
        <span className="live-pulse inline-block h-1.5 w-1.5 rounded-full bg-ias-accent" />
      )}
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm bg-ias-primary px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ias-accent">
      {children}
    </span>
  );
}

export function MockBanner({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-ias-mid bg-ias-light px-5 py-2">
      <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="#6B7280" strokeWidth="1.5" />
        <path d="M10 6v5M10 13.5v.5" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ias-muted">
        {label}
      </p>
    </div>
  );
}

export function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-ias-muted">
        {label}
      </dt>
      <dd className="mt-0.5 font-display text-[13px] font-semibold text-ias-primary">
        {value}
      </dd>
    </div>
  );
}

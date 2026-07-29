import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The Obsidian Ledger Capital host platform chrome.
 * Everything outside the main panel belongs to *their* product — the graphite
 * shell, the slate-blue ledger accent, the nav rail. The IAS-built feature
 * (the claims agent) lives inside <main>. Nav items other than "Claims Triage"
 * are dead controls: they exist to make the surface believable, but they do
 * nothing because the demo mimics the exact moment this one feature is used.
 */

const NAV = [
  { label: "Overview", icon: GridIcon, live: false },
  { label: "Capital Movement", icon: FlowIcon, live: false },
  { label: "Risk Models", icon: PulseIcon, live: false },
  { label: "Claims Triage", icon: ShieldIcon, live: true },
  { label: "Reconciliation", icon: BalanceIcon, live: false },
  { label: "Geo Forecasting", icon: GlobeIcon, live: false },
];

export function PlatformShell({
  children,
  breadcrumb,
}: {
  children: ReactNode;
  breadcrumb: string;
}) {
  return (
    <div className="min-h-screen bg-obsidian-950 text-ias-dark">
      {/* Top rail — Obsidian Ledger chrome */}
      <header className="sticky top-0 z-40 border-b border-obsidian-700 bg-obsidian-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-shell items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <ObsidianMark />
            <div className="leading-none">
              <div className="font-display text-[15px] font-bold tracking-tight text-white">
                Obsidian Ledger
                <span className="ml-1 font-normal text-obsidian-400">Capital</span>
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-obsidian-ledger">
                Quantitative Capital Protection
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-obsidian-400 sm:inline">
              Region: EU-West · Prod
            </span>
            <button className="dead-control relative rounded-sm border border-obsidian-700 px-2 py-1 font-mono text-[10px] text-obsidian-200">
              ⌘K
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-obsidian-ledgerdim font-display text-[12px] font-bold text-white">
              SB
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-shell gap-0 px-0">
        {/* Side nav — Obsidian Ledger chrome */}
        <nav
          aria-label="Platform sections"
          className="hidden w-[188px] shrink-0 border-r border-obsidian-700 bg-obsidian-950 px-3 py-5 md:block"
        >
          <p className="mb-3 px-2 font-mono text-[9px] uppercase tracking-[0.16em] text-obsidian-400">
            Platform
          </p>
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  {item.live ? (
                    <Link
                      href="/claims/"
                      className="flex items-center gap-2.5 rounded-md bg-obsidian-800 px-2.5 py-2 font-display text-[13px] font-semibold text-white ring-1 ring-inset ring-ias-accent/25"
                    >
                      <Icon className="text-ias-accent" />
                      {item.label}
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-ias-accent" />
                    </Link>
                  ) : (
                    <span className="dead-control relative flex items-center gap-2.5 rounded-md px-2.5 py-2 font-display text-[13px] font-medium text-obsidian-400">
                      <Icon className="text-obsidian-400" />
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-6 rounded-md border border-obsidian-700 bg-obsidian-900 p-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-obsidian-ledger">
              Module
            </p>
            <p className="mt-1 font-display text-[12px] font-semibold leading-snug text-obsidian-200">
              Agentic Claims Intake &amp; Triage
            </p>
            <p className="mt-1.5 font-mono text-[9px] text-obsidian-400">
              Deployed into existing Next.js platform
            </p>
          </div>
        </nav>

        {/* Feature surface — the IAS-built content */}
        <main className="min-h-[calc(100vh-57px)] flex-1 bg-ias-light">
          <div className="border-b border-ias-mid bg-white px-5 py-2.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ias-muted">
              Obsidian Ledger{" "}
              <span className="text-ias-mid">/</span> Claims Triage{" "}
              <span className="text-ias-mid">/</span>{" "}
              <span className="text-ias-primary">{breadcrumb}</span>
            </p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

/* ---- Obsidian Ledger wordmark: a stacked-ledger obsidian shard ---- */
function ObsidianMark() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-obsidian-800 to-obsidian-950 ring-1 ring-inset ring-obsidian-ledger/40">
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 1.5 3.5 6v8L10 18.5 16.5 14V6L10 1.5Z" stroke="#4F86C6" strokeWidth="1.3" fill="none" />
        <path d="M6.5 8.5h7M6.5 11h7" stroke="#4F86C6" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M10 1.5v17" stroke="#2E5F94" strokeWidth="0.9" />
      </svg>
    </div>
  );
}

/* ---- Nav icons (inline, no dependency) ---- */
type IconProps = { className?: string };
function GridIcon({ className }: IconProps) {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11" y="3" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="11" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11" y="11" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function FlowIcon({ className }: IconProps) {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M4 6h7M4 14h12M11 6l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PulseIcon({ className }: IconProps) {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M2 10h4l2-5 3 10 2-5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ShieldIcon({ className }: IconProps) {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M10 2.5 4 4.5v5c0 4 3.2 6.5 6 8 2.8-1.5 6-4 6-8v-5L10 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7.5 10l1.8 1.8L13 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BalanceIcon({ className }: IconProps) {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M10 3v13M5 6h10M5 6l-2.5 5h5L5 6ZM15 6l-2.5 5h5L15 6ZM6 16h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GlobeIcon({ className }: IconProps) {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 10h15M10 2.5c2.2 2 3.3 4.8 3.3 7.5S12.2 15.5 10 17.5C7.8 15.5 6.7 12.7 6.7 10S7.8 4.5 10 2.5Z" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

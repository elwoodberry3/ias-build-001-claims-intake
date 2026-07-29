import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Obsidian Ledger Capital · Claims Console",
  description:
    "Agentic Claims Intake & Triage — a feature built into the Obsidian Ledger Capital platform. Demonstration build.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

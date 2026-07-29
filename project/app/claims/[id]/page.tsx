import { notFound } from "next/navigation";
import { PlatformShell } from "@/components/PlatformShell";
import { MockBanner } from "@/components/ui";
import { ClaimDetail } from "@/components/ClaimDetail";
import { HERO_CLAIM, DATASET_LABEL } from "@/lib/mock-data";

const CLAIMS = [HERO_CLAIM];

export function generateStaticParams() {
  return CLAIMS.map((c) => ({ id: c.id }));
}

export default function ClaimDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const claim = CLAIMS.find((c) => c.id === params.id);
  if (!claim) notFound();

  return (
    <PlatformShell breadcrumb={claim.id}>
      <MockBanner label={DATASET_LABEL} />
      <ClaimDetail claim={claim} />
    </PlatformShell>
  );
}

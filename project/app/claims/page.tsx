import { PlatformShell } from "@/components/PlatformShell";
import { MockBanner } from "@/components/ui";
import { IntakeScreen } from "@/components/IntakeScreen";
import { DATASET_LABEL } from "@/lib/mock-data";

export default function ClaimsIntakePage() {
  return (
    <PlatformShell breadcrumb="Intake">
      <MockBanner label={DATASET_LABEL} />
      <IntakeScreen />
    </PlatformShell>
  );
}

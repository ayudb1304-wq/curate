import { BadgeCheck, FlaskConical, PenLine } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { MetricSource } from "@/lib/kit/types";

const CONFIG: Record<
  MetricSource | "self_reported",
  { label: string; title: string; icon: typeof BadgeCheck }
> = {
  demo: {
    label: "Demo data",
    title: "Sample metrics. Live account connections are not enabled yet.",
    icon: FlaskConical,
  },
  verified: {
    label: "Verified by Curately",
    title: "Pulled directly from the connected account with the creator's permission.",
    icon: BadgeCheck,
  },
  self_reported: {
    label: "Self-reported",
    title: "Entered by the creator, not verified by Curately.",
    icon: PenLine,
  },
};

export function SourceBadge({
  source,
  className,
}: {
  source: MetricSource;
  className?: string;
}) {
  const { label, title, icon: Icon } = CONFIG[source];
  return (
    <Badge
      variant={source === "verified" ? "default" : "outline"}
      title={title}
      className={className}
    >
      <Icon data-icon="inline-start" />
      {label}
    </Badge>
  );
}

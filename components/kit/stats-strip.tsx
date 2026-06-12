import { formatDate } from "@/lib/format";
import type { KitMetrics } from "@/lib/kit/types";

import { CountUp } from "./count-up";

export function StatsStrip({ metrics }: { metrics: KitMetrics }) {
  const stats: Array<{ label: string; value: number; style?: "compact" | "percent" }> = [
    { label: "Followers", value: metrics.followerCount },
    { label: "Engagement", value: metrics.engagementRate, style: "percent" },
    { label: "Avg likes", value: metrics.avgLikes },
    ...(metrics.avgReach != null
      ? [{ label: "Avg reach", value: metrics.avgReach }]
      : []),
  ];

  return (
    <section className="flex flex-col items-center gap-4">
      <div className="grid w-full grid-cols-2 gap-y-8 rounded-3xl bg-card px-4 py-8 ring-1 ring-foreground/10 sm:grid-cols-4 sm:divide-x sm:divide-border">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <span className="font-heading text-3xl font-semibold sm:text-4xl">
              <CountUp value={stat.value} style={stat.style ?? "compact"} />
            </span>
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
      {metrics.lastSyncedAt && (
        <p className="text-xs text-muted-foreground">
          Updated {formatDate(metrics.lastSyncedAt)} from connected accounts
        </p>
      )}
    </section>
  );
}

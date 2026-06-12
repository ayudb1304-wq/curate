import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { formatCompact, formatDate, formatPercent } from "@/lib/format";
import type { KitMetrics } from "@/lib/kit/types";

import { SourceBadge } from "./source-badge";

export function StatsSection({ metrics }: { metrics: KitMetrics }) {
  const stats = [
    { label: "Followers", value: formatCompact(metrics.followerCount) },
    { label: "Engagement rate", value: formatPercent(metrics.engagementRate) },
    { label: "Avg likes", value: formatCompact(metrics.avgLikes) },
    {
      label: "Avg reach",
      value: metrics.avgReach != null ? formatCompact(metrics.avgReach) : "n/a",
    },
  ];

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-medium">Performance</h2>
        <div className="flex items-center gap-2">
          {metrics.lastSyncedAt && (
            <span className="text-xs text-muted-foreground">
              Updated {formatDate(metrics.lastSyncedAt)}
            </span>
          )}
          <SourceBadge source={metrics.source} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} size="sm">
            <CardContent className="flex flex-col gap-1">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {stat.value}
              </CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

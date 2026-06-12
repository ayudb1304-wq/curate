import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { countryName, formatPercent } from "@/lib/format";
import type { KitAudience, MetricSource } from "@/lib/kit/types";

import { SourceBadge } from "./source-badge";

function BarList({ items }: { items: Array<{ label: string; value: number }> }) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-3">
          <span className="w-28 shrink-0 truncate text-sm">{item.label}</span>
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <span
              className="block h-full rounded-full bg-primary"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </span>
          <span className="w-12 shrink-0 text-right text-sm text-muted-foreground tabular-nums">
            {formatPercent(item.value)}
          </span>
        </li>
      ))}
    </ul>
  );
}

const GENDER_LABELS: Record<string, string> = {
  MALE: "Men",
  FEMALE: "Women",
  OTHERS: "Other",
};

export function AudienceSection({
  audience,
  source,
}: {
  audience: KitAudience;
  source: MetricSource;
}) {
  const genderAge = [...audience.genderAge]
    .sort((a, b) => b.value - a.value)
    .map((g) => ({
      label: `${GENDER_LABELS[g.gender] ?? g.gender} ${g.ageRange}`,
      value: g.value,
    }));

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-medium">Audience</h2>
        <SourceBadge source={source} />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Top countries</CardTitle>
          </CardHeader>
          <CardContent>
            <BarList
              items={audience.countries.map((c) => ({
                label: countryName(c.code),
                value: c.value,
              }))}
            />
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Top cities</CardTitle>
          </CardHeader>
          <CardContent>
            <BarList
              items={audience.cities.map((c) => ({ label: c.name, value: c.value }))}
            />
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Gender and age</CardTitle>
          </CardHeader>
          <CardContent>
            <BarList items={genderAge} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

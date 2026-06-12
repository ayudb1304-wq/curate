import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format";
import type { RateCardItem } from "@/lib/kit/types";

import { SourceBadge } from "./source-badge";

export function RateCardSection({ rateCard }: { rateCard: RateCardItem[] }) {
  if (rateCard.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-medium">Rates</h2>
        <SourceBadge source="self_reported" />
      </div>

      <Card size="sm">
        <CardContent className="flex flex-col">
          {rateCard.map((item, index) => (
            <div key={item.deliverable}>
              {index > 0 && <Separator className="my-3" />}
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{item.deliverable}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold tabular-nums">
                  {formatCurrency(item.price, item.currency)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

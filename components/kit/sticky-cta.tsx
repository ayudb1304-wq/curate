import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import type { RateCardItem } from "@/lib/kit/types";

/** Mobile-only bar pinned to the bottom of the kit page. */
export function StickyCta({
  name,
  email,
  rateCard,
}: {
  name: string;
  email: string;
  rateCard: RateCardItem[];
}) {
  const cheapest = rateCard.length
    ? rateCard.reduce((min, item) => (item.price < min.price ? item : min))
    : null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/85 backdrop-blur-xl sm:hidden">
      <div className="flex items-center justify-between gap-3 px-4 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium">{name}</span>
          {cheapest && (
            <span className="text-xs text-muted-foreground">
              From {formatCurrency(cheapest.price, cheapest.currency)} per deliverable
            </span>
          )}
        </div>
        <Button asChild className="shrink-0 rounded-full px-5">
          <a href={`mailto:${email}`}>
            <Mail data-icon="inline-start" />
            Work with me
          </a>
        </Button>
      </div>
    </div>
  );
}

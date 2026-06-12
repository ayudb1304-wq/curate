import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { PastCollab } from "@/lib/kit/types";

import { SourceBadge } from "./source-badge";

export function CollabsSection({ collabs }: { collabs: PastCollab[] }) {
  if (collabs.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-medium">Past collaborations</h2>
        <SourceBadge source="self_reported" />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {collabs.map((collab) => (
          <Card key={collab.brand} size="sm">
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-secondary text-xs font-medium">
                    {collab.brand[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{collab.brand}</p>
              </div>
              <p className="text-sm text-muted-foreground">{collab.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

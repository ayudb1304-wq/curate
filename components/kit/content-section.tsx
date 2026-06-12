import { Clapperboard, ExternalLink, Heart, Image as ImageIcon, MessageCircle, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCompact, formatDate } from "@/lib/format";
import type { KitContentItem, MetricSource } from "@/lib/kit/types";

import { SourceBadge } from "./source-badge";

const TYPE_LABELS: Record<string, string> = {
  REELS: "Reel",
  POST: "Post",
  STORY: "Story",
  VIDEO: "Video",
};

export function ContentSection({
  content,
  source,
}: {
  content: KitContentItem[];
  source: MetricSource;
}) {
  if (content.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-medium">Recent content</h2>
        <SourceBadge source={source} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {content.map((item) => {
          const isVideo = item.format === "VIDEO";
          const FormatIcon = isVideo ? Clapperboard : ImageIcon;
          return (
            <Card key={item.id} size="sm" className="pt-0">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary/25 via-primary/10 to-muted"
              >
                <FormatIcon className="size-10 text-primary-foreground/50 transition-transform group-hover:scale-110" />
                <Badge variant="outline" className="absolute top-3 left-3 bg-background/80">
                  {TYPE_LABELS[item.type] ?? item.type}
                </Badge>
                <ExternalLink className="absolute top-3 right-3 size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <CardContent className="flex flex-col gap-3">
                <p className="line-clamp-2 min-h-10 text-sm">{item.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {item.views != null && (
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Play className="size-3.5" />
                      {formatCompact(item.views)}
                    </span>
                  )}
                  {item.likes != null && (
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Heart className="size-3.5" />
                      {formatCompact(item.likes)}
                    </span>
                  )}
                  {item.comments != null && (
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <MessageCircle className="size-3.5" />
                      {formatCompact(item.comments)}
                    </span>
                  )}
                  <span className="ml-auto">{formatDate(item.publishedAt)}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

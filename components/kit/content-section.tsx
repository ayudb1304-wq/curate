import Image from "next/image";

import { Clapperboard, Heart, Image as ImageIcon, MessageCircle, Play } from "lucide-react";

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
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-medium">Recent content</h2>
        <SourceBadge source={source} />
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
        {content.map((item) => {
          const isVideo = item.format === "VIDEO";
          const FormatIcon = isVideo ? Clapperboard : ImageIcon;
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/5] w-[72%] min-w-[72%] snap-center overflow-hidden rounded-3xl ring-1 ring-foreground/10 sm:w-auto sm:min-w-0"
            >
              {item.thumbnailUrl ? (
                <Image
                  src={item.thumbnailUrl}
                  alt={item.description ?? "Post"}
                  fill
                  sizes="(max-width: 640px) 72vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/25 via-primary/10 to-muted">
                  <FormatIcon className="size-10 text-primary-foreground/50" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                <FormatIcon className="size-3" />
                {TYPE_LABELS[item.type] ?? item.type}
              </span>

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 text-white">
                <p className="line-clamp-2 text-sm font-medium">{item.description}</p>
                <div className="flex items-center gap-3 text-xs text-white/80">
                  {item.views != null && (
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Play className="size-3" />
                      {formatCompact(item.views)}
                    </span>
                  )}
                  {item.likes != null && (
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Heart className="size-3" />
                      {formatCompact(item.likes)}
                    </span>
                  )}
                  {item.comments != null && (
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <MessageCircle className="size-3" />
                      {formatCompact(item.comments)}
                    </span>
                  )}
                  <span className="ml-auto">{formatDate(item.publishedAt)}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

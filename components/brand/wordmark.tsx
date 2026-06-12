import { Sparkles } from "lucide-react";

import { FancyText } from "@/components/brand/fancy-text";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="flex size-7 items-center justify-center rounded-lg bg-primary">
        <Sparkles className="size-4 text-primary-foreground" />
      </span>
      <FancyText
        text="Curately"
        className="font-heading text-lg font-semibold tracking-tight"
      />
    </span>
  );
}

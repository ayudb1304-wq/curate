import { AtSign, Globe, Mail, MapPin } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { KitData } from "@/lib/kit/types";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function KitHeader({ kit }: { kit: KitData }) {
  return (
    <header className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
      <Avatar className="size-24 text-2xl">
        <AvatarFallback className="bg-primary/15 font-medium text-primary-foreground">
          {initials(kit.displayName)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col gap-3">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            {kit.displayName}
          </h1>
          <a
            href={kit.platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <AtSign className="size-3.5" />
            {kit.platform.name} · @{kit.platform.username}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{kit.category}</Badge>
          <Badge variant="outline">
            <MapPin data-icon="inline-start" />
            {kit.location}
          </Badge>
        </div>

        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {kit.bio}
        </p>
      </div>

      <div className="flex shrink-0 gap-2">
        <Button asChild>
          <a href={`mailto:${kit.contactEmail}`}>
            <Mail data-icon="inline-start" />
            Work with me
          </a>
        </Button>
        {kit.website && (
          <Button asChild variant="outline">
            <a href={kit.website} target="_blank" rel="noopener noreferrer">
              <Globe data-icon="inline-start" />
              Website
            </a>
          </Button>
        )}
      </div>
    </header>
  );
}

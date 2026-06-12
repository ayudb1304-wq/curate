import Image from "next/image";

import { AtSign, Globe, Mail, MapPin } from "lucide-react";

import { FancyText } from "@/components/brand/fancy-text";
import { Button } from "@/components/ui/button";
import type { KitData } from "@/lib/kit/types";

import { SourceBadge } from "./source-badge";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-foreground/10 bg-background/60 text-foreground backdrop-blur-md transition-transform hover:scale-110"
    >
      {children}
    </a>
  );
}

export function KitHero({ kit }: { kit: KitData }) {
  return (
    <section className="relative h-[78svh] max-h-[820px] min-h-[520px] w-full">
      {kit.heroImageUrl ? (
        <Image
          src={kit.heroImageUrl}
          alt={kit.displayName}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/15 to-muted" />
      )}

      {/* Blend the photo into the page background. */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 via-25% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-4 pb-6 text-center sm:pb-10">
        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700">
          {kit.metrics && (
            <SourceBadge
              source={kit.metrics.source}
              className="bg-background/70 backdrop-blur-md"
            />
          )}
        </div>

        <h1 className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both font-heading text-4xl font-semibold tracking-tight delay-100 duration-700 sm:text-5xl">
          <FancyText text={kit.displayName} />
        </h1>

        <p className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground delay-200 duration-700">
          <span>@{kit.platform.username}</span>
          <span aria-hidden>·</span>
          <span>{kit.category}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" />
            {kit.location}
          </span>
        </p>

        <p className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both max-w-xl text-sm leading-relaxed text-muted-foreground delay-300 duration-700 sm:text-base">
          {kit.bio}
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-1 flex items-center gap-3 delay-400 duration-700">
          <SocialLink href={kit.platform.url} label={kit.platform.name}>
            <AtSign className="size-4.5" />
          </SocialLink>
          {kit.website && (
            <SocialLink href={kit.website} label="Website">
              <Globe className="size-4.5" />
            </SocialLink>
          )}
          <SocialLink href={`mailto:${kit.contactEmail}`} label="Email">
            <Mail className="size-4.5" />
          </SocialLink>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-2 hidden delay-500 duration-700 sm:block">
          <Button asChild size="lg" className="rounded-full px-7">
            <a href={`mailto:${kit.contactEmail}`}>Work with me</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

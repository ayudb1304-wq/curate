import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Mail } from "lucide-react";

import { FancyText } from "@/components/brand/fancy-text";
import { AudienceSection } from "@/components/kit/audience-section";
import { CollabsSection } from "@/components/kit/collabs-section";
import { ContentSection } from "@/components/kit/content-section";
import { KitHero } from "@/components/kit/kit-hero";
import { RateCardSection } from "@/components/kit/rate-card-section";
import { Reveal } from "@/components/kit/reveal";
import { StatsStrip } from "@/components/kit/stats-strip";
import { StickyCta } from "@/components/kit/sticky-cta";
import { Button } from "@/components/ui/button";
import { getKitByHandle } from "@/lib/kit/data";

interface KitPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: KitPageProps): Promise<Metadata> {
  const { handle } = await params;
  const kit = await getKitByHandle(handle);
  if (!kit) return { title: "Creator not found" };
  return {
    title: `${kit.displayName} | Media kit`,
    description: `${kit.displayName}, ${kit.category.toLowerCase()} creator in ${kit.location}. Live media kit with rates and audience data on Curately.`,
  };
}

export default async function KitPage({ params }: KitPageProps) {
  const { handle } = await params;
  const kit = await getKitByHandle(handle);
  if (!kit) notFound();

  return (
    <main className="pb-24 sm:pb-0">
      <KitHero kit={kit} />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-14 px-4 pt-6 pb-12 sm:px-6 sm:pt-10">
        {kit.metrics && (
          <Reveal>
            <StatsStrip metrics={kit.metrics} />
          </Reveal>
        )}

        {kit.audience && kit.metrics && (
          <Reveal>
            <AudienceSection audience={kit.audience} source={kit.metrics.source} />
          </Reveal>
        )}

        {kit.metrics && (
          <Reveal>
            <ContentSection content={kit.recentContent} source={kit.metrics.source} />
          </Reveal>
        )}

        <div className="grid items-start gap-14 md:grid-cols-2 md:gap-10">
          <Reveal>
            <RateCardSection rateCard={kit.rateCard} />
          </Reveal>
          <Reveal delay={100}>
            <CollabsSection collabs={kit.collabs} />
          </Reveal>
        </div>

        <Reveal>
          <section className="flex flex-col items-center gap-4 rounded-3xl bg-muted px-6 py-12 text-center">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Want to work with <FancyText text={kit.displayName.split(" ")[0]} />?
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Rates above are a starting point. Send a brief with your product and
              timeline to get a quote.
            </p>
            <Button asChild size="lg" className="rounded-full px-7">
              <a href={`mailto:${kit.contactEmail}`}>
                <Mail data-icon="inline-start" />
                {kit.contactEmail}
              </a>
            </Button>
          </section>
        </Reveal>

        <footer className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          Live media kit powered by
          <FancyText text="Curately" className="font-heading font-semibold text-foreground" />
        </footer>
      </div>

      <StickyCta name={kit.displayName} email={kit.contactEmail} rateCard={kit.rateCard} />
    </main>
  );
}

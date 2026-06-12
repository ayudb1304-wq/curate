import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Mail } from "lucide-react";

import { AudienceSection } from "@/components/kit/audience-section";
import { CollabsSection } from "@/components/kit/collabs-section";
import { ContentSection } from "@/components/kit/content-section";
import { KitHeader } from "@/components/kit/kit-header";
import { RateCardSection } from "@/components/kit/rate-card-section";
import { StatsSection } from "@/components/kit/stats-section";
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
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-10 sm:px-6">
      <KitHeader kit={kit} />

      {kit.metrics && <StatsSection metrics={kit.metrics} />}
      {kit.audience && kit.metrics && (
        <AudienceSection audience={kit.audience} source={kit.metrics.source} />
      )}
      {kit.metrics && (
        <ContentSection content={kit.recentContent} source={kit.metrics.source} />
      )}

      <div className="grid items-start gap-10 md:grid-cols-2">
        <RateCardSection rateCard={kit.rateCard} />
        <CollabsSection collabs={kit.collabs} />
      </div>

      <section className="flex flex-col items-center gap-4 rounded-2xl bg-muted px-6 py-10 text-center">
        <h2 className="font-heading text-xl font-semibold">
          Want to work with {kit.displayName.split(" ")[0]}?
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Rates above are a starting point. Send a brief with your product and
          timeline to get a quote.
        </p>
        <Button asChild size="lg">
          <a href={`mailto:${kit.contactEmail}`}>
            <Mail data-icon="inline-start" />
            {kit.contactEmail}
          </a>
        </Button>
      </section>

      <footer className="flex items-center justify-center gap-1.5 pb-4 text-xs text-muted-foreground">
        Live media kit powered by
        <span className="font-medium text-foreground">Curately</span>
      </footer>
    </main>
  );
}

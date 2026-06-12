import type { PastCollab, RateCardItem } from "./types";

/**
 * Creator-entered kit sections, keyed by Curately handle.
 * Stand-in for the Supabase tables (kit_sections, rate_cards, collabs)
 * until persistence lands in weeks 1-2 of the action plan.
 * Brands listed are fictional.
 */

export interface ManualKitEntry {
  handle: string;
  phylloAccountId: string;
  bio: string;
  location: string;
  category: string;
  contactEmail: string;
  website: string | null;
  rateCard: RateCardItem[];
  collabs: PastCollab[];
}

export const manualKits: Record<string, ManualKitEntry> = {
  aanya: {
    handle: "aanya",
    phylloAccountId: "2b3316b8-f468-4f03-8411-40b547ec7eb3",
    bio: "Skincare and everyday makeup for Indian skin tones. I test everything on combination skin for at least two weeks before talking about it. Audience is mostly women 18 to 34 in metro India.",
    location: "Mumbai, India",
    category: "Beauty",
    contactEmail: "hello@aanya.in",
    website: "https://aanya.in",
    rateCard: [
      {
        deliverable: "Instagram Reel",
        detail: "30 to 60 seconds, 1 concept, 2 revisions, usage for 90 days",
        price: 18000,
        currency: "INR",
      },
      {
        deliverable: "Static post",
        detail: "Single image with caption, product in frame",
        price: 8000,
        currency: "INR",
      },
      {
        deliverable: "Story set",
        detail: "3 frames with link sticker, live for 24 hours",
        price: 5000,
        currency: "INR",
      },
      {
        deliverable: "UGC video",
        detail: "Brand-owned asset, no posting, raw plus edited cut",
        price: 12000,
        currency: "INR",
      },
    ],
    collabs: [
      {
        brand: "Gleam Naturals",
        summary: "3-reel launch series for a vitamin C serum. Top reel reached 210K accounts.",
      },
      {
        brand: "Suvarna Jewels",
        summary: "Festive lookbook, 2 posts and a story set during Diwali week.",
      },
      {
        brand: "Kava Skincare",
        summary: "Long-term ambassador, monthly reel for 6 months.",
      },
    ],
  },
};

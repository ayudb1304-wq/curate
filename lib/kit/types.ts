/** Shapes the kit page renders. Composed from Phyllo data plus creator-entered sections. */

export type MetricSource = "demo" | "verified" | "self_reported";

export interface RateCardItem {
  deliverable: string;
  detail: string;
  price: number;
  currency: "INR" | "USD";
}

export interface PastCollab {
  brand: string;
  summary: string;
  url?: string;
}

export interface KitMetrics {
  source: MetricSource;
  followerCount: number;
  engagementRate: number;
  avgLikes: number;
  avgComments: number;
  avgReach: number | null;
  contentCount: number | null;
  lastSyncedAt: string | null;
}

export interface KitAudience {
  countries: Array<{ code: string; value: number }>;
  cities: Array<{ name: string; value: number }>;
  genderAge: Array<{ gender: string; ageRange: string; value: number }>;
}

export interface KitContentItem {
  id: string;
  type: string;
  format: string;
  description: string | null;
  url: string;
  thumbnailUrl: string | null;
  publishedAt: string;
  likes: number | null;
  comments: number | null;
  views: number | null;
}

export interface KitData {
  handle: string;
  displayName: string;
  heroImageUrl: string | null;
  bio: string;
  location: string;
  category: string;
  contactEmail: string;
  website: string | null;
  platform: {
    name: string;
    username: string;
    url: string;
  };
  metrics: KitMetrics | null;
  audience: KitAudience | null;
  recentContent: KitContentItem[];
  rateCard: RateCardItem[];
  collabs: PastCollab[];
}

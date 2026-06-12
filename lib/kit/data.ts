import { getPhylloClient } from "@/lib/phyllo/client";

import { manualKits } from "./fixtures";
import type { KitData, KitMetrics } from "./types";

/**
 * Composes the public kit for a handle: creator-entered sections plus
 * social metrics from the Phyllo client (mock fixtures until sandbox access).
 * Returns null for unknown handles.
 */
export async function getKitByHandle(handle: string): Promise<KitData | null> {
  const manual = manualKits[handle.toLowerCase()];
  if (!manual) return null;

  const phyllo = getPhylloClient();
  const accountId = manual.phylloAccountId;

  const [profile, audience, contents] = await Promise.all([
    phyllo.getProfile(accountId),
    phyllo.getAudience(accountId),
    phyllo.getContents(accountId, 6),
  ]);

  const followerCount = profile.reputation.follower_count ?? 0;
  const posts = contents.data;

  const avg = (values: Array<number | null>) => {
    const present = values.filter((v): v is number => v != null);
    return present.length
      ? Math.round(present.reduce((sum, v) => sum + v, 0) / present.length)
      : 0;
  };

  const avgLikes = avg(posts.map((p) => p.engagement.like_count));
  const avgComments = avg(posts.map((p) => p.engagement.comment_count));
  const avgReach = avg(posts.map((p) => p.engagement.reach_organic_count));

  const metrics: KitMetrics = {
    // Demo until real OAuth exists; flips to "verified" when PHYLLO_MODE is live.
    source: process.env.PHYLLO_MODE === "production" ? "verified" : "demo",
    followerCount,
    engagementRate: followerCount
      ? ((avgLikes + avgComments) / followerCount) * 100
      : 0,
    avgLikes,
    avgComments,
    avgReach: avgReach || null,
    contentCount: profile.reputation.content_count,
    lastSyncedAt: profile.updated_at,
  };

  return {
    handle: manual.handle,
    displayName: profile.full_name,
    heroImageUrl: manual.heroImageUrl ?? profile.image_url,
    bio: manual.bio,
    location: manual.location,
    category: manual.category,
    contactEmail: manual.contactEmail,
    website: manual.website,
    platform: {
      name: profile.work_platform.name,
      username: profile.platform_username,
      url: profile.url,
    },
    metrics,
    audience: {
      countries: audience.countries,
      cities: audience.cities,
      genderAge: audience.gender_age_distribution.map((g) => ({
        gender: g.gender,
        ageRange: g.age_range,
        value: g.value,
      })),
    },
    recentContent: posts.map((p) => ({
      id: p.id,
      type: p.type,
      format: p.format,
      description: p.description,
      url: p.url,
      thumbnailUrl: p.thumbnail_url,
      publishedAt: p.published_at,
      likes: p.engagement.like_count,
      comments: p.engagement.comment_count,
      views: p.engagement.view_count,
    })),
    rateCard: manual.rateCard,
    collabs: manual.collabs,
  };
}
